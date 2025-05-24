// Decompiled with JetBrains decompiler
// Type: BL.PrivCustomer
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
using System.Globalization;

namespace BL
{
    public class PrivCustomer
    {
        private Idb obj = (Idb)null;

        public PrivCustomer()
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

        public List<PriCustomer> getAllRecord()
        {
            List<PriCustomer> priCustomerList = new List<PriCustomer>();
            DataSet dataSetFromQuery = this.obj.GetDataSetFromQuery(this.obj.PrivCustomerGetAllUser, (List<SqlParameter>)null);
            if (dataSetFromQuery != null && dataSetFromQuery.Tables.Count > 0 && dataSetFromQuery.Tables[0].Rows.Count > 0)
            {
                foreach (DataRow row in (InternalDataCollectionBase)dataSetFromQuery.Tables[0].Rows)
                    priCustomerList.Add(this.ConvertPrivDTO(row));
            }
            return priCustomerList;
        }

        public PriCustomer InsertUpdatePrivCustomer(PriCustomer pc)
        {
            DateTime dateTime1 = DateTime.SpecifyKind(pc.DOB == null ? DateTime.UtcNow : Convert.ToDateTime(pc.DOB), DateTimeKind.Utc);
            TimeZoneInfo.ConvertTimeFromUtc(dateTime1, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            DateTime dateTime2 = DateTime.SpecifyKind(pc.anniversaryDt == null ? DateTime.UtcNow : Convert.ToDateTime(pc.anniversaryDt), DateTimeKind.Utc);
            TimeZoneInfo.ConvertTimeFromUtc(dateTime2, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            DateTime dateTime3 = DateTime.SpecifyKind(pc.BookingDt == null ? DateTime.UtcNow : Convert.ToDateTime(pc.BookingDt), DateTimeKind.Utc);
            TimeZoneInfo.ConvertTimeFromUtc(dateTime3, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
            List<PriCustomer> priCustomerList = new List<PriCustomer>();
            int num = this.obj.executeScalerText(this.obj.PrivCustomerInsertUpdateRecord, new List<SqlParameter>()
      {
        new SqlParameter("@ID", (object) pc.ID),
        new SqlParameter("@CustomerName", (object) pc.CustomerName),
        new SqlParameter("@MobileNo", (object) pc.MobileNo),
        new SqlParameter("@DOB", pc.DOB != null ? (object) dateTime1 : (object) DBNull.Value),
        new SqlParameter("@anniversaryDt", pc.anniversaryDt != null ? (object) dateTime2 : (object) DBNull.Value),
        new SqlParameter("@Address", (object) pc.Address),
        new SqlParameter("@Product", (object) pc.Product),
        new SqlParameter("@BookingDt", pc.BookingDt != null ? (object) dateTime3 : (object) DBNull.Value),
        new SqlParameter("@UnitID", (object) pc.UnitID),
        new SqlParameter("@Number", (object) pc.Number)
      });
            if (num <= 0)
                throw new Exception("Error while inserting or updating record");
            if (pc.ID == 0)
                pc.ID = num;
            pc.DOB = pc.DOB != null ? this.convertDateToUi(dateTime1) : (string)null;
            pc.anniversaryDt = pc.anniversaryDt != null ? this.convertDateToUi(dateTime2) : (string)null;
            pc.BookingDt = pc.BookingDt != null ? this.convertDateToUi(dateTime3) : (string)null;
            return pc;
        }

        public bool DeletePrivCustomer(PriCustomer pc)
        {
            List<PriCustomer> priCustomerList = new List<PriCustomer>();
            if (this.obj.executeScalerText(this.obj.PrivCustomerDeleteRecord, new List<SqlParameter>()
      {
        new SqlParameter("@ID", (object) pc.ID)
      }) > 0)
                return true;
            throw new Exception("Error while deleting record");
        }

        private PriCustomer ConvertPrivDTO(DataRow dr)
        {
            PriCustomer priCustomer = new PriCustomer();
            priCustomer.ID = Convert.ToInt32(dr["ID"].ToString());
            priCustomer.CustomerName = dr["CustomerName"].ToString();
            priCustomer.MobileNo = dr["MobileNo"].ToString();
            priCustomer.DOB = Convert.ToDateTime(dr["DOB"].ToString()).ToString("dd/MM/yyyy", (IFormatProvider)CultureInfo.InvariantCulture);
            if (dr["anniversaryDt"] != null && dr["anniversaryDt"].ToString() != "")
                priCustomer.anniversaryDt = Convert.ToDateTime(dr["anniversaryDt"].ToString()).ToString("dd/MM/yyyy", (IFormatProvider)CultureInfo.InvariantCulture);
            priCustomer.Address = dr["Address"].ToString();
            priCustomer.Product = dr["Product"].ToString();
            priCustomer.BookingDt = Convert.ToDateTime(dr["BookingDt"].ToString()).ToString("dd/MM/yyyy", (IFormatProvider)CultureInfo.InvariantCulture);
            priCustomer.UnitID = dr["UnitID"].ToString();
            priCustomer.Number = dr["Number"].ToString();
            return priCustomer;
        }

        private string convertDateToUi(DateTime dt)
        {
            return dt.Day.ToString() + "/" + (object)dt.Month + "/" + (object)dt.Year;
        }
    }
}
