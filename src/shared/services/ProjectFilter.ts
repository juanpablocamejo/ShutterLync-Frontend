import { ProjectState } from '../models/enums/ProjectState';
import { BaseObject } from '../models/BaseObject';
import moment from 'moment';
export class ProjectFilter extends BaseObject {
    constructor(fields?: Partial<ProjectFilter>) {
        super(fields);
    }

    client: string;
    states: ProjectState[];
    fromDate: Date;
    toDate: Date;
    title: string;

    toHttpParams() {
        return Object.entries(
            {
                ...this,
                toDate: this.toDate && moment(this.toDate, 'yyyy-MM-dd'),
                fromDate: this.fromDate && moment(this.fromDate, 'yyyy-MM-dd'),
                states: this.states && this.states.join(',')
            }
        ).reduce((acc, [k, v]) => v ? { ...acc, [k]: v } : acc, {} as any);
    }
}
