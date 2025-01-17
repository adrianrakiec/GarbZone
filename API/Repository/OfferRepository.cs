using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class OfferRepository(DataContext context, IMapper mapper) : IOfferRepository
{
    public async Task<Offer?> GetFullOfferById(int id)
    {
        return await context.Offers
            .Include(p => p.Images)
            .Include(u => u.User)
            .Include(t => t.Tags)
            .FirstOrDefaultAsync(x => x.Id == id);
    }
    
    public async Task<OfferDto?> GetOfferById(int id)
    {
        return await context.Offers
            .Where(x => x.Id == id)
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<OfferDto>> GetOffers()
    {
        return await context.Offers
            .Where(x => x.Status == "Active")
            .Include(t => t.Tags)
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<IEnumerable<OfferDto>> GetLastAddedOffers(int count)
    {
        return await context.Offers
            .Where(x => x.Status == "Active")
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider)
            .OrderByDescending(o => o.CreatedAt)
            .Take(count)
            .ToListAsync();
    }

    public async Task<IEnumerable<OfferDto>> GetBestOffers(int count)
    {
        return await context.Offers
            .Where(x => x.Status == "Active")
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider)
            .OrderByDescending(u => u.SellerRating)
            .ThenByDescending(u => u.ViewCount) 
            .Take(count)
            .ToListAsync();
    }

    public async Task<PagedList<OfferDto>> GetOffersByTerm(string term, UserParams userParams)
    {
        var query = context.Offers
            .Where(o => o.Title.ToLower().Contains(term.ToLower()))
            .Where(x => x.Status == "Active")
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider);

        return await PagedList<OfferDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
    }

    public async Task<Photo?> GetPhotoById(int id)
    {
        return await context.Photos.FindAsync(id);
    }

    public void DeletePhoto(Photo photo)
    {
        context.Photos.Remove(photo);
    }

    public async Task<PagedList<OfferDto>> GetLikedOffers(UserParams userParams, int userId)
    {
        var query = context.Offers
            .Where(x => x.Status == "Active" &&
                 context.Likes.Any(uol => uol.UserId == userId && uol.OfferId == x.Id))                
            .Include(t => t.Tags)                                  
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider); 

        return await PagedList<OfferDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
    }

    public void DeleteOffer(Offer offer)
    {
       context.Offers.Remove(offer);
    }

    public async Task<PagedList<OfferDto>> GetOffersByTag(string tagName, UserParams userParams)
    {
        var query = context.Offers
            .Where(x => x.Tags.Any(o => o.TagName == tagName))
            .Where(x => x.Status == "Active")
            .ProjectTo<OfferDto>(mapper.ConfigurationProvider);

        return await PagedList<OfferDto>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
    }

    public void AddOfferReport(Report report)
    {
        context.Reports.Add(report);
    }

    public async Task<IEnumerable<Report>> GetReports()
    {
        return await context.Reports
            .Where(r => !r.IsResolved)
            .OrderBy(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<Report?> GetReportById(int reportId)
    {
        return await context.Reports.FindAsync(reportId);
    }
}
