/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/


GO
alter table LMS_LeadMaster add Last_Com nvarchar(max), Last_Com_By int,Last_Com_Dt datetime, Reminder_dt datetime;
GO

GO
WITH LC_ranked AS (         
		SELECT * 
		FROM 
		(
		  SELECT    
			LC.*, rnk = ROW_NUMBER() OVER (PARTITION BY LC.LeadID ORDER BY LC.Com_DOE desc)    
		  FROM LMS_Communication LC with (nolock) join LMS_LeadMaster LM with (nolock)  on LM.LeadID=LC.LeadID    
		  where LC.Com_Status = 1
		)aa where rnk =1      
   )    
update   
 LM  set LM.Last_Com = LC.Com_Message,lm.Last_Com_By = LC.UID,LM.Last_Com_Dt= LC.Com_DOE from dbo.LMS_LeadMaster LM left join LC_ranked  LC on LM.LeadID=LC.LeadID
 GO

 GO
 update  
LM 
SET 
 LM.Reminder_dt =  LR.Rem_Date
from dbo.LMS_LeadMaster LM 
inner join  LMS_Reminder LR on LM.[Leadid]=LR.[Leadid] 
where LM.LM_Status = 3
GO

GO
ALTER PROCEDURE [dbo].[LM_API_Insert] 
	-- Add the parameters for the stored procedure here
	@Lead_Source [nvarchar](50),
	@LM_Type [nvarchar](20),
	@LM_Name nvarchar(50),
    @LM_ContactNo nvarchar(15),
    @LM_Email nvarchar(150),
    @LM_Query nvarchar(max),
    @SrcID nvarchar(30),
    @DOE datetime
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @id int;
	SET @id = 0;
	IF NOT EXISTS(SELECT * FROM [LMS_LeadMaster] WHERE [LM_SrcID] =@SrcID)
    BEGIN

    -- Insert statements for procedure here
	INSERT INTO [LMS_LeadMaster]
           (
			 [Lead_Source]
			,[LM_Name]
			,[LM_ContactNo]
			,[LM_Email]
			,[LM_Type]
			,[LM_Query]
			,[LM_CreatedOn]
			,[LM_SrcID]
			--,[UID]
           )
     Values( 
			@Lead_Source,
			@LM_Name,
			@LM_ContactNo,
			@LM_Email,
			@LM_Type,
			@LM_Query,
			@DOE,
			@SrcID
			
            --,[dbo].[getUerID] ()
           
           )
		select @id = SCOPE_IDENTITY();
       END    
      select @id as ID;    
           
END
GO

GO
ALTER PROCEDURE [dbo].[LMS_getLastRecordDate]
	-- Add the parameters for the stored procedure here
	@Lead_Source nvarchar(50)

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
  
  select top(1) LM_CreatedOn as Date from dbo.LMS_LeadMaster
  where LM_SrcID is not null and Lead_Source like @Lead_Source order by LM_CreatedOn DESC
         
          
           
END
GO

GO
CREATE PROC [dbo].[DeleteLead] 
	@LeadID bigint
AS
BEGIN

BEGIN TRANSACTION;  
	BEGIN TRY
		DELETE FROM LMS_Communication where LeadID = @LeadID;
		DELETE FROM LMS_Reminder where LeadID = @LeadID;
		DELETE FROM LMS_LeadMaster where LeadID = @LeadID;
		select @@ROWCOUNT
	END TRY
	BEGIN CATCH
		 SELECT   
			ERROR_NUMBER() AS ErrorNumber  
			,ERROR_SEVERITY() AS ErrorSeverity  
			,ERROR_STATE() AS ErrorState  
			,ERROR_PROCEDURE() AS ErrorProcedure  
			,ERROR_LINE() AS ErrorLine  
			,ERROR_MESSAGE() AS ErrorMessage;  


		IF @@TRANCOUNT > 0  
		ROLLBACK TRANSACTION;  
	END CATCH
	
IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION; 

