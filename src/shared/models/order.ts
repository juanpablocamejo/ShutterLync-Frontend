import { BaseObject } from './BaseObject';
import { OrderState } from '../models/enums/OrderState';

export class Order extends BaseObject {
    state: OrderState = OrderState.PENDING;
    orderItems: string[];

    constructor(fields?: Partial<Order>) {
        super(fields);
    }

    get confirmed() {
        return this.state === OrderState.CONFIRMED;
    }
    confirm() {
        this.state = OrderState.CONFIRMED;
    }
    complete() {
        this.state = OrderState.COMPLETED;
    }
    includes(id: string) {
        return this.orderItems.includes(id);
    }

}
