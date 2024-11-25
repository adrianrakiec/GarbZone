using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IOfferRepository
{
    Task<Offer?> GetFullOfferById(int id);
    Task<IEnumerable<OfferDto>> GetOffers();
    Task<OfferDto?> GetOfferById(int id);
    Task<IEnumerable<OfferDto>> GetOffersByTerm(string term);
    Task<Photo?> GetPhotoById(int id);
    void DeletePhoto(Photo photo);
}
