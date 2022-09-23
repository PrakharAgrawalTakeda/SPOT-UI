export class RoleController{
     public projectHub: ProjectHub = new ProjectHub
     public generalInfo: GeneralInfo = new GeneralInfo
     public projectTeam: boolean = true
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
}

export class GeneralInfo{
   public basicFields: boolean = true
   public porfolioOwner: boolean = true
}
