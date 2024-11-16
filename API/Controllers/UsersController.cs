using System.Security.Claims;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserRepository userRepository, IMapper mapper) : ControllerBase
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
            
            var username = User.FindFirst(ClaimTypes.Name)?.Value;

            if(username == null) return BadRequest();

            var user = await userRepository.GetUserByUsername(username);

            if(user == null) return BadRequest(new { message = "Użytkownik nie został odnaleziony!" });

            mapper.Map(memberUpdateDto, user);

            userRepository.Update(user);
            
            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Nie udało się zaktualizować użytkownika!" });
        }
    }
}
