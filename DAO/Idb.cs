// Decompiled with JetBrains decompiler
// Type: DAO.Idb
// Assembly: DAO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: CECBAC59-27E9-4A46-8BED-1CE027FFC597
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DAO.dll

using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DAO
{
    public interface Idb
    {
        string UpdateUser { get; }

        string InsertUser { get; }

        string DeleteUser { get; }

        string ChangePassword { get; }

        string UserByUserID { get; }

        string GetLeadsByID { get; }

        string GetBulkLeadByID { get; }

        string GetLeadsByData { get; }

        string GetLeadByDateAndUser { get; }

        string GetReminderCount { get; }

        string GetRemindersForaUser { get; }

        string GetLeadMessageByLeadID { get; }

        string UpdateLeadByAdmin { get; }

        string UpdateLeadByUser { get; }

        string InsertCommunication { get; }

        string DeleteAllCommunication { get; }

        string InsertLead { get; }

        string InsertThroughAPI { get; }
        string InsertThroughCSV { get; }

        string UpdateLeadUser { get; }

        string LastRecordFetchDt { get; }

        string GetTodayReminderForaUser { get; }

        string PrivCustomerGetAllUser { get; }

        string PrivCustomerInsertUpdateRecord { get; }

        string PrivCustomerDeleteRecord { get; }
        string DeleteLead { get; }
        string CheckAssignLead { get; }
        string GetAllProject { get; }
        string InsertProject { get; }

        string DeleteProject { get; }
        string GetLeadsByCreatedData { get; }

        string GetLeadByCreatedDateAndUser { get; }

        DataSet GetDataSetFromQuery(string query, List<SqlParameter> param);

        DataSet RunSp(string query, List<SqlParameter> param);

        int executeNonQuerySP(string query, List<SqlParameter> param);

        int executeNonQueryText(string query, List<SqlParameter> param);

        int executeScalerText(string query, List<SqlParameter> param);
    }
}
