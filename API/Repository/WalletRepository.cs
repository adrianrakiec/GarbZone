using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class WalletRepository(DataContext context) : IWalletRepository
{
    public async Task<Wallet?> GetWalletByUserId(int userId)
    {
        return await context.Wallets
            .Where(x => x.UserId == userId)
            .SingleOrDefaultAsync();
    }
    
    public void AddAmount(int userId, decimal amount)
    {
        if(amount <= 0 ) throw new Exception("Nie można doładować ujemnej kwoty!");
        
        var wallet = context.Wallets.FirstOrDefault(x => x.UserId == userId) ?? throw new Exception("Nie znaleziono portfela!");

        wallet.Amount += amount;

        context.Wallets.Update(wallet);
        context.SaveChanges();
    }

    public void SubstrAmount(int userId, decimal amount)
    {
        if(amount <= 0 ) throw new Exception("Nie można odjąć ujemnej kwoty!");
        
        var wallet = context.Wallets.FirstOrDefault(x => x.UserId == userId) ?? throw new Exception("Nie znaleziono portfela!");

        if(wallet.Amount < amount) throw new Exception("Brak dostatecznych środków na koncie!");

        wallet.Amount -= amount;

        context.Wallets.Update(wallet);
        context.SaveChanges();
    }
}
