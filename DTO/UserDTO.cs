// Decompiled with JetBrains decompiler
// Type: DTO.UserDTO
// Assembly: DTO, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 3491E077-F6DF-4776-AB95-098740D2860B
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\DTO.dll

using System;

namespace DTO
{
    public class UserDTO
    {
        public int id { get; set; }

        public string name { get; set; }

        public string userID { get; set; }

        public string contact { get; set; }

        public string email { get; set; }

        public string password { get; set; }

        public int role { get; set; }

        public bool status { get; set; }

        public DateTime createdDate { get; set; }
    }

   
}

namespace DTO
{
    public class PassReset
    {
        public int id { get; set; }
        public string oldpass { get; set; }
        public string newpass { get; set; }
    }
}
