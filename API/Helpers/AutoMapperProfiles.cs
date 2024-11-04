using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, MemberDto>();
        CreateMap<Photo, PhotoDto>();
        CreateMap<Offer, OfferDto>()
            .ForMember(d => d.Seller, o => o.MapFrom(s => s.User.UserName))
            .ForMember(d => d.SellerRaiting, o => o.MapFrom(s => s.User.Rating));
    }
}
