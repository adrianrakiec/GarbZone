using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class OfferRepository(DataContext context, IMapper mapper) : IOfferRepository
{
    public async Task<OfferDto?> GetOfferById(int id)
    {
        // return await context.Offers
        //     .Include(x => x.Images)
        //     .FirstOrDefaultAsync(x => x.Id == id);
        return await context.Offers
            .Where(x => x.Id == id)
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<OfferDto>> GetOffers()
    {
        // return await context.Offers
        // .Include(x => x.Images)
        // .ToListAsync();
        return await context.Offers
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }
}
