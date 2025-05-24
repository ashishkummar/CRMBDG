using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL;
using DTO;
using Newtonsoft.Json;
using System.Web.Http;
using System.Runtime.Caching;

namespace ngLMS.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private static readonly log4net.ILog log =
        log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public UserController()
        {
        }

        [Route("AuthUser")]
        [HttpPost]
        [Authorize]
        public IHttpActionResult AuthUser([FromBody]string User)
        {
            UserBL Blobj = new UserBL();
            UserDTO uto = null;
            try
            {
                string auth = Request.Headers.GetValues("authentication").First();
                if (auth != null)
                {
                    byte[] data = Convert.FromBase64String(auth);
                    string decodedString = Encoding.UTF8.GetString(data);
                    uto = JsonConvert.DeserializeObject<UserDTO>(decodedString);
                    uto = Blobj.ValidateUser(uto.userID, uto.password);
                    if (uto == null)
                    {
                        return Unauthorized();
                    }
                    else
                    {
                        //_userContextServices.SetUserContext(uto);

                    }
                }
                return Json(uto);
            }
            catch (Exception ex)
            {
                log.Error("Auth User" + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [Route("GetAllUser")]
        [HttpGet]
        [Authorize(Roles = "1")]
        public IHttpActionResult GetAllUser()
        {
            try
            {
                UserBL obj = new UserBL();
                return Json(obj.getAllAppUser());
            }
            catch (Exception ex)
            {
                log.Error("Auth User" + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [Route("GetUserbyID")]
        [HttpGet]
        [Authorize]
        public IHttpActionResult GetUserbyID([FromUri]string userID)
        {
            try
            {
                UserBL obj = new UserBL();
                return Json(obj.GetUserByID(userID));
            }
            catch (Exception ex)
            {
                log.Error("Auth User" + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [Route("GetUserDtlbyID")]
        [HttpGet]
        [Authorize]
        public IHttpActionResult GetUserDtlbyID([FromUri]string userID)
        {
            try
            {
                UserBL obj = new UserBL();
                return Json(obj.GetUserDetailByUserID(userID));
            }
            catch (Exception ex)
            {
                log.Error("Auth User" + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest(ex.Message);
            }
        }

        [Route("InsertUpdateUser")]
        [HttpPost]
        [Authorize(Roles = "1")]
        public IHttpActionResult InsertUpdateUser([FromBody]UserDTO data)
        {
            UserBL obj = new UserBL();
            try
            {

                if (data.userID == "")
                {
                    return BadRequest("UserID is Mandatory.");
                }
                if (data.password == "")
                {
                    return BadRequest("Password is mandatory.");
                }
                if (data.name == "")
                {
                    return BadRequest("User Name is mandatory.");
                }
               
                if (data.id == 0)
                {
                    if (obj.InsertUser(data) > 0)
                    {
                        return Json(obj.getAllAppUser());
                    }
                }
                else
                {
                    if (obj.UpdateUser(data) > 0)
                    {
                        return Json(obj.getAllAppUser());
                    }
                }
                return BadRequest("Error while inserting or updating record.");
            }
            catch(Exception e)
            {
                log.Error("Auth User" + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteUser")]
        [HttpPost]
        [Authorize(Roles = "1")]
        public IHttpActionResult DeleteUser([FromBody]UserDTO data)
        {
            UserBL obj = new UserBL();
            try
            {
                if (data.id > 0)
                {
                    return Json(obj.DeleteUser(data));
                }
                else
                {
                    return BadRequest("Invalid user");
                }
            }
            catch (Exception e)
            {
                log.Error("Auth User" + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }


        [Route("resetpass")]
        [HttpPost]
        [Authorize]
        public IHttpActionResult resetpass([FromBody]PassReset data)
        {
            UserBL obj = new UserBL();
            try
            {
                if (data.id > 0)
                {
                    UserDTO usr = obj.GetUserByID(data.id.ToString());
                    if(usr.password == data.oldpass)
                    {
                        return Json(obj.changePassword(data));
                    }
                    else
                    {
                        return BadRequest("Invalid current password");
                    }
                }
                else
                {
                    return BadRequest("Invalid user");
                }
            }
            catch (Exception e)
            {
                log.Error("Auth User" + e.Message + Environment.NewLine + e.StackTrace);
                return BadRequest(e.Message);
            }
        }




    }
}