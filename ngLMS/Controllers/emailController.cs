using BL;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ngLMS.Controllers
{
    [RoutePrefix("api/email")]
    public class EmailController : ApiController
    {
        private static readonly log4net.ILog log =
      log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public EmailController()
        {
        }

        [HttpGet]
        [Route("GetEmailId")]
        [Authorize]
        public IHttpActionResult GetEmailId()
        {
            try
            {
                EmailBL obj = new EmailBL();
                return Json(obj.getEmailID());
            }
            catch (Exception ex)
            {
                log.Error("Email ID Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error while processing request");
            }
        }




    }
}
