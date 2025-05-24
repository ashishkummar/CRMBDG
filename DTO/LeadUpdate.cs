// Decompiled with JetBrains decompiler
// Type: DTO.LeadUpdate
// Assembly: DTO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 3491E077-F6DF-4776-AB95-098740D2860B
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DTO.dll

using System;

namespace DTO
{
  public class LeadUpdate
  {
    public int LeadID { get; set; }

    public int Status { get; set; }

    public DateTime? ReminderOn { get; set; }

    public int AssignID { get; set; }

    public string Message { get; set; }

    public int PostedBy { get; set; }
  }
}
