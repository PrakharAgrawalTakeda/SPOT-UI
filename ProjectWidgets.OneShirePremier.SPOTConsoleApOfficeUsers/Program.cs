using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ProjectWidgets.OneShirePremier.SPOTConsoleApOfficeUsers.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ProjectWidgets.OneShirePremier.SPOTConsoleApOfficeUsers
{
    class Program
    {
        public static DataTable dt2 = new DataTable();
        static void Main(string[] args)
        {
            GetToken();
        }

        public static void GetToken()
        {
            try
            {
                string postParameters;
                var clienttoken = "";
                string grant_type = "client_credentials";
                /* projectwidgets*/
                //string gstrAuthURL = "https://login.microsoftonline.com/projectwidgets1.onmicrosoft.com/oauth2/token";
                //string gstrClientID = "c080521c-47e5-4d35-8350-ae14aea40ab7";
                //string gstrClientCode = "ncNrjra5cwXFJhDw1DLuStfp9HhWhCDSQa4JmkZDZjw=";

                /* shire users*/
                //string gstrAuthURL = "https://login.microsoftonline.com/shirepharma.onmicrosoft.com/oauth2/token";
                //string gstrClientID = "3a146ef7-01ea-4453-b626-49ea840dc4be";
                //string gstrClientCode = "9Zd/Vo91tBuRT40XfXwwgPSaOzUtrjJlW27kj4eHzj4=";

                //demo
                //string gstrAuthURL = "https://login.microsoftonline.com/projectwidgets1.onmicrosoft.com/oauth2/token";
                //string gstrClientID = "cd1c0abc-af0b-4ba6-9a49-70070f844f43";
                //string gstrClientCode = "5O4VlpcuL6qkg/ix7c2fYxDR+D/c6psujb7kfmFyUAw=";

                //takeda


                //test
                //string gstrAuthURL = "https://login.microsoftonline.com/projectwidgets1.onmicrosoft.com/oauth2/token";
                //string gstrClientID = "8777e143-cf03-4153-a3dd-922a000cbd48";
                //string gstrClientCode = "oBD7mAhNJO5y6/0gHr.JnhuTajbGyM?.";



                string gstrResourceURL = "https://graph.microsoft.com";

                string gstrAuthURL = System.Configuration.ConfigurationManager.AppSettings["gstrAuthURL"].ToString();
                string gstrClientID = System.Configuration.ConfigurationManager.AppSettings["gstrClientID"].ToString();
                string gstrClientCode = System.Configuration.ConfigurationManager.AppSettings["gstrClientCode"].ToString();


                postParameters = "grant_type=" + grant_type + "&client_id=" + gstrClientID + "&client_secret=" + gstrClientCode + "&resource=" + gstrResourceURL + "&scope=User.ReadWrite.All";
                string result = TokenServiceCall(gstrAuthURL, postParameters);
                Newtonsoft.Json.Linq.JObject json = Newtonsoft.Json.Linq.JObject.Parse(result);
                var AccessToken = "";
                Console.WriteLine("console started");
                if (json.Count > 0)
                {
                    clienttoken = json["access_token"].ToString();
                    AccessToken = clienttoken;
                }
                string url = "https://graph.microsoft.com/v1.0/users?$select=id,displayName,mail,userPrincipalName,officeLocation,jobTitle,Department,Country,accountEnabled,objectType,userType,companyName&$filter=accountEnabled eq true";

                getAllUsers(AccessToken, url, 1);


            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException);
                Console.ReadLine();
            }

        }
        public static void getAllUsers(string accessToken, string url, int count)
        {
            //Console.WriteLine("accesstoken"+ accessToken);
            //JObject next100;
            var finalResult = "";
            string nextlink = "";

            try
            {
                var req = (HttpWebRequest)WebRequest.Create(url);

                req.Headers.Add(HttpRequestHeader.Authorization, "Bearer " + accessToken);
                var resp = (HttpWebResponse)req.GetResponse();
                var receiveStream = resp.GetResponseStream();
                var readStream = new StreamReader(receiveStream, Encoding.UTF8);
                var data = readStream.ReadToEnd();
                JObject json1 = JObject.Parse(data);
                nextlink = json1["@odata.nextLink"] != null ? json1["@odata.nextLink"].ToString() : null;
                List<JToken> listdata = json1["value"].Children().ToList();
                Console.WriteLine("Users Fetched");

                DataTable dt1 = (DataTable)JsonConvert.DeserializeObject(json1["value"].ToString(), (typeof(DataTable)));
                //var filteredData = dt1.Select("companyName = 'Technical Operations'");

                dt2.Merge(dt1);

                if (nextlink != null)
                {
                    count = count + 1;
                    getAllUsers(accessToken, nextlink, count);
                    Console.WriteLine("loop Count" + count);
                    // return next100;
                }
                else
                {
                    Console.WriteLine("No next link Latest");

                    var result1 = from r in dt2.AsEnumerable() select new { IsActive = 1, id = r["id"], displayName = r["displayName"], mail = r["mail"], userPrincipalName = r["userPrincipalName"], officeLocation = r["officeLocation"], jobTitle = r["jobTitle"], Department = r["Department"], Country = r["Country"], image = "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=" + r["mail"], companyName = r["companyName"] };
                    for (int x = 0; x < result1.Count(); x = x + 500)
                    {
                        var t = result1.Skip(x).Take(500);
                        var serailData = JsonConvert.SerializeObject(t);



                        DataSet ds = new DataSet(); // Create new Dataset

                        string spName = System.Configuration.ConfigurationManager.AppSettings["spName"].ToString();

                        try
                        {
                            if (serailData != null)
                            {
                                // var resultdata = JObject.Parse(serailData.ToString());
                                DataAccessClass objDataAccessClass = new DataAccessClass();

                                Parameter jsonParam = new Parameter();
                                jsonParam.ParameterName = "@UserInfo";
                                jsonParam.ParameterDbType = SqlDbType.VarChar;
                                jsonParam.ParameterValue = Convert.ToString(serailData);
                                List<Parameter> paramList = new List<Parameter>();

                                paramList.Add(jsonParam);

                                // ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateUserInfoShire", paramList);
                                //  ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateUserInfo", paramList);
                                ds = objDataAccessClass.ExecuteStoredProcedure(spName, paramList);

                            }

                        }
                        catch (Exception ex)
                        {
                            
                            Console.WriteLine("No next link "+ ex.Message);
                            Console.ReadLine();
                        }
                    }
                    Console.WriteLine("Latest Data Inserted");
                    Console.ReadLine();

                }

            }
            catch (Exception ex)
            {
                Console.WriteLine("GetToken" + ex.Message + nextlink + count + "");
                Console.ReadLine();
                //return next100;
            }

        }
        public static string TokenServiceCall(string serviceUrl, string parameters)
        {
            string responseText = string.Empty;
            try
            {
                var dataToSend = Encoding.UTF8.GetBytes(parameters);
                var req = System.Net.HttpWebRequest.Create(serviceUrl);

                req.ContentType = "application/x-www-form-urlencoded";



                req.Method = "POST";
                req.ContentLength = dataToSend.Length;
                req.GetRequestStream().Write(dataToSend, 0, dataToSend.Length);



                var response = req.GetResponse();
                var encodingType = ASCIIEncoding.UTF8;
                using (var reader = new System.IO.StreamReader(response.GetResponseStream(), encodingType))
                {
                    responseText = reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                
                Console.WriteLine("TokenServiceCall  "+ ex.Message + "");
                Console.ReadLine();
            }
            return responseText;
        }


    }
}
