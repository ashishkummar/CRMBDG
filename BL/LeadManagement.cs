using DAO;
using DTO;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;

namespace BL
{
    public class LeadBL
    {
        private Idb obj = (Idb)new MSSQL();

        public LeadBL()
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

        public LeadCount getLeadsByDatateime(DateTime from, DateTime to)
        {
            LeadCount leadCount = new LeadCount();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetLeadsByData, new List<SqlParameter>()
      {
        new SqlParameter("@from", (object) from),
        new SqlParameter("@to", (object) to)
      });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                leadCount.Lead = new List<Lead>();
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadCount.Lead.Add(this.ConvertLeadDTO(row));
                //leadCount.LeadCounts = this.retriveCount(leadCount.Lead);
            }
            return leadCount;
        }

        public LeadCount getLeadsByDatateime(DateTime from, DateTime to, int userID)
        {
            LeadCount leadCount = new LeadCount();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetLeadByDateAndUser, new List<SqlParameter>()
      {
        new SqlParameter("@from", (object) from),
        new SqlParameter("@to", (object) to),
        new SqlParameter("@UID", (object) userID)
      });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                leadCount.Lead = new List<Lead>();
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadCount.Lead.Add(this.ConvertLeadDTO(row));
                //leadCount.LeadCounts = this.retriveCount(leadCount.Lead);
            }
            return leadCount;
        }

        public LeadCount getLeadsByCreatedDatateime(DateTime from, DateTime to)
        {
            LeadCount leadCount = new LeadCount();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetLeadsByCreatedData, new List<SqlParameter>()
      {
        new SqlParameter("@from", (object) from),
        new SqlParameter("@to", (object) to)
      });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                leadCount.Lead = new List<Lead>();
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadCount.Lead.Add(this.ConvertLeadDTO(row));
                //leadCount.LeadCounts = this.retriveCount(leadCount.Lead);
            }
            return leadCount;
        }

        public LeadCount getLeadsByCreatedDatateime(DateTime from, DateTime to, int userID)
        {
            LeadCount leadCount = new LeadCount();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetLeadByCreatedDateAndUser, new List<SqlParameter>()
      {
        new SqlParameter("@from", (object) from),
        new SqlParameter("@to", (object) to),
        new SqlParameter("@UID", (object) userID)
      });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                leadCount.Lead = new List<Lead>();
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadCount.Lead.Add(this.ConvertLeadDTO(row));
                //leadCount.LeadCounts = this.retriveCount(leadCount.Lead);
            }
            return leadCount;
        }

        private List<int> retriveCount(List<Lead> ld)
        {
            List<int> intList = new List<int>();
            if (ld.Count > 0)
            {
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "New")).Count<Lead>());
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "Answered")).Count<Lead>());
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "Scheduled")).Count<Lead>());
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "Deactivated")).Count<Lead>());
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "Closed")).Count<Lead>());
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "Visited")).Count<Lead>());
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "Broker")).Count<Lead>());
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "Rent")).Count<Lead>());
                intList.Add(ld.Where<Lead>((Func<Lead, bool>)(d => d.status.value == "Hot")).Count<Lead>());
            }
            else
            {
                for (int index = 0; index < 9; ++index)
                    intList.Add(0);
            }
            return intList;
        }

        public int getReminderCount(int uid)
        {
            string getReminderCount = this.obj.GetReminderCount;
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            SqlParameter sqlParameter = new SqlParameter("@UID", SqlDbType.Int);
            sqlParameter.Value = (object)uid;
            sqlParameterList.Add(sqlParameter);
            return this.obj.executeScalerText(getReminderCount, sqlParameterList);
        }

        public List<Lead> getReminderForAUser(int uid)
        {
            List<Lead> leadList = new List<Lead>();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetRemindersForaUser, new List<SqlParameter>()
      {
        new SqlParameter("@UID", (object) uid)
      });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadList.Add(this.ConvertLeadDTO(row));
            }
            return leadList;
        }

        public List<Lead> getTodayReminderForAUser(int uid)
        {
            List<Lead> leadList = new List<Lead>();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetTodayReminderForaUser, new List<SqlParameter>()
      {
        new SqlParameter("@UID", (object) uid)
      });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadList.Add(this.ConvertLeadDTO(row));
            }
            return leadList;
        }

        public List<LeadMsg> getLeadsMsgByLeadID(int leadid)
        {
            List<LeadMsg> leadMsgList = new List<LeadMsg>();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetLeadMessageByLeadID, new List<SqlParameter>()
            {
            new SqlParameter("@LeadID", (object) leadid)
            });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadMsgList.Add(this.ConvertLeadMsgDTO(row));
            }
            return leadMsgList;
        }

        public Lead updateLead(LeadUpdate lead, int userRole)
        {
            DateTime dateTime = TimeZoneInfo.ConvertTimeFromUtc(lead.ReminderOn ?? DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            DateTime Currentdt = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            if (lead == null)
                return (Lead)null;
            int num;
            if (userRole == 1)
            {
                //DataSet ds = this.obj.RunSp(this.obj.CheckAssignLead, new List<SqlParameter>(){
                //  new SqlParameter("@LeadID", (object) lead.LeadID)
                //});

                //if (ds.Tables.Count > 0)
                //{
                //    if (ds.Tables[0].Rows.Count > 0)
                //    {
                //        throw new Exception("An enquiry with same mobileno of leadid " + Convert.ToString(lead.LeadID) + " is Assigned to " + Convert.ToString(ds.Tables[0].Rows[0][1]) + " on " + String.Format("{0:dd/MM/yyyy}", ds.Tables[0].Rows[0][0]));
                //    }
                //}
                num = this.obj.executeNonQueryText(this.obj.UpdateLeadByAdmin, new List<SqlParameter>()
                {
                  new SqlParameter("@LeadID", (object) lead.LeadID),
                  new SqlParameter("@LM_Status", (object) lead.Status),
                  new SqlParameter("@UID", (object) lead.PostedBy),
                  new SqlParameter("@AgentID", (object) lead.AssignID),
                  new SqlParameter("@reminderDt", (object) dateTime),
                  new SqlParameter("@LM_UpdatedOn", (object) Currentdt)
                });
            }
            else
            {
                num = this.obj.executeNonQueryText(this.obj.UpdateLeadByUser, new List<SqlParameter>()
                {
                  new SqlParameter("@LeadID", (object) lead.LeadID),
                  new SqlParameter("@LM_Status", (object) lead.Status),
                  new SqlParameter("@UID", (object) lead.PostedBy),
                  new SqlParameter("@reminderDt", (object) dateTime)
                });
            }
            if (lead.Message != string.Empty && lead.Message != "" && num > 0)
                this.obj.executeNonQueryText(this.obj.InsertCommunication, new List<SqlParameter>()
                {
                  new SqlParameter("@LeadID", (object) lead.LeadID),
                  new SqlParameter("@Com_Message", (object) lead.Message),
                  new SqlParameter("@UID", (object) lead.PostedBy),
                  new SqlParameter("@Last_Com_Dt", (object) Currentdt)
                });
            return this.GetLeadDetailByID(lead.LeadID);
        }

        public Lead deleteAllCommMsg(int LeadID)
        {
            this.obj.executeNonQueryText(this.obj.DeleteAllCommunication, new List<SqlParameter>()
      {
        new SqlParameter("@LeadID", (object) LeadID)
      });
            return this.GetLeadDetailByID(LeadID);
        }

        public Lead GetLeadDetailByID(int LeadID)
        {
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.GetLeadsByID, new List<SqlParameter>()
      {
        new SqlParameter("@LeadID", (object) LeadID)
      });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                IEnumerator enumerator = dataSetFromQuery.Tables[0].Rows.GetEnumerator();
                try
                {
                    if (enumerator.MoveNext())
                        return this.ConvertLeadDTO((DataRow)enumerator.Current);
                }
                finally
                {
                    (enumerator as IDisposable)?.Dispose();
                }
            }
            return (Lead)null;
        }

        public List<Lead> GetLeadDetailByID(int[] LeadID)
        {
            List<Lead> leadList = new List<Lead>();
            string getBulkLeadById = this.obj.GetBulkLeadByID;
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            StringBuilder stringBuilder = new StringBuilder();
            int num1 = 1;
            foreach (int num2 in LeadID)
            {
                stringBuilder.Append("@LeadID" + num1.ToString() + ",");
                sqlParameterList.Add(new SqlParameter("@LeadID" + num1.ToString(), (object)num2));
                ++num1;
            }
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(string.Format(getBulkLeadById, (object)stringBuilder.ToString().Remove(stringBuilder.Length - 1)), sqlParameterList);
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadList.Add(this.ConvertLeadDTO(row));
            }
            return leadList;
        }

        public Lead InsertLead(Lead lead)
        {
            if (lead != null)
            {
                DateTime dateTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                string insertLead = this.obj.InsertLead;
                List<SqlParameter> sqlParameterList = new List<SqlParameter>();
                SqlParameter sqlParameter1 = new SqlParameter("@Lead_Source", SqlDbType.NVarChar);
                sqlParameter1.Value = (object)lead.leadSource;
                sqlParameterList.Add(sqlParameter1);
                SqlParameter sqlParameter2 = new SqlParameter("@LM_Name", SqlDbType.NVarChar);
                sqlParameter2.Value = (object)lead.leadName;
                sqlParameterList.Add(sqlParameter2);
                SqlParameter sqlParameter3 = new SqlParameter("@LM_ContactNo", SqlDbType.NVarChar);
                sqlParameter3.Value = (object)lead.leadContact;
                sqlParameterList.Add(sqlParameter3);
                SqlParameter sqlParameter4 = new SqlParameter("@LM_Email", SqlDbType.NVarChar);
                sqlParameter4.Value = (object)lead.leadEmail;
                sqlParameterList.Add(sqlParameter4);
                SqlParameter sqlParameter5 = new SqlParameter("@LM_Type", SqlDbType.NVarChar);
                sqlParameter5.Value = (object)lead.leadType;
                sqlParameterList.Add(sqlParameter5);
                SqlParameter sqlParameter6 = new SqlParameter("@LM_Query", SqlDbType.NVarChar);
                sqlParameter6.Value = (object)lead.leadQuery;
                sqlParameterList.Add(sqlParameter6);
                SqlParameter sqlParameter7 = new SqlParameter("@DOE", SqlDbType.DateTime);
                sqlParameter7.Value = (object)dateTime;
                sqlParameterList.Add(sqlParameter7);
                SqlParameter sqlParameter8 = new SqlParameter("@UID", SqlDbType.Int);
                sqlParameter8.Value = (object)lead.uid;
                sqlParameterList.Add(sqlParameter8);
                int LeadID = this.obj.executeScalerText(insertLead, sqlParameterList);
                if (LeadID > 0)
                    return this.GetLeadDetailByID(LeadID);
            }
            return (Lead)null;
        }

        public LeadWithError updateLeadUser(List<Lead> lead, int userID)
        {
            int num1 = 0;
            List<Lead> retLead = new List<Lead>();
            LeadWithError retobj = new LeadWithError();

            StringBuilder sbMsg = new StringBuilder();
            TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            if (lead == null)
                return (LeadWithError)null;
            string updateLeadUser = this.obj.UpdateLeadUser;
            List<SqlParameter> sqlParameterList = new List<SqlParameter>();
            sqlParameterList.Add(new SqlParameter("@UID", (object)lead[0].uid));
            sqlParameterList.Add(new SqlParameter("@AgentID", (object)userID));
            sqlParameterList.Add(new SqlParameter("@LM_UpdatedOn", (object)TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"))));
            StringBuilder stringBuilder = new StringBuilder();
            int num2 = 1;
            foreach (Lead lead1 in lead)
            {

                DataSet ds = this.obj.RunSp(this.obj.CheckAssignLead, new List<SqlParameter>(){
                  new SqlParameter("@LeadID", (object) lead1.leadID)
                });

                if (ds.Tables.Count > 0)
                {
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        //throw new Exception("An enquiry with same mobileno of LEAD ID: " + Convert.ToString(lead1.leadID) + " is Assigned to " + Convert.ToString(ds.Tables[0].Rows[0][1]) + " on " + String.Format("{0:dd/MM/yyyy}", ds.Tables[0].Rows[0][0]));
                        sbMsg.AppendLine("An enquiry with same mobileno of LEAD ID: " + Convert.ToString(lead1.leadID) + " is Assigned to " + Convert.ToString(ds.Tables[0].Rows[0][1]) + " on " + String.Format("{0:dd/MM/yyyy}", ds.Tables[0].Rows[0][0]) + "<br/>");
                        continue;
                    }
                }
                if (retLead.Exists(x => x.leadContact == lead1.leadContact))
                {
                    sbMsg.AppendLine("An enquiry with same mobileno of LEAD ID: " + Convert.ToString(lead1.leadID) + " is duplicate in selected record.<br/>");
                }
                else
                {
                    retLead.Add(lead1);
                    stringBuilder.Append("@LeadID" + num2.ToString() + ",");
                    sqlParameterList.Add(new SqlParameter("@LeadID" + num2.ToString(), (object)lead1.leadID));
                    ++num2;
                }
            }
            if (stringBuilder.Length > 0)
                num1 = this.obj.executeNonQueryText(string.Format(updateLeadUser, (object)stringBuilder.ToString().Remove(stringBuilder.Length - 1)), sqlParameterList);
            retobj.Lead = new List<Lead>();
            if (retLead.Count > 0)
                retobj.Lead.AddRange(this.GetLeadDetailByID(retLead.Select<Lead, int>((Func<Lead, int>)(l => l.leadID)).ToArray<int>()));
            if (sbMsg.ToString().Length > 0)
            {
                retobj.Msg = sbMsg.ToString();
            }
            return retobj;
        }

        public Lead InsertThroughAPI(Lead lead)
        {
            if (lead != null)
            {
                string insertThroughApi = this.obj.InsertThroughAPI;
                List<SqlParameter> sqlParameterList = new List<SqlParameter>();
                SqlParameter sqlParameter1 = new SqlParameter("@Lead_Source", SqlDbType.NVarChar);
                sqlParameter1.Value = (object)lead.leadSource;
                sqlParameterList.Add(sqlParameter1);
                SqlParameter sqlParameter2 = new SqlParameter("@LM_Name", SqlDbType.NVarChar);
                sqlParameter2.Value = (object)lead.leadName;
                sqlParameterList.Add(sqlParameter2);
                SqlParameter sqlParameter3 = new SqlParameter("@LM_ContactNo", SqlDbType.NVarChar);
                sqlParameter3.Value = (object)lead.leadContact;
                sqlParameterList.Add(sqlParameter3);
                SqlParameter sqlParameter4 = new SqlParameter("@LM_Email", SqlDbType.NVarChar);
                sqlParameter4.Value = (object)lead.leadEmail;
                sqlParameterList.Add(sqlParameter4);
                SqlParameter sqlParameter5 = new SqlParameter("@LM_Type", SqlDbType.NVarChar);
                sqlParameter5.Value = (object)lead.leadType;
                sqlParameterList.Add(sqlParameter5);
                SqlParameter sqlParameter6 = new SqlParameter("@LM_Query", SqlDbType.NVarChar);
                sqlParameter6.Value = (object)lead.leadQuery;
                sqlParameterList.Add(sqlParameter6);
                SqlParameter sqlParameter7 = new SqlParameter("@DOE", SqlDbType.DateTime);
                sqlParameter7.Value = (object)lead.leadEntryDate;
                sqlParameterList.Add(sqlParameter7);
                SqlParameter sqlParameter8 = new SqlParameter("@SrcID", SqlDbType.NVarChar);
                sqlParameter8.Value = (object)lead.uniqueID;
                sqlParameterList.Add(sqlParameter8);
                int LeadID = this.obj.executeScalerText(insertThroughApi, sqlParameterList);
                if (LeadID > 0)
                    return this.GetLeadDetailByID(LeadID);
            }
            return (Lead)null;
        }

        public Lead InsertThroughCSV(Lead lead)
        {
            if (lead != null)
            {
                string insertThroughApi = this.obj.InsertThroughCSV;
                List<SqlParameter> sqlParameterList = new List<SqlParameter>();
                SqlParameter sqlParameter1 = new SqlParameter("@Lead_Source", SqlDbType.NVarChar);
                sqlParameter1.Value = (object)lead.leadSource;
                sqlParameterList.Add(sqlParameter1);
                SqlParameter sqlParameter2 = new SqlParameter("@LM_Name", SqlDbType.NVarChar);
                sqlParameter2.Value = (object)lead.leadName;
                sqlParameterList.Add(sqlParameter2);
                SqlParameter sqlParameter3 = new SqlParameter("@LM_ContactNo", SqlDbType.NVarChar);
                sqlParameter3.Value = (object)lead.leadContact;
                sqlParameterList.Add(sqlParameter3);
                SqlParameter sqlParameter4 = new SqlParameter("@LM_Email", SqlDbType.NVarChar);
                sqlParameter4.Value = (object)lead.leadEmail;
                sqlParameterList.Add(sqlParameter4);
                SqlParameter sqlParameter5 = new SqlParameter("@LM_Type", SqlDbType.NVarChar);
                sqlParameter5.Value = (object)lead.leadType;
                sqlParameterList.Add(sqlParameter5);
                SqlParameter sqlParameter6 = new SqlParameter("@LM_Query", SqlDbType.NVarChar);
                sqlParameter6.Value = (object)lead.leadQuery;
                sqlParameterList.Add(sqlParameter6);
                SqlParameter sqlParameter7 = new SqlParameter("@DOE", SqlDbType.DateTime);
                sqlParameter7.Value = (object)TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                sqlParameterList.Add(sqlParameter7);
                int LeadID = this.obj.executeScalerText(insertThroughApi, sqlParameterList);
                if (LeadID > 0)
                    return this.GetLeadDetailByID(LeadID);
            }
            return lead;
        }

        public DateTime? GetLastLeadFetch(string leadSource)
        {
            if (leadSource != "")
            {
                string lastRecordFetchDt = this.obj.LastRecordFetchDt;
                List<SqlParameter> sqlParameterList = new List<SqlParameter>();
                SqlParameter sqlParameter = new SqlParameter("@Lead_Source", SqlDbType.NVarChar);
                sqlParameter.Value = (object)leadSource;
                sqlParameterList.Add(sqlParameter);
                DataSet dataSet2 = this.obj.RunSp(lastRecordFetchDt, sqlParameterList);
                if (dataSet2 != null && dataSet2.Tables.Count > 0 && dataSet2.Tables[0].Rows.Count > 0)
                    return new DateTime?(Convert.ToDateTime(dataSet2.Tables[0].Rows[0][0]));
            }
            return new DateTime?();
        }

        public int DeleteLead(List<Lead> lead)
        {

            foreach (Lead lead1 in lead)
            {
                MySQL obj1 = new MySQL();
                obj1.executeScalerText(obj1.ArchiveInsertLead, new List<SqlParameter>()
                {
                  new SqlParameter("@Lead_ID", (object) lead1.leadID),
                  new SqlParameter("@Lead_Source", (object) lead1.leadSource),
                  new SqlParameter("@LM_Name", (object) lead1.leadName),
                  new SqlParameter("@LM_ContactNo", (object) lead1.leadContact),
                  new SqlParameter("@LM_Email", (object)lead1.leadEmail),
                  new SqlParameter("@LM_Type", (object) lead1.leadType),
                  new SqlParameter("@LM_Query", (object) lead1.leadQuery),
                  new SqlParameter("@DOE", (object) lead1.leadEntryDate),
                  new SqlParameter("@UID", (object) lead1.uid),
                  new SqlParameter("@LM_Status", (object) lead1.status.id),
                  new SqlParameter("@LM_UpdatedOn", (object) lead1.lastUpdatedOn),
                  new SqlParameter("@LM_UpdatedBy", (object) lead1.uid),
                  new SqlParameter("@LM_SrcID", (object) lead1.uniqueID),
                  new SqlParameter("@Last_Com", (object) lead1.leadLastComm),
                  new SqlParameter("@Last_Com_By", (object) lead1.lastComBy),
                  new SqlParameter("@Last_Com_Dt", (object) lead1.leadLastCommDt),
                  new SqlParameter("@Reminder_dt", (object) lead1.reminderDate)
                });

                List<LeadMsg> msg = getLeadsMsgByLeadID(lead1.leadID);
                foreach (LeadMsg ms in msg)
                {
                    obj1.executeScalerText(obj1.ArchiveInsertCommunication, new List<SqlParameter>()
                    {
                        new SqlParameter("@Com_ID", (object) ms.comId),
                        new SqlParameter("@LeadID", (object) lead1.leadID),
                        new SqlParameter("@UID", (object) ms.postedByUID),
                        new SqlParameter("@Com_Message", (object) ms.message),
                        new SqlParameter("@Com_Status", (object)ms.comStatus),
                        new SqlParameter("@Com_DOE", (object) ms.comDate)
                    });
                }
                this.obj.RunSp(this.obj.DeleteLead, new List<SqlParameter>(){
                   new SqlParameter("@LeadID", (object) lead1.leadID)
                  });
            }

            return 1;
        }

        public LeadCount getArchiveLeadsByDatateime(DateTime from, DateTime to)
        {
            LeadCount leadCount = new LeadCount();
            MySQL obj1 = new MySQL();
            DataSet dataSetFromQuery = obj1.GetDataSetFromQuery(obj1.GetLeadsByData, new List<SqlParameter>()
            {
            new SqlParameter("@from", (object) from),
            new SqlParameter("@to", (object) to)
            });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                leadCount.Lead = new List<Lead>();
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadCount.Lead.Add(this.ConvertLeadDTO(row));
                //leadCount.LeadCounts = this.retriveCount(leadCount.Lead);
            }
            return leadCount;
        }

        public List<LeadMsg> getArchiveLeadsMsgByLeadID(int leadid)
        {
            List<LeadMsg> leadMsgList = new List<LeadMsg>();
            MySQL obj1 = new MySQL();
            DataSet dataSetFromQuery = obj1.GetDataSetFromQuery(obj1.GetLeadMessageByLeadID, new List<SqlParameter>()
            {
            new SqlParameter("@LeadID", (object) leadid)
            });
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    leadMsgList.Add(this.ConvertLeadMsgDTO(row));
            }
            return leadMsgList;
        }

        public string sendSms(SendSms sms)
        {
            int error = 0;
            string[] message = Wrap(sms.message, 160);
            foreach (string s in message)
            {
                using (new WebClient())
                {
                    StringBuilder address = new StringBuilder();
                    address.Append("http://nimbusit.info/api/pushsms.php?user=");
                    address.Append(ConfigurationManager.AppSettings["smsProfileID"].ToString());
                    address.Append("&key=");
                    address.Append(ConfigurationManager.AppSettings["smsapiKey"].ToString());
                    address.Append("&sender=");
                    address.Append(ConfigurationManager.AppSettings["smsSenderID"].ToString());
                    address.Append("&mobile=");
                    address.Append(sms.mobileNumber.ToString());
                    address.Append("&text=");
                    address.Append(s);
                    HttpWebRequest webRequest = WebRequest.Create(address.ToString()) as HttpWebRequest;
                    StreamReader responseReader = new StreamReader(
                          webRequest.GetResponse().GetResponseStream()
                       );
                    string resultXML = responseReader.ReadToEnd();
                    responseReader.Close();
                    if (resultXML.Contains("Message Sent"))
                        error = 0;
                    else if (resultXML.Contains("Authentication Failure"))
                    {
                        error = 1;
                        break;
                    }
                    else if (resultXML.Contains("NDNC"))
                    {
                        error = 2;
                        break;
                    }
                    else if (resultXML.Contains("No More"))
                    {
                        error = 3;
                        break;
                    }
                    else
                    {
                        error = 4;
                        break;
                    }
                }
            }
            if (error == 0)
                return "Message Sent Successfully.";
            else if (error == 1)
                return "Invalid userID and Password.";
            else if (error == 2)
                return "Number Registered In NDNC.";
            else if (error == 3)
                return "SMS Sending Balance is over.Please recharge.";
            else
                return "Error sending sms.";

        }

        private string[] Wrap(string text, int max)
        {
            var charCount = 0;
            var lines = text.Split(new[] { '\n' }, StringSplitOptions.RemoveEmptyEntries);
            return lines.GroupBy(w => (charCount += (((charCount % max) + w.Length + 1 >= max)
                            ? max - (charCount % max) : 0) + w.Length + 1) / max)
                        .Select(g => string.Join(" ", g.ToArray()))
                        .ToArray();
        }

        public string getSmsBalance()
        {
            using (new WebClient())
            {
                StringBuilder address = new StringBuilder();
                address.Append("http://nimbusit.info/api/balance.php?user=");
                address.Append(ConfigurationManager.AppSettings["smsProfileID"].ToString());
                address.Append("&key=");
                address.Append(ConfigurationManager.AppSettings["smsapiKey"].ToString());
                HttpWebRequest webRequest = WebRequest.Create(address.ToString()) as HttpWebRequest;
                StreamReader responseReader = new StreamReader(
                      webRequest.GetResponse().GetResponseStream()
                   );
                string resultXML = responseReader.ReadToEnd();
                responseReader.Close();
                return resultXML;
            }
        }

        private LeadMsg ConvertLeadMsgDTO(DataRow dr)
        {
            return new LeadMsg()
            {
                comId = Convert.ToInt32(dr["Com_ID"]),
                postedBy = Convert.ToString(dr["Name"]),
                postedByUID = Convert.ToInt32(dr["MsgUserID"]),
                message = Convert.ToString(dr["Com_Message"]),
                comStatus = Convert.ToInt32(dr["Com_Status"]),
                comDate = Convert.ToDateTime(dr["Com_DOE"])
            };
        }

        private Lead ConvertLeadDTO(DataRow dr)
        {
            Lead lead = new Lead();
            try
            {
                lead.leadID = Convert.ToInt32(dr["LeadID"]);
                lead.leadSource = Convert.ToString(dr["Lead_Source"]);
                lead.uid = new int?(Convert.IsDBNull(dr["UID"]) ? 1 : Convert.ToInt32(dr["UID"]));
                lead.leadName = Convert.ToString(dr["LM_Name"]);
                lead.leadContact = Convert.ToString(dr["LM_ContactNo"]);
                lead.leadEmail = Convert.ToString(dr["LM_Email"]);
                lead.leadType = Convert.ToString(dr["LM_Type"]);
                lead.leadQuery = Convert.ToString(dr["LM_Query"]);
                lead.status = new LeadStatus()
                {
                    value = ((Status)Convert.ToInt32(dr["LM_Status"])).ToString(),
                    id = Convert.ToInt32(dr["LM_Status"])
                };
                lead.leadEntryDate = Convert.ToDateTime(dr["LM_CreatedOn"]);
                lead.leadLastComm = Convert.ToString(dr["Last_Com"]);
                lead.leadLastCommDt = !Convert.IsDBNull(dr["Last_Com_Dt"]) ? new DateTime?(Convert.ToDateTime(dr["Last_Com_Dt"])) : new DateTime?();
                lead.lastUpdatedOn = !Convert.IsDBNull(dr["LM_UpdatedOn"]) ? new DateTime?(Convert.ToDateTime(dr["LM_UpdatedOn"])) : new DateTime?();
                lead.reminderDate = !Convert.IsDBNull(dr["Reminder_dt"]) ? new DateTime?(Convert.ToDateTime(dr["Reminder_dt"])) : new DateTime?();
                if (!Convert.IsDBNull(dr["Last_Com_By"]))
                    lead.lastComBy = new int?(Convert.ToInt32(dr["Last_Com_By"]));
                lead.leadAssignee = dr["assignedUser"] == DBNull.Value ? "   " : Convert.ToString(dr["assignedUser"]);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return lead;
        }


    }
}
