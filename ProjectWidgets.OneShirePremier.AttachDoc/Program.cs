using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Security;
using Microsoft.SharePoint;
using Microsoft.SharePoint.Client;
using System.Data;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

namespace ProjectWidgets.OneShirePremier.AttachDoc
{
    public class Program
    {
        #region Reading configuration
        /*Reading the configuration*/
        static string SPsitePath = ConfigurationManager.AppSettings["SharepointSiteUrl"].ToString();
        static string userName = System.Configuration.ConfigurationManager.AppSettings["SPUserName"].ToString();
        static string password = Decryption.DecryptValue(System.Configuration.ConfigurationManager.AppSettings["SPPassword"].ToString(), System.Configuration.ConfigurationManager.AppSettings["KEY"].ToString(), System.Configuration.ConfigurationManager.AppSettings["IV"].ToString());
        static string spList = System.Configuration.ConfigurationManager.AppSettings["SPListName"].ToString();
        static string DocLibName = System.Configuration.ConfigurationManager.AppSettings["DocumnetLibraryName"].ToString();
        static string DeleteExisting = System.Configuration.ConfigurationManager.AppSettings["DeleteExisting"].ToString();
        static string tempLocation = Environment.CurrentDirectory + @"\Documents\";
        #endregion
        static void Main(string[] args)
        {
            try
            {
                #region Creating Client context
                var credentials = new NetworkCredential(userName, password);
                var ctx = new ClientContext(SPsitePath);
                Console.WriteLine("Console Started");
                //  ctx = new ClientContext(pwaPath);
                if (SPsitePath.Contains("sharepoint.com"))
                {
                    SecureString securePassword = new SecureString();
                    foreach (char c in password.ToCharArray())
                    {
                        securePassword.AppendChar(c);
                    }
                    ctx.Credentials = new SharePointOnlineCredentials(userName, securePassword);
                }
                else
                {
                    ctx.Credentials = new NetworkCredential(userName, password);
                }
                Console.WriteLine("User Credentials created");
                #endregion

                /*Reading the excel file and getting all the distinct values of Project id*/
                List<DocAttachmentExcel> docExcel = ReadExcel(ctx);
                var disProjIDs = docExcel.Select(o => o.ProjectID).Distinct();

                /*Getting the list and document library for the linking*/
                var list = ctx.Web.Lists.GetByTitle(spList);
                var library = ctx.Web.Lists.GetByTitle(DocLibName);

                /*Getting all the documnets from documnet library*/
                List<ListItemCollection> allDocsLst = new List<ListItemCollection>();
                IList<ListItem> allDocs = new List<ListItem>();
                //  ListItemCollection allDocs = new ListItemCollection();

                ListItemCollectionPosition position = null;
                int page = 1;
                do
                {
                    Console.WriteLine("Under do while to get the documents");
                    CamlQuery camlDocQuery = new CamlQuery();
                   // camlDocQuery.ViewXml = @"<View Scope=""RecursiveAll""><Query></Query><ViewFields><FieldRef Name=""Title"" /><FieldRef Name=""Modified"" /><FieldRef Name=""Editor"" /></ViewFields><RowLimit Paged=""TRUE"">1000</RowLimit></View>";
                      camlDocQuery.ViewXml = @"<View Scope='RecursiveAll'><Query></Query><RowLimit>5000</RowLimit></View>";

                    ///  camlDocQuery.ViewXml = @"<View Scope='RecursiveAll'><Query><Where><Contains><FieldRef Name='FileLeafRef' /><Value Type='File'>" + objFilterOfCurrentProj.Sourcepath + @"</Value></Contains></Where></Query><RowLimit>1000</RowLimit></View>";
                    // camlDocQuery.ViewXml = "<Where><Eq><FieldRef Name='FileLeafRef'/><Value Type='File'>" + objFilterOfCurrentProj.Sourcepath + "</Value></Eq></Where>";
                    camlDocQuery.ListItemCollectionPosition = position;
                    ListItemCollection itemsDoc = library.GetItems(camlDocQuery);
                    ctx.Load(itemsDoc);

                    ctx.ExecuteQuery();
                    allDocsLst.Add(itemsDoc);
                    position = itemsDoc.ListItemCollectionPosition;
                    page++;
                }
                while (position != null);
                foreach (ListItemCollection item in allDocsLst)
                {
                    foreach (ListItem newItem in item)
                    {
                                allDocs.Add(newItem);
                    }
                }


                /*Looping though all the dictinct project IDs from excel*/
                foreach (string currentProjectID in disProjIDs)
                {
                    try
                    {
                        /*Getting all the excel values with current Projet ID*/
                        var filterOfCurrentProj = docExcel.Where(d => d.ProjectID == currentProjectID);
                        if (DeleteExisting == "1")
                        {
                            /*If DeleteExisting flag in confirg is set to 1 then delete all the current attachments*/
                            foreach (var objFilterOfCurrentProj in filterOfCurrentProj)
                            {
                                try
                                {
                                    /*Loop will work on all the excel rows with currentProjectID*/
                                    CamlQuery delQuery = new CamlQuery();
                                    delQuery.ViewXml = "<View><Query><Where><And><Eq><FieldRef Name='Title'/><Value Type='Text'>" + objFilterOfCurrentProj.TitleInitiative + "</Value></Eq><Eq><FieldRef Name = 'Project_x0020_ID'/><Value Type = 'Number'>" + Convert.ToInt32(objFilterOfCurrentProj.ProjectID) + "</Value></Eq></And></Where></Query></View>";
                                    ListItemCollection delItems = list.GetItems(delQuery);
                                    ctx.Load(delItems);
                                    ctx.ExecuteQuery();
                                    if (delItems.Count > 0)
                                    {
                                        foreach (var objdeleteProj in delItems)
                                        {
                                            var listItem = list.GetItemById(objdeleteProj.Id);
                                            ctx.Load(listItem, li => li.AttachmentFiles);
                                            ctx.ExecuteQuery();
                                            listItem.AttachmentFiles.ToList().ForEach(a => a.DeleteObject());
                                            ctx.ExecuteQuery();
                                            ErrorHandler.WriteInfoLog("Main Method", "Existing documents get deleted for " + objFilterOfCurrentProj.ProjectID, 1);

                                        }
                                    }

                                }
                                catch (Exception ex)
                                {
                                    ErrorHandler.WriteErrorLog("Main method", ex, "Exception from Project ID" + objFilterOfCurrentProj.ProjectID + " " + ex.Message, 1);
                                    Console.WriteLine(ex.Message);
                                }
                            }
                            Console.WriteLine("Finish deleting Existing Documents for Project ID "+ currentProjectID);
                          //  Console.ReadLine();
                        }
                        Console.WriteLine("Starting attaching documents!!..");
                        foreach (var objFilterOfCurrentProj in filterOfCurrentProj)
                            {
                                Console.WriteLine("From Excel Proj ID" + currentProjectID.ToString());
                             
                                try
                                {
                                   CamlQuery attachQuery = new CamlQuery();
                                        attachQuery.ViewXml = "<View><Query><Where><And><Eq><FieldRef Name='Title'/><Value Type='Text'>" + objFilterOfCurrentProj.TitleInitiative + "</Value></Eq><Eq><FieldRef Name = 'Project_x0020_ID'/><Value Type = 'Number'>" + Convert.ToInt32(objFilterOfCurrentProj.ProjectID) + "</Value></Eq></And></Where></Query></View>";
                                        ListItemCollection lstItems = list.GetItems(attachQuery);
                                        ctx.Load(lstItems);

                                    ctx.ExecuteQuery();

                                    var result = allDocs.Where(x => x.FieldValues["FileLeafRef"].ToString().ToUpper().Contains(objFilterOfCurrentProj.Destinationpath.ToUpper())).ToList();

                                    if (lstItems.Count > 0 && result.Count > 0)
                                    {
                                        foreach (var lstItem in lstItems)
                                        {
                                            /*Loop will work on all the excel rows with currentProjectID*/
                                            foreach (ListItem doc in result)
                                            {
                                                try
                                                {
                                               
                                                /*Download document*/
                                                Microsoft.SharePoint.Client.File SP_file = library.GetItemById(doc.Id).File;
                                                ctx.Load(SP_file);
                                                ctx.ExecuteQuery();
                                             
                                                FileInformation fileInfo = Microsoft.SharePoint.Client.File.OpenBinaryDirect(ctx, SP_file.ServerRelativeUrl);
                                                ctx.ExecuteQuery();
                                                var filePath = tempLocation + SP_file.Name;

                                                var attachment = new AttachmentCreationInformation();
                                                //  var file = library.GetItemById(doc.Id).File;
                                                attachment.FileName = SP_file.Name;

                                                using (var fileStream = new System.IO.FileStream(filePath, System.IO.FileMode.Create))
                                                {
                                                    fileInfo.Stream.CopyTo(fileStream);
                                                  
                                                }
                                                attachment.ContentStream = new MemoryStream(System.IO.File.ReadAllBytes(filePath));

                                                Attachment att = lstItem.AttachmentFiles.Add(attachment); //Add to File

                                                ctx.Load(att);
                                                ctx.ExecuteQuery();
                                                ErrorHandler.WriteInfoLog("Main method", "document attached for Project id " + objFilterOfCurrentProj.ProjectID.ToString() + " Initiative " + objFilterOfCurrentProj.TitleInitiative + " Source Path" + objFilterOfCurrentProj.Destinationpath, 1);

                                                if (System.IO.File.Exists(filePath))
                                                {
                                                    // If file found, delete it    
                                                    System.IO.File.Delete(filePath);
                                                    Console.WriteLine("File deleted from local folder.");
                                                }
                                            }
                                            catch (Exception ex)
                                                {
                                                    ErrorHandler.WriteErrorLog("Main method", ex, "Exception from Project ID" + objFilterOfCurrentProj.ProjectID + " " + ex.Message, 1);
                                                    Console.WriteLine(ex.Message);
                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        ErrorHandler.WriteInfoLog("Main method", "No matching records found for Project Id " + objFilterOfCurrentProj.ProjectID.ToString() + " Initiative " + objFilterOfCurrentProj.TitleInitiative + " Source Path" + objFilterOfCurrentProj.Destinationpath, 1);
                                    }
                                }
                                catch (Exception ex)
                                {
                                    ErrorHandler.WriteErrorLog("Main method", ex, "Exception from Project ID" + objFilterOfCurrentProj.ProjectID + " " + ex.Message, 1);
                                    Console.WriteLine(ex.Message);
                                }
                            }
                        Console.WriteLine();
                    }
                    catch (Exception ex)
                    {
                        ErrorHandler.WriteErrorLog("Main method exception.", ex, ex.Message, 1);
                        Console.WriteLine(ex.Message);
                    }
                }
                /*If Delete Existing is 1 then delete all the existing attachments from the record.*/

                /*looping all the excel values with current project ID
                 read the corresponding values and attach document to teh record.*/
            }
            catch (Exception ex)
            {
                ErrorHandler.WriteErrorLog("Main method exception.", ex, ex.Message, 1);
                Console.WriteLine(ex.Message);
            }
        }


        public static List<DocAttachmentExcel> ReadExcel(ClientContext ctx)
        {
            var list = ctx.Web.Lists.GetByTitle(spList);
            var library = ctx.Web.Lists.GetByTitle(DocLibName);
            List<DocAttachmentExcel> lstDocInfo = new List<DocAttachmentExcel>();
            // DataTable dt = new DataTable();
            string destFile = Environment.CurrentDirectory + @"\Attachments BioLife EU Initiatives.xlsx";
            using (SpreadsheetDocument spreadsheetDocument = SpreadsheetDocument.Open(destFile, false))
            {
                Worksheet sheet = spreadsheetDocument.WorkbookPart.WorksheetParts.ElementAt(0).Worksheet;
                SheetData sheetData = sheet.GetFirstChild<SheetData>();
                WorkbookPart wbPart = spreadsheetDocument.WorkbookPart;

                foreach (Row row in sheetData.Elements<Row>())
                {
                    DocAttachmentExcel docinfo = new DocAttachmentExcel();
                    if (row.RowIndex != 1)
                    {
                        foreach (Cell cell in row.Elements<Cell>())
                        {
                            if (cell != null)
                            {
                                string value = ReadCellValue(cell, wbPart);
                                if (cell.CellReference.Value.StartsWith("A"))
                                {
                                    value = value.Replace("Documents/i", "");
                                    docinfo.Sourcepath = value.Replace("Documents/", "");
                                }
                                else if (cell.CellReference.Value.StartsWith("B"))
                                    docinfo.Destinationpath = value;
                                else if (cell.CellReference.Value.StartsWith("C"))
                                    docinfo.ProjectID = value.Replace("i", "");
                                else if (cell.CellReference.Value.StartsWith("E"))
                                    docinfo.TitleInitiative = value;
                            }
                        }
                        lstDocInfo.Add(docinfo);
                    }
                }
            }
            return lstDocInfo;
        }

        public static string ReadCellValue(Cell theCell, WorkbookPart wbPart)
        {
            string value = string.Empty;
            if (theCell != null)
            {
                value = theCell.InnerText;

                if (theCell.DataType != null)
                {
                    switch (theCell.DataType.Value)
                    {
                        case CellValues.SharedString:

                            // For shared strings, look up the value in the
                            // shared strings table.
                            var stringTable =
                                wbPart.GetPartsOfType<SharedStringTablePart>()
                                .FirstOrDefault();
                            if (stringTable != null)
                            {
                                value =
                                    stringTable.SharedStringTable
                                    .ElementAt(int.Parse(value)).InnerText;
                            }
                            break;

                        case CellValues.Boolean:
                            switch (value)
                            {
                                case "0":
                                    value = "FALSE";
                                    break;
                                default:
                                    value = "TRUE";
                                    break;
                            }
                            break;
                    }
                }
                else
                    value = theCell.InnerText;

            }
            return value;
        }
    }

    public class DocAttachmentExcel
    {
        public string Sourcepath { get; set; }
        public string Destinationpath { get; set; }
        public string ProjectID { get; set; }
        public string TitleInitiative { get; set; }
    }
}
