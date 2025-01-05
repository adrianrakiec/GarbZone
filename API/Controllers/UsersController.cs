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
    public class UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService, IWalletRepository walletRepository, ITagRepository tagRepository, IStripeService stripeService) : ControllerBase
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

        [Authorize]
        [HttpPut("add-rating/{username}/{offerId:int}")]
        public async Task<ActionResult> AddUserRating(AddRatingDto addRatingDto, string username, int offerId)
        {           
            var author = await userRepository.GetUserByUsername(User.GetUsername());

            if(author == null) return BadRequest(new { message = "Użytkownik nie został odnaleziony!" });
            
            var user = await userRepository.GetUserByUsername(username);

            if(user == null) return BadRequest(new { message = "Użytkownik nie został odnaleziony!" });
            
            if(addRatingDto.Comment != "" && addRatingDto.Comment != null)
            {
                var comment = new Comment
                {
                    Content = addRatingDto.Comment,
                    Author = author,
                    AuthorId = author.Id,
                    User = user,
                    UserId = user.Id,
                    OfferId = offerId
                };

                userRepository.AddComment(comment);
            }

            user.Rating.Add(addRatingDto.Rating);

            userRepository.Update(user);
            
            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Nie udało się zaktualizować użytkownika!" });
        }

        [Authorize(Roles = "Administrator")]
        [HttpGet("admin-panel")]
        public ActionResult GetAdminPanel()
        { 
            return Ok(new { message = "Uzyskano dostęp" });
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost("create-tag")]
        public async Task<ActionResult> CreateTag(string tagName)
        {
            if(string.IsNullOrEmpty(tagName)) return BadRequest(new { message = "Tag nie może być pusty!" });
            
            var tag = new Tag { TagName = tagName };
            
            tagRepository.AddTag(tag);

            if(await userRepository.SaveAll()) return Ok();

            return BadRequest(new { message = "Nie udało się utworzyć tagu!" });
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("edit-tag/{tagId:int}")]
        public async Task<ActionResult> EditTag(int tagId, [FromBody]string newTagName)
        {
            var tag = await tagRepository.GetTagById(tagId);

            if(tag == null) return BadRequest(new { message = "Nie znaleziono tagu!" });
            
            tag.TagName = newTagName;

            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Nie udało się edytować tagu!" });
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("remove-tag/{tagId:int}")]
        public async Task<ActionResult> RemoveTag(int tagId)
        {
            var tag = await tagRepository.GetTagById(tagId);
            
            if(tag == null) return BadRequest(new { message = "Tag nie został odnaleziony!" });

            tagRepository.RemoveTag(tag);

            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Nie udało się usunąć tagu!" });
        }
    }
}
