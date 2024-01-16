export class RoleController{
     public projectHub: ProjectHub = new ProjectHub
     public generalInfo: GeneralInfo = new GeneralInfo
     public closeOut: CloseOut = new CloseOut
     public projectTeam: boolean = true
     public projectBenefits: boolean = true
     public budgetAdmin: boolean = true
     public projectManager: boolean = false
     public roleId: string = ''
}

export class ProjectHub{
    public projectBoard: ProjectBoard = new ProjectBoard
    public hubSettings: boolean = true
    public localAttributes: boolean = true
    public CAPS: boolean = true
}

export class ProjectBoard{
    public overallStatusEdit: boolean = true
    public askNeedEdit: boolean = true
    public riskIssuesEdit: boolean = true
    public scheduleEdit: boolean = true
    public baselineedit: boolean = true
    public baselineproject: boolean = false
    public phaseState:boolean = true
    public keyAssumptionsEdit: boolean = true
    public operationalBenefitsEdit: boolean = true
}

export class GeneralInfo{
   public basicFields: boolean = true
   public porfolioOwner: boolean = true
   public confidentialEdit: boolean = true
   public SPREdit: boolean = true
}
export class CloseOut{
    public lessonsLearnt: boolean = true
}
