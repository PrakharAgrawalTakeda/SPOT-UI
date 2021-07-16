using System;
using System.IO;
using Microsoft.SharePoint.Client;
using System.Net;
using System.Security;
using System.Data;

namespace ProjectWidgets.BulkDocumentUpload
{
    class Program
    {
        static string pwaUrl = System.Configuration.ConfigurationManager.AppSettings["PWA_Url"].ToString();
         static string pwaUserName = System.Configuration.ConfigurationManager.AppSettings["PWA_UserName"].ToString();
        static string pwaPassword = System.Configuration.ConfigurationManager.AppSettings["PWA_Password"].ToString();
        static string key = System.Configuration.ConfigurationManager.AppSettings["KEY"].ToString();
        static string IVValue = System.Configuration.ConfigurationManager.AppSettings["IV"].ToString();
        static string filePath = System.Configuration.ConfigurationManager.AppSettings["LocalFilePath"].ToString();

        static void Main(string[] args)
        {
            DataAccessClass objDataAccess = new DataAccessClass();
            DataSet Ds= objDataAccess.ExecuteStoredProcedure("usp_getProjectSitesForDefaultDocument");
            foreach (DataRow row in Ds.Tables[0].Rows) 
            UploadDocumentOnline(row);
           
        }

        static void UploadDocumentOnline(DataRow row)
        {
            try
            {

                //string sourceUrl = objParameters.sourceURL;
                string docUrl = row["ProjectSiteURL"].ToString();
                string sourceUrl = filePath+row["ProblemTitle"]+".mpp";
                ClientContext context = new Microsoft.SharePoint.Client.ClientContext(docUrl);
                string UploadFieName = row["ProblemTitle"] + ".mpp";


                if (!System.IO.File.Exists(sourceUrl))
                { 
                    ErrorHandler.WriteInfoLog("UploadDocumentOnline", "Site url not exist for " + row["ProblemTitle"].ToString(), 1);
                    return;
                }


                // Prepare to upload
                String fileName = System.IO.Path.GetFileName(sourceUrl);
              //  FileStream fileStream = System.IO.File.OpenRead(sourceUrl);

             //   Stream filestream = GetFile(sourceUrl);
                using (ClientContext clientContext = context)
                {
                    if (pwaUrl.ToLower().Contains("sharepoint.com"))
                    {
                        clientContext.Credentials = new SharePointOnlineCredentials(pwaUserName, GetSecurePassword(Decryption.DecryptValue(pwaPassword, key, IVValue)));
                    }
                    else
                    {
                        clientContext.Credentials = new NetworkCredential(pwaUserName, GetSecurePassword(Decryption.DecryptValue(pwaPassword, key, IVValue)));
                    }
                    string libName = "Documents";
                    List list = clientContext.Web.Lists.GetByTitle(libName);
                    clientContext.Load(list.RootFolder);
                    clientContext.ExecuteQuery();
                    string a = list.RootFolder.ServerRelativeUrl.ToString() + "/" + fileName.Split('\\');
                    using (FileStream fileStream = System.IO.File.OpenRead(sourceUrl))
                    {
                        Microsoft.SharePoint.Client.File.SaveBinaryDirect(clientContext, list.RootFolder.ServerRelativeUrl.ToString() + "/" + UploadFieName, fileStream, true);
                    }

                    ErrorHandler.WriteInfoLog("UploadDocumentOnline", "Document uploaded for " + row["ProblemTitle"].ToString() + " Successfully!!..", 1);
                    //string corelationID = objDataAccess.CreateErrorLogs("UploadDataonline", ex);
                   
                }
              
            }
            catch (Exception ex)
            {
              //  ErrorHandler e = new ErrorHandler();
                ErrorHandler.WriteInfoLog("UploadDocumentOnline","Error in uploading the document for " + row["ProblemTitle"].ToString()+ "     "+ ex.Message,1);
                //string corelationID = objDataAccess.CreateErrorLogs("UploadDataonline", ex);
             //   return ex.Message + "UploadDataonline";
            }

        }

        static SecureString GetSecurePassword(string password)
        {
            SecureString securePassword = new SecureString();
            try
            {
                foreach (char c in password)
                {
                    securePassword.AppendChar(c);
                }
                return securePassword;
            }
            catch (Exception ex)
            {
                //objLogHandler.WriteErrorLog("GetSecurePassword", ex, "");
                return securePassword;
            }
        }

     }

}
