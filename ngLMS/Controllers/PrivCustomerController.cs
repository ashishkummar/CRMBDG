using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ngLMS.Controllers
{
    [RoutePrefix("api/PriCust")]
    public class PrivCustomerController : ApiController
    {
        private static readonly log4net.ILog log =
      log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public PrivCustomerController()
        {
        }

        [HttpGet]
        [Route("GetAllRecord")]
        [Authorize(Roles = "1")]
        public IHttpActionResult GetAllRecord()
        {
            try
            {
                PrivCustomer obj = new PrivCustomer();
                return Json(obj.getAllRecord());
            }
            catch (Exception ex)
            {
                log.Error("PrivCustomer getAll Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error while processing request");
            }
        }

        [HttpPost]
        [Route("InsUpdtRecord")]
        [Authorize(Roles = "1")]
        public IHttpActionResult InsUpdtRecord(PriCustomer data)
        {
            try
            {
                PrivCustomer obj = new PrivCustomer();
                return Json(obj.InsertUpdatePrivCustomer(data));
            }
            catch (Exception ex)
            {
                log.Error("Lead Update Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("DeleteRecord")]
        [Authorize(Roles = "1")]
        public IHttpActionResult DeleteRecord(PriCustomer data)
        {
            try
            {
                PrivCustomer obj = new PrivCustomer();
                return Json(obj.DeletePrivCustomer(data));
            }
            catch (Exception ex)
            {
                log.Error("Lead Update Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }
    }
}
