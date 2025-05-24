using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Configuration;

namespace Email
{
    public class SendEmail
    {

        public void sendEmailNow(string from, string pass, List<string> to,string subject,string body)
        {
            try{
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient("relay-hosting.secureserver.net");

                mail.From = new MailAddress(from);
                mail.To.Add(from);
                foreach (string s in to)
                mail.Bcc.Add(s);
                mail.Subject = subject ;
                mail.Body = body;
                mail.IsBodyHtml =false;
                SmtpServer.Port = 25;
                SmtpServer.Credentials = new System.Net.NetworkCredential(from, pass);
                SmtpServer.EnableSsl = false;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Send(mail);
            }
            catch (Exception)
            {
            }
        }
    }
}