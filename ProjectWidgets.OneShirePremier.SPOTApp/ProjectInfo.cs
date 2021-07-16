using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjectWidgets.OneShirePremier.SPOTApp
{
    public class ProjectInfo
    {
        public string ProblemUniqueID { get; set; }
        public string ProjectName { get; set; }
        public string OverallStatus { get; set; }
        public string Tops { get; set; }
        public string Phase { get; set; }
        //   public string Stage { get; set; }
        public string PM { get; set; }
        public string Sponsor { get; set; }
        public string ScheduleIndicator { get; set; }
        public string RiskIndicator { get; set; }
        public string BudgetIndicator { get; set; }
        public string AskNeedIndicator { get; set; }
        public string ApprovedAmount { get; set; }
        public string NextMilestone { get; set; }
        public string ProjectPlannedFinishDate { get; set; }
        public string ProblemID { get; set; }
        public string BudgetID { get; set; }
        //  public string Change { get; set; }
        public string PortfolioOwnerName { get; set; }
        public string DataFreshness { get; set; }
        public string Next3MonthsProjectCompleting { get; set; }
        public string Last3MonthsProjectCompleted { get; set; }
        public string Last3MonthsProjectsInitiated { get; set; }
        public string Last3MonthsProjectOnHold { get; set; }
        public string Last3MonthsProjectsFinishExecution { get; set; }
        public string PrimaryProductTitle { get; set; }
        public string PrimarySVP { get; set; }
        public string CBRatio { get; set; }
        public string OverallBenefitScore { get; set; }
        public string CapitalPlan { get; set; }
        public string Forecast { get; set; }
        public string NextMilestoneFinishDate { get; set; }
        public string ActualProjectCompleteDate { get; set; }
        public int TotalMilestone { get; set; }
        public int TargetToComplete { get; set; }
        public int ActualCompletedMilestones { get; set; }
        public string daysInPhase { get; set; }
        public string CapitalPhaseName { get; set; }
        public string CapitalPhaseAbbreviation { get; set; }
        public List<ProjChartData> prjLineChat;
        //    public List<ProjChartData> prjPercentageCompleteChat;
    }

    public class ProjChartData
    {
        public int key { get; set; }
        public string value { get; set; }
    }


    public class BusinessCaseOptions
    {
        public string BusinessCaseOptionUniqueID { get; set; }
        public string ProblemUniqueID { get; set; }
        public string OptionTitle { get; set; }
        public string ProposalStatement { get; set; }
        public string DetailedDescription { get; set; }
        public string StrategicRationale { get; set; }
        public string TradeoffAndConsiderations { get; set; }
        public string PeopleRating { get; set; }
        public string PeopleRatingTitle { get; set; }
        public string TechnologyRating { get; set; }
        public string TechnologyRatingTitle { get; set; }
        public string PeopleJustification { get; set; }
        public string TechnologyJustification { get; set; }
        public string BusinessCaseProcessRating { get; set; }
        public string BusinessCaseProcessRatingTitle { get; set; }
        public string BusinessCaseProcessJustification { get; set; }
        public string ManufacturingProcessRating { get; set; }
        public string ManufacturingProcessRatingTitle { get; set; }
        public string ManufacturingProcessJustification { get; set; }
        public string EquipmentRating { get; set; }
        public string EquipmentRatingTitle { get; set; }
        public string EquipementJustification { get; set; }
        public string CapitalRequired { get; set; }
        public string TotalCapexBaseCase { get; set; }
        public string TotalCapexHighCase { get; set; }
        public string ProjectSpendStart { get; set; }
        public string IsProjectSpentNA { get; set; }
        public string AssetInService { get; set; }
        public string AssetInServiceNA { get; set; }
        public string OpexRequired { get; set; }
        public string StrategicAlignment { get; set; }
        public string StrategicAlignmentJustification { get; set; }
        public string NPVBaseCase { get; set; }
        public string NPVHighCase { get; set; }
        public string NPVJustification { get; set; }
    }
}