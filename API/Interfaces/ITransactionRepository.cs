using API.Entities;

namespace API.Interfaces;

public interface ITransactionRepository
{
    void AddTransaction(Transaction transaction);
    Task<Transaction?> GetTransaction(int userId, int offerId);
}
