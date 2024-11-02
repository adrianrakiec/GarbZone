using System;
using API.Entities;

namespace API.Interfaces;

public interface IOfferRepository
{
    Task<IEnumerable<Offer>> GetOffers();
}
