using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class LikeRepository(DataContext context) : ILikeRepository
{
    public void AddLike(UserOfferLike userOfferLike)
    {
        context.Likes.Add(userOfferLike);
    }

    public void DeleteLike(UserOfferLike userOfferLike)
    {
        context.Likes.Remove(userOfferLike);
    }

    public async Task<UserOfferLike?> GetLike(int userId, int offerId)
    {
        return await context.Likes
            .SingleOrDefaultAsync(x => x.OfferId == offerId && x.UserId == userId);
    }
}
