using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController(IOfferRepository offerRepository, IUserRepository userRepository, IPhotoService photoService, ITagRepository tagRepository, IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffers()
        {
            var offers = await offerRepository.GetOffers();

            return Ok(offers);
        }

        [HttpGet("last-added")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetLastAddedOffers()
        {
            var offers = await offerRepository.GetLastAddedOffers(8);

            return Ok(offers);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<OfferDto>> GetOffer(int id)
        {
            var offer = await offerRepository.GetFullOfferById(id);

            if(offer == null) return NotFound(new { message = "Nie znaleziono elementu." });

            offer.ViewCount++;
            
            if(await userRepository.SaveAll() == false) return BadRequest(new { message = "Nie udało się zapisać!" });

            var offerDto = mapper.Map<OfferDto>(offer);

            return offerDto;
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
            [FromForm] List<int> tagIds,
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
                User = user,
                ViewCount = 0
            };

            var tags = await tagRepository.GetTagsById(tagIds);

            if(tags != null) offer.Tags = tags;

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

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<ActionResult> EditOffer(
            int id,
            [FromForm] string title, 
            [FromForm] string description, 
            [FromForm] decimal price, 
            [FromForm] List<int> tagIds,
            [FromForm] List<IFormFile> images
        )
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return Unauthorized();

            if(images.Count == 0) return BadRequest(new { message = "Przynajmniej jedno zdjęcie jest wymagane!" });
            
            var offer = await offerRepository.GetFullOfferById(id);

            if(offer == null) return BadRequest(new { message = "Brak oferty!" });

            offer.Title = title;
            offer.Description = description;
            offer.Price = price;
            offer.UpdatedAt = DateTime.UtcNow;
            offer.Images = [];
            offer.Tags = [];

            var tags = await tagRepository.GetTagsById(tagIds);

            if(tags != null) offer.Tags = tags;

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
            
            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Problem przy edytowaniu!"});
        }

        [Authorize]
        [HttpDelete("delete-photo/{photoId:int}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return Unauthorized();

            var photo = await offerRepository.GetPhotoById(photoId);

            if(photo == null) return BadRequest(new { message = "Zdjęcie nie może zostać usunięte!" });

            if(photo.PublicId != null)
            {
                var result = await photoService.DeletePhoto(photo.PublicId);
                if(result.Error != null) return BadRequest(new { message = result.Error.Message });
            }

            offerRepository.DeletePhoto(photo);

            if(await userRepository.SaveAll()) return Ok();

            return BadRequest(new { message = "Problem przy usuwaniu!"});
        }
    }
}
