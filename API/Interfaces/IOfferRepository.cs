using API.DTOs;

namespace API.Interfaces;

public interface IOfferRepository
{
    Task<IEnumerable<OfferDto>> GetOffers();
    Task<OfferDto?> GetOfferById(int id);
}