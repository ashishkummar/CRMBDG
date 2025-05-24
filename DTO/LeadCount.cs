// Decompiled with JetBrains decompiler
// Type: DTO.LeadCount
// Assembly: DTO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 3491E077-F6DF-4776-AB95-098740D2860B
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DTO.dll

using System.Collections.Generic;

namespace DTO
{
  public class LeadCount
  {
    public List<DTO.Lead> Lead { get; set; }

    public List<int> LeadCounts { get; set; }
  }
}
