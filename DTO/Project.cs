using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Project
    {
        public int Project_ID { get; set; }
        public string Project_Name { get; set; }
        public string Project_Type { get; set; }
        public string Project_URL { get; set; }
        public string Project_File { get; set; }
        public DateTime Project_DOE { get; set; }
        public DateTime Project_Updated { get; set; }
        public string Project_Location { get; set; }
    }
}
