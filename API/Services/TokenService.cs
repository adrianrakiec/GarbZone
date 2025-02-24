using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateToken(User user, Role role)
    {
        var tokenKey = config["TokenKey"] ?? throw new Exception("Nie można uzyskać dostępu do klucza tokenu");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        var claims = new List<Claim>
        {
            new (ClaimTypes.Name, user.UserName),
            new (ClaimTypes.NameIdentifier, user.Id.ToString()),
            new (ClaimTypes.Role, user.Role.Name)
        };

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
