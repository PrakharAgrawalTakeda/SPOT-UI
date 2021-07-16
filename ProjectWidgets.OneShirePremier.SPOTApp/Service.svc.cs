using Microsoft.SharePoint.Client;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ProjectWidgets.OneShirePremier.SPOTApp.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Security;
using System.Text;

namespace ProjectWidgets.OneShirePremier.SPOTApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select Service.svc or Service.svc.cs at the Solution Explorer and start debugging.
    public class Service : IService
    {
        public static DataTable dt2 = new DataTable();
        DataAccessClass objDataAccessClass = new DataAccessClass();
        ErrorLog objErrorLog = new ErrorLog();
        #region general method
        public string GetData(int value)
        {
            return string.Format("You entered: {0}", value);
        }


        public String getUserData(string UserDepartment)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserDepartment";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(UserDepartment);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetUserData", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getUserData", ex, "UserDepartment " + UserDepartment);
            }
            return strJson;
        }

        public String getUserDataWithFilter(string UserDepartment, string FilterString)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserDepartment";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(UserDepartment);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@FilterString";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(FilterString);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetUserDataWithFilter", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getUserDataWithFilter", ex, "UserDepartment=" + UserDepartment + " FilterString=" + FilterString);
            }
            return strJson;
        }

        public String getUserDataWithFilterMultiple(string UserDepartment, string FilterString, string AlreadySearchedUser)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserDepartment";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(UserDepartment);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@FilterString";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(FilterString);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AlreadySearchedUser";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(AlreadySearchedUser);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetUserDataWithFilterMultiple", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getUserDataWithFilterMultiple", ex, "UserDepartment=" + UserDepartment + " FilterString=" + FilterString + " AlreadySearchedUser=" + AlreadySearchedUser);
            }
            return strJson;
        }

        public String GetUserForBulk(string UserDepartment)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserDepartment";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(UserDepartment);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetUserForBulk", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("GetUserForBulk", ex, "UserDepartment=" + UserDepartment);
            }
            return strJson;
        }

        public String getProjectList(string ProgramUID, bool linkToChild)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProgramUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProgramUID);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@linkToChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(linkToChild);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAllProjectProgramList", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectList", ex, "ProgramUID=" + ProgramUID + " linkToChild=" + linkToChild);
            }
            return strJson;
        }


        public String getAllProjectProgramListFilter(string programUID, string searchFor, string filterString)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProgramUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(programUID);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@searchFor";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = Convert.ToString(searchFor);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@FilterString";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = Convert.ToString(filterString);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAllProjectProgramListFilter", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectList", ex, "ProgramUID=" + programUID + " searchFor=" + searchFor + " filterString " + filterString);
            }
            return strJson;
        }

        public String getProductDataWithFilter(string filterString, string AlreadySearchedProduct)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@FilterString";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(filterString);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AlreadySearchedProduct";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(AlreadySearchedProduct == null ? "" : AlreadySearchedProduct);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProductDataWithFilter", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProductDataWithFilter", ex, "filterString=" + filterString + " AlreadySearchedProduct=" + AlreadySearchedProduct);
            }
            return strJson;
        }

        #endregion

        #region Method for Project Hub


        public String getCapitalPhase()
        {
            string strJson = string.Empty;
            try
            {
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetCapitalPhase");
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getCapitalPhase", ex, "No parameter");
            }
            return strJson;
        }

        public String getOverAllStatus(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetOverAllStatus", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getOverAllStatus", ex, "ProjectID= " + ProjectID);
            }
            return strJson;
        }

        public String getProjectHubStatus(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectHubStatus", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectHubStatus", ex, "ProjectID= " + ProjectID);
            }
            return strJson;
        }

        public String getProjectTeam(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectTeam", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectTeam", ex, "ProjectID= " + ProjectID);
            }
            return strJson;
        }

        public String insertOverAllStatus(string ProjectID, object objPerformance, object overAllStatusData, string userId)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                string InsertOverAllPerformance = "";
                string UpdateOverAllPerformance = "";
                string DeleteOverAllPerformance = "";

                string OverAllInfo = "";

                if (objPerformance != null)
                {
                    JToken performanceToken = JToken.Parse(objPerformance.ToString());

                    InsertOverAllPerformance = (performanceToken[0]["insert"]).ToString();
                    UpdateOverAllPerformance = performanceToken[0]["update"].ToString();
                    DeleteOverAllPerformance = performanceToken[0]["delete"].ToString();
                }

                /*Over All Performance*/
                Parameter jsonParamInsertPerformance = new Parameter();
                jsonParamInsertPerformance.ParameterName = "@InsertKeySuccess";
                jsonParamInsertPerformance.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertPerformance.ParameterValue = InsertOverAllPerformance;

                Parameter jsonParamUpdatePerformance = new Parameter();
                jsonParamUpdatePerformance.ParameterName = "@UpdateKeySuccess";
                jsonParamUpdatePerformance.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdatePerformance.ParameterValue = UpdateOverAllPerformance;

                Parameter jsonParamDeletePerformance = new Parameter();
                jsonParamDeletePerformance.ParameterName = "@DeleteKeySuccess";
                jsonParamDeletePerformance.ParameterDbType = SqlDbType.VarChar;
                jsonParamDeletePerformance.ParameterValue = DeleteOverAllPerformance;

                Parameter jsonParamUser = new Parameter();
                jsonParamUser.ParameterName = "@UserID";
                jsonParamUser.ParameterDbType = SqlDbType.VarChar;
                jsonParamUser.ParameterValue = userId;

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

               
               
                if (overAllStatusData != null)
                {
                    OverAllInfo = overAllStatusData.ToString();
                }
                Parameter jsonParam1 = new Parameter();
                jsonParam1.ParameterName = "@OverAllStatus";
                jsonParam1.ParameterDbType = SqlDbType.NVarChar;
                jsonParam1.ParameterValue = OverAllInfo;

                List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam1);
                    paramList.Add(jsonParam);
                    paramList.Add(jsonParamInsertPerformance);
                    paramList.Add(jsonParamUpdatePerformance);
                    paramList.Add(jsonParamDeletePerformance);
                    paramList.Add(jsonParamUser);

                    ds = dl.ExecuteStoredProcedure("usp_InsertOverAllStatus", paramList);
                
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertOverAllStatus", ex, "objOverAllStatus is an object");
            }

            return result;
        }

        public string insertProjectTeam(object objProjectTeam)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectTeam != null)
                {
                    var resultdata = JObject.Parse(objProjectTeam.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectTeam";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["ProjectTeam"]);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_InsertProjectTeam", paramList);
                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("insertProjectTeam", ex, "objProjectTeam is an object");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public string updateProjectTeamData(object objProjectTeam)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectTeam != null)
                {
                    var resultdata = JObject.Parse(objProjectTeam.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectTeam";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["ProjectTeam"]);

                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);

                    ds = dl.ExecuteStoredProcedure("usp_UpdateProjectTeam", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("updateProjectTeamData", ex, "objProjectTeam is an object");
            }
            return result;
        }

        public string deleteProjectTeamData(object objProjectTeam)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectTeam != null)
                {
                    var resultdata = JObject.Parse(objProjectTeam.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectTeam";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["ProjectTeam"]);

                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);

                    ds = dl.ExecuteStoredProcedure("usp_DeleteProjectTeam", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("deleteProjectTeamData", ex, "objProjectTeam is an object");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return result;
        }

        public String getAskNeed(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAskNeed", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getAskNeed", ex, "ProjectID= " + ProjectID);
            }
            return strJson;
        }

        public string insertAskNeed(object objAskNeedData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objAskNeedData != null)
                {

                    var resultdata = JObject.Parse(objAskNeedData.ToString());
                    // var resultdata = JObject.Parse("{\"askNeedData\": [{\"ProjectID\":\"56DB8B32-45B0-40DD-8DEE-A294E0D6C7BC\",\"AskNeed\":\"Ask and Need 2\",\"NeedFromID\":1,\"NeedFromName\":\"Ira Brown\",\"NeedByDate\":\"2018-08-08\",\"Comments\":\"Comments 2\",\"LogDate\":\"2018-08-08\",\"CloseDate\":\"2018-08-08\",\"IncludeInReport\":true}]\"}");
                    //var resultdata = objAskNeedData.ToString();
                    //JArray arr = JArray.Parse(objAskNeedData.ToString());
                    //var tasks = JsonConvert.DeserializeObject(resultdata["utmData"].ToString());
                    //System.Data.DataTable dtProjects = (System.Data.DataTable)JsonConvert.DeserializeObject(result["name"].ToString(), (typeof(System.Data.DataTable)));
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@AskNeed";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["askNeedData"]);
                    List<Parameter> paramList = new List<Parameter>();
                    #region for creating class object
                    /*      foreach (ProjectHubData objParameter in dtAskNeed)
                          {


                          

                              Parameter projectID = new Parameter();
                              projectID.ParameterName = "@ProjectID";
                              projectID.ParameterDbType = SqlDbType.VarChar;
                              projectID.ParameterValue = objParameter.ProjectID;

                              Parameter askNeed = new Parameter();
                              askNeed.ParameterName = "@AskNeed";
                              askNeed.ParameterDbType = SqlDbType.VarChar;
                              askNeed.ParameterValue = objParameter.AskNeed;

                              Parameter needFromID = new Parameter();
                              needFromID.ParameterName = "@NeedFromID";
                              needFromID.ParameterDbType = SqlDbType.Int;
                              needFromID.ParameterValue = objParameter.NeedFromID;

                              Parameter needFromName = new Parameter();
                              needFromName.ParameterName = "@NeedFromName"; 
                              needFromName.ParameterDbType = SqlDbType.VarChar;
                              needFromName.ParameterValue = objParameter.NeedFromName;

                              Parameter needByDate = new Parameter();
                              needByDate.ParameterName = "@NeedByDate";
                              needByDate.ParameterDbType = SqlDbType.NVarChar;
                              needByDate.ParameterValue =objParameter.NeedByDate==null?DBNull.Value.ToString():objParameter.NeedByDate;

                              Parameter comments = new Parameter();
                              comments.ParameterName = "@Comments";
                              comments.ParameterDbType = SqlDbType.NVarChar;
                              comments.ParameterValue = objParameter.Comments;

                              Parameter logDate = new Parameter();
                              logDate.ParameterName = "@LogDate";
                              logDate.ParameterDbType = SqlDbType.NVarChar;
                              logDate.ParameterValue = objParameter.LogDate == null ? DBNull.Value.ToString() : objParameter.LogDate;

                              Parameter closeDate = new Parameter();
                              closeDate.ParameterName = "@CloseDate";
                              closeDate.ParameterDbType = SqlDbType.NVarChar;
                              closeDate.ParameterValue = objParameter.CloseDate == null ? DBNull.Value.ToString() : objParameter.CloseDate; 

                              Parameter includeInReport = new Parameter();
                              includeInReport.ParameterName = "@IncludeInReport";
                              includeInReport.ParameterDbType = SqlDbType.Bit;
                              includeInReport.ParameterValue = objParameter.IncludeInReport;

                              paramList.Add(projectID);
                              paramList.Add(askNeed);
                              paramList.Add(needFromID);
                              paramList.Add(needFromName);
                              paramList.Add(needByDate);
                              paramList.Add(comments);
                              paramList.Add(logDate);
                              paramList.Add(closeDate);
                              paramList.Add(includeInReport);*/
                    #endregion

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_InsertAskNeed", paramList);
                    // }
                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertAskNeed", ex, "objAskNeedData is an object");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public string updateAskNeed(object objAskNeedData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objAskNeedData != null)
                {

                    var resultdata = JObject.Parse(objAskNeedData.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@AskNeed";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["askNeedData"]);
                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_UpdateAskNeed", paramList);
                    // }
                }



                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("updateAskNeed", ex, "objAskNeedData is an object");
            }

            return result;
        }

        public string deleteAskNeed(object objAskNeedData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objAskNeedData != null)
                {
                    var resultdata = JObject.Parse(objAskNeedData.ToString());
                    //   List<ProjectHubData> dtAskNeed = (List<ProjectHubData>)JsonConvert.DeserializeObject(resultdata["askNeedData"].ToString(), (typeof(List<ProjectHubData>)));
                    DataAccessClass dl = new DataAccessClass();
                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@AskNeed";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["askNeedData"]);
                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_DeleteAskNeed", paramList);

                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("deleteAskNeed", ex, "objAskNeedData is an object");
            }

            return result;
        }

        public String getPhaseState(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetPhaseState", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getPhaseState", ex, "ProjectID= " + ProjectID);
            }
            return strJson;
        }

        public string insertPhaseState(object objPhaseState)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objPhaseState != null)
                {

                    var resultdata = JObject.Parse(objPhaseState.ToString());

                    // List<ProjectHubData> dtAskNeed = (List<ProjectHubData>)JsonConvert.DeserializeObject(resultdata["PhaseState"].ToString(), (typeof(List<ProjectHubData>)));
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@PhaseState";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["PhaseState"]);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_InsertPhaseState", paramList);
                    // }
                }



                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertPhaseState", ex, "objPhaseState is an object.");
            }

            return result;
        }

        public String getProjectTOPS(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetTOPS", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getProjectTOPS", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }

        public String getKPIData(string kpi, string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@KPI";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = kpi;

                Parameter jsonProj = new Parameter();
                jsonProj.ParameterName = "@ProjectID";
                jsonProj.ParameterDbType = SqlDbType.VarChar;
                jsonProj.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);
                paramList.Add(jsonProj);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetKPI", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getKPIData", ex, "ProjectID=" + ProjectID + " kpi=" + kpi);
            }
            return strJson;
        }

        public String getHubSetting(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {

                Parameter jsonProj = new Parameter();
                jsonProj.ParameterName = "@ProjectID";
                jsonProj.ParameterDbType = SqlDbType.VarChar;
                jsonProj.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonProj);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetHubSetting", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getHubSetting", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }

        public String insertUpdateTOPS(object TOPS, object TOPSKPI)
        {
            string tops = "";
            string topskpi = "";
            string strJson = string.Empty;
            try
            {
                if (TOPS != null)
                {
                    tops = TOPS.ToString();

                }


                if (TOPSKPI != null)
                {
                    topskpi = TOPSKPI.ToString();

                }

                Parameter jsonTOPS = new Parameter();
                jsonTOPS.ParameterName = "@TOPS";
                jsonTOPS.ParameterDbType = SqlDbType.NVarChar;
                jsonTOPS.ParameterValue = tops;

                Parameter jsonTOPSKPI = new Parameter();
                jsonTOPSKPI.ParameterName = "@TOPSKPI";
                jsonTOPSKPI.ParameterDbType = SqlDbType.NVarChar;
                jsonTOPSKPI.ParameterValue = topskpi;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonTOPS);
                paramList.Add(jsonTOPSKPI);
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateTOPS", paramList);
                // string strJson = JsonConvert.SerializeObject(ds.Tables[0]);
                //return strJson;
                strJson = "Success";
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertUpdateTOPS", ex, "Parameters are object.");
            }
            return strJson;
        }
        public String insertUpdateCAPS(string ProjectID, object Capsdata, object Capsgrid, object CapsWaterWaste)
        {
            string caps = "";
            string capsGridData = "";
            string strJson = string.Empty;
            string InsertCapsWaterWaste = "";
            string UpdateCapsWaterWaste = "";
            string DeleteCapsWaterWaste = "";
            try
            {
                if (Capsdata != null)
                {
                    caps = Capsdata.ToString();
                }
                if (Capsgrid != null)
                {
                    capsGridData = Capsgrid.ToString();
                }
                if (CapsWaterWaste != null)
                {
                    JToken CapsWaterWasteToken = JToken.Parse(CapsWaterWaste.ToString());

                    InsertCapsWaterWaste = CapsWaterWasteToken["insert"].ToString();
                    UpdateCapsWaterWaste = CapsWaterWasteToken["update"].ToString();
                    DeleteCapsWaterWaste = CapsWaterWasteToken["delete"].ToString();
                }
                Parameter jsonProj = new Parameter();
                jsonProj.ParameterName = "@ProjectID";
                jsonProj.ParameterDbType = SqlDbType.VarChar;
                jsonProj.ParameterValue = ProjectID;

                Parameter jsonCAPS = new Parameter();
                jsonCAPS.ParameterName = "@Capsdata";
                jsonCAPS.ParameterDbType = SqlDbType.VarChar;
                jsonCAPS.ParameterValue = caps;

                Parameter jsonCAPSGridData = new Parameter();
                jsonCAPSGridData.ParameterName = "@CapsImpactData";
                jsonCAPSGridData.ParameterDbType = SqlDbType.NVarChar;
                jsonCAPSGridData.ParameterValue = capsGridData;

                /*Water and Waste*/
                Parameter jsonParamInsertWaterWaste = new Parameter();
                jsonParamInsertWaterWaste.ParameterName = "@InsertWaterWaste";
                jsonParamInsertWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertWaterWaste.ParameterValue = InsertCapsWaterWaste;

                Parameter jsonParamUpdateWaterWaste = new Parameter();
                jsonParamUpdateWaterWaste.ParameterName = "@UpdateWaterWaste";
                jsonParamUpdateWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateWaterWaste.ParameterValue = UpdateCapsWaterWaste;

                Parameter jsonParamDeleteWaterWaste = new Parameter();
                jsonParamDeleteWaterWaste.ParameterName = "@DeleteWaterWaste";
                jsonParamDeleteWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteWaterWaste.ParameterValue = DeleteCapsWaterWaste;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonProj);
                paramList.Add(jsonCAPS);
                paramList.Add(jsonCAPSGridData);
                paramList.Add(jsonParamInsertWaterWaste);
                paramList.Add(jsonParamUpdateWaterWaste);
                paramList.Add(jsonParamDeleteWaterWaste);
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateCAPS", paramList);
                // string strJson = JsonConvert.SerializeObject(ds.Tables[0]);
                //return strJson;
                strJson = "Success";
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertUpdateCAPS", ex, "Parameters are object.");
            }
            return strJson;
        }
        public String InsertUpdateHubSetting(object objHubSetting)
        {
            string hubsetting = "";
            string strJson = string.Empty;
            try
            {

                if (objHubSetting != null)
                {
                    hubsetting = objHubSetting.ToString();

                }


                Parameter jsonHub = new Parameter();
                jsonHub.ParameterName = "@HubSetting";
                jsonHub.ParameterDbType = SqlDbType.VarChar;
                jsonHub.ParameterValue = hubsetting;


                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonHub);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateHubSetting", paramList);
                // string strJson = JsonConvert.SerializeObject(ds.Tables[0]);
                strJson = "Success";
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("InsertUpdateHubSetting", ex, "Parameters are object.");
            }
            return strJson;
        }

        public String getPortfolioDeliverablesStatus(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetPortfolioDeliverablesStatus", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getPortfolioDeliverablesStatus", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }
        public String getYearLabel()
        {
            string strJson = string.Empty;
            try
            {
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_getYearLabel");
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getYearLabel", ex, "");
            }
            return strJson;
            

        }
        public String updateProjectBudget(string ProjectID, object objBudgetData, object objCapexGridData, object objCapexGridDataY1, object objOpexGridData, object objOpexGridDataY1, object objBudgetIO, object objBudgetIODelete)
        {
            string result = "";
            string BudgetData = "";
            string CapexGridData = "";
            string CapexGridDataY1 = "";
            string OpexGridData = "";
            string OpexGridDataY1 = "";
            string BudgetIO = "";
            string BudgetIODelete = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objBudgetData != null)
                {
                    BudgetData = objBudgetData.ToString();
                }
                if (objCapexGridData != null)
                {
                    CapexGridData = objCapexGridData.ToString();
                }
                if (objCapexGridDataY1 != null)
                {
                    CapexGridDataY1 = objCapexGridDataY1.ToString();
                }
                if (objOpexGridData != null)
                {
                    OpexGridData = objOpexGridData.ToString();
                }
                if (objOpexGridDataY1 != null)
                {
                    OpexGridDataY1 = objOpexGridDataY1.ToString();
                }
                if (objBudgetIO != null)
                {
                    BudgetIO = objBudgetIO.ToString();
                }
                if (objBudgetIODelete != null)
                {
                    BudgetIODelete = objBudgetIODelete.ToString();
                }

                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;

                Parameter jsonBudgetData = new Parameter();
                jsonBudgetData.ParameterName = "@BudgetData";
                jsonBudgetData.ParameterDbType = SqlDbType.NVarChar;
                jsonBudgetData.ParameterValue = BudgetData;

                Parameter jsonCapexData = new Parameter();
                jsonCapexData.ParameterName = "@CapexGridData";
                jsonCapexData.ParameterDbType = SqlDbType.VarChar;
                jsonCapexData.ParameterValue = CapexGridData;

                Parameter jsonCapexDataY1 = new Parameter();
                jsonCapexDataY1.ParameterName = "@CapexGridDataY1";
                jsonCapexDataY1.ParameterDbType = SqlDbType.VarChar;
                jsonCapexDataY1.ParameterValue = CapexGridDataY1;

                Parameter jsonOpexData = new Parameter();
                jsonOpexData.ParameterName = "@OpexGridData";
                jsonOpexData.ParameterDbType = SqlDbType.VarChar;
                jsonOpexData.ParameterValue = OpexGridData;

                Parameter jsonOpexDataY1 = new Parameter();
                jsonOpexDataY1.ParameterName = "@OpexGridDataY1";
                jsonOpexDataY1.ParameterDbType = SqlDbType.VarChar;
                jsonOpexDataY1.ParameterValue = OpexGridDataY1;

                Parameter jsonBudgetIO = new Parameter();
                jsonBudgetIO.ParameterName = "@BudgetIO";
                jsonBudgetIO.ParameterDbType = SqlDbType.NVarChar;
                jsonBudgetIO.ParameterValue = BudgetIO;

                Parameter jsonBudgetIODelete = new Parameter();
                jsonBudgetIODelete.ParameterName = "@BudgetIODelete ";
                jsonBudgetIODelete.ParameterDbType = SqlDbType.VarChar;
                jsonBudgetIODelete.ParameterValue = BudgetIODelete;


                paramList.Add(jsonProjectID);
                paramList.Add(jsonBudgetData);
                paramList.Add(jsonCapexData);
                paramList.Add(jsonCapexDataY1);
                paramList.Add(jsonOpexData);
                paramList.Add(jsonOpexDataY1);
                paramList.Add(jsonBudgetIO);
                paramList.Add(jsonBudgetIODelete);

                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateProjectBudget", paramList);

                result = "Success";


            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("updateProjectBudget", ex, "ProjectID " + ProjectID);
            }
            return result;
        }


        #region Schedule
        public String getSchedule(string ProjectID)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetSchedule", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getSchedule", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getProjectBaseline(string ProjectID)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectBaseline", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectBaseline", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public string insertScheduleData(object objSchedule)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objSchedule != null)
                {
                    var resultdata = JObject.Parse(objSchedule.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@Schedule";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["scheduleData"]);


                    Parameter jsonUserID = new Parameter();
                    jsonUserID.ParameterName = "@UserID";
                    jsonUserID.ParameterDbType = SqlDbType.VarChar;
                    jsonUserID.ParameterValue = Convert.ToString(resultdata["userId"]);


                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);
                    paramList.Add(jsonUserID);

                    ds = dl.ExecuteStoredProcedure("usp_InsertSchedule", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertScheduleData", ex, "Parameter is an object.");
            }
            return result;
        }

        public string insertProjectBaseline(object objBaseline)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objBaseline != null)
                {
                    var resultdata = JObject.Parse(objBaseline.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectBaseline";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["BaselineData"]);

                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);

                    ds = dl.ExecuteStoredProcedure("usp_InsertUpdateProjectBaseline", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertProjectBaseline", ex, "Parameter is an object.");

                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return result;
        }

        public string updateScheduleData(object objSchedule)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objSchedule != null)
                {
                    var resultdata = JObject.Parse(objSchedule.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@Schedule";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["scheduleData"]);

                    Parameter jsonUserID = new Parameter();
                    jsonUserID.ParameterName = "@UserID";
                    jsonUserID.ParameterDbType = SqlDbType.VarChar;
                    jsonUserID.ParameterValue = Convert.ToString(resultdata["userId"]);

                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);
                    paramList.Add(jsonUserID);

                    ds = dl.ExecuteStoredProcedure("usp_UpdateSchedule", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("updateScheduleData", ex, "Parameter is an object.");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return result;
        }

        public string deleteScheduleData(object objSchedule)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objSchedule != null)
                {
                    var resultdata = JObject.Parse(objSchedule.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@Schedule";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["scheduleData"]);

                    Parameter jsonUserID = new Parameter();
                    jsonUserID.ParameterName = "@UserID";
                    jsonUserID.ParameterDbType = SqlDbType.VarChar;
                    jsonUserID.ParameterValue = Convert.ToString(resultdata["userId"]);

                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);
                    paramList.Add(jsonUserID);

                    ds = dl.ExecuteStoredProcedure("usp_DeleteSchedule", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("deleteScheduleData", ex, "Parameter is an object.");

                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return result;
        }

        public String getProjectBaselineLog(string ProjectID)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectBaselineLog", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectBaselineLog", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }
        public String getMilestoneSetProjectHub(string ProjectID,string DataType)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);
                paramList.Add(jsonParam);
                Parameter jsonParamType = new Parameter();
                jsonParamType.ParameterName = "@DataType";
                jsonParamType.ParameterDbType = SqlDbType.VarChar;
                jsonParamType.ParameterValue = DataType;
                paramList.Add(jsonParamType);
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetMilestoneSetProjectHub", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getMilestoneSetProjectHub", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }
    
        #endregion

        #region Risk and Issue
        public String getRiskIssue(string ProjectID)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetRiskIssue", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getRiskIssue", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }

        //public String getRiskIssue()
        //{
        //    DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetRiskIssue");
        //    string strJson = JsonConvert.SerializeObject(ds.Tables[0]);
        //    return strJson;
        //}

        public string insertRiskIssueData(object objRiskIssueData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objRiskIssueData != null)
                {
                    var resultdata = JObject.Parse(objRiskIssueData.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@RiskIssue";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["riskIssueData"]);

                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);

                    ds = dl.ExecuteStoredProcedure("usp_InsertRiskIssue", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertRiskIssueData", ex, "Parameter is an object.");
            }

            //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
            //return errormessage + "InsertProjectHubData, " + corelationID;
            return result;
        }


        public string updateRiskIssueData(object objRiskIssueData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objRiskIssueData != null)
                {
                    var resultdata = JObject.Parse(objRiskIssueData.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@RiskIssue";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["riskIssueData"]);

                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);

                    ds = dl.ExecuteStoredProcedure("usp_UpdateRiskIssue", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("updateRiskIssueData", ex, "Parameter is an object.");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return result;
        }

        public string deleteRiskIssueData(object objRiskIssueData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objRiskIssueData != null)
                {
                    var resultdata = JObject.Parse(objRiskIssueData.ToString());
                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@RiskIssue";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["riskIssueData"]);

                    List<Parameter> paramList = new List<Parameter>();
                    paramList.Add(jsonParam);

                    ds = dl.ExecuteStoredProcedure("usp_DeleteRiskIssue", paramList);
                }

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("deleteRiskIssueData", ex, "Parameter is an object.");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return result;
        }
        #endregion
        #endregion

        #region for Portfolio Center
        public String getAllProjectListFilterMultiple(string SearchFor, string FilterString, string AlreadySearchedProject, string UserAdId)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@SearchFor";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(SearchFor);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@FilterString";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = Convert.ToString(FilterString);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AlreadySearchedProject";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = Convert.ToString(AlreadySearchedProject);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(UserAdId);
                paramList.Add(jsonParam);


                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAllProjectListFilterMultiple", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getAllProjectListFilterMultiple", ex, "SearchFor=" + SearchFor + "FilterString= " + FilterString + "AlreadySearchedProject=" + AlreadySearchedProject + "UserAdId" + UserAdId);
            }
            return strJson;
        }

        public string getAllProjectInfo(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
            string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
            string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
            string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, 
            string strTopsGroupfilter,string strGMSBudgetOwnerfilter,string strAnnualMustWinfilter,string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;
                //paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);


                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAllProjectInfo", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getAllProjectInfo", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);
            }
            return result;
        }


        public string getAllProjectInfoWithLocalVar(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
           string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
           string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
           string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI,
           string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                //paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);


                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAllProjectInfoWithLocalVar", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("GetAllProjectInfoWithLocalVar", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);
            }
            return result;
        }

        public string getPortfolioCenterTileInfo(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
            string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
            string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
            string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI,
            string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {

            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                //paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter== null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetPortfoliTileInfo", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

                return result;
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getPortfolioCenterTileInfo", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);
            }
            return result;
        }

        public string getAllMilestonesPortfolioCenter(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
            string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
            string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
            string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, 
            string strPrimaryKPI,string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                //paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);


                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAllMilestonesPortfolioCenter", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

                return result;
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getAllMilestonesPortfolioCenter", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);

            }
            return result;
        }

        public string getRiskIssuePortfolio(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
          string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
          string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
          string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI,
          string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                //paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetRiskIssuePortfolioCenter", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

                return result;
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getRiskIssuePortfolio", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);
            }
            return result;
        }

        public string getAskNeedPortfolio(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
          string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
          string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
          string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI,
          string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                //paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);


                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAskNeedPortfolioCenter", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

                return result;
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getAskNeedPortfolio", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);

            }
            return result;
        }

        public string getPhasePriorityDataPortfolio(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
       string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
       string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
       string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI,
       string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                //paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);
                
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetPortfolioPhasePriorty", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

                return result;
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getPhasePriorityDataPortfolio", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);

            }
            return result;
        }


        public string getBudgetChartData(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
   string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
   string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
   string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI,
   string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                //paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_getBudgetChartData", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

                return result;
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getBudgetChartData", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);

            }
            return result;
        }

        public string getPortfolioBudgetForecastData(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
    string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
    string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
    string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI,
    string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                //paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);


                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.VarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);


                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetPortfolioBudgetForecastData", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getPortfolioBudgetForecastData", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);
            }
            return result;
        }

        public string getPortfolioBudgetCummulativeData(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
    string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
    string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter, string strProjectTypefilter,
    string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI,
    string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter)
        {
            string result = string.Empty;
            string strLocalVariable = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strUserAdId == null ? "" : strUserAdId;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@IsCapsProjectfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIsCAPSProjectfilter == null ? "" : strIsCAPSProjectfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ExecutionScopeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strExecutionScopeFilter == null ? "" : strExecutionScopeFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@OEProjectTypeFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOETypefilter == null ? "" : strOETypefilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PhaseFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectPhaseFilter == null ? "" : strProjectPhaseFilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StateFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectStatusfilter == null ? "" : strProjectStatusfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PrimaryProductfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryProductfilter == null ? "" : strPrimaryProductfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@PortfolioOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPortfolioOwnerfilter == null ? "" : strPortfolioOwnerfilter;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@Peoplefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = struserFilter == null ? "" : struserFilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capexfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapexRangefilter == null ? "" : strCapexRangefilter;

                paramList.Add(jsonParam);
                //jsonParam = new Parameter();
                //jsonParam.ParameterName = "@projectIDfilter";
                //jsonParam.ParameterDbType = SqlDbType.VarChar;
                //jsonParam.ParameterValue = strProjectIDfilter == null ? "" : strProjectIDfilter;

                //paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@parentProgramfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strParentProgramfilter == null ? "" : strParentProgramfilter;

                paramList.Add(jsonParam);
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@fundingStatusFilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strFundingStatusFilter == null ? "" : strFundingStatusFilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@projectTypefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strProjectTypefilter == null ? "" : strProjectTypefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeChild";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strIncludeChild == null ? "" : strIncludeChild;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@capitalPhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strCapPhasefilter == null ? "" : strCapPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@oePhasefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strOEPhasefilter == null ? "" : strOEPhasefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWrkStreamfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWrkStreamfilter == null ? "" : strAglWrkStreamfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@aglWavefilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAglWavefilter == null ? "" : strAglWavefilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@primaryKPIfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strPrimaryKPI == null ? "" : strPrimaryKPI;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@topsGroupfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strTopsGroupfilter == null ? "" : strTopsGroupfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@budgetOwnerfilter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strGMSBudgetOwnerfilter == null ? "" : strGMSBudgetOwnerfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@StrategicYearID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strStrategicYearfilter == null ? "" : strStrategicYearfilter;
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@AnnualMustWinID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = strAnnualMustWinfilter == null ? "" : strAnnualMustWinfilter;
                paramList.Add(jsonParam);

                if (objLocalVariable != null)
                {
                    strLocalVariable = objLocalVariable.ToString();

                }

                Parameter jsonLocalVariable = new Parameter();
                jsonLocalVariable.ParameterName = "@LocalVariableData";
                jsonLocalVariable.ParameterDbType = SqlDbType.NVarChar;
                jsonLocalVariable.ParameterValue = strLocalVariable;
                paramList.Add(jsonLocalVariable);


                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetPortfolioBudgetCummulativeData", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getPortfolioBudgetCummulativeData", ex, "strUserAdId=" + strUserAdId + " strIsCAPSProjectfilter=" + strIsCAPSProjectfilter + " strExecutionScopeFilter=" + strExecutionScopeFilter + " strOETypefilter=" + strOETypefilter + " strProjectPhaseFilter=" + strProjectPhaseFilter + " strProjectStatusfilter=" + strProjectStatusfilter + "strPrimaryProductfilter=" + strPrimaryProductfilter + " strPortfolioOwnerfilter=" + strPortfolioOwnerfilter + " struserFilter=" + struserFilter + " strCapexRangefilter" + strCapexRangefilter);
            }
            return result;
        }

        public string insertUpdateProtfolioBudget(object objCapexGridData, string strSubmittedByID)
        {
            string result = string.Empty;
            string strCapexGridData = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                if (objCapexGridData != null)
                {
                    strCapexGridData = objCapexGridData.ToString();
                }

                Parameter jsonCapexGridData = new Parameter();
                jsonCapexGridData.ParameterName = "@CapexGridData";
                jsonCapexGridData.ParameterDbType = SqlDbType.VarChar;
                jsonCapexGridData.ParameterValue = strCapexGridData;
                paramList.Add(jsonCapexGridData);

                Parameter jsonSubmittedByID = new Parameter();
                jsonSubmittedByID.ParameterName = "@SubmittedByID";
                jsonSubmittedByID.ParameterDbType = SqlDbType.VarChar;
                jsonSubmittedByID.ParameterValue = strSubmittedByID;
                paramList.Add(jsonSubmittedByID);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateProtfolioBudget", paramList);
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertUpdateProtfolioBudget", ex, "strSubmittedByID=" + strSubmittedByID + " objCapexGridData is an object");
            }
            return result;
        }

        public string exportProjectViewToExcel(object objProjectIDs)
        {
            string result = "";
            string ProjectIDs = string.Empty;
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectIDs != null)
                {
                    ProjectIDs = objProjectIDs.ToString();

                }

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectIds";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectIDs;
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetV_XLD_PROJECTSData", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("exportProjectViewToExcel", ex, "objProjectIDs is an object");
            }

            return result;
        }

        public string exportMilestoneViewToExcel(object objProjectIDs)
        {
            string result = "";
            string ProjectIDs = string.Empty;
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectIDs != null)
                {
                    ProjectIDs = objProjectIDs.ToString();

                }

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectIds";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectIDs;
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetV_XLD_MILESTONESData", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("exportMilestoneViewToExcel", ex, "objProjectIDs is an object");
            }

            return result;
        }

        public string exportIssuesRisksViewToExcel(object objProjectIDs)
        {
            string result = "";
            string ProjectIDs = string.Empty;
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectIDs != null)
                {
                    ProjectIDs = objProjectIDs.ToString();

                }

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectIds";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectIDs;
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetV_XLD_RISKISSUE", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("exportIssuesRisksViewToExcel", ex, "objProjectIDs is an object");
            }

            return result;
        }

        public string exportAsksNeedsViewToExcel(object objProjectIDs)
        {
            string result = "";
            string ProjectIDs = string.Empty;
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectIDs != null)
                {
                    ProjectIDs = objProjectIDs.ToString();

                }

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectIds";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectIDs;
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetV_XLD_ASKNEED", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("exportAsksNeedsViewToExcel", ex, "objProjectIDs is an object");
            }

            return result;
        }

        public string exportBusinessCaseOptionsViewToExcel(object objProjectIDs)
        {
            string result = "";
            string ProjectIDs = string.Empty;
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectIDs != null)
                {
                    ProjectIDs = objProjectIDs.ToString();

                }

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectIds";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectIDs;
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetV_XLD_BUSINESSCASEOPTIONS", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("exportBusinessCaseOptionsViewToExcel", ex, "objProjectIDs is an object");
            }

            return result;
        }
        public string exportTopsViewToExcel(object objProjectIDs)
        {
            string result = "";
            string ProjectIDs = string.Empty;
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectIDs != null)
                {
                    ProjectIDs = objProjectIDs.ToString();

                }

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectIds";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectIDs;
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetV_XLD_TOPS", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("exportTopsViewToExcel", ex, "objProjectIDs is an object");
            }

            return result;
        }

        public string exportBudgetCapitalGeneralToExcel(object objProjectIDs)
        {
            string result = "";
            string ProjectIDs = string.Empty;
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectIDs != null)
                {
                    ProjectIDs = objProjectIDs.ToString();

                }

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectIds";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectIDs;
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetV_XLD_CAPITAL_GENERAL", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("exportBudgetCapitalGeneralToExcel", ex, "objProjectIDs is an object");
            }

            return result;
        }

        public string exportBudgetCapitalForecastToExcel(object objProjectIDs)
        {
            string result = "";
            string ProjectIDs = string.Empty;
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProjectIDs != null)
                {
                    ProjectIDs = objProjectIDs.ToString();
                }

                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectIds";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectIDs;
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetV_XLD_CAPITAL_FORECAST", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("exportBudgetCapitalForecastToExcel", ex, "objProjectIDs is an object");
            }

            return result;
        }

        public string getLBEPeriodData() {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                ds = dl.ExecuteStoredProcedure("usp_GetLBEPeriodData");
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("GetLBEPeriodData", ex, "No parameters");
            }

            return result;
        }

        public string getProjectBulkBudgetForecastDataExcel(string LBEPeriod, string ProjectID, string BudgetID) {
            string result = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@LBE";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = LBEPeriod == null ? "" : LBEPeriod;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID == null ? "" : ProjectID;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@BudgetID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = BudgetID == null ? "" : BudgetID;

                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectBulkBudgetForecastDataExcel", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getProjectBulkBudgetForecastDataExcel", ex, "LBEPeriod=" + LBEPeriod + " ProjectID=" + ProjectID + " BudgetID=" + BudgetID);
            }
            return result;
        }

        public string getProjectBulkBudgetHistoricalDataExcel(string ProjectID, string BudgetID)
        {
            string result = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID == null ? "" : ProjectID;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@BudgetID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = BudgetID == null ? "" : BudgetID;

                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectBulkBudgetHistoricalDataExcel", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getProjectBulkBudgetHistoricalDataExcel", ex, " ProjectID=" + ProjectID + " BudgetID=" + BudgetID);
            }
            return result;
        }
        public string insertUpdateProjectBulkBudgetForecastDataExcel(string ForecastExcelGridData, string userId,string HistoricalExcelGridData)
        {
            string result = string.Empty;
            string strForecastExcelGridData = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                if (ForecastExcelGridData != null)
                {
                    strForecastExcelGridData = ForecastExcelGridData.ToString();
                }

                Parameter jsonCapexGridData = new Parameter();
                jsonCapexGridData.ParameterName = "@ExcelGridData";
                jsonCapexGridData.ParameterDbType = SqlDbType.VarChar;
                jsonCapexGridData.ParameterValue = strForecastExcelGridData;
                paramList.Add(jsonCapexGridData);

                Parameter jsonHistoricalGridData = new Parameter();
                jsonHistoricalGridData.ParameterName = "@ExcelHistoricalGridData ";
                jsonHistoricalGridData.ParameterDbType = SqlDbType.VarChar;
                jsonHistoricalGridData.ParameterValue = HistoricalExcelGridData;
                paramList.Add(jsonHistoricalGridData);

                Parameter jsonSubmittedByID = new Parameter();
                jsonSubmittedByID.ParameterName = "@SubmittedByID";
                jsonSubmittedByID.ParameterDbType = SqlDbType.VarChar;
                jsonSubmittedByID.ParameterValue = userId;
                paramList.Add(jsonSubmittedByID);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateProjectBulkBudgetForecastDataExcel", paramList);
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertUpdateProjectBulkBudgetForecastDataExcel", ex, "userId=" + userId + " ForecastExcelGridData"+ ForecastExcelGridData);
            }
            return result;
        }
        #endregion

        #region Method for project Type Selector
        public String getLookupData(string lookup)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@LookUpTable";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = lookup;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetLookupData", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getLookupData", ex, "lookup=" + lookup);

            }
            return strJson;
        }

        public String getProjectTypeSelectorData()
        {
            DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectTypeSelector");
            string strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            return strJson;
        }

        /// <summary>
        /// For Inserting the problem Capture data
        /// </summary>
        /// <param name="objProblemCaptureData">{"projectCaptureData ":[{"ProblemID":"7fcfd922-f9b1-4a7e-964d-638a139dbc9b","ProblemTitle":"tdsttt","ProblemType":"ProblemCapture","PortfolioOwnerID":"0299d423-0040-4523-bfa8-07e4629c4073","ProblemOwnerID":26,"ProblemOwnerName":"Shruti Vyas","ParentProgramID":2,"PrimaryProductID":"de812132-55f4-4246-bfa5-a475f3912c09","ProjectDescription":"dfgdg","ProjectClassificationID":"28e2901c-e9fe-4f04-8f57-d72aef16a6f1"}]}We saved this conversation. You'll see it soon in the Conversations tab in Skype for Business and in the Conversation History folder in Outlook. </param>
        /// <returns></returns>
        public String insertProblemCaptureData(object objProblemCaptureData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objProblemCaptureData != null)
                {

                    var resultdata = JObject.Parse(objProblemCaptureData.ToString());

                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectCapture";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["problemCaptureData"]);

                    Parameter jsonParam1 = new Parameter();
                    jsonParam1.ParameterName = "@HubSetting";
                    jsonParam1.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam1.ParameterValue = Convert.ToString(resultdata["hubSettingsData"]);

                    Parameter jsonParam3 = new Parameter();
                    jsonParam3.ParameterName = "@ProjectIDTemplate";
                    jsonParam3.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam3.ParameterValue = Convert.ToString(resultdata["ProjectIDTemplate"]);

                    Parameter jsonParam2 = new Parameter();
                    jsonParam2.ParameterName = "@CopyProjectParameter";
                    jsonParam2.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam2.ParameterValue = Convert.ToString(resultdata["CopyProjectParameter"]);


                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    paramList.Add(jsonParam1);
                    paramList.Add(jsonParam2);
                    paramList.Add(jsonParam3);
                    ds = dl.ExecuteStoredProcedure("usp_InsertProblemCapture", paramList);
                    // }
                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertProblemCaptureData", ex, "parameter is an object.");

                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String insertQualityReferenceData(object objQualityReferenceData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objQualityReferenceData != null)
                {

                    //var resultdata = JObject.Parse(objQualityReferenceData.ToString());
                    string resultdata = objQualityReferenceData.ToString();
                    DataAccessClass dl = new DataAccessClass();


                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@QualityReference";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = resultdata;
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_InsertQualityReference", paramList);
                    // }
                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("insertQualityReferenceData", ex, "parameter is an object.");

                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }


        public String updateQualityReferenceData(object objQualityReferenceData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objQualityReferenceData != null)
                {

                    var resultdata = JObject.Parse(objQualityReferenceData.ToString());

                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@QualityReference";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["qualityReferenceData"]);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_UpdateQualityReference", paramList);
                    // }
                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("updateQualityReferenceData", ex, "parameter is an object.");

                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String deleteQualityReferenceData(object objQualityReferenceData)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objQualityReferenceData != null)
                {

                    var resultdata = JObject.Parse(objQualityReferenceData.ToString());

                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@QualityReference";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["qualityReferenceData"]);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_DeleteQualityReference", paramList);
                    // }
                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("deleteQualityReferenceData", ex, "parameter is an object.");

                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getQualityReferenceByProjectId(string ProjectID)
        {
            string strJson = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (ProjectID != null)
                {


                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectID";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = ProjectID;
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_GetQualityReferenceByProjectId", paramList);
                    strJson = JsonConvert.SerializeObject(ds.Tables[0]);

                }
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getQualityReferenceByProjectId", ex, "ProjectID=" + ProjectID);

                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return strJson;
        }

        public String getUserConfidentialProject(string strUserAdId)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (strUserAdId != string.Empty)
                {

                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@UserADId";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(strUserAdId);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_GetUserConfidentialProject", paramList);
                    result = JsonConvert.SerializeObject(ds.Tables[0]);
                }
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getUserConfidentialProject", ex, "strUserAdId=" + strUserAdId);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getProductListByProjectID(string ProjectID)
        {
            string strJson = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (ProjectID != null)
                {


                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectID";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = ProjectID;
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_getProductListByProjectID", paramList);
                    strJson = JsonConvert.SerializeObject(ds.Tables[0]);

                }
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getProductListByProjectID", ex, "ProjectID=" + ProjectID);

                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return strJson;
        }
        public String getLookupDataPerformancestatus(string lookupStatus)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@LookUpTable";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = lookupStatus;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetLookupDataPerformancestatus", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getLookupDataPerformancestatus", ex, "lookup=" + lookupStatus);

            }
            return strJson;
        }

        public string getProjectTemplateInfoByID(string ProjectIDTemplate, string CopyUserID, string CopyProjectParameter)
        {
            string strJson = "";
            DataSet ds = new DataSet(); // Create new Dataset


               
                try
            {
                if (ProjectIDTemplate != null)
                {
                   // var resultdata = JObject.Parse(ProjectCopy.ToString());
                    DataAccessClass dl = new DataAccessClass();
                    List<Parameter> paramList = new List<Parameter>();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectIDTemplate";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = ProjectIDTemplate;
                    paramList.Add(jsonParam);

                    jsonParam = new Parameter();
                    jsonParam.ParameterName = "@CopyProjectParameter";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(CopyProjectParameter);
                    paramList.Add(jsonParam);

                    jsonParam = new Parameter();
                    jsonParam.ParameterName = "@CopyUserID";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = CopyUserID;

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_GetProjectTemplateInfoByID", paramList);
                    strJson = JsonConvert.SerializeObject(ds.Tables[0]);
                }

               
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getProjectTemplateInfoByID", ex, "ProjectIDTemplate "+ ProjectIDTemplate.ToString()+" CopyUserID "+ CopyUserID.ToString()+ " CopyProjectParameter "+ CopyProjectParameter.ToString());
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return strJson;
        }
        #endregion

        #region Method for Project Charter

        public String getProjectNameByID(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectNameByID", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectNameByID", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }
        public String getProjectInfoByID(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectInfoByID", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectInfoByID", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String updateProjectInfoByID(string ProjectID, object objQualityData, object objProjectInfoData, string strUserAdId)
        {
            string result = "";
            string InsertQualityReference = "";
            string UpdateQualityReference = "";
            string DeleteQualityReference = "";
            string ProjectInfoData = "";

            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objQualityData != null)
                {
                    JToken qualityToken = JToken.Parse(objQualityData.ToString());

                    InsertQualityReference = qualityToken[0]["insert"].ToString();
                    UpdateQualityReference = qualityToken[0]["update"].ToString();
                    DeleteQualityReference = qualityToken[0]["delete"].ToString();
                }
                if (objProjectInfoData != null)
                {
                    ProjectInfoData = objProjectInfoData.ToString();
                }


                DataAccessClass dl = new DataAccessClass();
                List<Parameter> paramList = new List<Parameter>();


                /*Quality*/
                Parameter jsonParamInsertQualityReference = new Parameter();
                jsonParamInsertQualityReference.ParameterName = "@InsertQualityReference";
                jsonParamInsertQualityReference.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertQualityReference.ParameterValue = InsertQualityReference;

                Parameter jsonParamUpdateQualityReference = new Parameter();
                jsonParamUpdateQualityReference.ParameterName = "@UpdateQualityReference";
                jsonParamUpdateQualityReference.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateQualityReference.ParameterValue = UpdateQualityReference;

                Parameter jsonParamDeleteQualityReference = new Parameter();
                jsonParamDeleteQualityReference.ParameterName = "@DeleteQualityReference";
                jsonParamDeleteQualityReference.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteQualityReference.ParameterValue = DeleteQualityReference;

                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectInfo";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = ProjectInfoData;

                Parameter jsonParamUserADId = new Parameter();
                jsonParamUserADId.ParameterName = "@UserAdId";
                jsonParamUserADId.ParameterDbType = SqlDbType.VarChar;
                jsonParamUserADId.ParameterValue = strUserAdId;

                paramList.Add(jsonParam);
                paramList.Add(jsonProjectID);
                paramList.Add(jsonParamInsertQualityReference);
                paramList.Add(jsonParamUpdateQualityReference);
                paramList.Add(jsonParamDeleteQualityReference);
                paramList.Add(jsonParamUserADId);

                ds = dl.ExecuteStoredProcedure("usp_UpdateProjectInfoByID", paramList);


                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("updateProjectInfoByID", ex, "ProjectID " + ProjectID + " objQualityData " + JToken.Parse(objQualityData.ToString()) + " objProjectInfoData " + JToken.Parse(objQualityData.ToString()));
            }

            return result;
        }



        public String getProjectCharterInfoByID(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectCharterInfoByID", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectCharterInfoByID", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }
        public String getProjectCloseOutInfoByID(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectCloseoutInfoByID", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectCloseOutInfoByID", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }
        public String getProjectCloseOutLessonsLearned(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetLessonLearnedByProjID", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectCloseOutLessonsLearned", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }
        public String getProjectCharterKeySuccess(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectCharterKeySuccess", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectCharterKeySuccess", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getProjectCharterAssumption(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectCharterKeyAssumption", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectCharterAssumption", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }



        public String getProjectCharterFunding(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectCharterFunding", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectCharterFunding", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }


        public String projectCharterUpdate(string ProjectID, object objRiskIssue, object objMilestone, object objProjectTeam, object objKeySuccess, object objAssumption, object objFunding, object objProjectCharterInfo, string userId, object objCapsCharter, object CapsWaterWaste)
        {

            string InsertRiskIssue = "";
            string UpdateRiskIssue = "";
            string DeleteRiskIssue = "";

            string InsertMilestone = "";
            string UpdateMilestone = "";
            string DeleteMilestone = "";


            string InsertProjectTeam = "";
            string UpdateProjectTeam = "";
            string DeleteProjectTeam = "";


            string InsertKeySuccess = "";
            string UpdateKeySuccess = "";
            string DeleteKeySuccess = "";



            string InsertAssumption = "";
            string UpdateAssumption = "";
            string DeleteAssumption = "";

            string InsertFunding = "";
            string UpdateFunding = "";
            string DeleteFunding = "";

            string InsertCapsWaterWaste = "";
            string UpdateCapsWaterWaste = "";
            string DeleteCapsWaterWaste = "";

            if (CapsWaterWaste != null)
            {
                JToken CapsWaterWasteToken = JToken.Parse(CapsWaterWaste.ToString());

                InsertCapsWaterWaste = CapsWaterWasteToken["insert"].ToString();
                UpdateCapsWaterWaste = CapsWaterWasteToken["update"].ToString();
                DeleteCapsWaterWaste = CapsWaterWasteToken["delete"].ToString();
            }

            string ProjectCharterInfo = "";


            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objRiskIssue != null)
                {
                    JToken riskToken = JToken.Parse(objRiskIssue.ToString());
                    InsertRiskIssue = riskToken[0]["insert"].ToString();
                    UpdateRiskIssue = riskToken[0]["update"].ToString();
                    DeleteRiskIssue = riskToken[0]["delete"].ToString();
                }
                if (objMilestone != null)
                {
                    JToken milestoneToken = JToken.Parse(objMilestone.ToString());

                    InsertMilestone = (milestoneToken[0]["insert"]).ToString();
                    UpdateMilestone = milestoneToken[0]["update"].ToString();
                    DeleteMilestone = milestoneToken[0]["delete"].ToString();
                }

                if (objProjectTeam != null)
                {
                    JToken projectTeamToken = JToken.Parse(objProjectTeam.ToString());

                    InsertProjectTeam = (projectTeamToken[0]["insert"]).ToString();
                    UpdateProjectTeam = projectTeamToken[0]["update"].ToString();
                    DeleteProjectTeam = projectTeamToken[0]["delete"].ToString();


                }

                if (objKeySuccess != null)
                {

                    JToken keySuccessToken = JToken.Parse(objKeySuccess.ToString());

                    InsertKeySuccess = (keySuccessToken[0]["insert"]).ToString();
                    UpdateKeySuccess = keySuccessToken[0]["update"].ToString();
                    DeleteKeySuccess = keySuccessToken[0]["delete"].ToString();
                }

                if (objAssumption != null)
                {

                    JToken assumptionToken = JToken.Parse(objAssumption.ToString());

                    InsertAssumption = (assumptionToken[0]["insert"]).ToString();
                    UpdateAssumption = assumptionToken[0]["update"].ToString();
                    DeleteAssumption = assumptionToken[0]["delete"].ToString();
                }

                if (objFunding != null)
                {
                    JToken fundingToken = JToken.Parse(objFunding.ToString());

                    InsertFunding = (fundingToken[0]["insert"]).ToString();
                    UpdateFunding = fundingToken[0]["update"].ToString();
                    DeleteFunding = fundingToken[0]["delete"].ToString();
                }


                if (objProjectCharterInfo != null)
                {

                    //var resultdata = JObject.Parse(objProjectCharterInfo.ToString());
                    //ProjectCharterInfo =  Convert.ToString(resultdata["ProjectCharterInfo"]);
                    ProjectCharterInfo = objProjectCharterInfo.ToString();

                }

                string capsGridCharterData = "";
                if (objCapsCharter != null)
                {
                    capsGridCharterData = objCapsCharter.ToString();
                }

                


                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                /*RiskIssue*/
                Parameter jsonParamInsertRiskIssue = new Parameter();
                jsonParamInsertRiskIssue.ParameterName = "@InsertRiskIssue";
                jsonParamInsertRiskIssue.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertRiskIssue.ParameterValue = InsertRiskIssue;

                Parameter jsonParamUpdateRiskIssue = new Parameter();
                jsonParamUpdateRiskIssue.ParameterName = "@UpdateRiskIssue";
                jsonParamUpdateRiskIssue.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateRiskIssue.ParameterValue = UpdateRiskIssue;

                Parameter jsonParamDeleteRiskIssue = new Parameter();
                jsonParamDeleteRiskIssue.ParameterName = "@DeleteRiskIssue";
                jsonParamDeleteRiskIssue.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteRiskIssue.ParameterValue = DeleteRiskIssue;

                /*Milestone*/
                Parameter jsonParamInsertMilestone = new Parameter();
                jsonParamInsertMilestone.ParameterName = "@InsertMilestone";
                jsonParamInsertMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertMilestone.ParameterValue = InsertMilestone;

                Parameter jsonParamUpdateMilestone = new Parameter();
                jsonParamUpdateMilestone.ParameterName = "@UpdateMilestone";
                jsonParamUpdateMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateMilestone.ParameterValue = UpdateMilestone;

                Parameter jsonParamDeleteMilestone = new Parameter();
                jsonParamDeleteMilestone.ParameterName = "@DeleteMilestone";
                jsonParamDeleteMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteMilestone.ParameterValue = DeleteMilestone;


                /*ProjectTeam*/
                Parameter jsonParamInsertProjectTeam = new Parameter();
                jsonParamInsertProjectTeam.ParameterName = "@InsertProjectTeam";
                jsonParamInsertProjectTeam.ParameterDbType = SqlDbType.VarChar;
                jsonParamInsertProjectTeam.ParameterValue = InsertProjectTeam;

                Parameter jsonParamUpdateProjectTeam = new Parameter();
                jsonParamUpdateProjectTeam.ParameterName = "@UpdateProjectTeam";
                jsonParamUpdateProjectTeam.ParameterDbType = SqlDbType.VarChar;
                jsonParamUpdateProjectTeam.ParameterValue = UpdateProjectTeam;

                Parameter jsonParamDeleteProjectTeam = new Parameter();
                jsonParamDeleteProjectTeam.ParameterName = "@DeleteProjectTeam";
                jsonParamDeleteProjectTeam.ParameterDbType = SqlDbType.VarChar;
                jsonParamDeleteProjectTeam.ParameterValue = DeleteProjectTeam;



                /*KeySuccess*/
                Parameter jsonParamInsertKeySuccess = new Parameter();
                jsonParamInsertKeySuccess.ParameterName = "@InsertKeySuccess";
                jsonParamInsertKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertKeySuccess.ParameterValue = InsertKeySuccess;

                Parameter jsonParamUpdateKeySuccess = new Parameter();
                jsonParamUpdateKeySuccess.ParameterName = "@UpdateKeySuccess";
                jsonParamUpdateKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateKeySuccess.ParameterValue = UpdateKeySuccess;

                Parameter jsonParamDeleteKeySuccess = new Parameter();
                jsonParamDeleteKeySuccess.ParameterName = "@DeleteKeySuccess";
                jsonParamDeleteKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteKeySuccess.ParameterValue = DeleteKeySuccess;



                /*Assumption*/
                Parameter jsonParamInsertAssumption = new Parameter();
                jsonParamInsertAssumption.ParameterName = "@InsertAssumption";
                jsonParamInsertAssumption.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertAssumption.ParameterValue = InsertAssumption;

                Parameter jsonParamUpdateAssumption = new Parameter();
                jsonParamUpdateAssumption.ParameterName = "@UpdateAssumption";
                jsonParamUpdateAssumption.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateAssumption.ParameterValue = UpdateAssumption;

                Parameter jsonParamDeleteAssumption = new Parameter();
                jsonParamDeleteAssumption.ParameterName = "@DeleteAssumption";
                jsonParamDeleteAssumption.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteAssumption.ParameterValue = DeleteAssumption;



                /*Funding*/
                Parameter jsonParamInsertFunding = new Parameter();
                jsonParamInsertFunding.ParameterName = "@InsertFunding";
                jsonParamInsertFunding.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertFunding.ParameterValue = InsertFunding;

                Parameter jsonParamUpdateFunding = new Parameter();
                jsonParamUpdateFunding.ParameterName = "@UpdateFunding";
                jsonParamUpdateFunding.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateFunding.ParameterValue = UpdateFunding;

                Parameter jsonParamDeleteFunding = new Parameter();
                jsonParamDeleteFunding.ParameterName = "@DeleteFunding";
                jsonParamDeleteFunding.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteFunding.ParameterValue = DeleteFunding;

                /*Water and Waste*/
                Parameter jsonParamInsertWaterWaste = new Parameter();
                jsonParamInsertWaterWaste.ParameterName = "@InsertWaterWaste";
                jsonParamInsertWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertWaterWaste.ParameterValue = InsertCapsWaterWaste;

                Parameter jsonParamUpdateWaterWaste = new Parameter();
                jsonParamUpdateWaterWaste.ParameterName = "@UpdateWaterWaste";
                jsonParamUpdateWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateWaterWaste.ParameterValue = UpdateCapsWaterWaste;

                Parameter jsonParamDeleteWaterWaste = new Parameter();
                jsonParamDeleteWaterWaste.ParameterName = "@DeleteWaterWaste";
                jsonParamDeleteWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteWaterWaste.ParameterValue = DeleteCapsWaterWaste;

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectCharterInfo";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = ProjectCharterInfo;


                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;

                Parameter jsonParamUser = new Parameter();
                jsonParamUser.ParameterName = "@UserID";
                jsonParamUser.ParameterDbType = SqlDbType.VarChar;
                jsonParamUser.ParameterValue = userId;

                Parameter jsonParamImpactData = new Parameter();
                jsonParamImpactData.ParameterName = "@CapsImpactData";
                jsonParamImpactData.ParameterDbType = SqlDbType.VarChar;
                jsonParamImpactData.ParameterValue = capsGridCharterData;

                paramList.Add(jsonProjectID);
                paramList.Add(jsonParamInsertMilestone);
                paramList.Add(jsonParamUpdateMilestone);
                paramList.Add(jsonParamDeleteMilestone);

                paramList.Add(jsonParamInsertRiskIssue);
                paramList.Add(jsonParamUpdateRiskIssue);
                paramList.Add(jsonParamDeleteRiskIssue);

                paramList.Add(jsonParamInsertProjectTeam);
                paramList.Add(jsonParamUpdateProjectTeam);
                paramList.Add(jsonParamDeleteProjectTeam);

                paramList.Add(jsonParamInsertKeySuccess);
                paramList.Add(jsonParamUpdateKeySuccess);
                paramList.Add(jsonParamDeleteKeySuccess);

                paramList.Add(jsonParamInsertAssumption);
                paramList.Add(jsonParamUpdateAssumption);
                paramList.Add(jsonParamDeleteAssumption);


                paramList.Add(jsonParamInsertFunding);
                paramList.Add(jsonParamUpdateFunding);
                paramList.Add(jsonParamDeleteFunding);

                paramList.Add(jsonParam);
                paramList.Add(jsonParamUser);
                paramList.Add(jsonParamImpactData);

                /*Water and Waste*/             
                paramList.Add(jsonParamInsertWaterWaste);           
                paramList.Add(jsonParamUpdateWaterWaste);
                paramList.Add(jsonParamDeleteWaterWaste);

                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateProjectCharter", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("projectCharterUpdate", ex, "ProjectID " + ProjectID);
            }

            return result;
        }
        public String projectCloseOutUpdate(string ProjectID, object objKeySuccess, object objLessonsLearnt, object objProjectCloseOutInfo,object objMilestone,object objBalelineLog, string userId)
        {
            
            string InsertKeySuccess = "";
            string UpdateKeySuccess = "";
            string DeleteKeySuccess = "";

            string InsertLessonsLearnt = "";
            string UpdateLessonsLearnt = "";
            string DeleteLessonsLearnt = "";

            string ProjectCharterInfo = "";
            string milestoneupdate = string.Empty;
            string baselinelogUpdate = string.Empty;

            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
               

                if (objKeySuccess != null)
                {

                    JToken keySuccessToken = JToken.Parse(objKeySuccess.ToString());

                    InsertKeySuccess = (keySuccessToken[0]["insert"]).ToString();
                    UpdateKeySuccess = keySuccessToken[0]["update"].ToString();
                    DeleteKeySuccess = keySuccessToken[0]["delete"].ToString();
                }


                if (objLessonsLearnt != null)
                {
                    JToken LessonsLearntToken = JToken.Parse(objLessonsLearnt.ToString());

                    InsertLessonsLearnt = (LessonsLearntToken[0]["insert"]).ToString();
                    UpdateLessonsLearnt = LessonsLearntToken[0]["update"].ToString();
                    DeleteLessonsLearnt = LessonsLearntToken[0]["delete"].ToString();
                }


                if (objProjectCloseOutInfo != null)
                {
                   
                    ProjectCharterInfo = objProjectCloseOutInfo.ToString();

                }
                if (objMilestone != null)
                {

                    milestoneupdate = objMilestone.ToString();

                }
                if (objBalelineLog != null)
                {

                    baselinelogUpdate = objBalelineLog.ToString();

                }

                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                /*KeySuccess*/
                Parameter jsonParamInsertKeySuccess = new Parameter();
                jsonParamInsertKeySuccess.ParameterName = "@InsertKeySuccess";
                jsonParamInsertKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertKeySuccess.ParameterValue = InsertKeySuccess;

                Parameter jsonParamUpdateKeySuccess = new Parameter();
                jsonParamUpdateKeySuccess.ParameterName = "@UpdateKeySuccess";
                jsonParamUpdateKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateKeySuccess.ParameterValue = UpdateKeySuccess;

                Parameter jsonParamDeleteKeySuccess = new Parameter();
                jsonParamDeleteKeySuccess.ParameterName = "@DeleteKeySuccess";
                jsonParamDeleteKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteKeySuccess.ParameterValue = DeleteKeySuccess;


                /*Lessons Learnt*/
                Parameter jsonParamInsertLL = new Parameter();
                jsonParamInsertLL.ParameterName = "@InsertLessonLearn";
                jsonParamInsertLL.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertLL.ParameterValue = InsertLessonsLearnt;

                Parameter jsonParamUpdateLL = new Parameter();
                jsonParamUpdateLL.ParameterName = "@UpdateLessonLearn";
                jsonParamUpdateLL.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateLL.ParameterValue = UpdateLessonsLearnt;

                Parameter jsonParamDeleteLL = new Parameter();
                jsonParamDeleteLL.ParameterName = "@DeleteLessonLearn";
                jsonParamDeleteLL.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteLL.ParameterValue = DeleteLessonsLearnt;



                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectCharterInfo";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = ProjectCharterInfo;


                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;

                Parameter jsonUserID = new Parameter();
                jsonUserID.ParameterName = "@UserID ";
                jsonUserID.ParameterDbType = SqlDbType.VarChar;
                jsonUserID.ParameterValue = userId;

                Parameter jsonmilestone = new Parameter();
                jsonmilestone.ParameterName = "@UpdateMilestone";
                jsonmilestone.ParameterDbType = SqlDbType.VarChar;
                jsonmilestone.ParameterValue = milestoneupdate;

                Parameter jsonbaseline = new Parameter();
                jsonbaseline.ParameterName = "@UpdateBaselinelog";
                jsonbaseline.ParameterDbType = SqlDbType.VarChar;
                jsonbaseline.ParameterValue = baselinelogUpdate;

                paramList.Add(jsonProjectID);
                paramList.Add(jsonmilestone);
                paramList.Add(jsonbaseline);

                paramList.Add(jsonParamInsertKeySuccess);
                paramList.Add(jsonParamUpdateKeySuccess);
                paramList.Add(jsonParamDeleteKeySuccess);

                paramList.Add(jsonParamInsertLL);
                paramList.Add(jsonParamUpdateLL);
                paramList.Add(jsonParamDeleteLL);

                paramList.Add(jsonParam);
                paramList.Add(jsonUserID);



                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateProjectCloseOut", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("projectCharterUpdate", ex, "ProjectID " + ProjectID);
            }

            return result;
        }

        #endregion

        #region Method for Business Case
        public String getBusinessCaseInfoByProjectID(string ProjectID)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBusinessCaseInfoByProjectID", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getBusinessCaseInfoByProjectID", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        //public String updateBusinessCaseInfo(object objBusinessCaseInfoData)
        //{
        //    string result = "";
        //    DataSet ds = new DataSet(); // Create new Dataset
        //    try
        //    {
        //        if (objBusinessCaseInfoData != null)
        //        {
        //            var resultdata = JObject.Parse(objBusinessCaseInfoData.ToString());

        //            DataAccessClass dl = new DataAccessClass();

        //            Parameter jsonParam = new Parameter();
        //            jsonParam.ParameterName = "@BusinessCaseInfo";
        //            jsonParam.ParameterDbType = SqlDbType.VarChar;
        //            jsonParam.ParameterValue = Convert.ToString(resultdata["BusinessCaseData"]);
        //            List<Parameter> paramList = new List<Parameter>();

        //            paramList.Add(jsonParam);
        //            ds = dl.ExecuteStoredProcedure("usp_UpdateBusinessCaseGenralInfo", paramList);
        //        }
        //        result = "Success";
        //    }
        //    catch (Exception ex)
        //    {
        //        result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
        //    }

        //    return result;
        //}

        public string getBusinessCaseOptionByProjectID(string ProjectID)
        {
            string result = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);


                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBusinessCaseOptionByProjectID", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
                //List<BusinessCaseOptions> bcLst = new List<BusinessCaseOptions>();
                //foreach (DataRow dr in ds.Tables[0].Rows)
                //{
                //    BusinessCaseOptions objBusinessCase = new BusinessCaseOptions();
                //    objBusinessCase.BusinessCaseOptionUniqueID = Convert.ToString(dr["BusinessCaseOptionUniqueID"]);
                //    objBusinessCase.ProblemUniqueID = Convert.ToString(dr["ProblemUniqueID"]);
                //    objBusinessCase.OptionTitle = Convert.ToString(dr["OptionTitle"]);
                //    objBusinessCase.ProposalStatement = Convert.ToString(dr["ProposalStatement"]);
                //    objBusinessCase.DetailedDescription = Convert.ToString(dr["DetailedDescription"]);
                //    objBusinessCase.StrategicRationale = Convert.ToString(dr["StrategicRationale"]);
                //    objBusinessCase.TradeoffAndConsiderations = Convert.ToString(dr["TradeoffAndConsiderations"]);
                //    objBusinessCase.PeopleRating = Convert.ToString(dr["PeopleRating"]);
                //    objBusinessCase.PeopleRatingTitle = Convert.ToString(dr["PeopleRatingTitle"]);
                //    objBusinessCase.TechnologyRating = Convert.ToString(dr["TechnologyRating"]);
                //    objBusinessCase.TechnologyRatingTitle = Convert.ToString(dr["TechnologyRatingTitle"]);
                //    objBusinessCase.PeopleJustification = Convert.ToString(dr["PeopleJustification"]);
                //    objBusinessCase.TechnologyJustification = Convert.ToString(dr["TechnologyJustification"]);
                //    objBusinessCase.BusinessCaseProcessRating = Convert.ToString(dr["BusinessCaseProcessRating"]);
                //    objBusinessCase.BusinessCaseProcessRatingTitle = Convert.ToString(dr["BusinessCaseProcessRatingTitle"]);
                //    objBusinessCase.BusinessCaseProcessJustification = Convert.ToString(dr["BusinessCaseProcessJustification"]);
                //    objBusinessCase.ManufacturingProcessRating = Convert.ToString(dr["ManufacturingProcessRating"]);
                //    objBusinessCase.ManufacturingProcessRatingTitle = Convert.ToString(dr["ManufacturingProcessRatingTitle"]);
                //    objBusinessCase.ManufacturingProcessJustification = Convert.ToString(dr["ManufacturingProcessJustification"]);
                //    objBusinessCase.EquipmentRating = Convert.ToString(dr["EquipmentRating"]);
                //    objBusinessCase.EquipmentRatingTitle = Convert.ToString(dr["EquipmentRatingTitle"]);
                //    objBusinessCase.EquipementJustification = Convert.ToString(dr["EquipementJustification"]);
                //    objBusinessCase.CapitalRequired = Convert.ToString(dr["CapitalRequired"]);
                //    objBusinessCase.TotalCapexBaseCase = Convert.ToString(dr["TotalCapexBaseCase"]);
                //    objBusinessCase.TotalCapexHighCase = Convert.ToString(dr["TotalCapexHighCase"]);
                //    objBusinessCase.ProjectSpendStart = Convert.ToString(dr["ProjectSpendStart"]);
                //    objBusinessCase.IsProjectSpentNA = Convert.ToString(dr["IsProjectSpentNA"]);
                //    objBusinessCase.AssetInService = Convert.ToString(dr["AssetInService"]);
                //    objBusinessCase.AssetInServiceNA = Convert.ToString(dr["AssetInServiceNA"]);
                //    objBusinessCase.OpexRequired = Convert.ToString(dr["OpexRequired"]);
                //    objBusinessCase.StrategicAlignment = Convert.ToString(dr["StrategicAlignment"]);
                //    objBusinessCase.StrategicAlignmentJustification = Convert.ToString(dr["StrategicAlignmentJustification"]);
                //    objBusinessCase.NPVBaseCase = Convert.ToString(dr["NPVBaseCase"]);
                //    objBusinessCase.NPVHighCase = Convert.ToString(dr["NPVHighCase"]);
                //    objBusinessCase.NPVJustification = Convert.ToString(dr["NPVJustification"]);


                //    bcLst.Add(objBusinessCase);
                //}
                // result = JsonConvert.SerializeObject(bcLst);
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getBusinessCaseOptionByProjectID", ex, "ProjectID " + ProjectID);
            }
            return result;
        }

        //public string updateBusinessCaseOption(object objBusinessCaseInfoData)
        //{
        //    string result = "";
        //    DataSet ds = new DataSet(); // Create new Dataset
        //    try
        //    {
        //        if (objBusinessCaseInfoData != null)
        //        {

        //            var resultdata = JObject.Parse(objBusinessCaseInfoData.ToString());

        //            DataAccessClass dl = new DataAccessClass();

        //            Parameter jsonParam = new Parameter();
        //            jsonParam.ParameterName = "@BusinessCaseInfo";
        //            jsonParam.ParameterDbType = SqlDbType.VarChar;
        //            jsonParam.ParameterValue = Convert.ToString(resultdata["BusinessCaseOptionData"]);
        //            List<Parameter> paramList = new List<Parameter>();

        //            paramList.Add(jsonParam);
        //            ds = dl.ExecuteStoredProcedure("usp_UpdateBusinessCaseOptionInfo", paramList);
        //            // }
        //        }
        //        result = "Success";
        //    }
        //    catch (Exception ex)
        //    {
        //        result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;

        //        //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
        //        //return errormessage + "InsertProjectHubData, " + corelationID;
        //    }

        //    return result;
        //}


        public String getBusinessCaseBudgetFunding(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBusinessCaseBudgetFunding", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getBusinessCaseBudgetFunding", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getBusinessCaseKeyAssumption(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBusinessCaseKeyAssumption", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getBusinessCaseKeyAssumption", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getBusinessCaseRiskIssue(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBusinessCaseRiskIssue", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getBusinessCaseRiskIssue", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getGetBusinessCaseKeySuccess(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBusinessCaseKeySuccess", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getGetBusinessCaseKeySuccess", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getBusinessCaseSchedule(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBusinessCaseSchedule", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getBusinessCaseSchedule", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getBusinessCaseTOPSKPI(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBusinessCaseTOPSKPI", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getBusinessCaseTOPSKPI", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }


        public String updateBusinessCase(object ProjectBussinessCaseInfo, string ProjectID, string BusinessOptionID, object objRiskIssue, object objMilestone, object objKeySuccess, object objAssumption, object objFunding, object objCapsEMSource, object BusinessCaseOptionInfo, object TOPSKPI, string userId,object objCapsWaterWaste)
        {
            string InsertRiskIssue = "";
            string UpdateRiskIssue = "";
            string DeleteRiskIssue = "";

            string InsertMilestone = "";
            string UpdateMilestone = "";
            string DeleteMilestone = "";


            string InsertKeySuccess = "";
            string UpdateKeySuccess = "";
            string DeleteKeySuccess = "";



            string InsertAssumption = "";
            string UpdateAssumption = "";
            string DeleteAssumption = "";

            string InsertFunding = "";
            string UpdateFunding = "";
            string DeleteFunding = "";

            string InsertWaterWaste = "";
            string UpdateWaterWaste = "";
            string DeleteWaterWaste = "";

            string ProjectBussinessInfo = "";
            string BusinessOptionInfo = "";
            string TOPS = "";
            string updateCaps = "";



            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objRiskIssue != null)
                {
                    JToken riskToken = JToken.Parse(objRiskIssue.ToString());

                    InsertRiskIssue = riskToken[0]["insert"].ToString();
                    UpdateRiskIssue = riskToken[0]["update"].ToString();
                    DeleteRiskIssue = riskToken[0]["delete"].ToString();
                }
                if (objMilestone != null)
                {
                    JToken milestoneToken = JToken.Parse(objMilestone.ToString());

                    InsertMilestone = (milestoneToken[0]["insert"]).ToString();
                    UpdateMilestone = milestoneToken[0]["update"].ToString();
                    DeleteMilestone = milestoneToken[0]["delete"].ToString();
                }


                if (objKeySuccess != null)
                {

                    JToken keySuccessToken = JToken.Parse(objKeySuccess.ToString());

                    InsertKeySuccess = (keySuccessToken[0]["insert"]).ToString();
                    UpdateKeySuccess = keySuccessToken[0]["update"].ToString();
                    DeleteKeySuccess = keySuccessToken[0]["delete"].ToString();
                }

                if (objAssumption != null)
                {

                    JToken assumptionToken = JToken.Parse(objAssumption.ToString());

                    InsertAssumption = (assumptionToken[0]["insert"]).ToString();
                    UpdateAssumption = assumptionToken[0]["update"].ToString();
                    DeleteAssumption = assumptionToken[0]["delete"].ToString();
                }

                if (objFunding != null)
                {
                    JToken fundingToken = JToken.Parse(objFunding.ToString());

                    InsertFunding = (fundingToken[0]["insert"]).ToString();
                    UpdateFunding = fundingToken[0]["update"].ToString();
                    DeleteFunding = fundingToken[0]["delete"].ToString();
                }

                if (objCapsWaterWaste != null)
                {
                    JToken waterWasteToken = JToken.Parse(objCapsWaterWaste.ToString());

                    InsertWaterWaste = waterWasteToken[0]["insert"].ToString();
                    UpdateWaterWaste = waterWasteToken[0]["update"].ToString();
                    DeleteWaterWaste = waterWasteToken[0]["delete"].ToString();
                }

                if (ProjectBussinessCaseInfo != null)
                {
                    ProjectBussinessInfo = ProjectBussinessCaseInfo.ToString();

                }


                if (BusinessCaseOptionInfo != null)
                {
                    BusinessOptionInfo = BusinessCaseOptionInfo.ToString();

                }
                if (objCapsEMSource != null)
                {
                    updateCaps = objCapsEMSource.ToString();

                }

                if (TOPSKPI != null)
                {
                    TOPS = TOPSKPI.ToString();
                }


                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                /*RiskIssue*/
                Parameter jsonParamInsertRiskIssue = new Parameter();
                jsonParamInsertRiskIssue.ParameterName = "@InsertRiskIssue";
                jsonParamInsertRiskIssue.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertRiskIssue.ParameterValue = InsertRiskIssue;

                Parameter jsonParamUpdateRiskIssue = new Parameter();
                jsonParamUpdateRiskIssue.ParameterName = "@UpdateRiskIssue";
                jsonParamUpdateRiskIssue.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateRiskIssue.ParameterValue = UpdateRiskIssue;

                Parameter jsonParamDeleteRiskIssue = new Parameter();
                jsonParamDeleteRiskIssue.ParameterName = "@DeleteRiskIssue";
                jsonParamDeleteRiskIssue.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteRiskIssue.ParameterValue = DeleteRiskIssue;

                /*Milestone*/
                Parameter jsonParamInsertMilestone = new Parameter();
                jsonParamInsertMilestone.ParameterName = "@InsertMilestone";
                jsonParamInsertMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertMilestone.ParameterValue = InsertMilestone;

                Parameter jsonParamUpdateMilestone = new Parameter();
                jsonParamUpdateMilestone.ParameterName = "@UpdateMilestone";
                jsonParamUpdateMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateMilestone.ParameterValue = UpdateMilestone;

                Parameter jsonParamDeleteMilestone = new Parameter();
                jsonParamDeleteMilestone.ParameterName = "@DeleteMilestone";
                jsonParamDeleteMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteMilestone.ParameterValue = DeleteMilestone;



                /*KeySuccess*/
                Parameter jsonParamInsertKeySuccess = new Parameter();
                jsonParamInsertKeySuccess.ParameterName = "@InsertKeySuccess";
                jsonParamInsertKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertKeySuccess.ParameterValue = InsertKeySuccess;

                Parameter jsonParamUpdateKeySuccess = new Parameter();
                jsonParamUpdateKeySuccess.ParameterName = "@UpdateKeySuccess";
                jsonParamUpdateKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateKeySuccess.ParameterValue = UpdateKeySuccess;

                Parameter jsonParamDeleteKeySuccess = new Parameter();
                jsonParamDeleteKeySuccess.ParameterName = "@DeleteKeySuccess";
                jsonParamDeleteKeySuccess.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteKeySuccess.ParameterValue = DeleteKeySuccess;



                /*Assumption*/
                Parameter jsonParamInsertAssumption = new Parameter();
                jsonParamInsertAssumption.ParameterName = "@InsertAssumption";
                jsonParamInsertAssumption.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertAssumption.ParameterValue = InsertAssumption;

                Parameter jsonParamUpdateAssumption = new Parameter();
                jsonParamUpdateAssumption.ParameterName = "@UpdateAssumption";
                jsonParamUpdateAssumption.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateAssumption.ParameterValue = UpdateAssumption;

                Parameter jsonParamDeleteAssumption = new Parameter();
                jsonParamDeleteAssumption.ParameterName = "@DeleteAssumption";
                jsonParamDeleteAssumption.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteAssumption.ParameterValue = DeleteAssumption;



                /*Funding*/
                Parameter jsonParamInsertFunding = new Parameter();
                jsonParamInsertFunding.ParameterName = "@InsertFunding";
                jsonParamInsertFunding.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertFunding.ParameterValue = InsertFunding;

                Parameter jsonParamUpdateFunding = new Parameter();
                jsonParamUpdateFunding.ParameterName = "@UpdateFunding";
                jsonParamUpdateFunding.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateFunding.ParameterValue = UpdateFunding;

                Parameter jsonParamDeleteFunding = new Parameter();
                jsonParamDeleteFunding.ParameterName = "@DeleteFunding";
                jsonParamDeleteFunding.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteFunding.ParameterValue = DeleteFunding;


                /*Water Waste*/
                Parameter jsonParamInsertWaterWaste = new Parameter();
                jsonParamInsertWaterWaste.ParameterName = "@InsertWaterWaste";
                jsonParamInsertWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertWaterWaste.ParameterValue = InsertWaterWaste;

                Parameter jsonParamUpdateWaterWaste = new Parameter();
                jsonParamUpdateWaterWaste.ParameterName = "@UpdateWaterWaste";
                jsonParamUpdateWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateWaterWaste.ParameterValue = UpdateWaterWaste;

                Parameter jsonParamDeleteWaterWaste = new Parameter();
                jsonParamDeleteWaterWaste.ParameterName = "@DeleteWaterWaste";
                jsonParamDeleteWaterWaste.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteWaterWaste.ParameterValue = DeleteWaterWaste;



                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectBussinessCaseInfo";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = ProjectBussinessInfo;

                Parameter jsonParamOption = new Parameter();
                jsonParamOption.ParameterName = "@BusinessCaseOptionInfo";
                jsonParamOption.ParameterDbType = SqlDbType.NVarChar;
                jsonParamOption.ParameterValue = BusinessOptionInfo;


                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;


                Parameter jsonBusinessOptionID = new Parameter();
                jsonBusinessOptionID.ParameterName = "@BusinessOptionID";
                jsonBusinessOptionID.ParameterDbType = SqlDbType.VarChar;
                jsonBusinessOptionID.ParameterValue = BusinessOptionID;

                Parameter jsonTOPSKPI = new Parameter();
                jsonTOPSKPI.ParameterName = "@TOPSKPI";
                jsonTOPSKPI.ParameterDbType = SqlDbType.NVarChar;
                jsonTOPSKPI.ParameterValue = TOPS;

                Parameter jsonParamCaps = new Parameter();
                jsonParamCaps.ParameterName = "@CapsData";
                jsonParamCaps.ParameterDbType = SqlDbType.NVarChar;
                jsonParamCaps.ParameterValue = updateCaps;

                Parameter jsonUserID = new Parameter();
                jsonUserID.ParameterName = "@UserID ";
                jsonUserID.ParameterDbType = SqlDbType.VarChar;
                jsonUserID.ParameterValue = userId;

                paramList.Add(jsonProjectID);
                paramList.Add(jsonBusinessOptionID);

                paramList.Add(jsonParamInsertMilestone);
                paramList.Add(jsonParamUpdateMilestone);
                paramList.Add(jsonParamDeleteMilestone);

                paramList.Add(jsonParamInsertRiskIssue);
                paramList.Add(jsonParamUpdateRiskIssue);
                paramList.Add(jsonParamDeleteRiskIssue);



                paramList.Add(jsonParamInsertKeySuccess);
                paramList.Add(jsonParamUpdateKeySuccess);
                paramList.Add(jsonParamDeleteKeySuccess);

                paramList.Add(jsonParamInsertAssumption);
                paramList.Add(jsonParamUpdateAssumption);
                paramList.Add(jsonParamDeleteAssumption);


                paramList.Add(jsonParamInsertFunding);
                paramList.Add(jsonParamUpdateFunding);
                paramList.Add(jsonParamDeleteFunding);

                paramList.Add(jsonParamInsertWaterWaste);
                paramList.Add(jsonParamUpdateWaterWaste);
                paramList.Add(jsonParamDeleteWaterWaste);

                paramList.Add(jsonParam);
                paramList.Add(jsonParamOption);
                paramList.Add(jsonTOPSKPI);

                paramList.Add(jsonParamCaps);
                paramList.Add(jsonUserID);


                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateBussinessCase", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("updateBusinessCase", ex, "ProjectID " + ProjectID + " BusinessOptionID :" + Convert.ToString(BusinessOptionID));
            }

            return result;
        }

        public String InsertUpdateBussinessCaseSchedule(string ProjectID, string BusinessOptionID, object objMilestone, string userId)
        {

            string InsertMilestone = "";
            string UpdateMilestone = "";
            string DeleteMilestone = "";

            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objMilestone != null)
                {
                    JToken milestoneToken = JToken.Parse(objMilestone.ToString());

                    InsertMilestone = (milestoneToken[0]["insert"]).ToString();
                    UpdateMilestone = milestoneToken[0]["update"].ToString();
                    DeleteMilestone = milestoneToken[0]["delete"].ToString();
                }

                DataAccessClass dl = new DataAccessClass();

                List<Parameter> paramList = new List<Parameter>();

                /*Milestone*/
                Parameter jsonParamInsertMilestone = new Parameter();
                jsonParamInsertMilestone.ParameterName = "@InsertMilestone";
                jsonParamInsertMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertMilestone.ParameterValue = InsertMilestone;

                Parameter jsonParamUpdateMilestone = new Parameter();
                jsonParamUpdateMilestone.ParameterName = "@UpdateMilestone";
                jsonParamUpdateMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateMilestone.ParameterValue = UpdateMilestone;

                Parameter jsonParamDeleteMilestone = new Parameter();
                jsonParamDeleteMilestone.ParameterName = "@DeleteMilestone";
                jsonParamDeleteMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteMilestone.ParameterValue = DeleteMilestone;

                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;


                Parameter jsonBusinessOptionID = new Parameter();
                jsonBusinessOptionID.ParameterName = "@BusinessOptionID";
                jsonBusinessOptionID.ParameterDbType = SqlDbType.VarChar;
                jsonBusinessOptionID.ParameterValue = BusinessOptionID;

                Parameter jsonUserID = new Parameter();
                jsonUserID.ParameterName = "@UserID ";
                jsonUserID.ParameterDbType = SqlDbType.VarChar;
                jsonUserID.ParameterValue = userId;

                paramList.Add(jsonProjectID);
                paramList.Add(jsonBusinessOptionID);

                paramList.Add(jsonParamInsertMilestone);
                paramList.Add(jsonParamUpdateMilestone);
                paramList.Add(jsonParamDeleteMilestone);

                paramList.Add(jsonUserID);


                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateBussinessCaseSchedule", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("InsertUpdateBussinessCaseSchedule", ex, "ProjectID " + ProjectID + " BusinessOptionID :" + Convert.ToString(BusinessOptionID));
            }

            return result;
        }

        public String importBuissnessData(string ProjectID,string userId)
        {
            string result = "";
            try
            {

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;


                Parameter jsonUserID = new Parameter();
                jsonUserID.ParameterName = "@UserID ";
                jsonUserID.ParameterDbType = SqlDbType.VarChar;
                jsonUserID.ParameterValue = userId;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);
                paramList.Add(jsonUserID);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_ImportBuissnessData", paramList);
                result = ds.Tables[0].Rows[0][0].ToString();

            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("importBuissnessData", ex, "ProjectID " + ProjectID);
            }
            return result;
        }

        public String deleteBusinessCase(string ProjectID, string BusinessOptionID)
        {

            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;


                Parameter jsonBusinessOptionID = new Parameter();
                jsonBusinessOptionID.ParameterName = "@BusinessOptionID";
                jsonBusinessOptionID.ParameterDbType = SqlDbType.VarChar;
                jsonBusinessOptionID.ParameterValue = BusinessOptionID;

                paramList.Add(jsonProjectID);
                paramList.Add(jsonBusinessOptionID);

                ds = dl.ExecuteStoredProcedure("usp_DeleteBussinessCaseOption", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("deleteBusinessCase", ex, "ProjectID " + ProjectID + "BusinessOptionID :" + Convert.ToString(BusinessOptionID));
            }

            return result;
        }

        public String getAdditionalAuthorByProjectId(string ProjectID)
        {

            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();

                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;

                paramList.Add(jsonProjectID);

                ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAdditionalAuthorByProjectId", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getAdditionalAuthorByProjectId", ex, "ProjectID " + ProjectID);
            }

            return result;
        }

        public String getBusinessCaseCAPSWaterWasteByProjectID(string ProjectUID)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectUID);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetBusinessCaseCAPSWaterWasteByProjectID", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getBusinessCaseCAPSWaterWasteByProjectID", ex, null);
            }

            return result;
        }
        #endregion

        #region Security Group
        public String getSecurityGroupAndUsers()
        {
            string strJson = "";
            try
            {
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetSecurityGroupAndUsers");
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getSecurityGroupAndUsers", ex, "No Parameters.");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return strJson;
        }

        public String getUserTeamPermission()
        {
            string strJson = "";
            try
            {
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetUserTeamPermission");
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getUserTeamPermission", ex, "No Parameter.");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }
            return strJson;
        }
        public String updateUserSecurityGroup(object objUserSecurityGroupInfo)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objUserSecurityGroupInfo != null)
                {

                    var resultdata = JObject.Parse(objUserSecurityGroupInfo.ToString());

                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@UserSecurityGroupInfo";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["UserSecurityGroupData"]);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_InsertUpdateUserSecurityGroup", paramList);
                    // }
                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("updateUserSecurityGroup", ex, "Parameter is an object.");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getUserPermissionById(string strUserAdId)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (strUserAdId != string.Empty)
                {

                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@UserADId";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(strUserAdId);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_GetUserPermissionById", paramList);
                    result = JsonConvert.SerializeObject(ds.Tables[0]);
                }
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getUserPermissionById", ex, "strUserAdId=" + strUserAdId);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getUserPermissionByProjectUserId(string strUserAdId, string strProblemUniqueId)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (strUserAdId != string.Empty)
                {

                    DataAccessClass dl = new DataAccessClass();
                    List<Parameter> paramList = new List<Parameter>();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@UserADId";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(strUserAdId);
                    paramList.Add(jsonParam);

                    jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProblemUniqueId";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(strProblemUniqueId);
                    paramList.Add(jsonParam);

                    ds = dl.ExecuteStoredProcedure("usp_GetUserPermissionByProjectUserId", paramList);
                    result = JsonConvert.SerializeObject(ds.Tables[0]);
                }
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getUserPermissionByProjectUserId", ex, "strUserAdId=" + strUserAdId + " strProblemUniqueId=" + strProblemUniqueId);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getProjectByUserId(string strUserAdId, string strFilterString)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (strUserAdId != string.Empty)
                {

                    DataAccessClass dl = new DataAccessClass();
                    List<Parameter> paramList = new List<Parameter>();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@UserADId";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(strUserAdId);
                    paramList.Add(jsonParam);

                    jsonParam = new Parameter();
                    jsonParam.ParameterName = "@strFilterString";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = Convert.ToString(strFilterString);
                    paramList.Add(jsonParam);

                    ds = dl.ExecuteStoredProcedure("usp_GetProjectByUserId", paramList);
                    result = JsonConvert.SerializeObject(ds.Tables[0]);
                }
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getProjectByUserId", ex, "strUserAdId=" + strUserAdId + " strFilterString=" + strFilterString);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getUserGroupById(string strUserAdId)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (strUserAdId != string.Empty)
                {

                    DataAccessClass dl = new DataAccessClass();
                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@UserADId";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(strUserAdId);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_GetUserGroupById", paramList);
                    result = JsonConvert.SerializeObject(ds.Tables[0]);
                }
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getUserGroupById", ex, "strUserAdId=" + strUserAdId);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }
        #endregion

        #region Reports

        public String InsertReports(object objReports)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objReports != null)
                {

                    var resultdata = JObject.Parse(objReports.ToString());

                    DataAccessClass dl = new DataAccessClass();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@Reports";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = Convert.ToString(resultdata["ReportsData"]);
                    List<Parameter> paramList = new List<Parameter>();

                    paramList.Add(jsonParam);
                    ds = dl.ExecuteStoredProcedure("usp_InsertReports", paramList);
                    // }
                }
                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("InsertReports", ex, "Parameter is an object.");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        #endregion

        #region for release testing
        public string GetlastDeploymentDetails()
        {
            return "9Aug18:insertOverAllStatus,insertSchedule;20Aug18: Riskissue,AskNeed,Schedule:Update/Delete;15Oct18: First UAT Release";

        }
        #endregion

        #region for Exception Handeling
        public string WriteErrorLog(string method, String exceptionMessage, string ErrorParameter)
        {
            string strError = string.Empty;
            Exception exception = new Exception();
            //  ex.Message = exceptionMessage;
            exception = (Exception)Activator.CreateInstance(exception.GetType(), exceptionMessage);
            strError = objErrorLog.CreateErrorLogs(method, exception, ErrorParameter);
            return strError;
        }
        #endregion

        #region For Budget Functionality
        public String getProjectBudgetByID(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectBudgetByID", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectBudgetByID", ex, "No parameter");
            }
            return strJson;
        }

        public String getProjectBudgetForecastData(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectBudgetForecastData", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectBudgetForecastData", ex, "No parameter");
            }
            return strJson;
        }

        public String getProjectBudgetForecastDataY1(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectBudgetForecastDataY1", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectBudgetForecastDataY1", ex, "No parameter");
            }
            return strJson;
        }

        public String checkBudgetUnqiueID(string ProjectID, string BudgetID, string BudgetIO)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                Parameter jsonParam1 = new Parameter();
                jsonParam1.ParameterName = "@BudgetID ";
                jsonParam1.ParameterDbType = SqlDbType.VarChar;
                jsonParam1.ParameterValue = Convert.ToString(BudgetID);

                Parameter jsonParam2 = new Parameter();
                jsonParam2.ParameterName = "@BudgetIO ";
                jsonParam2.ParameterDbType = SqlDbType.VarChar;
                jsonParam2.ParameterValue = Convert.ToString(BudgetIO);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);
                paramList.Add(jsonParam1);
                paramList.Add(jsonParam2);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_CheckBudgetUnqiueID", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("checkBudgetUnqiueID", ex, "ProjectID= " + ProjectID + " BudgetID=" + BudgetID);
            }
            return strJson;
        }

        public String getBudgetIO(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetBudgetIO", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getBudgetIO", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }
        public String getProjectCurrentState(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectCurrentState", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectCurrentState", ex, "No parameter");
            }
            return strJson;
        }
        #endregion

        #region For Document management


        public string GetTokenForDocument()
        {

            // string postParameters;
            var AccessToken = "";


            try
            {

                Uri siteUri = new Uri(System.Configuration.ConfigurationManager.AppSettings["Tenant"].ToString());
                //Uri siteUri = new Uri(siteUrl);
                string realm = TokenHelper.GetRealmFromTargetUrl(siteUri);
                realm = string.IsNullOrEmpty(realm) ? "57fdf63b-7e22-45a3-83dc-d37003163aae" : realm.ToString();
                AccessToken = TokenHelper.GetAppOnlyAccessToken(TokenHelper.SharePointPrincipal, siteUri.Authority, realm).AccessToken;

            }
            catch (Exception ex)
            {
                var result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("GetToken", ex, "Parameter is an object.");
            }
            return AccessToken;



        }
        public string GetDocumentList(string ProjectID)
        {
            string strJson = "";
            // bool isGuide = 0;

            string sharepointUrl = System.Configuration.ConfigurationManager.AppSettings["SHAREPOINTURL"].ToString();
            string spUserName = System.Configuration.ConfigurationManager.AppSettings["SPUSERNAME"].ToString();
            string pwd = System.Configuration.ConfigurationManager.AppSettings["SPPASSWORD"].ToString();
            string spPassword = Decryption.DecryptWebConfig(pwd);
            string spFolderName = System.Configuration.ConfigurationManager.AppSettings["SPDOCFOLDERNAME"].ToString();
            try
            {
                SecureString securePwd = GetSecurePassword(spPassword);
                ClientContext sharePointContext = new ClientContext(sharepointUrl);
                var cred = new SharePointOnlineCredentials(spUserName, securePwd);

                sharePointContext.Credentials = cred;
                List DocList = sharePointContext.Web.Lists.GetByTitle(spFolderName);
                CamlQuery query1 = CamlQuery.CreateAllItemsQuery();
                ListItemCollection items1 = DocList.GetItems(query1);
                //    ' Retrieve all items in the ListItemCollection from List.GetItems(Query).
                sharePointContext.Load(items1);
                sharePointContext.ExecuteQuery();
                String result = String.Empty;
                //Uri myUri = new Uri("");
                //String host = myUri.Host;
                //String scheme = myUri.Scheme;
                List<DocLibrary> ListDocLib = new List<DocLibrary>();
                foreach (ListItem li in items1)
                {
                    DocLibrary d = new DocLibrary();
                    d.DocName = Convert.ToString(li["FileLeafRef"]);
                    d.ModifiedBy = Convert.ToString(li["Modified_x0020_By"]);
                    d.ModifiedDate = Convert.ToDateTime(li["Modified"]);
                    d.VersionNo = Convert.ToString(li["_UIVersionString"]);
                    d.CheckedOutTo = Convert.ToString(((Microsoft.SharePoint.Client.FieldLookupValue)(li["CheckedOutTitle"])).LookupValue);
                    d.DocUrl = Convert.ToString(li["ServerRedirectedEmbedUri"]);
                    d.CreatedBy = Convert.ToString(((Microsoft.SharePoint.Client.FieldLookupValue)(li["Author"])).LookupValue);
                    //  ' We have all the list item data. For example, Title. 
                    //isGuide = 0;
                    d.DocType = Convert.ToString(li["File_x0020_Type"]);
                    ListDocLib.Add(d);
                }

                strJson = JsonConvert.SerializeObject(ListDocLib);
            }
            catch (Exception ex)
            {
                objErrorLog.CreateErrorLogs("GetDocumentList", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }

        public SecureString GetSecurePassword(string password)
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

        public String insertUpdateProjectSiteURL(string ProjectID, string ProjectSiteURL)
        {
            List<Parameter> paramList = new List<Parameter>();
            string strJson = "";
            try
            {
                if (ProjectSiteURL != string.Empty)
                {

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectID";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = ProjectID;
                    paramList.Add(jsonParam);

                    jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectSiteURL";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = ProjectSiteURL;
                    paramList.Add(jsonParam);

                    DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateProjectSiteURL", paramList);
                    strJson = "Success";
                }
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("InsertUpdateProjectSiteURL", ex, "ProjectID " + ProjectID + "ProjectSiteURL=" + ProjectSiteURL);
            }
            return strJson;
        }
        public String GetProjectRootSiteUrl(string ProjectID)
        {
            List<Parameter> paramList = new List<Parameter>();


            Parameter jsonParam = new Parameter();
            jsonParam.ParameterName = "@ProjectID";
            jsonParam.ParameterDbType = SqlDbType.VarChar;
            jsonParam.ParameterValue = ProjectID;
            paramList.Add(jsonParam);

            string strJson = "";
            try
            {
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectRootSiteUrl", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
                // strJson = "Success";

            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("GetProjectRootSiteUrl ", ex, strJson);
            }
            return strJson;
        }
        public String GetProjectIdsWithNoSite()
        {
            List<Parameter> paramList = new List<Parameter>();
            string strJson = "";
            try
            {
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_getProjectIdsWithNoSite");
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
                // strJson = "Success";

            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("GetProjectIdsWithNoSite", ex, strJson);
            }
            return strJson;
        }

        public String getProjectCapsDetails(string ProjectUID)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectUID);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetProjectCapsDetails", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("usp_GetProjectCapsDetails", ex, null);
            }

            return result;
        }
        public String getCapsDataByProjectId(string ProjectUID)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectUID);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("Usp_getCapsDataByProjectId", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("Usp_getCapsDataByProjectId", ex, null);
            }

            return result;
        }

        public String getCAPSWaterWasteByProjectID(string ProjectUID)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectUID);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetCAPSWaterWasteByProjectID", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getCAPSWaterWasteByProjectID", ex, null);
            }

            return result;
        }

        public String getCAPSWaterWaste()
        {
            List<Parameter> paramList = new List<Parameter>();
            string strJson = "";
            try
            {
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetCAPSWaterWaste");
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
                // strJson = "Success";

            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getCAPSWaterWaste", ex, strJson);
            }
            return strJson;
        }
        #endregion

        #region Local Variable
        public String getLocalVariableByProjectId(string ProjectID)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = ProjectID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_getLocalVariableByProjectId", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getLocalVariableByProjectId", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getLocalVariableForFilter(string PortfolioOwner)
        {

            string strJson = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonPortfolioOwner = new Parameter();
                jsonPortfolioOwner.ParameterName = "@PortfolioOwner";
                jsonPortfolioOwner.ParameterDbType = SqlDbType.VarChar;
                jsonPortfolioOwner.ParameterValue = PortfolioOwner;


                //Parameter jsonExecutionScope = new Parameter();
                //jsonExecutionScope.ParameterName = "@ExecutionScope";
                //jsonExecutionScope.ParameterDbType = SqlDbType.VarChar;
                //jsonExecutionScope.ParameterValue = ExecutionScope;

                paramList.Add(jsonPortfolioOwner);
                // paramList.Add(jsonExecutionScope);

                ds = dl.ExecuteStoredProcedure("usp_getLocalVariableForFilter", paramList);

                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getLocalVariableForFilter", ex, "PortfolioOwner=" + PortfolioOwner);
            }
            return strJson;
        }

        public String insertUpdateLocalVariableByProjectId(string ProjectID, object objLocalVariablesData)
        {
            List<Parameter> paramList = new List<Parameter>();
            string strJson = "";
            try
            {
                if (objLocalVariablesData != null)
                {

                    string resultdata = objLocalVariablesData.ToString();

                    Parameter jsonParam = new Parameter();
                    jsonParam.ParameterName = "@ProjectID";
                    jsonParam.ParameterDbType = SqlDbType.VarChar;
                    jsonParam.ParameterValue = ProjectID;
                    paramList.Add(jsonParam);

                    jsonParam = new Parameter();
                    jsonParam.ParameterName = "@LocalVariablesData";
                    jsonParam.ParameterDbType = SqlDbType.NVarChar;
                    jsonParam.ParameterValue = resultdata;
                    paramList.Add(jsonParam);

                    DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_InsertUpdateLocalVariableByProjectId", paramList);
                    strJson = "Success";
                }
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("insertUpdateLocalVariableByProjectId", ex, "ProjectID " + ProjectID);
            }
            return strJson;
        }

        public String getUserDetailsByIdMultiple(string UserID)
        {
            string strJson = "";
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = UserID;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetUserDetailsByIdMultiple", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getUserDetailsByIdMultiple", ex, "UserID " + UserID);
            }
            return strJson;
        }
        #endregion

        #region For Progrm Hub
        public String getProgramHubData(string ProjectID, string DataType)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@DataType";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(DataType);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProgramHubData", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProgramHubData", ex, "ProjectID=" + ProjectID + " DataType=" + DataType);
            }
            return strJson;
        }

        public String getProgramHubBulkEditData(string ProjectID, string DataType)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@DataType";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(DataType);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProgramHubBulkEditData", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProgramHubBulkEditData", ex, "ProjectID=" + ProjectID + " DataType=" + DataType);
            }
            return strJson;
        }

        public String getAssociatedProjects(string ProgramUID)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProgramUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProgramUID);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAssociatedProjects", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getAssociatedProjects", ex, "ProgramUID=" + ProgramUID);
            }
            return strJson;
        }

        //public string getAllProjectProgramList(string ProgramUID)
        //{
        //    string strJson = string.Empty;
        //    try
        //    {
        //        List<Parameter> paramList = new List<Parameter>();

        //        Parameter jsonParam = new Parameter();
        //        jsonParam.ParameterName = "@ProgramUID";
        //        jsonParam.ParameterDbType = SqlDbType.VarChar;
        //        jsonParam.ParameterValue = Convert.ToString(ProgramUID);
        //        paramList.Add(jsonParam);

        //        DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetAllProjectProgramList", paramList);
        //        strJson = JsonConvert.SerializeObject(ds.Tables[0]);
        //    }
        //    catch (Exception ex)
        //    {
        //        strJson = "Error: " + ex.Message;
        //        objErrorLog.CreateErrorLogs("getAllProjectProgramList", ex, "No parameter");
        //    }
        //    return strJson;
        //}

        public String getParentProject(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);
                paramList.Add(jsonParam);
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetParentProject", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getParentProject", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }
        public String updateParentProject(string projectUID, object directChildProjectlist, object deletedAssociationProjList)
        {
            string strDirectChildProjectlist = "";
            string strDeletedAssociationProjList = "";
            string strJson = string.Empty;
            try
            {
                if (directChildProjectlist != null)
                {
                    strDirectChildProjectlist = directChildProjectlist.ToString();

                }
                if (deletedAssociationProjList != null)
                {
                    strDeletedAssociationProjList = deletedAssociationProjList.ToString();
                }

                Parameter jsonProjectUID = new Parameter();
                jsonProjectUID.ParameterName = "@ProjectUID";
                jsonProjectUID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectUID.ParameterValue = projectUID;

                Parameter jsonDirectChildProjectlist = new Parameter();
                jsonDirectChildProjectlist.ParameterName = "@DirectChildProjectlist";
                jsonDirectChildProjectlist.ParameterDbType = SqlDbType.VarChar;
                jsonDirectChildProjectlist.ParameterValue = strDirectChildProjectlist;

                Parameter jsondeletedAssociationProjList = new Parameter();
                jsondeletedAssociationProjList.ParameterName = "@DeletedAssociationProjList";
                jsondeletedAssociationProjList.ParameterDbType = SqlDbType.VarChar;
                jsondeletedAssociationProjList.ParameterValue = strDeletedAssociationProjList;

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonProjectUID);
                paramList.Add(jsonDirectChildProjectlist);
                paramList.Add(jsondeletedAssociationProjList);
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_UpdateParentProject", paramList);
                // string strJson = JsonConvert.SerializeObject(ds.Tables[0]);
                //return strJson;
                strJson = "Success";
            }
            catch (Exception ex)
            {
                strJson = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("updateParentProject", ex, "projectUID=" + projectUID);
            }
            return strJson;
        }
        public String getProgramHubProjects(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);
                paramList.Add(jsonParam);
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProgramHubProjects", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProgramHubProjects", ex, "ProjectID=" + ProjectID);
            }
            return strJson;
        }

        public String updateParentProjectSingle(string ProjectID, string ParentProjectID)
        {
            string strJson = string.Empty;
            try
            {
                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ParentProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ParentProjectID);
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_UpdateParentProjectSingle", paramList);

                strJson = "Success";
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("updateParentProjectSingle", ex, "ProjectID=" + ProjectID + " ParentProjectID=" + ParentProjectID);
            }
            return strJson;
        }

        public string insertUpdateProgramRiskIssue(string programId, object objInsert, object objUpdate, object objDelete)
        {
            string result = "";
            string insertData = "";
            string updateData = "";
            string deleteData = "";

            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objInsert != null)
                {
                    insertData = objInsert.ToString();
                }
                if (objUpdate != null)
                {
                    updateData = objUpdate.ToString();
                }
                if (objDelete != null)
                {
                    deleteData = objDelete.ToString();
                }
                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProgramID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = programId;

                Parameter jsonInsertData = new Parameter();
                jsonInsertData.ParameterName = "@InsertRiskIssue";
                jsonInsertData.ParameterDbType = SqlDbType.NVarChar;
                jsonInsertData.ParameterValue = insertData;

                Parameter jsonUpdateData = new Parameter();
                jsonUpdateData.ParameterName = "@UpdateRiskIssue";
                jsonUpdateData.ParameterDbType = SqlDbType.NVarChar;
                jsonUpdateData.ParameterValue = updateData;

                Parameter jsonDeleteData = new Parameter();
                jsonDeleteData.ParameterName = "@DeleteRiskIssue";
                jsonDeleteData.ParameterDbType = SqlDbType.NVarChar;
                jsonDeleteData.ParameterValue = deleteData;

                paramList.Add(jsonProjectID);
                paramList.Add(jsonInsertData);
                paramList.Add(jsonUpdateData);
                paramList.Add(jsonDeleteData);
                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateProgramRiskIssue", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("insertUpdateProgramRiskIssue", ex, "ProgramID " + programId);
            }
            return result;
        }
        public string insertUpdateProgramAskNeed(string programId, object objInsert, object objUpdate, object objDelete)
        {
            string result = "";
            string insertData = "";
            string updateData = "";
            string deleteData = "";

            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objInsert != null)
                {
                    insertData = objInsert.ToString();
                }
                if (objUpdate != null)
                {
                    updateData = objUpdate.ToString();
                }
                if (objDelete != null)
                {
                    deleteData = objDelete.ToString();
                }
                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProgramID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = programId;

                Parameter jsonInsertData = new Parameter();
                jsonInsertData.ParameterName = "@InsertAskNeed";
                jsonInsertData.ParameterDbType = SqlDbType.NVarChar;
                jsonInsertData.ParameterValue = insertData;

                Parameter jsonUpdateData = new Parameter();
                jsonUpdateData.ParameterName = "@UpdateAskNeed";
                jsonUpdateData.ParameterDbType = SqlDbType.NVarChar;
                jsonUpdateData.ParameterValue = updateData;

                Parameter jsonDeleteData = new Parameter();
                jsonDeleteData.ParameterName = "@DeleteAskNeed";
                jsonDeleteData.ParameterDbType = SqlDbType.NVarChar;
                jsonDeleteData.ParameterValue = deleteData;

                paramList.Add(jsonProjectID);
                paramList.Add(jsonInsertData);
                paramList.Add(jsonUpdateData);
                paramList.Add(jsonDeleteData);
                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateProgramAskNeed", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("insertUpdateProgramAskNeed", ex, "ProgramID " + programId);
            }
            return result;
        }
        public string insertUpdateProgramMilestones(string programId, string userId, object objInsert, object objUpdate, object objDelete)
        {
            string result = "";
            string insertData = "";
            string updateData = "";
            string deleteData = "";

            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objInsert != null)
                {
                    insertData = objInsert.ToString();
                }
                if (objUpdate != null)
                {
                    updateData = objUpdate.ToString();
                }
                if (objDelete != null)
                {
                    deleteData = objDelete.ToString();
                }
                DataAccessClass dl = new DataAccessClass();


                List<Parameter> paramList = new List<Parameter>();

                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProgramID ";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = programId;

                Parameter jsonUserID = new Parameter();
                jsonUserID.ParameterName = "@UserID ";
                jsonUserID.ParameterDbType = SqlDbType.VarChar;
                jsonUserID.ParameterValue = userId;

                Parameter jsonInsertData = new Parameter();
                jsonInsertData.ParameterName = "@InsertSchedule";
                jsonInsertData.ParameterDbType = SqlDbType.NVarChar;
                jsonInsertData.ParameterValue = insertData;

                Parameter jsonUpdateData = new Parameter();
                jsonUpdateData.ParameterName = "@UpdateSchedule";
                jsonUpdateData.ParameterDbType = SqlDbType.NVarChar;
                jsonUpdateData.ParameterValue = updateData;

                Parameter jsonDeleteData = new Parameter();
                jsonDeleteData.ParameterName = "@DeleteSchedule";
                jsonDeleteData.ParameterDbType = SqlDbType.NVarChar;
                jsonDeleteData.ParameterValue = deleteData;

                paramList.Add(jsonProjectID);
                paramList.Add(jsonUserID);
                paramList.Add(jsonInsertData);
                paramList.Add(jsonUpdateData);
                paramList.Add(jsonDeleteData);
                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateProgramSchedule", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("insertUpdateProgramMilestones", ex, "ProgramID " + programId);
            }
            return result;
        }

        #endregion

        #region for TopMenu
        public string getGlobalMessage()
        {
            string strJson = string.Empty;
            try
            {
                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_getGlobalMessage");
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getGlobalMessage", ex, "No parameter");
            }
            return strJson;



        }
        #endregion

        #region For User Preference
        public String getUserPreferanceByID(string UserAdId)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(UserAdId);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetUserPreferanceByID", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getUserPreferance", ex, null);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String updateUserPreference(string userADId, string includeArchived)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {

                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();

                jsonParam.ParameterName = "@userADId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(userADId);
                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@includeArchived";
                jsonParam.ParameterDbType = SqlDbType.Bit;
                jsonParam.ParameterValue = includeArchived;
                paramList.Add(jsonParam);

                ds = dl.ExecuteStoredProcedure("usp_UpdateUserPreference", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("updateUserPreference", ex, "Parameter is an object.");
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getUserPortfolioGroup(string UserAdId)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(UserAdId);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetUserPortfolioGroup", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getUserPortfolioGroup", ex, null);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getUserMilestoneTemplates(string UserAdId)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@UserAdId";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(UserAdId);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetUserMilestoneTemplates", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getUserMilestoneTemplates", ex, null);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getMilestoneSetDetails(string MilestoneTemplateID)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@MilestoneTemplateID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(MilestoneTemplateID);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetMilestoneSetDetails", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getMilestoneSetDetails", ex, null);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String insertUpdateMilestoneSet(string userId, object milestoneSetInfo, object insertUpdateDeleteMilestone)
        {
            string result = "";
            string InsertMilestoneDetails = "";
            string UpdateMilestoneDetails = "";
            string DeleteMilestoneDetails = "";
            string MilestoneInfoData = "";

            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (insertUpdateDeleteMilestone != null)
                {
                    JToken qualityToken = JToken.Parse(insertUpdateDeleteMilestone.ToString());

                    InsertMilestoneDetails = qualityToken[0]["insert"].ToString();
                    UpdateMilestoneDetails = qualityToken[0]["update"].ToString();
                    DeleteMilestoneDetails = qualityToken[0]["delete"].ToString();
                }
                if (milestoneSetInfo != null)
                {
                    MilestoneInfoData = milestoneSetInfo.ToString();
                }


                DataAccessClass dl = new DataAccessClass();
                List<Parameter> paramList = new List<Parameter>();


                /*Milestone Set Details*/
                Parameter jsonParamInsert = new Parameter();
                jsonParamInsert.ParameterName = "@InsertMilestoneSet";
                jsonParamInsert.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsert.ParameterValue = InsertMilestoneDetails;

                Parameter jsonParamUpdate = new Parameter();
                jsonParamUpdate.ParameterName = "@UpdateMilestoneSet";
                jsonParamUpdate.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdate.ParameterValue = UpdateMilestoneDetails;

                Parameter jsonParamDelete = new Parameter();
                jsonParamDelete.ParameterName = "@DeleteMilestoneSet";
                jsonParamDelete.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDelete.ParameterValue = DeleteMilestoneDetails;

                Parameter jsonUserID = new Parameter();
                jsonUserID.ParameterName = "@userId";
                jsonUserID.ParameterDbType = SqlDbType.VarChar;
                jsonUserID.ParameterValue = userId;

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@MilestoneSetInfo";
                jsonParam.ParameterDbType = SqlDbType.NVarChar;
                jsonParam.ParameterValue = MilestoneInfoData;


                paramList.Add(jsonParam);
                paramList.Add(jsonUserID);
                paramList.Add(jsonParamInsert);
                paramList.Add(jsonParamUpdate);
                paramList.Add(jsonParamDelete);

                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateMilestoneSet", paramList);


                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("insertUpdateMilestoneSet", ex, "userId " + userId + " milestoneSetInfo " + JToken.Parse(milestoneSetInfo.ToString()) + " insertUpdateDeleteMilestone " + JToken.Parse(insertUpdateDeleteMilestone.ToString()));
       
            }

            return result;
        }

        public String deleteMilestoneSet(string MilestoneTemplateID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@MilestoneTemplateID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(MilestoneTemplateID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_DeleteMilestoneTemplate", paramList);
                strJson = "Success";
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("deleteMilestoneSet", ex, "MilestoneTemplateID= " + MilestoneTemplateID);
            }
            return strJson;
        }
        #endregion

        public String getPortfolioOwnerWithCurrency(string ProjectUID, string UserID)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {

                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectUID);
                paramList.Add(jsonParam);

                Parameter jsonParam1 = new Parameter();
                jsonParam1 = new Parameter();
                jsonParam1.ParameterName = "@UserID";
                jsonParam1.ParameterDbType = SqlDbType.VarChar;
                jsonParam1.ParameterValue = Convert.ToString(UserID);
                paramList.Add(jsonParam1);
                ds = dl.ExecuteStoredProcedure("usp_GetPortfolioOwnerWithCurrency", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getPortfolioOwnerWithCurrency", ex, null);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getGetAllCurrencyFxRate()
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();

                ds = dl.ExecuteStoredProcedure("usp_GetAllCurrencyFxRate");
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("getGetAllCurrencyFxRate", ex, null);
                //string corelationID = objErrorLog.CreateErrorLogs("InsertProjectHubData", ex);
                //return errormessage + "InsertProjectHubData, " + corelationID;
            }

            return result;
        }

        public String getTopsProjectScope(string ProjectUID)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectUID);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_getTopsProjectScope", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("usp_getTopsProjectScope", ex, null);               
            }

            return result;
        }

        public String getBusinessCaseCapsDetails(string ProjectUID)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();
                Parameter jsonParam = new Parameter();
                List<Parameter> paramList = new List<Parameter>();
                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectUID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectUID);
                paramList.Add(jsonParam);
                ds = dl.ExecuteStoredProcedure("usp_GetBusinessCaseCapsDetails", paramList);
                result = JsonConvert.SerializeObject(ds.Tables[0]);

            }
            catch (Exception ex)
            {
                result = ex.Message + ":" + ex.StackTrace + ":" + ex.InnerException;
                objErrorLog.CreateErrorLogs("usp_GetBusinessCaseCapsDetails", ex, null);
            }

            return result;
        }
        public String getProjectDataCorrectness(string ProjectID)
        {
            string strJson = string.Empty;
            try
            {
                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ProjectID";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ProjectID);

                List<Parameter> paramList = new List<Parameter>();
                paramList.Add(jsonParam);

                DataSet ds = objDataAccessClass.ExecuteStoredProcedure("usp_GetProjectDataCorrectness", paramList);
                strJson = JsonConvert.SerializeObject(ds.Tables[0]);
            }
            catch (Exception ex)
            {
                strJson = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("getProjectDataCorrectness", ex, "ProjectID= " + ProjectID);
            }
            return strJson;
        }
        public String updateProjectCharterSchedule(string ProjectID, object objMilestone, string userId)
        {
            string InsertMilestone = "";
            string UpdateMilestone = "";
            string DeleteMilestone = "";

            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                if (objMilestone != null)
                {
                    JToken milestoneToken = JToken.Parse(objMilestone.ToString());

                    InsertMilestone = (milestoneToken[0]["insert"]).ToString();
                    UpdateMilestone = milestoneToken[0]["update"].ToString();
                    DeleteMilestone = milestoneToken[0]["delete"].ToString();
                }

                DataAccessClass dl = new DataAccessClass();

                List<Parameter> paramList = new List<Parameter>();
                /*Milestone*/
                Parameter jsonParamInsertMilestone = new Parameter();
                jsonParamInsertMilestone.ParameterName = "@InsertMilestone";
                jsonParamInsertMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamInsertMilestone.ParameterValue = InsertMilestone;

                Parameter jsonParamUpdateMilestone = new Parameter();
                jsonParamUpdateMilestone.ParameterName = "@UpdateMilestone";
                jsonParamUpdateMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamUpdateMilestone.ParameterValue = UpdateMilestone;

                Parameter jsonParamDeleteMilestone = new Parameter();
                jsonParamDeleteMilestone.ParameterName = "@DeleteMilestone";
                jsonParamDeleteMilestone.ParameterDbType = SqlDbType.NVarChar;
                jsonParamDeleteMilestone.ParameterValue = DeleteMilestone;
                
                Parameter jsonProjectID = new Parameter();
                jsonProjectID.ParameterName = "@ProjectID";
                jsonProjectID.ParameterDbType = SqlDbType.VarChar;
                jsonProjectID.ParameterValue = ProjectID;

                Parameter jsonParamUser = new Parameter();
                jsonParamUser.ParameterName = "@UserID";
                jsonParamUser.ParameterDbType = SqlDbType.VarChar;
                jsonParamUser.ParameterValue = userId;
                
                paramList.Add(jsonProjectID);
                paramList.Add(jsonParamInsertMilestone);
                paramList.Add(jsonParamUpdateMilestone);
                paramList.Add(jsonParamDeleteMilestone);
                paramList.Add(jsonParamUser);
                ds = dl.ExecuteStoredProcedure("usp_InsertUpdateProjectCharterSchedule", paramList);

                result = "Success";
            }
            catch (Exception ex)
            {
                result = "Error: " + ex.Message;
                objErrorLog.CreateErrorLogs("updateProjectCharterSchedule", ex, "ProjectID " + ProjectID);
            }

            return result;
        }
    }

