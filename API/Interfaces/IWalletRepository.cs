using API.Entities;

namespace API.Interfaces;

public interface IWalletRepository
{
    Task<Wallet?> GetWalletByUserId(int userId);
    void AddAmount(int userId, decimal amount);
    void SubstrAmount(int userId, decimal amount);
}
