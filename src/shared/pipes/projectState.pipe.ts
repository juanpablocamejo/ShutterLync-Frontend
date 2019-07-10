import { Pipe, PipeTransform } from '@angular/core';
import { ProjectState } from '../models/ProjectState';

@Pipe({ name: 'ProjectState' })
export class ProjectStatePipe implements PipeTransform {
    constructor() {
    }

    transform(value: ProjectState, ...args: any[]): any {
        return value.label;
    }
}
