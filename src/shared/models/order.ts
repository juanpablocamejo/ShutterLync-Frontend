import { BaseObject } from './BaseObject';

export class Order extends BaseObject  {
    confirmed = false;
    selectedItems: string[];

    constructor(fields?: Partial<Order>) {
        super(fields);
    }

    includes(id: string) {
        return this.selectedItems.includes(id);
    }
}
