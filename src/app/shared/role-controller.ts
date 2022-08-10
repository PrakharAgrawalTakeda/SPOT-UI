export class RoleController{
     public projectHub: ProjectHub = new ProjectHub
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
}

