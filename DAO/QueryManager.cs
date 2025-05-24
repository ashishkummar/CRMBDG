// Decompiled with JetBrains decompiler
// Type: DAO.MSSqlQueryManager
// Assembly: DAO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: CECBAC59-27E9-4A46-8BED-1CE027FFC597
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DAO.dll

namespace DAO
{
    internal static class MSSqlQueryManager
    {
        public static readonly string updateUser = @"update [dbo].[LMS_Admin] 
                                                    set Name = @Name
                                                    , Email = @Email
                                                    , PhoneNo = @PhoneNo
                                                    , UserID = @UserID
                                                    , Password = @Password 
                                                    where uid = @UID; select @@ROWCOUNT;";
        public static readonly string insertUser = @"INSERT INTO 
                                                    [dbo].[LMS_Admin] 
                                                    (Name, Email, PhoneNo, UserID, Password, Role, Status, DOE) 
                                                    values(@Name, @Email, @PhoneNo, @UserID, @Password,2,1, DATEADD(hh,5.30,GETUTCDATE())); select SCOPE_IDENTITY();";
        public static readonly string deleteUser = "update [dbo].[LMS_Admin]  set Status = 0 where uid=@uid;select @@ROWCOUNT";
        public static readonly string userByUserID = "select * from dbo.LMS_Admin (nolock) where UserID=@UserID";
        public static readonly string changePassword = "update [dbo].[LMS_Admin]  set Password = @pass where uid=@uid;select @@ROWCOUNT";
        public static readonly string getLeadByDate = @"SELECT 
                                                            LM.*
                                                            , LA.Name as 'assignedUser'
                                                            , LA1.Name as 'Last_Com_User'
                                                        FROM
                                                        dbo.LMS_LeadMaster LM with (nolock)
                                                        LEFT OUTER JOIN dbo.LMS_Admin LA with (nolock)
                                                            ON LM.[UID]= LA.[UID]
                                                        LEFT OUTER JOIN dbo.LMS_Admin LA1
                                                            ON LM.[Last_Com_By]= LA1.[UID]
                                                        WHERE LM.LM_UpdatedOn between @from and DATEADD(day,1, @to)
                                                        ORDER BY LM.LM_UpdatedOn desc";
        public static readonly string getLeadByDateAndUser = @"SELECT LM.*
                                                                    , LA.Name as 'assignedUser'
                                                                    , LA1.Name as 'Last_Com_User'
                                                                FROM
                                                                dbo.LMS_LeadMaster LM with (nolock)
                                                                LEFT OUTER JOIN dbo.LMS_Admin LA
                                                                ON LM.[UID]= LA.[UID]
                                                                LEFT OUTER JOIN dbo.LMS_Admin LA1
                                                                ON LM.[Last_Com_By]= LA1.[UID]
                                                                WHERE LM.[UID]=@UID and
                                                                LM.LM_UpdatedOn between @from and DATEADD(day,1, @to)
                                                                ORDER BY LM.LM_UpdatedOn desc";
        public static readonly string getLeadByID = "SELECT LM.*\r\n                                                     , LA.Name as 'assignedUser'\r\n\t                                                 , LA1.Name as 'Last_Com_User'\r\n                                                FROM\r\n                                                dbo.LMS_LeadMaster LM with (nolock)\r\n                                                LEFT OUTER JOIN dbo.LMS_Admin LA\r\n                                                    ON LM.[UID]= LA.[UID]\r\n                                                LEFT OUTER JOIN dbo.LMS_Admin LA1\r\n                                                    ON LM.[Last_Com_By]= LA1.[UID]\r\n                                                WHERE LM.LeadID=@LeadID";
        public static readonly string getReminderCount = "select count(*)  " +
            "from LMS_LeadMaster " +
            "where UID = @UID " +
            "and LM_Status in (3,6,9) " +
            "and convert(datetime,convert(varchar(8),Reminder_dt,112)) <= convert(datetime,convert(varchar(8),DATEADD(hh,5.30,GETUTCDATE()),112))";
            /*"and Reminder_dt between CAST(DATEADD(hh,9.30,GETUTCDATE()) as Date) " +
            "and DATEADD(day,1,  CAST(DATEADD(hh,9.30,GETUTCDATE()) as Date))";*/
        public static readonly string getReminderForaUser = "SELECT LM.*" +
            ", LA.Name as 'assignedUser'" +
            ", LA1.Name as 'Last_Com_User'" +
            " FROM" +
            " dbo.LMS_LeadMaster LM with (nolock)" +
            "  LEFT OUTER JOIN dbo.LMS_Admin LA" +
            "  ON LM.[UID]= LA.[UID]" +
            " LEFT OUTER JOIN dbo.LMS_Admin LA1" +
            "  ON LM.[Last_Com_By]= LA1.[UID]" +
            " WHERE LM.[UID]=@UID " +
            "and LM.LM_Status in (3,6,9) " +
            "and convert(datetime,convert(varchar(8), LM.Reminder_dt,112)) <= convert(datetime,convert(varchar(8),DATEADD(hh,5.30,GETUTCDATE()),112))" +
            " ORDER BY LM.Reminder_dt desc";

