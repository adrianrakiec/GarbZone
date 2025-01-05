using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddAuthentication(x => 
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
            .AddCookie(x => 
            {
                x.Cookie.Name = "token";
            })
            .AddJwtBearer(opt => 
                {
                    var tokenKey = config["TokenKey"] ?? throw new Exception("Brak TokenKey");
                    opt.SaveToken = true;
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context => 
                        {
                            context.Token = context.Request.Cookies["token"];
                            return Task.CompletedTask;
                        }
                    };
                });

        services.AddAuthorization();

        return services;
    }
}
