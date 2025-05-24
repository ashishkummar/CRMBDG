using DTO;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class EmailBL
    {

        public List<Email> getEmailID()
        {
            List<Email> ret = new List<Email>();
            string[] emailDtl = ConfigurationManager.AppSettings["EmailDetails"].Split(';');

            foreach(string email in emailDtl)
            {
                string[] ar = { "||" };
                string[] em = email.Split(ar, StringSplitOptions.None);
                ret.Add(new Email() { EmailId = em[0] });
            }

            return ret;
        }
    }
}
