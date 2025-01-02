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
    public class TransactionController(IUserRepository userRepository, IOfferRepository offerRepository, ITransactionRepository transactionRepository, IMessageRepository messageRepository) : ControllerBase
    {
        [HttpPost("create-transaction/{offerId:int}")]
        public async Task<ActionResult> CreateTransaction(int offerId)
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return Unauthorized();
            
            var offer = await offerRepository.GetFullOfferById(offerId);

            if(offer == null) return BadRequest(new { message = "Nie znaleziono oferty!"});

            if(user.Wallet?.Amount < offer.Price) return BadRequest(new { message = "Niewystarczające środki na koncie!"});

            var transaction = new Transaction
            {
                Amount = offer.Price,
                CreatedAt = DateTime.Now,
                Seller = offer.User,
                SellerId = offer.UserId,
                Buyer = user,
                BuyerId = user.Id,
                Offer = offer,
                OfferId = offer.Id
            };

            var message = new Message
            {
                Sender = user,
                Recipient = offer.User,
                SenderUsername = user.UserName,
                RecipientUsername = offer.User.UserName,
                Content = $"Użytkownik {user.UserName} chce kupić od Ciebie przedmiot: {offer.Title}.",
                OfferId = offer.Id
            };

            messageRepository.AddMessage(message);

            transactionRepository.AddTransaction(transaction);

            if(await userRepository.SaveAll()) return Ok();

            return BadRequest(new { message = "Problem przy tworzeniu transakcji!"});
        }
    }
}
