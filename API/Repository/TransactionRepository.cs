using API.Data;
using API.Entities;
using API.Interfaces;

namespace API.Repository;

public class TransactionRepository(DataContext context) : ITransactionRepository
{
    public void AddTransaction(Transaction transaction)
    {
        context.Transactions.Add(transaction);
    }
}