END
GO
GO
 update Projects set Project_File = '/ProjectFiles/sikahakamya5179451_2914363.zip' where Project_ID=8
 update Projects set Project_File = '/ProjectFiles/sikahakamya5179451_2914363.zip' where Project_ID=6
 GO
/*
 GO
 select 

'INSERT INTO 
LMS_Admin
(`UID`,`Name`, `Email`, `PhoneNo`, `UserID`, `Password`, `Role`, `Status`, `DOE`) 
values('+CONVERT(varchar(max),uid)+','''+name+''','''+Email+''','''+CONVERT(varchar(max),PhoneNo)+''','''+UserID+''','''+Password+''','+CONVERT(varchar(max),Role)+','+CONVERT(varchar(max),Status)+','''+CONVERT(varchar,DOE,121)+''');'

from  [dbo].[LMS_Admin] 
GO

GO

select 

'INSERT INTO 
LMS_LeadMaster
(`LeadID`,`Lead_Source`,`UID`,`LM_Name`,`LM_ContactNo`,`LM_Email`,`LM_Type`,`LM_Query`,`LM_Status`,`LM_CreatedOn`,`LM_UpdatedOn`,`LM_UpdatedBy`,`LM_SrcID`,`Last_Com`,`Last_Com_By`,`Last_Com_Dt`,`Reminder_dt`) 
values('+CONVERT(varchar(max),LeadID)+
','''+ISNULL(Lead_Source,'')+
''','+ISNULL(CONVERT(varchar(max),UID),'null')+
','''+ISNULL(CONVERT(varchar(max),LM_Name),'')+
''','''+ISNULL(CONVERT(varchar(max),LM_ContactNo),'')+
''','''+ISNULL(CONVERT(varchar(max),LM_Email),'')+
''','''+ISNULL(CONVERT(varchar(max),LM_Type),'')+
''','''+ISNULL(CONVERT(varchar(max),replace(LM_Query,'''','\''')),'')+
''','+ISNULL(CONVERT(varchar(max),LM_Status),'')+
','''+ISNULL(CONVERT(varchar,LM_CreatedOn,121),'')+
''','''+ISNULL(CONVERT(varchar,LM_UpdatedOn,121),'')+
''','+ISNULL(CONVERT(varchar(max),LM_UpdatedBy),'null')+
','+(CASE WHEN CONVERT(varchar(max),LM_SrcID) IS NULL THEN 'null' else ''''+CONVERT(varchar(max),LM_SrcID)+'''' END)+
','+(CASE WHEN  CONVERT(varchar(max),replace(Last_Com,'''','\''')) IS NULL THEN 'null' else ''''+CONVERT(varchar(max),replace(Last_Com,'''','\'''))+'''' END)+
','+ISNULL(CONVERT(varchar(max),Last_Com_By),'null')+
','+(CASE WHEN  CONVERT(varchar,Last_Com_Dt,121) IS NULL THEN 'null' else ''''+CONVERT(varchar,Last_Com_Dt,121)+'''' END)+
','+(CASE WHEN  CONVERT(varchar,Reminder_dt,121) IS NULL THEN 'null' else ''''+CONVERT(varchar,Reminder_dt,121)+'''' END)+');'

from  [dbo].LMS_LeadMaster 
where LM_UpdatedOn <'01-01-2018'

GO
GO
select 
'INSERT INTO 
LMS_Communication
(`Com_ID`,`LeadID`,`UID`,`Com_Message`,`Com_Status`,`Com_DOE`) 
values('+CONVERT(varchar(max),lc.Com_ID)+
','+ISNULL(CONVERT(varchar(max),lc.LeadID),'')+
','+ISNULL(CONVERT(varchar(max),lc.UID),'')+
','''+ISNULL(CONVERT(varchar(max),replace(lc.Com_Message,'''','\''')),'''''')+
''','+ISNULL(CONVERT(varchar(max),lc.Com_Status),'')+
','''+ISNULL(CONVERT(varchar,lc.Com_DOE,121),'')+''');'
from  [dbo].LMS_Communication lc inner join LMS_LeadMaster lm on lc.LeadID = lm.LeadID
where LM.LM_UpdatedOn <'01-01-2018'
GO
*/