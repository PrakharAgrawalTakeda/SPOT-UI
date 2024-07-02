import { TaskModel } from "@bryntum/gantt";

export interface IAppSetting {
    projectHubPanel?: 'Locked' | 'Unlocked'
}
export class ModifiedTaskModel extends TaskModel {
    static get fields(): any {
        return [
            { name: 'isImportantDate', type: 'string' },
        ];
    }
}