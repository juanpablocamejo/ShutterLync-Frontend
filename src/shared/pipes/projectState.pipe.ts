import { Pipe, PipeTransform } from '@angular/core';
import { ProjectState } from '../models/enums/ProjectState';

@Pipe({ name: 'ProjectState' })
export class ProjectStatePipe implements PipeTransform {
    private stateNames: { [state: string]: string } = {
        [ProjectState.CREATED]: 'Creado',
        [ProjectState.PREVIEW_LOADED]: 'Muestra cargada',
        [ProjectState.ORDER_LOADED]: 'Pedido cargado',
        [ProjectState.COMPLETED]: 'Listo para entrega',
        [ProjectState.DELIVERED]: 'Entregado'
    };
    transform(value): any {
        return this.stateNames[value];
    }
}
