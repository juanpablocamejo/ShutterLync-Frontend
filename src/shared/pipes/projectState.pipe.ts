import { Pipe, PipeTransform } from '@angular/core';
import { ProjectState } from '../models/enums/ProjectState';

@Pipe({ name: 'ProjectState' })
export class ProjectStatePipe implements PipeTransform {
    private stateNames: { [state: string]: string[] } = {
        [ProjectState.CREATED]: ['Creado', 'Estamos preparando la muestra'],
        [ProjectState.PREVIEW_LOADED]: ['Muestra cargada', 'Ya puede cargar su pedido'],
        [ProjectState.ORDER_LOADED]: ['Pedido cargado', 'Estamos preparando su pedido'],
        [ProjectState.COMPLETED]: ['Listo para entrega', 'Su pedido está listo para retirar'],
        [ProjectState.DELIVERED]: ['Entregado', 'Su pedido ya fue entregado']
    };
    transform(value, ...args: any[]): any {
        return this.stateNames[value][args[0] ? 1 : 0];
    }
}
