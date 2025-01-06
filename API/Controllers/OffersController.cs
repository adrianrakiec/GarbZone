using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
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

        [HttpGet("best")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetBestOffers()
        {
            var offers = await offerRepository.GetBestOffers(8);

            return Ok(offers);
        }

        [Authorize]
        [HttpGet("liked")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetLikedOffers([FromQuery]UserParams userParams)
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());
            if(user == null) return BadRequest();
            var offers = await offerRepository.GetLikedOffers(userParams, user.Id);

            Response.AddPaginationHeader(offers);

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
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffersByTerm(string term, [FromQuery]UserParams userParams)
        {
            var offers = await offerRepository.GetOffersByTerm(term, userParams);

            if(offers == null) return NotFound(new { message = "Brak pasujących wyników"});

            Response.AddPaginationHeader(offers);

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
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
                Status = "Active",
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
            
            var offer = await offerRepository.GetFullOfferById(id);

            if(offer == null) return BadRequest(new { message = "Brak oferty!" });

            offer.Title = title;
            offer.Description = description;
            offer.Price = price;
            offer.UpdatedAt = DateTime.Now;
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

        [Authorize]
        [HttpDelete("delete-offer/{offerId:int}")]
        public async Task<ActionResult> DeleteOffer(int offerId)
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return Unauthorized();

            var offer = await offerRepository.GetFullOfferById(offerId);

            if(offer == null) return BadRequest(new { message = "Brak oferty!" });

            offerRepository.DeleteOffer(offer);

            if(await userRepository.SaveAll()) return Ok();

            return BadRequest(new { message = "Problem przy usuwaniu!"});
        }

        [HttpGet("tags")]
        public async Task<ActionResult> GetTags()
        {
            var tags = await tagRepository.GetTags();

            return Ok(tags);
        }

        [HttpGet("offers-by-tag/{tagName}")]
        public async Task<ActionResult<IEnumerable<OfferDto>>> GetOffersByTag(string tagName, [FromQuery]UserParams userParams)
        {
            var offers = await offerRepository.GetOffersByTag(tagName, userParams);

            Response.AddPaginationHeader(offers);

            return Ok(offers);
        }

        [Authorize] 
        [HttpPost("report-offer/{offerId:int}")]
        public async Task<ActionResult> ReportOffer([FromBody]string reason, int offerId)
        {
            var report = new Report
            {
                OfferId = offerId,
                Reason = reason,
                CreatedAt = DateTime.Now,
                IsResolved = false
            };

            offerRepository.AddOfferReport(report);

            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Problem przy tworzeniu zgłoszenia!"});
        }

        [Authorize(Roles = "Administrator")] 
        [HttpGet("report-offers")]
        public async Task<ActionResult> GetReports()
        {
            var reports = await offerRepository.GetReports();

            var selectedReports = reports.Select(r => new
            {
                r.Id,
                r.OfferId,
                r.Reason,
                r.CreatedAt
            }).ToList();

            return Ok(selectedReports);
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("remove-reported-offer/{reportId:int}/{offerId:int}")]
        public async Task<ActionResult> RemoveReportedOffer(int offerId, int reportId)
        {
            var offer = await offerRepository.GetFullOfferById(offerId);
            
            if(offer == null) return BadRequest(new { message = "Oferta nie została odnaleziona!" });

            offerRepository.DeleteOffer(offer);

            var report = await offerRepository.GetReportById(reportId);

            if(report == null) return BadRequest(new { message = "Zgłoszenie nie zostało odnalezione!" });

            report.IsResolved = true;

            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Nie udało się usunąć oferty!" });
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("end-report/{reportId:int}")]
        public async Task<ActionResult> EndReport(int reportId)
        {
            var report = await offerRepository.GetReportById(reportId);

            if(report == null) return BadRequest(new { message = "Zgłoszenie nie zostało odnalezione!" });

            report.IsResolved = true;

            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Nie udało się zakończyć zgłoszenia!" });
        }
    }
}
