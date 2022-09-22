export class RoleController{
     public projectHub: ProjectHub = new ProjectHub
     public generalInfo: GeneralInfo = new GeneralInfo
     public roleId: string = ''
}

export class ProjectHub{
    public projectBoard: ProjectBoard = new ProjectBoard
    public hubSettings: boolean = true
}

export class ProjectBoard{
    public overallStatusEdit: boolean = true
    public askNeedEdit: boolean = true
    public riskIssuesEdit: boolean = true
    public scheduleEdit: boolean = true
    public baselineedit: boolean = true
    public baselineproject: boolean = false
}

export class GeneralInfo{
   public basicFields: boolean = true
   public porfolioOwner: boolean = true
}