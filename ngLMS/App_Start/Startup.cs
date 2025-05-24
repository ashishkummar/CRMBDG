using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ngLMS
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            if(Convert.ToBoolean(ConfigurationManager.AppSettings["EnableApiCORS"].ToString()))
                app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);

            var auth = new Authorization();

            OAuthAuthorizationServerOptions option = new OAuthAuthorizationServerOptions {
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(8),
                Provider = auth
            };

            app.UseOAuthAuthorizationServer(option);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());

            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
        }
    }
}