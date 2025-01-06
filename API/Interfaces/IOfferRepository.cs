using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IOfferRepository
{
    Task<Offer?> GetFullOfferById(int id);
    Task<IEnumerable<OfferDto>> GetOffers();
    Task<PagedList<OfferDto>> GetLikedOffers(UserParams userParams, int userId);
    Task<IEnumerable<OfferDto>> GetLastAddedOffers(int count);
    Task<IEnumerable<OfferDto>> GetBestOffers(int count);
    Task<OfferDto?> GetOfferById(int id);
    Task<PagedList<OfferDto>> GetOffersByTerm(string term, UserParams userParams);
    Task<PagedList<OfferDto>> GetOffersByTag(string tagName, UserParams userParams);
    Task<Photo?> GetPhotoById(int id);
    Task<IEnumerable<Report>> GetReports();
    Task<Report?> GetReportById(int reportId);
    void AddOfferReport(Report report);
    void DeleteOffer(Offer offer);
    void DeletePhoto(Photo photo);
}
