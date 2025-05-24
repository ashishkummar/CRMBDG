// Decompiled with JetBrains decompiler
// Type: BL.LeadFetch
// Assembly: BL, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 3C67953A-AAE6-4944-A4E7-6FF95D56B62B
// Assembly location: C:\D Drive\Development\GitHubRepos\LmsMvcAng\ngLMS\bin\BL.dll

using DTO;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Linq;

namespace BL
{
    public class LeadFetch
    {
        private static TimeZoneInfo INDIAN_ZONE = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
        public List<Lead> fetchFrom99Acer(string userId, string Password, DateTime from, DateTime to)
        {
            using (new WebClient())
            {
                string address = "https://www.99acres.com/99api/v1/getmy99Response/OeAuXClO43hwseaXEQ/uid/";
                WebClient webClient = new WebClient();
                //webClient.Headers.Add(HttpRequestHeader.UserAgent, "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; .NET CLR 1.0.3705;)");
                NameValueCollection data = new NameValueCollection();
                string str1 = userId.Trim();
                string str2 = Password.Trim();
                data["xml"] = "<?xml version='1.0'?><query><user_name>" + str1 + "</user_name><pswd>" + str2 + "</pswd><start_date>" + from.ToString("yyyy-MM-dd") + " 00:00:00</start_date><end_date>" + to.ToString("yyyy-MM-dd") + " 00:00:00</end_date></query>";
                string str3 = Encoding.UTF8.GetString(webClient.UploadValues(address, "POST", data));
                webClient.Dispose();
                string text = str3;
                if (str3.Contains("ActionStatus=\"false\""))
                    throw new Exception(XElement.Parse(text).Descendants().Select<XElement, XElement>((Func<XElement, XElement>)(p => p)).First<XElement>().Element((XName)"Message").Value);
                return this.XElementToDataTable(XElement.Parse(text));
            }
        }

        public List<Lead> fetchFromMagicBicks(int DDAPI, DateTime from, DateTime to)
        {
            string str1 = "hBe0raEQ92E~~~~~~3D";
            string str2 = "Po8gOSsBCDM~~~~~~3D";
            StreamReader streamReader = new StreamReader((WebRequest.Create("http://rating.magicbricks.com/mbRating/download.xml?key=" + (DDAPI == 1 ? str1 : str2) + "&startDate=" + from.ToString("yyyyMMdd") + "&endDate=" + to.ToString("yyyyMMdd")) as HttpWebRequest).GetResponse().GetResponseStream());
            string end = streamReader.ReadToEnd();
            streamReader.Close();
            string text = end;
            if (text.Contains("<status>error</status>"))
                throw new Exception(XElement.Parse(text).Element((XName)"errormsg").Value);
            return this.XElementToMagicDataTable(XElement.Parse(text));
        }

        public List<Lead> fetchFromHousing(DateTime from, DateTime to)
        {
            List<Lead> retObj = new List<Lead>();
            int epochFrom = (int)(from - new DateTime(1970, 1, 1)).TotalSeconds;
            int epochTo = (int)(to - new DateTime(1970, 1, 1)).TotalSeconds;
            int epochCurrent = (int)(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE) - new DateTime(1970, 1, 1)).TotalSeconds;
            string URLAuth = String.Format(@"https://leads.housing.com/api/v0/get-builder-leads?start_date={0}&end_date={1}&current_time={2}&hash={3}&id={4}"
                                           , epochFrom.ToString()
                                           , epochTo.ToString()
                                           , epochCurrent.ToString()
                                           , HashHMAC(epochCurrent.ToString())
                                           , ConfigurationManager.AppSettings["housingClientID"]);

            HttpWebRequest webRequest = WebRequest.Create(URLAuth) as HttpWebRequest;
            StreamReader responseReader = new StreamReader(
                  webRequest.GetResponse().GetResponseStream()
               );
            string resultXML = responseReader.ReadToEnd();
            responseReader.Close();
            List<HousingData> xmlStr = Newtonsoft.Json.JsonConvert.DeserializeObject<List<HousingData>>(resultXML);
            Lead obj = null;
            foreach (HousingData hd in xmlStr)
            {
                bool contains = retObj.Exists(x => x.leadContact == hd.lead_phone) ;
                if (!contains)
                {
                    obj = new Lead();
                    obj.leadName = hd.lead_name;
                    obj.leadEntryDate = UnixTimeStampToDateTime(hd.lead_date);
                    obj.leadEmail = hd.lead_email;
                    obj.leadContact = hd.lead_phone;
                    obj.leadType = "Individual";
                    obj.leadSource = "housing.com";
                    obj.uniqueID = hd.lead_date.ToString() + "-" + hd.lead_phone;
                    string Query = (hd.project_name != null ? "Project name: " + hd.project_name.ToString() : "Project name: " + GetProjectName(hd.flat_id));
                    Query = Query + ((hd.flat_id != 0 && hd.flat_id != null) ? " , Flat ID: " + hd.flat_id.ToString() : "");
                    Query = Query + (hd.locality != null ? " , locality: " + hd.locality.ToString() : "");
                    obj.leadQuery = Query;
                    retObj.Add(obj);
                }
            }
            return retObj;
        }

