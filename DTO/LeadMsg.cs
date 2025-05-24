// Decompiled with JetBrains decompiler
// Type: DTO.LeadMsg
// Assembly: DTO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 3491E077-F6DF-4776-AB95-098740D2860B
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DTO.dll

using System;

namespace DTO
{
  public class LeadMsg
  {
    public int comId { get; set; }

    public string postedBy { get; set; }

    public int postedByUID { get; set; }

    public string message { get; set; }

    public int comStatus { get; set; }

    public DateTime comDate { get; set; }
  }
}
