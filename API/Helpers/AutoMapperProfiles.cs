using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, MemberDto>()
            .ForMember(dest => dest.LikedOffers, 
                       opt => opt.MapFrom(src => src.LikedOffers.Select(like => like.OfferId)));
        CreateMap<Photo, PhotoDto>();
        CreateMap<Offer, OfferDto>()
            .ForMember(d => d.Seller, o => o.MapFrom(s => s.User.UserName))
            .ForMember(d => d.SellerRating, o => o.MapFrom(s => s.User.Rating))
            .ForMember(d => d.SellerImg, o => o.MapFrom(s => s.User.ProfilePhotoUrl))
            .ForMember(dest => dest.LikedByUsers, 
                       opt => opt.MapFrom(src => src.LikedByUsers.Select(like => like.UserId)));
        CreateMap<MemberUpdateDto, User>();
        CreateMap<Tag, TagDto>();
        CreateMap<Message, MessageDto>()
            .ForMember(d => d.SenderPhotoUrl, o => o.MapFrom(s => s.Sender.ProfilePhotoUrl))
            .ForMember(d => d.RecipientPhotoUrl, o => o.MapFrom(s => s.Recipient.ProfilePhotoUrl));
        CreateMap<Comment, CommentDto>()
            .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.UserName))
            .ForMember(dest => dest.AuthorPhoto, opt => opt.MapFrom(src => src.Author.ProfilePhotoUrl));
    }
}
