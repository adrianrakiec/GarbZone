using Stripe;

namespace API.Interfaces;

public interface IStripeService
{
    Task<PaymentIntent> CreatePaymentIntentAsync(decimal amount, string currency = "pln");
}
