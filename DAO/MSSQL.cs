// Decompiled with JetBrains decompiler
// Type: DAO.MSSQL
// Assembly: DAO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: CECBAC59-27E9-4A46-8BED-1CE027FFC597
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DAO.dll

using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DAO
{
    public class MSSQL : Idb
    {
        private string conSrt = "";

        public string UpdateUser
        {
            get
            {
                return MSSqlQueryManager.updateUser;
            }
        }

        public string InsertUser
        {
            get
            {
                return MSSqlQueryManager.insertUser;
            }
        }

        public string DeleteUser
        {
            get
            {
                return MSSqlQueryManager.deleteUser;
            }
        }

        public string ChangePassword
        {
            get
            {
                return MSSqlQueryManager.changePassword;
            }
        }

        public string UserByUserID
        {
            get
            {
                return MSSqlQueryManager.userByUserID;
            }
        }

        public string GetLeadsByID
        {
            get
            {
                return MSSqlQueryManager.getLeadByID;
            }
        }

        public string GetBulkLeadByID
        {
            get
            {
                return MSSqlQueryManager.getBulkLeadByID;
            }
        }

        public string GetLeadsByData
        {
            get
            {
                return MSSqlQueryManager.getLeadByDate;
            }
        }

        public string GetLeadByDateAndUser
        {
            get
            {
                return MSSqlQueryManager.getLeadByDateAndUser;
            }
        }

        public string GetLeadMessageByLeadID
        {
            get
            {
                return MSSqlQueryManager.getLeadMessageByLeadID;
            }
        }

        public string UpdateLeadByAdmin
        {
            get
            {
                return MSSqlQueryManager.updateLeadByAdmin;
            }
        }

        public string UpdateLeadByUser
        {
            get
            {
                return MSSqlQueryManager.updateLeadByUser;
            }
        }

        public string InsertCommunication
        {
            get
            {
                return MSSqlQueryManager.insertCommunication;
            }
        }

        public string DeleteAllCommunication
        {
            get
            {
                return MSSqlQueryManager.deleteAllCommunication;
            }
        }

        public string InsertLead
        {
            get
            {
                return MSSqlQueryManager.insertLead;
            }
        }

        public string InsertThroughAPI
        {
            get
            {
                return MSSqlQueryManager.insertThroughAPI;
            }
        }

        public string InsertThroughCSV
        {
            get
            {
                return MSSqlQueryManager.insertThroughCSV;
            }
        }

        public string UpdateLeadUser
        {
            get
            {
                return MSSqlQueryManager.updateLeadUser;
            }
        }

        public string GetReminderCount
        {
            get
            {
                return MSSqlQueryManager.getReminderCount;
            }
        }

        public string GetRemindersForaUser
        {
            get
            {
                return MSSqlQueryManager.getReminderForaUser;
            }
        }

        public string GetTodayReminderForaUser
        {
            get
            {
                return MSSqlQueryManager.getTodayReminderForaUser;
            }
        }

        public string LastRecordFetchDt
        {
            get
            {
                return MSSqlQueryManager.lastRecordFetchDt;
            }
        }

        public string PrivCustomerGetAllUser
        {
            get
            {
                return MSSqlQueryManager.privCustomerGetAllUser;
            }
        }

        public string PrivCustomerInsertUpdateRecord
        {
            get
            {
                return MSSqlQueryManager.privCustomerInsertUpdateRecord;
            }
        }

        public string PrivCustomerDeleteRecord
        {
            get
            {
                return MSSqlQueryManager.privCustomerDeleteRecord;
            }
        }

        public string DeleteLead
        {
            get
            {
                return MSSqlQueryManager.deleteLead;
            }
        }

        public string CheckAssignLead
        {
            get
            {
                return MSSqlQueryManager.checkAssignLead;
            }
        }

        public string GetAllProject
        {
            get
            {
                return MSSqlQueryManager.getAllProject;
            }
        }

        public string InsertProject
        {
            get
            {
                return MSSqlQueryManager.insertProject;
            }
        }

        public string DeleteProject
        {
            get
            {
                return MSSqlQueryManager.deleteProject;
            }
        }

        public string GetLeadsByCreatedData
        {
            get
            {
                return MSSqlQueryManager.getLeadByCreatedDate;
            }
        }

        public string GetLeadByCreatedDateAndUser
        {
            get
            {
                return MSSqlQueryManager.getLeadByCreatedDateAndUser;
            }
        }

        public MSSQL()
        {
            this.conSrt = ConfigurationManager.ConnectionStrings["MSSqlDB"].ToString();
        }

        public DataSet GetDataSetFromQuery(string query, List<SqlParameter> param)
        {
            DataSet dataSet = new DataSet();
            SqlConnection sqlConnection = new SqlConnection(this.conSrt);
            try
            {
                SqlCommand selectCommand = new SqlCommand(query);
                selectCommand.CommandType = CommandType.Text;
                selectCommand.Connection = sqlConnection;
                selectCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        selectCommand.Parameters.Add(sqlParameter);
                }
                if (sqlConnection.State == ConnectionState.Closed)
                    sqlConnection.Open();
                new SqlDataAdapter(selectCommand).Fill(dataSet);
            }
            catch (Exception ex)
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
                throw ex;
            }
            finally
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
            }
            return dataSet;
        }

        public DataSet RunSp(string query, List<SqlParameter> param)
        {
            DataSet dataSet = new DataSet();
            SqlConnection sqlConnection = new SqlConnection(this.conSrt);
            try
            {
                SqlCommand selectCommand = new SqlCommand(query);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.Connection = sqlConnection;
                selectCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        selectCommand.Parameters.Add(sqlParameter);
                }
                if (sqlConnection.State == ConnectionState.Closed)
                    sqlConnection.Open();
                new SqlDataAdapter(selectCommand).Fill(dataSet);
            }
            catch (Exception ex)
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
                throw ex;
            }
            finally
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
            }
            return dataSet;
        }

        public int executeNonQuerySP(string query, List<SqlParameter> param)
        {
            SqlConnection sqlConnection = new SqlConnection(this.conSrt);
            int num = 0;
            try
            {
                SqlCommand sqlCommand = new SqlCommand(query);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        sqlCommand.Parameters.Add(sqlParameter);
                }
                if (sqlConnection.State == ConnectionState.Closed)
                    sqlConnection.Open();
                num = sqlCommand.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
                throw ex;
            }
            finally
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
            }
            return num;
        }

        public int executeNonQueryText(string query, List<SqlParameter> param)
        {
            SqlConnection sqlConnection = new SqlConnection(this.conSrt);
            int num = 0;
            try
            {
                SqlCommand sqlCommand = new SqlCommand(query);
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        sqlCommand.Parameters.Add(sqlParameter);
                }
                if (sqlConnection.State == ConnectionState.Closed)
                    sqlConnection.Open();
                num = sqlCommand.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
                throw ex;
            }
            finally
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
            }
            return num;
        }

        public int executeScalerText(string query, List<SqlParameter> param)
        {
            SqlConnection sqlConnection = new SqlConnection(this.conSrt);
            int num = 0;
            try
            {
                SqlCommand sqlCommand = new SqlCommand(query);
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        sqlCommand.Parameters.Add(sqlParameter);
                }
                if (sqlConnection.State == ConnectionState.Closed)
                    sqlConnection.Open();
                num = Convert.ToInt32(sqlCommand.ExecuteScalar());
            }
            catch (Exception ex)
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
                throw ex;
            }
            finally
            {
                if (sqlConnection.State == ConnectionState.Open)
                {
                    sqlConnection.Close();
                    sqlConnection.Dispose();
                }
            }
            return num;
        }
    }
}
