// Decompiled with JetBrains decompiler
// Type: DTO.Lead
// Assembly: DTO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 3491E077-F6DF-4776-AB95-098740D2860B
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DTO.dll

using System;
using System.Collections.Generic;

namespace DTO
{
  public class Lead
  {
    public int leadID { get; set; }

    public string leadName { get; set; }

    public string leadContact { get; set; }

    public string leadEmail { get; set; }

    public string leadSource { get; set; }

    public string leadType { get; set; }

    public string leadQuery { get; set; }

    public string leadLastComm { get; set; }

    public DateTime? leadLastCommDt { get; set; }

    public LeadStatus status { get; set; }

    public DateTime? reminderDate { get; set; }

    public string leadAssignee { get; set; }

    public DateTime leadEntryDate { get; set; }

    public DateTime? lastUpdatedOn { get; set; }

    public int? lastComBy { get; set; }

    public int? uid { get; set; }

    public string uniqueID { get; set; }
  }

    public class LeadWithError
    {
        public List<Lead> Lead { get; set; }
        public string Msg { get; set; }
    }
    
}

namespace DTO
{
    public class SendSms
    {
        public long mobileNumber { get; set; }
        public string message { get; set; }
    }
}