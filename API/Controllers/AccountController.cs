using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(DataContext context) : ControllerBase
    {
        [HttpPost("register")] 
        public async Task<ActionResult<User>> Register(RegisterDto registerDto)
        {
            if(await UserExist(registerDto.Username)) return BadRequest("Nazwa użytkownika jest zajęta!");
            
            using var hmac = new HMACSHA512();

            var user = new User
            {
                UserName = registerDto.Username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return user;
        }

        private async Task<bool> UserExist(string username)
        {
            return await context.Users.AnyAsync(x => x.UserName == username);
        }   
    }
}
