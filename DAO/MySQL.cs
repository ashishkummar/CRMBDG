// Decompiled with JetBrains decompiler
// Type: DAO.MySQL
// Assembly: DAO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: CECBAC59-27E9-4A46-8BED-1CE027FFC597
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DAO.dll

using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace DAO
{
    public class MySQL: Idb
    {
        private string connectionString = "Server=50.62.209.155;Database=CLMS_db;Uid=codelistuser;Pwd=P@ssw0rd1!";

        public string UpdateUser
        {
            get
            {
                return MYSqlQueryManager.updateUser;
            }
        }

        public string InsertUser
        {
            get
            {
                return MYSqlQueryManager.insertUser;
            }
        }

        public string DeleteUser
        {
            get
            {
                return MYSqlQueryManager.deleteUser;
            }
        }

        public string ChangePassword
        {
            get
            {
                return MYSqlQueryManager.changePassword;
            }
        }

        public string UserByUserID
        {
            get
            {
                return MYSqlQueryManager.userByUserID;
            }
        }

        public string GetLeadsByID
        {
            get
            {
                return MYSqlQueryManager.getLeadByID;
            }
        }

        public string GetBulkLeadByID
        {
            get
            {
                return MYSqlQueryManager.getBulkLeadByID;
            }
        }

        public string GetLeadsByData
        {
            get
            {
                return MYSqlQueryManager.getLeadByDate;
            }
        }

        public string GetLeadByDateAndUser
        {
            get
            {
                return MYSqlQueryManager.getLeadByDateAndUser;
            }
        }

        public string GetLeadMessageByLeadID
        {
            get
            {
                return MYSqlQueryManager.getLeadMessageByLeadID;
            }
        }

        public string UpdateLeadByAdmin
        {
            get
            {
                return MYSqlQueryManager.updateLeadByAdmin;
            }
        }

        public string UpdateLeadByUser
        {
            get
            {
                return MYSqlQueryManager.updateLeadByUser;
            }
        }

        public string InsertCommunication
        {
            get
            {
                return MYSqlQueryManager.insertCommunication;
            }
        }

        public string DeleteAllCommunication
        {
            get
            {
                return MYSqlQueryManager.deleteAllCommunication;
            }
        }

        public string InsertLead
        {
            get
            {
                return MYSqlQueryManager.insertLead;
            }
        }

        public string InsertThroughAPI
        {
            get
            {
                return MYSqlQueryManager.insertThroughAPI;
            }
        }

        public string InsertThroughCSV
        {
            get
            {
                return MYSqlQueryManager.insertThroughCSV;
            }
        }

        public string UpdateLeadUser
        {
            get
            {
                return MYSqlQueryManager.updateLeadUser;
            }
        }

        public string GetReminderCount
        {
            get
            {
                return MYSqlQueryManager.getReminderCount;
            }
        }

        public string GetRemindersForaUser
        {
            get
            {
                return MYSqlQueryManager.getReminderForaUser;
            }
        }

        public string GetTodayReminderForaUser
        {
            get
            {
                return MYSqlQueryManager.getTodayReminderForaUser;
            }
        }

        public string LastRecordFetchDt
        {
            get
            {
                return MYSqlQueryManager.lastRecordFetchDt;
            }
        }

        public string PrivCustomerGetAllUser
        {
            get
            {
                return MYSqlQueryManager.privCustomerGetAllUser;
            }
        }

        public string PrivCustomerInsertUpdateRecord
        {
            get
            {
                return MYSqlQueryManager.privCustomerInsertUpdateRecord;
            }
        }

        public string PrivCustomerDeleteRecord
        {
            get
            {
                return MYSqlQueryManager.privCustomerDeleteRecord;
            }
        }

        public string DeleteLead
        {
            get
            {
                return MYSqlQueryManager.deleteLead;
            }
        }

        public string CheckAssignLead
        {
            get
            {
                return MYSqlQueryManager.checkAssignLead;
            }
        }

        public string GetAllProject
        {
            get
            {
                return MYSqlQueryManager.getAllProject;
            }
        }

        public string InsertProject
        {
            get
            {
                return MYSqlQueryManager.insertProject;
            }
        }

        public string DeleteProject
        {
            get
            {
                return MYSqlQueryManager.deleteProject;
            }
        }

        public string ArchiveInsertCommunication
        {
            get
            {
                return MYSqlQueryManager.archiveInsertCommunication;
            }
        }

        public string ArchiveInsertLead
        {
            get
            {
                return MYSqlQueryManager.archiveInsertLead;
            }
        }

        public string GetLeadsByCreatedData
        {
            get
            {
                return MYSqlQueryManager.getLeadByCreatedDate;
            }
        }

        public string GetLeadByCreatedDateAndUser
        {
            get
            {
                return MYSqlQueryManager.getLeadByCreatedDateAndUser;
            }
        }

        public MySQL()
        {
            connectionString = ConfigurationManager.ConnectionStrings["MySqlDB"].ToString();
        }

        public DataSet GetDataSetFromQuery(string query, List<SqlParameter> param)
        {
            MySqlConnection mySqlConnection = new MySqlConnection(this.connectionString);
            DataSet dataSet = new DataSet();
            mySqlConnection.Open();
            try
            {
                MySqlCommand command = mySqlConnection.CreateCommand();
                command.CommandText = query;
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(command);
                if (param != null)
                {
                    foreach (SqlParameter sqlparamDto in param)
                        command.Parameters.AddWithValue(sqlparamDto.ParameterName, sqlparamDto.Value);
                }
                mySqlDataAdapter.Fill(dataSet);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (mySqlConnection.State == ConnectionState.Open)
                    mySqlConnection.Close();
                mySqlConnection.Dispose();
            }
            return dataSet;
        }

        public DataSet RunSp(string query, List<SqlParameter> param)
        {
            DataSet dataSet = new DataSet();
            MySqlConnection sqlConnection = new MySqlConnection(this.connectionString);
            try
            {
                MySqlCommand selectCommand = new MySqlCommand(query);
                selectCommand.CommandType = CommandType.StoredProcedure;
                selectCommand.Connection = sqlConnection;
                selectCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        selectCommand.Parameters.AddWithValue(sqlParameter.ParameterName, sqlParameter.Value);
                }
                MySqlDataAdapter mySqlDataAdapter = new MySqlDataAdapter(selectCommand);
                if (sqlConnection.State == ConnectionState.Closed)
                    sqlConnection.Open();
                mySqlDataAdapter.Fill(dataSet);
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
            MySqlConnection sqlConnection = new MySqlConnection(this.connectionString);
            int num = 0;
            try
            {
                MySqlCommand sqlCommand = new MySqlCommand(query);
                sqlCommand.CommandType = CommandType.StoredProcedure;
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        sqlCommand.Parameters.AddWithValue(sqlParameter.ParameterName, sqlParameter.Value);
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
            MySqlConnection sqlConnection = new MySqlConnection(this.connectionString);
            int num = 0;
            try
            {
                MySqlCommand sqlCommand = new MySqlCommand(query);
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        sqlCommand.Parameters.AddWithValue(sqlParameter.ParameterName, sqlParameter.Value);
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
            MySqlConnection sqlConnection = new MySqlConnection(this.connectionString);
            int num = 0;
            try
            {
                MySqlCommand sqlCommand = new MySqlCommand(query);
                sqlCommand.CommandType = CommandType.Text;
                sqlCommand.Connection = sqlConnection;
                sqlCommand.CommandTimeout = Convert.ToInt32("10000");
                if (param != null)
                {
                    foreach (SqlParameter sqlParameter in param)
                        sqlCommand.Parameters.AddWithValue(sqlParameter.ParameterName, sqlParameter.Value);
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
