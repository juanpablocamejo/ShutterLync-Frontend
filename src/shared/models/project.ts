import { BaseObject } from './BaseObject';
import { PreviewItem } from './previewItem';
import { Order } from './order';

export class Project extends BaseObject {
    id: string;
    title: string;
    date: Date;
    location: string;
    notes: string;
    quotation: number;
    aditionalItemPrice: number;
    order: Order;
    previewItems: PreviewItem[] = [];
    clientName: string;
    clientLastName: string;
    clientEmail: string;
    clientLocation: string;
    quantity: number;

    constructor(fields?: Partial<Project>) {
        super(fields);
    }
}
