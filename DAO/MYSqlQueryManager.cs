

namespace DAO
{
  internal static class MYSqlQueryManager
  {
        public static readonly string updateUser = @"update LMS_Admin 
	                                                    set Name = @Name
	                                                    , Email = @Email
	                                                    , PhoneNo = @PhoneNo
	                                                    , UserID = @UserID
	                                                    , Password = @Password 																											
                                                    where uid = @UID; select FOUND_ROWS();";
        public static readonly string insertUser = @"INSERT INTO 
                                                    LMS_Admin 
                                                    (`Name`,`Email`,`PhoneNo`,`UserID`,`Password`,`Role`,`Status`,`DOE`) 
                                                    values(@Name, @Email, @PhoneNo, @UserID, @Password,2,1, now()); select LAST_INSERT_ID();";
        public static readonly string deleteUser = "update LMS_Admin  set Status = 0 where uid=@uid;select FOUND_ROWS()";
        public static readonly string userByUserID = "select * from LMS_Admin where UserID=@UserID";
        public static readonly string changePassword = "update LMS_Admin  set Password = @pass where uid=@uid;select FOUND_ROWS();";

        public static readonly string getLeadByDate = @"SELECT 
                                                            LM.*
                                                            , LA.Name as 'assignedUser'
                                                            , LA1.Name as 'Last_Com_User'
                                                        FROM
                                                        LMS_LeadMaster LM
                                                        LEFT OUTER JOIN LMS_Admin LA
                                                            ON LM.`UID`= LA.`UID`
                                                        LEFT OUTER JOIN LMS_Admin LA1
                                                            ON LM.`Last_Com_By`= LA1.`UID`
                                                        WHERE LM.LM_UpdatedOn between @from and TIMESTAMPADD(day,1, @to)
                                                        ORDER BY LM.LM_UpdatedOn desc";
        public static readonly string getLeadByDateAndUser = @"SELECT LM.*
	                                                                , LA.Name as 'assignedUser'
	                                                                , LA1.Name as 'Last_Com_User'
                                                                FROM LMS_LeadMaster LM 
                                                                LEFT OUTER JOIN LMS_Admin LA
                                                                    ON LM.`UID`= LA.`UID`
                                                                LEFT OUTER JOIN LMS_Admin LA1
                                                                    ON LM.`Last_Com_By`= LA1.`UID`
                                                                WHERE LM.`UID`=@UID and
                                                                    LM.LM_UpdatedOn between @from and TIMESTAMPADD(day,1, @to)
                                                                ORDER BY LM.LM_UpdatedOn desc";
        public static readonly string getLeadByID = @"SELECT LM.*
                                                    , LA.Name as 'assignedUser'
                                                    , LA1.Name as 'Last_Com_User'
                                                    FROM LMS_LeadMaster LM 
                                                    LEFT OUTER JOIN LMS_Admin LA
                                                        ON LM.`UID`= LA.`UID`
                                                    LEFT OUTER JOIN LMS_Admin LA1
                                                        ON LM.`Last_Com_By`= LA1.`UID`
                                                    WHERE LM.LeadID=@LeadID";
        //done
        public static readonly string getReminderCount = @"select count(*)  
            from LMS_LeadMaster 
            where UID = @UID
            and LM_Status in (3,6,9)
            and Reminder_dt <=CAST(TIMESTAMPADD(minute,751, NOW())AS DATE)";
        /*"and Reminder_dt between CAST(DATEADD(hh,9.30,GETUTCDATE()) as Date) " +
        "and DATEADD(day,1,  CAST(DATEADD(hh,9.30,GETUTCDATE()) as Date))";*/
        public static readonly string getReminderForaUser = @"SELECT LM.*
            , LA.Name as 'assignedUser'
            , LA1.Name as 'Last_Com_User'
             FROM 
             LMS_LeadMaster LM 
              LEFT OUTER JOIN LMS_Admin LA
              ON LM.`UID`= LA.`UID`
             LEFT OUTER JOIN LMS_Admin LA1
              ON LM.`Last_Com_By`= LA1.`UID`
             WHERE LM.`UID`=@UID
            and LM.LM_Status in (3,6,9)
            and LM.Reminder_dt <=CAST(TIMESTAMPADD(minute,751, NOW())AS DATE)
             ORDER BY LM.Reminder_dt desc";

