using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LikesController(ILikeRepository likeRepository, IUserRepository userRepository) : ControllerBase
    {
        [HttpPost("like/{offerId:int}")]
        public async Task<IActionResult> LikeOffer(int offerId)
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return Unauthorized();

            var existingLike = await likeRepository.GetLike(user.Id, offerId);

            if (existingLike != null)
                return BadRequest(new { message = "Już lubisz tę ofertę!"} );

            var like = new UserOfferLike
            {
                UserId = user.Id,
                OfferId = offerId,
            };

            likeRepository.AddLike(like);

            if(await userRepository.SaveAll()) return Ok();

            return BadRequest(new { message = "Błąd z polubieniem oferty!"} );
        }

        [HttpDelete("unlike/{offerId:int}")]
        public async Task<IActionResult> UnLikeOffer(int offerId)
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return Unauthorized();

            var existingLike = await likeRepository.GetLike(user.Id, offerId);

            if (existingLike == null)
                return BadRequest(new { message = "Oferta nie jest już polubiona!!"} );

            likeRepository.DeleteLike(existingLike);

            if(await userRepository.SaveAll()) return Ok();

            return BadRequest(new { message = "Błąd z usunięciem polubienia oferty!"} );
        }
    }
}
