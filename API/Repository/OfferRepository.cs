using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class OfferRepository(DataContext context) : IOfferRepository
{
    public async Task<IEnumerable<Offer>> GetOffers()
    {
        return await context.Offers.ToListAsync();
    }
}