        public static readonly string getTodayReminderForaUser = @"SELECT LM.* 
            , LA.Name as 'assignedUser'
            , LA1.Name as 'Last_Com_User'
            FROM
            LMS_LeadMaster LM 
            LEFT OUTER JOIN LMS_Admin LA
            ON LM.`UID`= LA.`UID`
            LEFT OUTER JOIN LMS_Admin LA1
            ON LM.`Last_Com_By`= LA1.`UID`
            WHERE LM.`UID`= @UID
            and LM.LM_Status in (3,6,9)
            and LM.Reminder_dt 
            between convert(date_format(TIMESTAMPADD(hh,5.30,UTC_TIMESTAMP()),'%Y%m%d'), datetime)
            and convert(date_format(TIMESTAMPADD(day,1,  CAST(TIMESTAMPADD(hh,5.30,UTC_TIMESTAMP()) as Date)) ,'%Y%m%d'), datetime)
            ORDER BY LM.Reminder_dt desc";
        public static readonly string getBulkLeadByID = @"SELECT LM.*
                                                            , LA.Name as 'assignedUser'
                                                            , LA1.Name as 'Last_Com_User'
                                                        FROM LMS_LeadMaster LM 
                                                        LEFT OUTER JOIN LMS_Admin LA
                                                            ON LM.`UID`= LA.`UID`
                                                        LEFT OUTER JOIN LMS_Admin LA1
                                                            ON LM.`Last_Com_By`= LA1.`UID`
                                                        WHERE LM.LeadID in ({0})";
        public static readonly string getLeadMessageByLeadID = @"SELECT `Com_ID`
            ,LA.Name as Name
            ,LA.UID as MsgUserID
            ,`Com_Message`
            ,`Com_Status`
            ,Com_DOE as Com_DOE
            FROM LMS_Communication LC  
            left join
            LMS_Admin LA  on LC.`UID`=LA.`UID`
            where LC.Com_Status=1
            and LC.LeadID=@LeadID
            order by Com_DOE desc";
        public static readonly string updateLeadByAdmin = @"Update LMS_LeadMaster set 
            LM_Status=@LM_Status
            , LM_UpdatedBy=@UID
            , `UID`=@AgentID
            ,LM_UpdatedOn=NOW()
            , Reminder_dt = (case when (@LM_Status = 3 OR @LM_Status = 6 OR @LM_Status = 9) THEN @reminderDt ELSE null END)
             where LeadID=@LeadID;select FOUND_ROWS();";
        public static readonly string updateLeadByUser = @"Update LMS_LeadMaster set LM_Status = @LM_Status
            , LM_UpdatedBy= @UID 
            , Reminder_dt = (case when (@LM_Status = 3 OR @LM_Status = 6 OR @LM_Status = 9) THEN @reminderDt ELSE null END)
            where LeadID=@LeadID;select FOUND_ROWS();";
        public static readonly string insertCommunication = @"Update LMS_LeadMaster 
                                                            set Last_Com = @Com_Message
                                                                ,Last_Com_By = @UID
                                                                , Last_Com_Dt = NOW() WHERE LeadID=@LeadID;
                                                            INSERT INTO LMS_Communication(LeadID
                                                                    ,UID,Com_Message)
                                                            VALUES(@LeadID,@UID,@Com_Message);select FOUND_ROWS();";
        public static readonly string deleteAllCommunication = @"Update LMS_LeadMaster set Last_Com = null
                                                                ,Last_Com_By = null
                                                                ,Last_Com_Dt = null
                                                                WHERE LeadID=@LeadID;
                                                                DELETE FROM LMS_Communication WHERE LeadID=@LeadID;select FOUND_ROWS();";
        public static readonly string insertLead = @"INSERT INTO LMS_LeadMaster(`Lead_Source`
                                                            ,`LM_Name`
                                                            ,`LM_ContactNo`
                                                            ,`LM_Email`
                                                            ,`LM_Type`
                                                            ,`LM_Query`
                                                            ,`LM_CreatedOn`
                                                            ,`UID`)
                                                    Values(@Lead_Source
                                                            ,@LM_Name
                                                            ,@LM_ContactNo,@LM_Email,@LM_Type,@LM_Query,@DOE,@UID);select LAST_INSERT_ID();";
        public static readonly string updateLeadUser = @"UPDATE LMS_LeadMaster
                                                            SET LM_UpdatedBy=@AgentID 
                                                                , LM_UpdatedOn=NOW()
                                                                , UID=@UIDrn                        
                                                            WHERE LeadID in ({0});select FOUND_ROWS();";
        public static readonly string insertThroughAPI = "CALL LM_API_Insert @Lead_Source,@LM_Type,@LM_Name,@LM_ContactNo,@LM_Email,@LM_Query,@SrcID,@DOE";
        public static readonly string insertThroughCSV = "CALL LM_CSV_Insert @Lead_Source,@LM_Type,@LM_Name,@LM_ContactNo,@LM_Email,@LM_Query,@SrcID,@DOE";
        public static readonly string lastRecordFetchDt = "LMS_getLastRecordDate";
        public static readonly string deleteLead = "DeleteLead";
        public static readonly string checkAssignLead = "Check_Assign_Lead";

