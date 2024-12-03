using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
    public DbSet<Offer> Offers { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<UserOfferLike> Likes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserOfferLike>()
            .HasKey(uo => new { uo.UserId, uo.OfferId }); 

        modelBuilder.Entity<UserOfferLike>()
            .HasOne(uo => uo.User)
            .WithMany(u => u.LikedOffers)
            .HasForeignKey(uo => uo.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<UserOfferLike>()
            .HasOne(uo => uo.Offer)
            .WithMany(o => o.LikedByUsers)
            .HasForeignKey(uo => uo.OfferId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
