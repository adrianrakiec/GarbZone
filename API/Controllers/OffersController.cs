using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController(IOfferRepository offerRepository, IUserRepository userRepository, IPhotoService photoService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffers()
        {
            var offers = await offerRepository.GetOffers();

            return Ok(offers);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OfferDto>> GetOffer(int id)
        {
            var offer = await offerRepository.GetOfferById(id);

            if(offer == null) return NotFound(new { message = "Nie znaleziono elementu." });

            return offer;
        }

        [HttpGet("search/{term}")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffersByTerm(string term)
        {
            var offers = await offerRepository.GetOffersByTerm(term);

            if(offers == null) return NotFound(new { message = "Brak pasujących wyników"});

            return Ok(offers);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> CreateOffer(
            [FromForm] string title, 
            [FromForm] string description, 
            [FromForm] decimal price, 
            [FromForm] List<IFormFile> images
        )
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return Unauthorized();
            
            var offer = new Offer
            {
                Title = title,
                Description = description,
                Price = price,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Status = "ACTIVE",
                UserId = user.Id,
                User = user
            };

            int index = 0;
            foreach (var img in images)
            {
                var result = await photoService.AddPhoto(img);

                if(result.Error != null) return BadRequest(result.Error.Message);

                var photo = new Photo
                {
                    Url = result.SecureUrl.AbsoluteUri,
                    PublicId = result.PublicId,
                    IsMain = index == 0,
                    Offer = offer
                };

                 offer.Images.Add(photo);
                 index++;
            }
            
            user.Offers.Add(offer);
            if(await userRepository.SaveAll()) return Ok();

            return BadRequest(new { message = "Problem przy tworzeniu!"});
        }
    }
}
