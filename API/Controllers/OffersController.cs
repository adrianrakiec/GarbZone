using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController(IOfferRepository offerRepository) : ControllerBase
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
    }
}
