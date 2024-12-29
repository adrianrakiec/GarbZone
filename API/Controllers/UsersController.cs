using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService, IWalletRepository walletRepository, IStripeService stripeService) : ControllerBase
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
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsersByTerm(string term, [FromQuery]UserParams userParams)
        {
            var users = await userRepository.GetUsersByTerm(term, userParams);

            if(users == null) return NotFound(new { message = "Brak pasujących wyników"});

            Response.AddPaginationHeader(users);

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

        [Authorize]
        [HttpGet("wallet")]
        public async Task<ActionResult<decimal>> GetUserWallet()
        {           
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return BadRequest(new { message = "Użytkownik nie został odnaleziony!" });

            var wallet = await walletRepository.GetWalletByUserId(user.Id);

            if(wallet == null) return BadRequest(new { message = "Nie znaleziono portfela!"});

            return wallet.Amount;
        }

        [Authorize]
        [HttpPost("create-payment-intent")]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] decimal amount)
        {           
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return BadRequest(new { message = "Użytkownik nie został odnaleziony!" });

            try
            {
                var paymentIntent = await stripeService.CreatePaymentIntentAsync(amount);
                
                walletRepository.AddAmount(user.Id, amount);
                return Ok(new { clientSecret = paymentIntent.ClientSecret });
            }
            catch (StripeException e)
            {
                return BadRequest(new { error = e.StripeError.Message });
            }
        }
    }
}
