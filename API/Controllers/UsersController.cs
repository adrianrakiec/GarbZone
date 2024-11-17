using API.DTOs;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService) : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await userRepository.GetMembers();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            var user = await userRepository.GetMember(username);

            if(user == null) return NotFound(new { message = "Użytkownik nie został znaleziony"});

            return user;
        }

        [HttpGet("search/{term}")]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsersByTerm(string term)
        {
            var users = await userRepository.GetUsersByTerm(term);

            if(users == null) return NotFound(new { message = "Brak pasujących wyników"});

            return Ok(users);
        }

        [Authorize]
        [HttpPut()]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {           
            if(memberUpdateDto.Email == "") return BadRequest(new { message = "Email nie może być pusty!" });

            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return BadRequest(new { message = "Użytkownik nie został odnaleziony!" });

            mapper.Map(memberUpdateDto, user);

            userRepository.Update(user);
            
            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Nie udało się zaktualizować użytkownika!" });
        }

        [Authorize]
        [HttpPut("update-photo")]
        public async Task<ActionResult> UpdatePhoto(IFormFile file)
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return BadRequest(new { message = "Nie można zaktualizować użytkownika!" });

            var result = await photoService.AddPhoto(file);

            if(result.Error != null) return BadRequest(result.Error.Message);

            user.ProfilePhotoUrl = result.SecureUrl.AbsoluteUri;

            if(await userRepository.SaveAll()) return Ok(new { photoUrl = user.ProfilePhotoUrl });

            return BadRequest(new { message = "Błąd podczas dodawania zdjęcia" });
        }
    }
}
