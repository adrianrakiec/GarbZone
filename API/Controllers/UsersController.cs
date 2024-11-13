using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserRepository userRepository) : ControllerBase
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
    }
}
