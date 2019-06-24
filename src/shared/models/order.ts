import { BaseObject } from './BaseObject';
import { OrderState } from './enums/OrderState';

interface SelectionDict { [id: string]: boolean; }

export class Order extends BaseObject {
    state: OrderState = OrderState.PENDING;
    orderItems: string[] = [];
    selection: SelectionDict = {};

    constructor(fields: Partial<Order>, selectableItems: string[]) {
        super(fields);
        this.initialize();
        this.loadSelection(selectableItems);
    }

    loadSelection(items: string[]) {
        items.forEach(id => {
            this.selection[id] = this.orderItems.includes(id);
        });
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
        return this.selection[id];
    }

    addSelectableItem(id: string) {
        this.selection[id] = false;
    }
    removeSelectableItem(id: string) {
        this.selection = Object.entries(this.selection).reduce(
            (acc, [k, v]) => (k === id ? { ...acc } : { ...acc, [k]: v }), {}
        );
    }

    add(id: string) {
        this.selection[id] = true;
        this.orderItems.push(id);
    }
    remove(id: string) {
        this.selection[id] = false;
        this.orderItems = this.orderItems.filter(elem => elem !== id);
    }

    get selectedItems(): number {
        return this.orderItems.length;
    }


}
