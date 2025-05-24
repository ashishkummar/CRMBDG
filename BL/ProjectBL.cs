using DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ProjectBL
    {
        private Idb obj = (Idb)null;

        public ProjectBL()
        {
            if (ConfigurationManager.AppSettings["LiveDbType"] == "MySqlDB")
            {
                this.obj = (Idb)new MySQL();
            }
            else
            {
                this.obj = (Idb)new MSSQL();
            }
        }

        public List<Project> GetAllProject()
        {
            List<Project> retObj = new List<Project>();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetAllProject, null);
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    retObj.Add(this.ConvertProjectDto(row));
            }
            return retObj;
        }

        public Project InsertProject(Project lead)
        {
            DateTime dateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            string insertProject = this.obj.InsertProject;
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter1 = new SqlParameter("@Project_Name", SqlDbType.NVarChar);
            sqlParameter1.Value = (object)lead.Project_Name;
            sqlParameterList.Add(sqlParameter1);
            SqlParameter sqlParameter2 = new SqlParameter("@Project_DOE", SqlDbType.DateTime);
            sqlParameter2.Value = (object)dateTime;
            sqlParameterList.Add(sqlParameter2);
            SqlParameter sqlParameter3 = new SqlParameter("@Project_File", SqlDbType.NVarChar);
            sqlParameter3.Value = (object)lead.Project_File;
            sqlParameterList.Add(sqlParameter3);
            SqlParameter sqlParameter4 = new SqlParameter("@Project_Location", SqlDbType.NVarChar);
            sqlParameter4.Value = (object)lead.Project_Location;
            sqlParameterList.Add(sqlParameter4);
            SqlParameter sqlParameter5 = new SqlParameter("@Project_Type", SqlDbType.NVarChar);
            sqlParameter5.Value = (object)lead.Project_Type;
            sqlParameterList.Add(sqlParameter5);
            SqlParameter sqlParameter6 = new SqlParameter("@Project_Updated", SqlDbType.DateTime);
            sqlParameter6.Value = (object)dateTime;
            sqlParameterList.Add(sqlParameter6);
            SqlParameter sqlParameter7 = new SqlParameter("@Project_URL", SqlDbType.NVarChar);
            sqlParameter7.Value = (object)lead.Project_URL;
            sqlParameterList.Add(sqlParameter7);
            int LeadID = this.obj.executeScalerText(insertProject, sqlParameterList);
            if (LeadID > 0)
            {
                lead.Project_ID = LeadID;
            }
            return lead;
        }

        public int DeleteProject(List<Project> lead)
        {
            foreach (Project lead1 in lead)
            {
                this.obj.executeNonQueryText(this.obj.DeleteProject, new List<SqlParameter>(){
                  new SqlParameter("@Project_id", (object) lead1.Project_ID)
                });
            }

            return 1;
        }

        private Project ConvertProjectDto(DataRow dr)
        {

            Project lead = new Project();
            try
            {
                lead.Project_ID = Convert.ToInt32(dr["Project_ID"]);
                lead.Project_Name = Convert.ToString(dr["Project_Name"]);
                lead.Project_File = Convert.ToString(dr["Project_File"]); ;
                lead.Project_Location = Convert.ToString(dr["Project_Location"]);
                lead.Project_Type = Convert.ToString(dr["Project_Type"]);
                lead.Project_URL = Convert.ToString(dr["Project_URL"]);
                lead.Project_DOE = Convert.ToDateTime(dr["Project_DOE"]);
                lead.Project_Updated = Convert.ToDateTime(dr["Project_Updated"]);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return lead;
        }
    }
}
