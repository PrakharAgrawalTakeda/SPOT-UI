using Microsoft.ProjectServer.Client;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Security;
using System.Runtime;
using System.Net;
using System.Data;

namespace Product_master
{
    class Program
    {
        #region Reading configuration
        /*Reading the configuration*/
        static string pwaPath = ConfigurationManager.AppSettings["ProjectServerUrl"].ToString();
        static string userName = System.Configuration.ConfigurationManager.AppSettings["UserNamePWA"].ToString();
        static string password = Decryption.DecryptValue(System.Configuration.ConfigurationManager.AppSettings["PasswordPWA"].ToString(), System.Configuration.ConfigurationManager.AppSettings["KEY"].ToString(), System.Configuration.ConfigurationManager.AppSettings["IV"].ToString());
        static string spList = System.Configuration.ConfigurationManager.AppSettings["SPListName"].ToString();
        #endregion
        static string[] databaseColumns = System.Configuration.ConfigurationManager.AppSettings["databaseColumnsSequence"].Split(';');
        static string[] sharepointColumns = System.Configuration.ConfigurationManager.AppSettings["sharepointColumnsSequence"].Split(';');
        static string[] multiSelectColumns = System.Configuration.ConfigurationManager.AppSettings["multiSelectColumns"].Split(';');

        static ClientContext clientContext;

        static void Main(string[] args)
        {
            Console.WriteLine("Console Started");
            clientContext = new ClientContext(pwaPath);
            if (pwaPath.Contains("sharepoint.com"))
            {
                SecureString securePassword = new SecureString();
                foreach (char c in password.ToCharArray())
                {
                    securePassword.AppendChar(c);
                }
                clientContext.Credentials = new SharePointOnlineCredentials(userName, securePassword);
            }
            else
            {
                clientContext.Credentials = new NetworkCredential(userName, password);
            }
            Console.WriteLine("User Credentials created");
            ReadSPList();
          //  Console.ReadLine();
        }

        //Read SP List - Product Master
        private static void ReadSPList()
        {
            try
            {
                DataBaseLogic dl = new DataBaseLogic();
                ListCollection listCollection = clientContext.Web.Lists;
                clientContext.Load(listCollection, lsts => lsts.Include(list => list.Title).Where(list => list.Title == spList));
                clientContext.ExecuteQuery();
                Console.WriteLine("User Credentials authenticated!..");
                Console.WriteLine("List Count"+listCollection.Count().ToString());
                if (listCollection.Count() > 0)
                {
                    var caml = new CamlQuery();

                    ListItemCollection items = listCollection[0].GetItems(caml);

                    clientContext.Load(items);
                    clientContext.ExecuteQuery();
                    Console.WriteLine("List Collection Loaded");
                    DataTable Listtodt = new DataTable();
                    foreach (var cell in databaseColumns)
                    {
                        Listtodt.Columns.Add(cell);
                    }
                   
                    Console.WriteLine("List table created");
              

                    if (items.Count() > 0)
                    {
                       
                        foreach (var listItem in items)
                        {
                            
                            DataRow dataRow = Listtodt.NewRow();
                            for (var i = 0; i < sharepointColumns.Length; i++)
                            {
                               // dataRow[i] = listItem[sharepointColumns[i]] != null ? listItem[sharepointColumns[i]].ToString() : "";
                                if (listItem[sharepointColumns[i]] != null)
                                {
                                    //if (sharepointColumns[i] == "DrugSubstance" || sharepointColumns[i] == "DrugProduct" || sharepointColumns[i] == "Packaging" ||
                                    //  sharepointColumns[i] == "Devices")
                                    if ( Array.Exists(multiSelectColumns, element => element == sharepointColumns[i]))                                    
                                        dataRow[i] = string.Join(",", ((string[])listItem[sharepointColumns[i]]));
                                    else
                                        dataRow[i] = listItem[sharepointColumns[i]].ToString();
                                }
                                else
                                    dataRow[i] = "";
                            }
                           
                            Console.WriteLine("List table rows added");
                           

                            Listtodt.Rows.Add(dataRow);
                        }

                        //execute sp to insert/update datatable in db
                        ParameterTbl p = new ParameterTbl();
                        p.ParameterDbType = SqlDbType.Structured;
                        p.ParameterName = "@ProductMasterListData";
                        p.ParameterValue = Listtodt;

                        List<ParameterTbl> plst = new List<ParameterTbl>();
                        plst.Add(p);
                        Console.WriteLine("Calling SP");
                        DataSet ds = dl.ExecuteStoredProcedure("usp_InsertProductMasterData", plst);
                        Console.WriteLine("SP Called");
                    }
                }
            }
            catch (Exception ex)
            {
                ErrorHandler.WriteErrorLog("ReadSPList", ex, "", 1);
                Console.WriteLine(ex.Message);
               // Console.ReadLine();
            }
        }
    }
}