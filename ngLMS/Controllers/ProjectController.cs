using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace ngLMS.Controllers
{
    [RoutePrefix("api/Project")]
    public class ProjectController : ApiController
    {
        private static readonly log4net.ILog log =
      log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public ProjectController()
        {

        }

        [HttpPost]
        [Route("UploadProjectFile")]
        [Authorize]
        public IHttpActionResult UploadProjectFile()
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var httpRequest = HttpContext.Current.Request;
                string FileName = "";
                if (httpRequest.Files.Count > 0)
                {
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                        FileName = Path.GetRandomFileName() + Path.GetExtension(postedFile.FileName);
                        var filePath = HttpContext.Current.Server.MapPath("~/ProjectFiles/" + FileName);
                        postedFile.SaveAs(filePath);
                    }
                }
                else
                {
                    return BadRequest("Unable to upload file. Please contact administrator");
                }
                return Ok(FileName);
            }
            catch (Exception ex)
            {
                log.Error("Project upload error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error: " + ex.Message);
            }
        }

        [HttpPost]
        [Route("InsertProject")]
        [Authorize]
        public IHttpActionResult InsertProject(Project obj)
        {
            try
            {
                if (obj.Project_ID == 0)
                {
                    ProjectBL objProj = new ProjectBL();
                    return Json(objProj.InsertProject(obj));
                }
                else
                {
                    return BadRequest("Invalid Project Details. Please contact administrator");
                }
            }
            catch (Exception ex)
            {
                log.Error("Project save error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error while saving record");
            }
        }

        [HttpPost]
        [Route("DeleteProject")]
        [Authorize(Roles = "1")]
        public IHttpActionResult DeleteProject(List<Project> obj)
        {
            try
            {
                if (obj.Count > 0)
                {
                    ProjectBL objProj = new ProjectBL();
                    int delResult = objProj.DeleteProject(obj);
                    if (delResult == 1)
                        return Json(obj);
                    else
                        return BadRequest("Error while deleting project");
                }
                else
                {
                    return BadRequest("Invalid Project Details.");
                }
            }
            catch (Exception ex)
            {
                log.Error("Project save error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error while deleting record");
            }
        }

        [HttpGet]
        [Route("GetAllProject")]
        [Authorize]
        public IHttpActionResult GetAllProject()
        {
            try
            {
                ProjectBL obj = new ProjectBL();
                return Json(obj.GetAllProject());
            }
            catch (Exception ex)
            {
                log.Error("Project Fetch error: " + ex.Message + Environment.NewLine + ex.StackTrace);
                return BadRequest("Error while processing request");
            }
        }
    }
}
