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
    public DbSet<Message> Messages { get; set; }
    public DbSet<Wallet> Wallets { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Comment> Comments { get; set; }

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

        modelBuilder.Entity<Message>()
            .HasOne(x => x.Recipient)
            .WithMany(x => x.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Message>()
            .HasOne(x => x.Sender)
            .WithMany(x => x.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Comment>()
            .HasOne(x => x.Author) 
            .WithMany() 
            .HasForeignKey(x => x.AuthorId) 
            .OnDelete(DeleteBehavior.Restrict); 

        modelBuilder.Entity<Comment>()
            .HasOne(x => x.User)
            .WithMany(x => x.Comments) 
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Restrict); 
    }
}
