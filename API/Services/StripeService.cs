using API.Helpers;
using API.Interfaces;
using Microsoft.Extensions.Options;
using Stripe;

namespace API.Services;

public class StripeService : IStripeService
{
    public StripeService(IOptions<StripeSettings> config)
    {
        StripeConfiguration.ApiKey = config.Value.SecretKey;
    }

    public async Task<PaymentIntent> CreatePaymentIntentAsync(decimal amount, string currency = "pln")
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(amount * 100), 
            Currency = currency,
            PaymentMethodTypes = ["card"],
        };

        var service = new PaymentIntentService();
        return await service.CreateAsync(options);
    }
}
