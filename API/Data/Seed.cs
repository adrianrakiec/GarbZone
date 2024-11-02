using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUser(DataContext context)
    {
        if(await context.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var users = JsonSerializer.Deserialize<List<User>>(userData);
        if(users == null) return;

        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("haslo"));
            user.PasswordSalt = hmac.Key;

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }

    public static async Task SeedOffers(DataContext context)
    {
        if(await context.Offers.AnyAsync()) return;

        var offersData = await File.ReadAllTextAsync("Data/OfferSeedData.json");
        var offers = JsonSerializer.Deserialize<List<Offer>>(offersData);
        if(offers == null) return;

        foreach (var offer in offers)
        {
            context.Offers.Add(offer);
        }

        await context.SaveChangesAsync();
    }
}
