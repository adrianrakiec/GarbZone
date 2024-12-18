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
    [Authorize]
    public class MessagesController(IMessageRepository messageRepository, IUserRepository userRepository, IMapper mapper) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();

            if(username == createMessageDto.RecipientUsername)
                return BadRequest(new { message = "Nie możesz wysłać wiadomości do siebie!" });

            var sender = await userRepository.GetUserByUsername(username);
            var recipient = await userRepository.GetUserByUsername(createMessageDto.RecipientUsername);

            if(sender == null || recipient == null)
                return BadRequest(new { message = "Nie można wysłać wiadomości!" });
            
            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };

            messageRepository.AddMessage(message);

            if(await messageRepository.SaveAll())
                return Ok(mapper.Map<MessageDto>(message));

            return BadRequest(new { message = "Problem z wysłaniem wiadomości!" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery]MessageParams messageParams)
        {
            messageParams.Username = User.GetUsername();

            var messages = await messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(messages);

            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await messageRepository.GetMessageThread(currentUsername, username));
        }
    }
}