        public static readonly string getTodayReminderForaUser = "SELECT LM.* " +
            ", LA.Name as 'assignedUser' " +
            ", LA1.Name as 'Last_Com_User'  " +
            "FROM  " +
            "dbo.LMS_LeadMaster LM with (nolock)  " +
            "LEFT OUTER JOIN dbo.LMS_Admin LA " +
            "ON LM.[UID]= LA.[UID] " +
            "LEFT OUTER JOIN dbo.LMS_Admin LA1 " +
            "ON LM.[Last_Com_By]= LA1.[UID] " +
            "WHERE LM.[UID]= @UID " +
            "and LM.LM_Status in (3,6,9) " +
            "and convert(datetime,convert(varchar(8), LM.Reminder_dt,112)) = convert(datetime,convert(varchar(8),DATEADD(hh,5.30,GETUTCDATE()),112)) " +
            "ORDER BY LM.Reminder_dt desc";
        public static readonly string getBulkLeadByID = "SELECT LM.*\r\n                                                     , LA.Name as 'assignedUser'\r\n\t                                                 , LA1.Name as 'Last_Com_User'\r\n                                                FROM\r\n                                                dbo.LMS_LeadMaster LM with (nolock)\r\n                                                LEFT OUTER JOIN dbo.LMS_Admin LA\r\n                                                    ON LM.[UID]= LA.[UID]\r\n                                                LEFT OUTER JOIN dbo.LMS_Admin LA1\r\n                                                    ON LM.[Last_Com_By]= LA1.[UID]\r\n                                                WHERE LM.LeadID in ({0})";
        public static readonly string getLeadMessageByLeadID = "SELECT [Com_ID]\r\n                                                                  " +
            ",LA.Name as Name\r\n\t                                                              " +
            ",LA.UID as MsgUserID\r\n                                                                  " +
            ",[Com_Message]\r\n                                                                  " +
            ",[Com_Status]\r\n                                                                  " +
            ",Com_DOE as Com_DOE\r\n                                                              " +
            "FROM [LMS_Communication] LC with (nolock) " +
            "left join \r\n                                                              " +
            "dbo.LMS_Admin LA with (nolock) on LC.[UID]=LA.[UID]\r\n                                                              " +
            "where LC.Com_Status=1 " +
            "and LC.LeadID=@LeadID\r\n                                                              " +
            "order by Com_DOE desc";
        public static readonly string updateLeadByAdmin = "Update dbo.LMS_LeadMaster set " +
            "LM_Status=@LM_Status" +
            ", LM_UpdatedBy=@UID" +
            ", [UID]=@AgentID" +
            ",LM_UpdatedOn=@LM_UpdatedOn" +
            ", Reminder_dt = (case when (@LM_Status = 3 OR @LM_Status = 6 OR @LM_Status = 9) THEN @reminderDt ELSE null END)" +
            " where LeadID=@LeadID;select @@ROWCOUNT";
        public static readonly string updateLeadByUser = "Update dbo.LMS_LeadMaster set LM_Status = @LM_Status\r\n                            , LM_UpdatedBy= @UID \r\n                            , Reminder_dt = (case when (@LM_Status = 3 OR @LM_Status = 6 OR @LM_Status = 9) THEN @reminderDt ELSE null END)\r\n                            where LeadID=@LeadID;select @@ROWCOUNT";
        public static readonly string insertCommunication = "\r\n            Update dbo.LMS_LeadMaster set Last_Com = @Com_Message,Last_Com_By = @UID, Last_Com_Dt = @Last_Com_Dt\r\n            WHERE LeadID=@LeadID;\r\n            INSERT INTO [LMS_Communication](\r\n            [LeadID]\r\n           ,[UID]\r\n           ,[Com_Message]\r\n ,Com_DOE          )\r\n            VALUES\r\n           (\r\n           @LeadID,\r\n           @UID,\r\n           @Com_Message\r\n,@Last_Com_Dt);select @@ROWCOUNT";
        public static readonly string deleteAllCommunication = " \r\n                Update dbo.LMS_LeadMaster set Last_Com = null,Last_Com_By = null, Last_Com_Dt = null\r\n            WHERE LeadID=@LeadID;\r\n            DELETE FROM LMS_Communication WHERE LeadID=@LeadID;select @@ROWCOUNT";
        public static readonly string insertLead = "INSERT INTO [LMS_LeadMaster]\r\n                        (\r\n                         [Lead_Source]\r\n                        ,[LM_Name]\r\n                        ,[LM_ContactNo]\r\n                        ,[LM_Email]\r\n                        ,[LM_Type]\r\n                        ,[LM_Query]\r\n                        ,[LM_CreatedOn]\r\n                        ,[UID]\r\n                        )\r\n                 Values( \r\n                        @Lead_Source,\r\n                        @LM_Name,\r\n                        @LM_ContactNo,\r\n                        @LM_Email,\r\n                        @LM_Type,\r\n                        @LM_Query,\r\n                        @DOE,\r\n                        @UID\r\n                        );select SCOPE_IDENTITY();";
        public static readonly string updateLeadUser = "UPDATE LMS_LeadMaster\r\n                        SET LM_UpdatedBy=@AgentID , \r\n\t                        LM_UpdatedOn=@LM_UpdatedOn,\r\n                            UID=@UID\r\n                        WHERE LeadID in ({0});select @@ROWCOUNT;";
        public static readonly string insertThroughAPI = "EXEC dbo.LM_API_Insert @Lead_Source,@LM_Type,@LM_Name,@LM_ContactNo,@LM_Email,@LM_Query,@SrcID,@DOE";
        public static readonly string insertThroughCSV = "EXEC dbo.LM_CSV_Insert @Lead_Source,@LM_Type,@LM_Name,@LM_ContactNo,@LM_Email,@LM_Query,@DOE";
        public static readonly string lastRecordFetchDt = "LMS_getLastRecordDate";
        public static readonly string deleteLead = "DeleteLead";
        public static readonly string checkAssignLead = "Check_Assign_Lead";

