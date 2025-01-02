using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Repository;

public class TransactionRepository(DataContext context) : ITransactionRepository
{
    public void AddTransaction(Transaction transaction)
    {
        context.Transactions.Add(transaction);
    }

    public async Task<Transaction?> GetTransaction(int userId, int offerId)
    {
        return await context.Transactions
            .FirstOrDefaultAsync(t => t.SellerId == userId && t.OfferId == offerId && t.Status == "Pending");
    }
}