        public List<Lead> XElementToDataTable(XElement x)
        {
            List<Lead> leadList = new List<Lead>();
            XElement xelement1 = x.Descendants().Select<XElement, XElement>((Func<XElement, XElement>)(p => p)).First<XElement>();
            foreach (XElement xelement2 in x.Descendants((XName)xelement1.Name.ToString()).Select<XElement, XElement>((Func<XElement, XElement>)(p => p)))
            {
                if (!leadList.Exists(y => y.leadContact == xelement2.Element((XName)"CntctDtl").Element((XName)"Phone").Value))
                {
                    leadList.Add(new Lead()
                    {
                        leadName = xelement2.Element((XName)"CntctDtl").Element((XName)"Name").Value,
                        leadEmail = xelement2.Element((XName)"CntctDtl").Element((XName)"Email").Value,
                        leadContact = xelement2.Element((XName)"CntctDtl").Element((XName)"Phone").Value,
                        leadQuery = xelement2.Element((XName)"QryDtl").Element((XName)"CmpctLabl").Value + " " + xelement2.Element((XName)"QryDtl").Element((XName)"QryInfo").Value,
                        leadEntryDate = Convert.ToDateTime(xelement2.Element((XName)"QryDtl").Element((XName)"RcvdOn").Value),
                        leadSource = "99Acres",
                        leadType = "Individual",
                        uniqueID = xelement2.Element((XName)"QryDtl").Attribute((XName)"QueryId").Value
                    });
                }
            }
            return leadList;
        }

        public List<Lead> XElementToMagicDataTable(XElement x)
        {
            List<Lead> leadList = new List<Lead>();
            foreach (XContainer element in x.Elements((XName)"leads"))
            {
                foreach (XElement descendant in element.Descendants((XName)"lead"))
                {
                    string str1 = this.formatDate(descendant.Element((XName)"dt").Value) + " " + this.formatTime(descendant.Element((XName)"time").Value);
                    string str2 = descendant.Element((XName)"dt").Value + "-" + descendant.Element((XName)"time").Value + "-" + descendant.Element((XName)"mobile").Value;
                    if (!leadList.Exists(y => y.leadContact == descendant.Element((XName)"mobile").Value))
                    {
                        leadList.Add(new Lead()
                        {
                            leadName = descendant.Element((XName)"name").Value,
                            leadEmail = descendant.Element((XName)"email").Value,
                            leadContact = descendant.Element((XName)"mobile").Value,
                            leadQuery = descendant.Element((XName)"msg").Value,
                            leadEntryDate = Convert.ToDateTime(str1),
                            leadSource = "Magicbriks",
                            leadType = "Individual",
                            uniqueID = str2
                        });
                    }
                }
            }
            return leadList;
        }

        private static string HashHMAC(string message)
        {
            string key = ConfigurationManager.AppSettings["housingHashKey"];
            System.Text.ASCIIEncoding encoding = new System.Text.ASCIIEncoding();
            byte[] keyByte = encoding.GetBytes(key);

            HMACSHA256 hmacsha256 = new HMACSHA256(keyByte);

            byte[] messageBytes = encoding.GetBytes(message);
            MemoryStream stream = new MemoryStream(messageBytes);
            return hmacsha256.ComputeHash(stream).Aggregate("", (s, e) => s + String.Format("{0:x2}", e), s => s);
        }

        private string formatDate(string input)
        {
            return input.Substring(0, 4) + "-" + input.Substring(4, 2) + "-" + input.Substring(6, 2);
        }

        private string formatTime(string input)
        {
            return input.Substring(0, 2) + ":" + input.Substring(2, 2) + ":" + input.Substring(4, 2);
        }

        private static DateTime UnixTimeStampToDateTime(long unixTimeStamp)
        {
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddSeconds(unixTimeStamp);
            return dtDateTime;
        }

        private string GetProjectName(int? projectid)
        {
            switch (projectid)
            {
                case 194:
                    return "Garu Atulyam";
                case 19036:
                    return "16th Park View gaur yamuna city";
                case 53194:
                    return "32'nd Park View gaur yamuna city";
                case 43591:
                    return "2'nd Park View gaur yamuna city";
                default:
                    return "";
            }
        }

        public string getHousingURL(DateTime from, DateTime to)
        {
            List<Lead> retObj = new List<Lead>();
            int epochFrom = (int)(from - new DateTime(1970, 1, 1)).TotalSeconds;
            int epochTo = (int)(to - new DateTime(1970, 1, 1)).TotalSeconds;
            int epochCurrent = (int)(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, INDIAN_ZONE) - new DateTime(1970, 1, 1)).TotalSeconds;
            return String.Format(@"https://leads.housing.com/api/v0/get-builder-leads?start_date={0}&end_date={1}&current_time={2}&hash={3}&id={4}"
                                           , epochFrom.ToString()
                                           , epochTo.ToString()
                                           , epochCurrent.ToString()
                                           , HashHMAC(epochCurrent.ToString())
                                           , ConfigurationManager.AppSettings["housingClientID"]);

        }

        public string get99AcreUrl()
        {
            return "http://www.99acres.com/99api/v1/getmy99Response/OeAuXClO43hwseaXEQ/uid/";
        }
    }

    public class HousingData
    {
        public long lead_date { get; set; }
        public string lead_name { get; set; }
        public string lead_email { get; set; }
        public string lead_phone { get; set; }
        public int? flat_id { get; set; }
        public int? project_id { get; set; }
        public string project_name { get; set; }
        public string locality { get; set; }
    }
}
