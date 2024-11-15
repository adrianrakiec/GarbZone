using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(DataContext context, ITokenService tokenService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (await UserExist(registerDto.Username)) 
                return Unauthorized(new { message = "Nazwa użytkownika jest już zajęta!" });

            if (await EmailExist(registerDto.Email)) 
                return Unauthorized(new { message = "Istnieje już użytkownik o podanym email!" });

            if (registerDto.Password != registerDto.ConfirmPassword) 
                return Unauthorized(new { message = "Hasła muszą być takie same!" });

            using var hmac = new HMACSHA512();
            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                CreatedAt = DateTime.UtcNow
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return Ok();
        }       

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username);

            if (user == null) 
                return Unauthorized(new { message = "Nazwa użytkownika jest nieprawidłowa!" });

            user.LastActive = DateTime.UtcNow;
            await context.SaveChangesAsync();

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++) 
            {
                if (computedHash[i] != user.PasswordHash[i]) 
                    return Unauthorized(new { message = "Hasło jest nieprawidłowe!" });
            }

            var token = tokenService.CreateToken(user);
            AddTokenToCookie(token);

            return Ok();
        }

        [Authorize]
        [HttpGet("me")]
        public IActionResult GetCurrentUser()
        {
            var username = User.FindFirst(ClaimTypes.Name)?.Value;

            return Ok(new { Username = username });
}

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("token", 
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None
                });

            return Ok();
        }

        private async Task<bool> UserExist(string username)
        {
            return await context.Users.AnyAsync(x => x.UserName == username);
        }

        private async Task<bool> EmailExist(string email)
        {
            return await context.Users.AnyAsync(x => x.Email == email);
        }     

        private void AddTokenToCookie(string token) 
        {
            Response.Cookies.Append("token", token, 
                new CookieOptions
                {
                    Expires = DateTime.Now.AddDays(7),
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None
                });
        }
    }
}
