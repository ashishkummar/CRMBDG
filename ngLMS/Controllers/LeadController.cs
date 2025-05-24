using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using BL;
using DTO;
using MigraDoc.Rendering;
using Newtonsoft.Json;
using PdfSharp.Drawing;
using PdfSharp.Pdf;

namespace ngLMS.Controllers
{
    [RoutePrefix("api/Lead")]
    public class LeadController : ApiController
    {
        private static readonly log4net.ILog log =
       log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        XGraphicsState sta;
        public LeadController()
        {
        }


        [HttpGet]
        [Route("GetLeadByDate")]
        [Authorize]
        public IHttpActionResult GetLeadByDate(DateTime from, DateTime to)
        {
            try
            {
                LeadBL obj = new LeadBL();
                if (User.IsInRole("1"))
                {
                    return Json(obj.getLeadsByDatateime(from, to));
                }
                           
                return Json(obj.getLeadsByDatateime(from, to, getUserID()));
            }
            catch (Exception ex)
            {
                log.Error("Lead bydate Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error while processing request");
            }
        }

        [HttpGet]
        [Route("GetLeadByCreatedDate")]
        [Authorize]
        public IHttpActionResult GetLeadByCreatedDate(DateTime from, DateTime to)
        {
            try
            {
                LeadBL obj = new LeadBL();
                if (User.IsInRole("1"))
                {
                    return Json(obj.getLeadsByCreatedDatateime(from, to));
                }

                return Json(obj.getLeadsByCreatedDatateime(from, to, getUserID()));
            }
            catch (Exception ex)
            {
                log.Error("Lead bydate Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error while processing request");
            }
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult GetLeadMsgByLeadID(int leadID)
        {
            try
            {
                LeadBL obj = new LeadBL();
                return Json(obj.getLeadsMsgByLeadID(leadID));
            }
            catch (Exception ex)
            {
                log.Error("Lead Msg Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult UpdateLead(LeadUpdate lead)
        {
            try
            {
                LeadBL obj = new LeadBL();
                Lead ret = obj.updateLead(lead, User.IsInRole("1") ? 1 : 2);
                if (ret != null)
                    return Json(ret);
                return StatusCode(System.Net.HttpStatusCode.InternalServerError);

            }
            catch (Exception ex)
            {
                log.Error("Lead Update Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IHttpActionResult DeleteAllMsg(Lead data)
        {
            try
            {
                LeadBL obj = new LeadBL();
                return Json(obj.deleteAllCommMsg(data.leadID));
            }
            catch (Exception ex)
            {
                log.Error("Lead Update Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult CreateLead(Lead data)
        {
            Lead retobj = new Lead();
            try
            {
                LeadBL obj = new LeadBL();
                if (data.leadID == 0)
                {
                    retobj = obj.InsertLead(data);
                    if (retobj != null)
                        return Json(retobj);
                    else
                        return BadRequest("Unable to save record");
                }
                else
                {
                    return BadRequest("Invalid lead data.");
                }
            }
            catch (Exception e)
            {
                log.Error("CreateLead: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IHttpActionResult UpdateLeadUser(List<Lead> data)
        {
            LeadWithError retobj = new LeadWithError();
            try
            {
                LeadBL obj = new LeadBL();

                if (data.Count > 0)
                {
                    retobj = obj.updateLeadUser(data, getUserID());
                    if (retobj != null)
                        return Json(retobj);
                    else
                        return BadRequest("Unable to save record");
                }
                else
                {
                    return BadRequest("Invalid lead data.");
                }
            }
            catch (Exception e)
            {
                log.Error("UpdateLead: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IHttpActionResult Deletelead(List<Lead> data)
        {
            int retobj = 0;
            try
            {
                LeadBL obj = new LeadBL();

                if (data.Count > 0)
                {
                    retobj = obj.DeleteLead(data);
                    if (retobj == 1 )
                        return Json(data);
                    else
                        return BadRequest("Error while deleting few record.Please refresh page and try again.");
                }
                else
                {
                    return BadRequest("Invalid lead data.");
                }
            }
            catch (Exception e)
            {
                log.Error("DeleteLead: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult GetReminderCount(int uid)
        {

            try
            {
                LeadBL obj = new LeadBL();
                if (User.IsInRole("1"))
                {
                    return Json(obj.getReminderCount(uid));
                }
                else
                {
                    return Json(obj.getReminderCount(getUserID()));
                }
                    
               
            }
            catch (Exception e)
            {
                log.Error("CountReminder: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult GetReminderForLoginUser(int uid)
        {
            try
            {
                LeadBL obj = new LeadBL();
                if (User.IsInRole("1"))
                {
                    return Json(obj.getTodayReminderForAUser(uid));
                }
                else
                {
                    return Json(obj.getTodayReminderForAUser(getUserID()));
                }
            }
            catch (Exception e)
            {
                log.Error("UserReminder: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize]
        public IHttpActionResult GetAllReminderForLoginUser(int uid)
        {
            try
            {
                LeadBL obj = new LeadBL();
                if (User.IsInRole("1"))
                {
                    return Json(obj.getReminderForAUser(uid));
                }
                else
                {
                    return Json(obj.getReminderForAUser(getUserID()));
                }
            }
            catch (Exception e)
            {
                log.Error("UserReminder: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = "1")]
        public IHttpActionResult GetLeadFromAcres(string userid, string password, DateTime from, DateTime to)
        {
            try
            {
                LeadFetch obj = new LeadFetch();
                return Json(obj.fetchFrom99Acer(userid, password, from, to));
            }
            catch (Exception e)
            {
                log.Error("LeadfetchAcres: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = "1")]
        public IHttpActionResult GetLeadFromMagic(int api, DateTime from, DateTime to)
        {
            try
            {

                LeadFetch obj = new LeadFetch();
                return Json(obj.fetchFromMagicBicks(api, from, to));
            }
            catch (Exception e)
            {
                log.Error("Leadfetchmagic: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = "1")]
        public IHttpActionResult GetLeadFromHousing(string from, string to)
        {
            try
            {

                LeadFetch obj = new LeadFetch();
                return Json(obj.fetchFromHousing(Convert.ToDateTime(from.Trim() + " 00:00:00"), Convert.ToDateTime(to.Trim() + " 23:59:00")));
            }
            catch (Exception e)
            {
                log.Error("Leadfetchhousing: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IHttpActionResult CreateAPILead(Lead data)
        {
            //data.LeadID = 1;
            //return Json(data);
            Lead retobj = new Lead();
            try
            {
                LeadBL obj = new LeadBL();
                if (data.leadID == 0)
                {
                    retobj = obj.InsertThroughAPI(data);
                    if (retobj != null)
                        return Json(retobj);
                    else
                        return BadRequest("Unable to save record");
                }
                else
                {
                    return BadRequest("Invalid lead data.");
                }
            }
            catch (Exception e)
            {
                log.Error("CreateLead: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "1")]
        public IHttpActionResult CreateCSVLead(Lead data)
        {
            //data.LeadID = 1;
            //return Json(data);
            Lead retobj = new Lead();
            try
            {
                LeadBL obj = new LeadBL();
                if (data.leadID == 0)
                {
                    retobj = obj.InsertThroughCSV(data);
                    if (retobj != null)
                        return Json(retobj);
                    else
                        return BadRequest("Unable to save record");
                }
                else
                {
                    return BadRequest("Invalid lead data.");
                }
            }
            catch (Exception e)
            {
                log.Error("CreateLead: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = "1")]
        public IHttpActionResult GetLastLeadFetch(string source)
        {
            DateTime? retobj = new DateTime();
            try
            {
                string src = "";
                switch(source)
                {
                    case "1":
                        src = "%Magicbriks%";
                        break;
                    case "2":
                        src = "%99Acres%";
                        break;
                    case "3":
                        src = "%housing.com%";
                        break;
                }
               
                LeadBL obj = new LeadBL();

                if (source != "")
                {
                    retobj = obj.GetLastLeadFetch(src);
                    if (retobj != null)
                        return Json(retobj);
                    else
                        return BadRequest("Unable to fetch Last Record");
                }
                else
                {
                    return BadRequest("Invalid source");
                }
            }
            catch (Exception e)
            {
                log.Error("CreateLead: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public IHttpActionResult DownloadAsPdf(Lead lead)
        {
            
            try
            {
                LeadBL obj = new LeadBL();
                List<LeadMsg> msg = obj.getLeadsMsgByLeadID(lead.leadID);
              
                MemoryStream stream = new MemoryStream();
                LM_PdfGenerator gen = new LM_PdfGenerator();
                PdfDocument red = gen.GeneratePDF(lead, msg);
                red.Save(stream);
                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(stream.GetBuffer())
                };
                result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                {
                    FileName = "test.pdf"
                };
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");

                var response = ResponseMessage(result);

                return response;
            }
            catch (Exception e)
            {
                log.Error("download PDF: " + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("GetArchiveLeadByDate")]
        [Authorize(Roles = "1")]
        public IHttpActionResult GetArchiveLeadByDate(DateTime from, DateTime to)
        {
            try
            {
                LeadBL obj = new LeadBL();
                return Json(obj.getArchiveLeadsByDatateime(from, to));
            }
            catch (Exception ex)
            {
                log.Error("Archive Lead bydate Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error while processing request");
            }
        }

        [HttpGet]
        [Route("GetArchiveLeadMsgByLeadID")]
        [Authorize]
        public IHttpActionResult GetArchiveLeadMsgByLeadID(int leadID)
        {
            try
            {
                LeadBL obj = new LeadBL();
                return Json(obj.getArchiveLeadsMsgByLeadID(leadID));
            }
            catch (Exception ex)
            {
                log.Error("Lead Msg Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("sendsms")]
        [Authorize(Roles = "1")]
        public IHttpActionResult sendsms(SendSms sms)
        {
            try
            {
                LeadBL obj = new LeadBL();
                return Json(obj.sendSms(sms));
            }
            catch (Exception ex)
            {
                log.Error("Lead sms Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("smsbalance")]
        [Authorize(Roles = "1")]
        public IHttpActionResult getSmsBalance()
        {
            try
            {
                LeadBL obj = new LeadBL();
                return Json(obj.getSmsBalance());
            }
            catch (Exception ex)
            {
                log.Error("sms balance Error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        private int getUserID()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            return Convert.ToInt32(claims.FirstOrDefault(d => d.Type == "ID").Value);
        }
               
    }
}