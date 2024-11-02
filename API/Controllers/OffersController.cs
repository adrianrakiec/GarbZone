using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OffersController(IOfferRepository offerRepository) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Offer>>> GetOffers()
        {
            var offers = await offerRepository.GetOffers();

            return Ok(offers);
        }
    }
}
