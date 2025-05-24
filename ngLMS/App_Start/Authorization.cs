using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using BL;
using DTO;

namespace ngLMS
{
    public class Authorization:OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            UserBL obj = new UserBL();
            UserDTO user = obj.ValidateUser(context.UserName, context.Password);
            if (user != null)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, user.role.ToString()));
                identity.AddClaim(new Claim("ID", user.id.ToString()));
                identity.AddClaim(new Claim(ClaimTypes.Name, user.name.ToString()));
                context.Validated(identity);
            }
            else
            {
                context.SetError("Invalid userid and password");
                return;
            }
        }
    }
}