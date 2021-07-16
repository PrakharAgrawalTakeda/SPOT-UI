using System;
using System.Collections.Generic;
using System.Data;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;

namespace ProjectWidgets.OneShirePremier.SPOTApp
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService" in both code and config file together.
    [ServiceContract]
    public interface IService
    {


        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getAskNeed/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getAskNeed(string ProjectID);


        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getProjectHubStatus/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getProjectHubStatus(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getUserData/{UserDepartment}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getUserData(string UserDepartment);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "GetUserForBulk/{UserDepartment}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String GetUserForBulk(string UserDepartment);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getProjectTeam/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getProjectTeam(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getCapitalPhase", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getCapitalPhase();

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
        String getSecurityGroupAndUsers();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserTeamPermission", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserTeamPermission();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserDataWithFilter", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserDataWithFilter(string UserDepartment, string FilterString);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserDataWithFilterMultiple", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserDataWithFilterMultiple(string UserDepartment, string FilterString, string AlreadySearchedUser);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserPermissionById", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserPermissionById(string strUserAdId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getAllProjectInfo", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getAllProjectInfo(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
            string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
            string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getAllProjectInfoWithLocalVar", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getAllProjectInfoWithLocalVar(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
         string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
          string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);
        //[OperationContract]
        //[WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json)]
        //String getLateMilestones();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getAllMilestonesPortfolioCenter", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getAllMilestonesPortfolioCenter(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
            string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
          string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getPortfolioCenterTileInfo", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getPortfolioCenterTileInfo(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
            string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
           string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getAskNeedPortfolio", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getAskNeedPortfolio(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
          string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
           string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getRiskIssuePortfolio", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getRiskIssuePortfolio(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
          string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
           string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getPhasePriorityDataPortfolio", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getPhasePriorityDataPortfolio(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
    string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
    string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBudgetChartData", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string getBudgetChartData(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
   string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
    string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getPortfolioBudgetForecastData", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string getPortfolioBudgetForecastData(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
   string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
    string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getPortfolioBudgetCummulativeData", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string getPortfolioBudgetCummulativeData(string strUserAdId, string strIsCAPSProjectfilter, string strExecutionScopeFilter, string strOETypefilter,
string strProjectPhaseFilter, string strProjectStatusfilter, string strPrimaryProductfilter, string strPortfolioOwnerfilter, string struserFilter,
  string strCapexRangefilter, object objLocalVariable, string strParentProgramfilter, string strFundingStatusFilter,
            string strProjectTypefilter, string strIncludeChild, string strCapPhasefilter, string strOEPhasefilter, string strAglWrkStreamfilter, string strAglWavefilter, string strPrimaryKPI, string strTopsGroupfilter,string strGMSBudgetOwnerfilter, string strAnnualMustWinfilter, string strStrategicYearfilter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateUserSecurityGroup", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateUserSecurityGroup(object objAskNeedData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "InsertAskNeed", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertAskNeed(object objAskNeedData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "InsertPhaseState", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertPhaseState(object objPhaseState);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "InsertProjectTeam", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertProjectTeam(object objProjectTeam);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateProjectTeamData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateProjectTeamData(object objProjectTeam);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "deleteProjectTeamData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String deleteProjectTeamData(object objProjectTeam);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectTemplateInfoByID", BodyStyle = WebMessageBodyStyle.Wrapped, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectTemplateInfoByID(string ProjectIDTemplate, string CopyUserID, string CopyProjectParameter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateAskNeed", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateAskNeed(object objAskNeedData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "deleteAskNeed", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String deleteAskNeed(object objAskNeedData);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getSchedule/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getSchedule(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "GetDocumentList", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string GetDocumentList(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "GetTokenForDocument", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        string GetTokenForDocument();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectBaseline", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getProjectBaseline(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertScheduleData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertScheduleData(object objSchedule);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertProjectBaseline", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertProjectBaseline(object objBaseline);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateScheduleData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string updateScheduleData(object objSchedule);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "deleteScheduleData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string deleteScheduleData(object objSchedule);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectBaselineLog", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getProjectBaselineLog(string ProjectID);


        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getRiskIssue/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getRiskIssue(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getOverAllStatus/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getOverAllStatus(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getPhaseState/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getPhaseState(string ProjectID);

        //[OperationContract]
        //[WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        //String getRiskIssue();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertRiskIssueData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertRiskIssueData(object objRiskIssueData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateRiskIssueData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateRiskIssueData(object objRiskIssueData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "deleteRiskIssueData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String deleteRiskIssueData(object objRiskIssueData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getLookupData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getLookupData(string lookup);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getLookupDataPerformancestatus", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getLookupDataPerformancestatus(string lookupStatus);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getKPIData", BodyStyle = WebMessageBodyStyle.Wrapped, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getKPIData(string kpi, string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getHubSetting", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getHubSetting(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectTypeSelectorData();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertProblemCaptureData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertProblemCaptureData(object objProjectCaptureData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateProjectInfoByID", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateProjectInfoByID(string ProjectID, object objQualityData, object objProjectInfoData, string strUserAdId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectNameByID", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectNameByID(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getProjectInfoByID/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getProjectInfoByID(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertQualityReferenceData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertQualityReferenceData(object objProjectCaptureData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateQualityReferenceData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateQualityReferenceData(object objProjectCaptureData);
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "deleteQualityReferenceData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String deleteQualityReferenceData(object objProjectCaptureData);


        [OperationContract]
        [WebInvoke(Method = "GET", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String GetlastDeploymentDetails();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertOverAllStatus", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertOverAllStatus(string ProjectID, object objPerformance, object overAllStatusData, string userId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectTOPS", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectTOPS(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getUserPermissionByProjectUserId/{strUserAdId}/{strProblemUniqueId}", BodyStyle = WebMessageBodyStyle.Wrapped, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserPermissionByProjectUserId(string strUserAdId, string strProblemUniqueId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectCharterInfoByID", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectCharterInfoByID(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectCloseOutInfoByID", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectCloseOutInfoByID(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectCloseOutLessonsLearned", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectCloseOutLessonsLearned(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectCharterKeySuccess", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectCharterKeySuccess(string ProjectID);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectCharterAssumption", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectCharterAssumption(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectCharterFunding", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectCharterFunding(string ProjectID);



        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "projectCharterUpdate", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String projectCharterUpdate(string ProjectID, object objRiskIssue, object objMilestone, object objProjectTeam, object objKeySuccess, object objAssumption, object objFunding, object objProjectCharterInfo, string userId, object objCapsCharter,object CapsWaterWaste);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "projectCloseOutUpdate", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String projectCloseOutUpdate(string ProjectID, object objKeySuccess, object objLessonsLearnt, object objProjectCloseOutInfo, object objMilestone, object objBalelineLog,string userId);



        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getBusinessCaseInfoByProjectID/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getBusinessCaseInfoByProjectID(string ProjectID);


        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getBusinessCaseOptionByProjectID/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBusinessCaseOptionByProjectID(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBusinessCaseBudgetFunding", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBusinessCaseBudgetFunding(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBusinessCaseKeyAssumption", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBusinessCaseKeyAssumption(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBusinessCaseRiskIssue", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBusinessCaseRiskIssue(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getGetBusinessCaseKeySuccess", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getGetBusinessCaseKeySuccess(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBusinessCaseSchedule", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBusinessCaseSchedule(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBusinessCaseTOPSKPI", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBusinessCaseTOPSKPI(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBusinessCaseCAPSWaterWasteByProjectID", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBusinessCaseCAPSWaterWasteByProjectID(string ProjectUID);


        //[OperationContract]
        //[WebInvoke(Method = "POST", UriTemplate = "updateBusinessCaseOption", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        //String updateBusinessCaseOption(object objBusinessCaseInfoData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "deleteBusinessCase", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String deleteBusinessCase(string ProjectID, string BusinessOptionID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateProjectSiteURL", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateProjectSiteURL(string ProjectID, string ProjectSiteURL);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateBusinessCase", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateBusinessCase(object ProjectBussinessCaseInfo, string ProjectID, string BusinessOptionID, object objRiskIssue, object objMilestone, object objKeySuccess, object objAssumption, object objFunding, object objCapsEMSource, object BusinessCaseOptionInfo, object TOPSKPI, string userId, object objCapsWaterWaste);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "importBuissnessData", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String importBuissnessData(string ProjectID, string userId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "InsertReports", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String InsertReports(object objReports);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateTOPS", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateTOPS(object TOPS, object TOPSKPI);


        [OperationContract]
        [WebInvoke(Method = "GET", UriTemplate = "getQualityReferenceByProjectId/{ProjectID}", BodyStyle = WebMessageBodyStyle.Wrapped, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]

        String getQualityReferenceByProjectId(string ProjectID);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "InsertUpdateHubSetting", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String InsertUpdateHubSetting(object objHubSetting);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getPortfolioDeliverablesStatus", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getPortfolioDeliverablesStatus(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectByUserId", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectByUserId(string strUserAdId, string strFilterString);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectBudgetByID", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectBudgetByID(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getYearLabel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getYearLabel();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectBudgetForecastData", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectBudgetForecastData(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectBudgetForecastDataY1", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectBudgetForecastDataY1(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateProjectBudget", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateProjectBudget(string ProjectID, object objBudgetData, object objCapexGridData, object objCapexGridDataY1, object objOpexGridData, object objOpexGridDataY1, object objBudgetIO, object objBudgetIODelete);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "WriteErrorLog", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string WriteErrorLog(string method, String exceptionMessage, string ErrorParameter);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getAdditionalAuthorByProjectId", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getAdditionalAuthorByProjectId(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getLocalVariableByProjectId", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getLocalVariableByProjectId(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getLocalVariableForFilter", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getLocalVariableForFilter(string PortfolioOwner);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateLocalVariableByProjectId", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateLocalVariableByProjectId(string ProjectID, object objLocalVariablesData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserDetailsByIdMultiple", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserDetailsByIdMultiple(string UserID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserConfidentialProject", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserConfidentialProject(string strUserAdId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserGroupById", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserGroupById(string strUserAdId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "exportProjectViewToExcel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string exportProjectViewToExcel(object objProjectIDs);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "exportMilestoneViewToExcel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string exportMilestoneViewToExcel(object objProjectIDs);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "exportIssuesRisksViewToExcel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string exportIssuesRisksViewToExcel(object objProjectIDs);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "exportAsksNeedsViewToExcel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string exportAsksNeedsViewToExcel(object objProjectIDs);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "exportBusinessCaseOptionsViewToExcel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string exportBusinessCaseOptionsViewToExcel(object objProjectIDs);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "exportTopsViewToExcel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string exportTopsViewToExcel(object objProjectIDs);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "exportBudgetCapitalGeneralToExcel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string exportBudgetCapitalGeneralToExcel(object objProjectIDs);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "exportBudgetCapitalForecastToExcel", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string exportBudgetCapitalForecastToExcel(object objProjectIDs);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProgramHubData", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProgramHubData(string ProjectID, string DataType);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProgramHubBulkEditData", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProgramHubBulkEditData(string ProjectID, string DataType);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getAssociatedProjects", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getAssociatedProjects(string ProgramUID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getGlobalMessage", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getGlobalMessage();

        //[OperationContract]
        //[WebInvoke(Method = "POST", UriTemplate = "getAllProjectProgramList", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        //String getAllProjectProgramList(string ProgramUID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getAllProjectProgramListFilter", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getAllProjectProgramListFilter(string programUID, string searchFor, string filterString);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateParentProject", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateParentProject(string projectUID, object directChildProjectlist, object deletedAssociationProjList);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "checkBudgetUnqiueID", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String checkBudgetUnqiueID(string ProjectID, string BudgetID, string BudgetIO);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBudgetIO", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBudgetIO(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProgramHubProjects", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getProgramHubProjects(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getParentProject", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getParentProject(string ProjectID);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateParentProjectSingle", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateParentProjectSingle(string ProjectUID, string ParentProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateProgramRiskIssue", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateProgramRiskIssue(string programId, object objInsert, object objUpdate, object objDelete);
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateProgramAskNeed", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateProgramAskNeed(string programId, object objInsert, object objUpdate, object objDelete);
        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateProgramMilestones", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateProgramMilestones(string programId, string userId, object objInsert, object objUpdate, object objDelete);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateProtfolioBudget", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateProtfolioBudget(object objCapexGridData, string strSubmittedByID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectList", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectList(string ProgramUID, bool linkToChild);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getAllProjectListFilterMultiple", BodyStyle = WebMessageBodyStyle.WrappedRequest, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getAllProjectListFilterMultiple(string SearchFor, string FilterString, string AlreadySearchedProject, string UserAdId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProductDataWithFilter", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProductDataWithFilter(string filterString, string AlreadySearchedProduct);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProductListByProjectID", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getProductListByProjectID(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "GetProjectIdsWithNoSite", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String GetProjectIdsWithNoSite();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "GetProjectRootSiteUrl", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String GetProjectRootSiteUrl(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getPortfolioOwnerWithCurrency", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getPortfolioOwnerWithCurrency(string ProjectUID, string UserID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getGetAllCurrencyFxRate", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getGetAllCurrencyFxRate();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserPreferanceByID", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserPreferanceByID(string strUserAdId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateUserPreference", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateUserPreference(string userADId, string includeArchived);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserPortfolioGroup", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserPortfolioGroup(string strUserAdId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getUserMilestoneTemplates", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getUserMilestoneTemplates(string strUserAdId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getMilestoneSetDetails", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getMilestoneSetDetails(string MilestoneTemplateID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getTopsProjectScope", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getTopsProjectScope(string ProjectUID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectCapsDetails", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectCapsDetails(string ProjectUID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getCapsDataByProjectId", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getCapsDataByProjectId(string ProjectUID);


        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getCAPSWaterWasteByProjectID", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getCAPSWaterWasteByProjectID(string ProjectUID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getCAPSWaterWaste", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getCAPSWaterWaste();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateCAPS", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateCAPS(string ProjectID, object Capsdata, object Capsgrid, object CapsWaterWaste);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getBusinessCaseCapsDetails", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getBusinessCaseCapsDetails(string ProjectUID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectDataCorrectness", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectDataCorrectness(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getLBEPeriodData", BodyStyle = WebMessageBodyStyle.WrappedResponse, ResponseFormat = WebMessageFormat.Json, RequestFormat = WebMessageFormat.Json)]
        String getLBEPeriodData();

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectBulkBudgetForecastDataExcel", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string getProjectBulkBudgetForecastDataExcel(string LBEPeriod, string ProjectID, string BudgetID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectBulkBudgetHistoricalDataExcel", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string getProjectBulkBudgetHistoricalDataExcel(string ProjectID, string BudgetID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateProjectBulkBudgetForecastDataExcel", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        string insertUpdateProjectBulkBudgetForecastDataExcel(string ForecastExcelGridData, string userId, string HistoricalExcelGridData);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "insertUpdateMilestoneSet", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String insertUpdateMilestoneSet(string userId, object milestoneSetInfo, object insertUpdateDeleteMilestone);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "deleteMilestoneSet", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String deleteMilestoneSet(string MilestoneTemplateID);
      

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getMilestoneSetProjectHub", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getMilestoneSetProjectHub(string ProjectID, string DataType);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "updateProjectCharterSchedule", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String updateProjectCharterSchedule(string ProjectID, object objMilestone, string userId);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "getProjectCurrentState", BodyStyle = WebMessageBodyStyle.WrappedResponse, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String getProjectCurrentState(string ProjectID);

        [OperationContract]
        [WebInvoke(Method = "POST", UriTemplate = "InsertUpdateBussinessCaseSchedule", BodyStyle = WebMessageBodyStyle.WrappedRequest, RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
        String InsertUpdateBussinessCaseSchedule(string ProjectID, string BusinessOptionID, object objMilestone, string userId);


    }

    // Use a data contract as illustrated in the sample below to add composite types to service operations.
    [DataContract]
    public class CompositeType
    {
        bool boolValue = true;
        string stringValue = "Hello ";

        [DataMember]
        public bool BoolValue
        {
            get { return boolValue; }
            set { boolValue = value; }
        }

        [DataMember]
        public string StringValue
        {
            get { return stringValue; }
            set { stringValue = value; }
        }
    }
}