        public static readonly string privCustomerGetAllUser = "PC_GetAllRecord";
        public static readonly string privCustomerInsertUpdateRecord = "CALL PC_InsertUpdateRecord @ID,@CustomerName,@MobileNo,@DOB,@anniversaryDt,@Address,@Product,@BookingDt,@UnitID,@Number";
        public static readonly string privCustomerDeleteRecord = "CALL LMS_PCDeleteRecord @ID";

        public static readonly string getAllProject = @"SELECT Project_ID
			,Project_Name
			,Project_Type
			,Project_URL
			,Project_File
			,Project_DOE
			,Project_Updated
			,Project_Location 
		FROM Projects; ";
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
			,@Project_Location );select LAST_INSERT_ID();";

        public static readonly string deleteProject = @"DELETE FROM Projects WHERE Project_id = @Project_id;select FOUND_ROWS();";

        public static readonly string archiveInsertLead = @"INSERT INTO LMS_LeadMaster(
                                                            `LeadID`
                                                            ,`Lead_Source`
                                                            ,`LM_Name`
                                                            ,`LM_ContactNo`
                                                            ,`LM_Email`
                                                            ,`LM_Type`
                                                            ,`LM_Query`
                                                            ,`LM_CreatedOn`
                                                            ,`UID`
                                                            ,`LM_Status`
                                                            ,`LM_UpdatedOn`
                                                            ,`LM_UpdatedBy`
                                                            ,`LM_SrcID`
                                                            ,`Last_Com`
                                                            ,`Last_Com_By`
                                                            ,`Last_Com_Dt`
                                                            ,`Reminder_dt`)
                                                    Values(@Lead_ID
                                                            ,@Lead_Source
                                                            ,@LM_Name
                                                            ,@LM_ContactNo
                                                            ,@LM_Email
                                                            ,@LM_Type
                                                            ,@LM_Query
                                                            ,@DOE
                                                            ,@UID
                                                            ,@LM_Status
                                                            ,@LM_UpdatedOn
                                                            ,@LM_UpdatedBy
                                                            ,@LM_SrcID
                                                            ,@Last_Com
                                                            ,@Last_Com_By
                                                            ,@Last_Com_Dt
                                                            ,@Reminder_dt
                                                            );select LAST_INSERT_ID();";

        public static readonly string archiveInsertCommunication = @"INSERT INTO LMS_Communication(
                                                                                Com_ID
                                                                                ,LeadID
                                                                                ,UID
                                                                                ,Com_Message
                                                                                ,Com_Status
                                                                                ,Com_DOE)
                                                            VALUES(@Com_ID,@LeadID,@UID,@Com_Message,@Com_Status,@Com_DOE);select FOUND_ROWS();";

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
