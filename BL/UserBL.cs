// Decompiled with JetBrains decompiler
// Type: BL.UserBL
// Assembly: BL, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 3C67953A-AAE6-4944-A4E7-6FF95D56B62B
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\BL.dll

using DAO;
using DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace BL
{
    public class UserBL
    {
        private static readonly log4net.ILog log =
        log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        private Idb obj = (Idb)null;

        public UserBL()
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

        public List<UserDTO> getAllAppUser()
        {
            List<UserDTO> userDtoList = new List<UserDTO>();
            DataSet dataSet = this.obj.RunSp("Admin_Get_User", (List<SqlParameter>)null);
            if (dataSet != null && dataSet.Tables.Count > 0)
            {
                foreach (DataRow row in (InternalDataCollectionBase)dataSet.Tables[0].Rows)
                    userDtoList.Add(new UserDTO()
                    {
                        id = Convert.ToInt32(row["UID"].ToString()),
                        name = row["Name"].ToString(),
                        email = row["Email"].ToString(),
                        contact = row["PhoneNo"].ToString(),
                        userID = row["UserID"].ToString(),
                        role = Convert.ToInt32(row["Role"].ToString()),
                        status = Convert.ToBoolean(row["Status"].ToString()),
                        createdDate = Convert.ToDateTime(row["DOE"].ToString())
                    });
            }
            return userDtoList;
        }

        public UserDTO ValidateUser(string Id, string pass)
        {
            UserDTO userDto = (UserDTO)null;
            try
            {
                DataSet dataSet = this.obj.RunSp("Admin_checkLogin", new List<SqlParameter>()
                {
                new SqlParameter("@UserID", (object) Id),
                new SqlParameter("@Password", (object) pass)
                });
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count == 1)
                {
                    userDto = new UserDTO();
                    userDto.id = Convert.ToInt32(dataSet.Tables[0].Rows[0]["UID"].ToString());
                    userDto.name = dataSet.Tables[0].Rows[0]["Name"].ToString();
                    userDto.role = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Role"].ToString());
                }
                return userDto;
            }
            catch (Exception ex)
            {
                log.Error("Auth User" + ex.Message + Environment.NewLine + ex.StackTrace);
                return userDto;
            }
        }

        public UserDTO GetUserByID(string Id)
        {
            UserDTO userDto = (UserDTO)null;
            DataSet dataSet = this.obj.RunSp("Admin_Get_User_info", new List<SqlParameter>()
      {
        new SqlParameter("@UID", (object) Id)
      });
            if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count == 1)
            {
                userDto = new UserDTO();
                userDto.id = Convert.ToInt32(dataSet.Tables[0].Rows[0]["UID"].ToString());
                userDto.name = dataSet.Tables[0].Rows[0]["Name"].ToString();
                userDto.email = dataSet.Tables[0].Rows[0]["Email"].ToString();
                userDto.contact = dataSet.Tables[0].Rows[0]["PhoneNo"].ToString();
                userDto.userID = dataSet.Tables[0].Rows[0]["UserID"].ToString();
                userDto.password = dataSet.Tables[0].Rows[0]["Password"].ToString();
                userDto.status = Convert.ToBoolean(dataSet.Tables[0].Rows[0]["Status"].ToString());
                userDto.createdDate = Convert.ToDateTime(dataSet.Tables[0].Rows[0]["DOE"].ToString());
                userDto.role = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Role"].ToString());
            }
            return userDto;
        }

        public UserDTO GetUserDetailByUserID(string UserID)
        {
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.UserByUserID, new List<SqlParameter>()
      {
        new SqlParameter("@UserID", (object) UserID)
      });
            if (dataSetFromQuery == null || dataSetFromQuery.Tables.Count <= 0 || dataSetFromQuery.Tables[0].Rows.Count <= 0)
                return (UserDTO)null;
            return new UserDTO()
            {
                id = Convert.ToInt32(dataSetFromQuery.Tables[0].Rows[0]["UID"].ToString()),
                name = dataSetFromQuery.Tables[0].Rows[0]["Name"].ToString(),
                email = dataSetFromQuery.Tables[0].Rows[0]["Email"].ToString(),
                contact = dataSetFromQuery.Tables[0].Rows[0]["PhoneNo"].ToString(),
                userID = dataSetFromQuery.Tables[0].Rows[0][nameof(UserID)].ToString(),
                status = Convert.ToBoolean(dataSetFromQuery.Tables[0].Rows[0]["Status"].ToString()),
                createdDate = Convert.ToDateTime(dataSetFromQuery.Tables[0].Rows[0]["DOE"].ToString()),
                role = Convert.ToInt32(dataSetFromQuery.Tables[0].Rows[0]["Role"].ToString())
            };
        }

        public int UpdateUser(UserDTO Upobj)
        {
            return this.obj.executeNonQueryText(this.obj.UpdateUser.ToString(), new List<SqlParameter>()
      {
        new SqlParameter("@UID", (object) Upobj.id),
        new SqlParameter("@Name", (object) Upobj.name),
        new SqlParameter("@Email", (object) Upobj.email),
        new SqlParameter("@PhoneNo", (object) Upobj.contact),
        new SqlParameter("@UserID", (object) Upobj.userID),
        new SqlParameter("@Password", (object) Upobj.password)
      });
        }

        public int InsertUser(UserDTO Upobj)
        {

            try
            {
                MySQL obj1 = new MySQL();
                obj1.executeNonQueryText(obj1.InsertUser.ToString(), new List<SqlParameter>()
                {
                new SqlParameter("@Name", (object) Upobj.name),
                new SqlParameter("@Email", (object) Upobj.email),
                new SqlParameter("@PhoneNo", (object) Upobj.contact),
                new SqlParameter("@UserID", (object) Upobj.userID),
                new SqlParameter("@Password", (object) Upobj.password),
                new SqlParameter("@Role", (object) 2)
                });
            }
            catch { }
            return this.obj.executeNonQueryText(this.obj.InsertUser, new List<SqlParameter>()
            {
            new SqlParameter("@Name", (object) Upobj.name),
            new SqlParameter("@Email", (object) Upobj.email),
            new SqlParameter("@PhoneNo", (object) Upobj.contact),
            new SqlParameter("@UserID", (object) Upobj.userID),
            new SqlParameter("@Password", (object) Upobj.password),
            new SqlParameter("@Role", (object) 2)
            });
        }

        public List<UserDTO> DeleteUser(UserDTO Upobj)
        {
            if (this.obj.executeNonQueryText(this.obj.DeleteUser, new List<SqlParameter>()
      {
        new SqlParameter("@uid", (object) Upobj.id)
      }) > 0)
                return this.getAllAppUser();
            return (List<UserDTO>)null;
        }

        public bool changePassword(PassReset obj)
        {
            if (this.obj.executeNonQueryText(this.obj.ChangePassword, new List<SqlParameter>()
                  {
                    new SqlParameter("@uid", (object) obj.id),
                    new SqlParameter("@pass", (object) obj.newpass)
                  }) > 0)
            {
                return true;
            }
            return false;
        }
    }
}