public class ErrorLog
    {
        public string CreateErrorLogs(string method, Exception exception, string ErrorParameter)
        {
            string result = "";
            DataSet ds = new DataSet(); // Create new Dataset
            try
            {
                DataAccessClass dl = new DataAccessClass();

                Parameter jsonParam = new Parameter();
                jsonParam.ParameterName = "@ErrorMethod";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(method);
                List<Parameter> paramList = new List<Parameter>();

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ErrorMessage";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = exception.Message;

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ErrorDetail";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = "Inner Exception :" + Convert.ToString(exception.InnerException) + "Stack Trace :" + Convert.ToString(exception.StackTrace);

                paramList.Add(jsonParam);

                jsonParam = new Parameter();
                jsonParam.ParameterName = "@ErrorParameter";
                jsonParam.ParameterDbType = SqlDbType.VarChar;
                jsonParam.ParameterValue = Convert.ToString(ErrorParameter);
                paramList.Add(jsonParam);

                ds = dl.ExecuteStoredProcedure("usp_InsertErrorLog", paramList);
                result = "Error Logged in Database";

            }
            catch (Exception ex)
            {
                result = "Database method CreateErrorLogs " + ex.InnerException;
                // throw ex;
            }
            return result;
        }

    }


    public class DocLibrary
    {
        public string DocName { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public string CreatedBy { get; set; }
        public string CheckedOutTo { get; set; }
        public string VersionNo { get; set; }
        public string DocUrl { get; set; }
        public string DocType { get; set; }
    }

    //public class lookup
    //{
    //    string LookUpMemberID { get; set; }
    //    string LookUpMemberName { get; set; }
    //    int LookUpMemberOrder { get; set; }
    //}

    //public class objRiskIssue
    //{
    //    public List<update> update { get; set; }
    //}

    //public class update
    //{
    //    public string RiskIssueUniqueID { get; set; }
    //    public string IfHappens { get; set; }
    //    public string RiskIssueResult { get; set; }
    //    public string Mitigation { get; set; }
    //    public string RiskIssueTypeID { get; set; }
    //    public string IncludeInCharter { get; set; }

    //}


    //public class ScheduleData
    //{
    //    public string ScheduleUniqueID { get; set; }
    //    public string ProjectID { get; set; }
    //    public string Milestone { get; set; }
    //    public string PlannedFinish { get; set; }
    //    public string BaselineFinish { get; set; }
    //    public lookup FunctionGroup { get; set; }
    //    public string Comments { get; set; }
    //    public string CompletionDate { get; set; }
    //    public string IncludeInReport { get; set; }
    //}
}
