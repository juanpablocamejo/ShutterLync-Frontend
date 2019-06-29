import { BaseObject } from './BaseObject';
export class OrderItem extends BaseObject {
    previewItemId: string;
    notes: string;
    done = false;
    constructor(fields?: Partial<OrderItem>) {
        super();
        this.init(fields);
    }
}