        public static readonly string privCustomerGetAllUser = "PC_GetAllRecord";
        public static readonly string privCustomerInsertUpdateRecord = "PC_InsertUpdateRecord @ID,@CustomerName,@MobileNo,@DOB,@anniversaryDt,@Address,@Product,@BookingDt,@UnitID,@Number";
        public static readonly string privCustomerDeleteRecord = "LMS_PCDeleteRecord @ID";

        public static readonly string getAllProject = @"SELECT Project_ID
			,Project_Name
			,Project_Type
			,Project_URL
			,Project_File
			,Project_DOE
			,Project_Updated
			,Project_Location 
		FROM Projects ";
        public static readonly string insertProject = @"INSERT INTO Projects(Project_Name
			,Project_Type
			,Project_URL
			,Project_File
			,Project_DOE
			,Project_Updated
			,Project_Location ) VALUES (@Project_Name
			,@Project_Type
			,@Project_URL
			,@Project_File
			,@Project_DOE
			,@Project_Updated
			,@Project_Location );select SCOPE_IDENTITY();";

        public static readonly string deleteProject = @"DELETE FROM Projects WHERE Project_id = @Project_id;select @@ROWCOUNT;";

        public static readonly string getLeadByCreatedDate = @"SELECT 
                                                            LM.*
                                                            , LA.Name as 'assignedUser'
                                                            , LA1.Name as 'Last_Com_User'
                                                        FROM
                                                        dbo.LMS_LeadMaster LM with (nolock)
                                                        LEFT OUTER JOIN dbo.LMS_Admin LA with (nolock)
                                                            ON LM.[UID]= LA.[UID]
                                                        LEFT OUTER JOIN dbo.LMS_Admin LA1
                                                            ON LM.[Last_Com_By]= LA1.[UID]
                                                        WHERE LM.LM_CreatedOn between @from and DATEADD(day,1, @to)
                                                        ORDER BY LM.LM_CreatedOn desc";
        public static readonly string getLeadByCreatedDateAndUser = @"SELECT LM.*
                                                                    , LA.Name as 'assignedUser'
                                                                    , LA1.Name as 'Last_Com_User'
                                                                FROM
                                                                dbo.LMS_LeadMaster LM with (nolock)
                                                                LEFT OUTER JOIN dbo.LMS_Admin LA
                                                                ON LM.[UID]= LA.[UID]
                                                                LEFT OUTER JOIN dbo.LMS_Admin LA1
                                                                ON LM.[Last_Com_By]= LA1.[UID]
                                                                WHERE LM.[UID]=@UID and
                                                                LM.LM_CreatedOn between @from and DATEADD(day,1, @to)
                                                                ORDER BY LM.LM_CreatedOn desc";
    }
}
