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

            user.Wallet!.Amount -= offer.Price;

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

            offer.Status = "Inactive";

            messageRepository.AddMessage(message);

            transactionRepository.AddTransaction(transaction);

            if(await userRepository.SaveAll()) return Ok();

            return BadRequest(new { message = "Problem przy tworzeniu transakcji!"});
        }

        [HttpPut("cancel-transaction/{offerId:int}")]
        public async Task<ActionResult> CancelTransation(int offerId)
        {
            var user = await userRepository.GetUserByUsername(User.GetUsername());

            if(user == null) return Unauthorized();
            
            var transaction = await transactionRepository.GetTransaction(user.Id, offerId);

            if(transaction == null) return BadRequest(new { message = "Nie znaleziono transakcji!"});

            var buyer = await userRepository.GetUserById(transaction.BuyerId);

            if(buyer == null) return BadRequest(new { message = "Nie znaleziono użytkownika!"});

            buyer.Wallet!.Amount += transaction.Amount; 

            transaction.CompletedAt = DateTime.Now;
            transaction.Status = "Canceled";

            var offer = await offerRepository.GetFullOfferById(transaction.OfferId);

            if(offer == null) return BadRequest(new { message = "Nie znaleziono oferty!"});

            offer.Status = "Active";

            var message = await messageRepository.GetMessageByTransaction(transaction.SellerId, transaction.BuyerId, offerId);

            if(message == null) return BadRequest(new { message = "Nie znaleziono wiadomości!"});

            message.OfferId = null;
            message.Content += "\nTransakcja została anulowana";
            
            if(await userRepository.SaveAll()) return NoContent();

            return BadRequest(new { message = "Problem przy anulowaniu!"});
        }
    }
}
