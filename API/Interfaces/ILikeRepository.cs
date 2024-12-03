using API.Entities;

namespace API.Interfaces;

public interface ILikeRepository
{
    void AddLike(UserOfferLike userOfferLike);
    void DeleteLike(UserOfferLike userOfferLike);
    Task<UserOfferLike?> GetLike(int userId, int offerId);
}
