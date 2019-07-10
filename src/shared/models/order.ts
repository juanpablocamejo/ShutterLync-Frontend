import { BaseObject } from './BaseObject';
import { OrderStates } from './enums/OrderStates';
import { OrderItem } from './OrderItem';

interface SelectionDict { [id: string]: boolean; }
export class Order extends BaseObject {
    state: OrderStates = OrderStates.PENDING;
    orderItems: OrderItem[] = [];
    selection: SelectionDict = {};

    constructor(fields: Partial<Order>, selectableItems: string[]) {
        super(); this.init(fields);
        this.loadSelection(selectableItems);
    }

    loadSelection(items: string[]) {
        const fn = (id: string) => (itm: OrderItem) => {
            return itm.previewItemId === id;
        };
        items.forEach(id => {
            this.selection[id] = this.orderItems.some(fn(id));
        });
    }

    confirm() {
        this.state = OrderStates.CONFIRMED;
    }
    complete() {
        this.state = OrderStates.COMPLETED;
    }
    markAsDelivered() {
        this.state = OrderStates.DELIVERED;
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
        this.orderItems.push(new OrderItem({ previewItemId: id }));
    }
    remove(id: string) {
        this.selection[id] = false;
        this.orderItems = this.orderItems.filter(elem => elem.previewItemId !== id);
    }

    markItemAsDone(id: string, done: boolean) {
        this.orderItems.find(itm => itm.previewItemId === id).done = done;
    }

    includes(id: string) {
        return this.selection[id];
    }
    get selectedItems(): number {
        return this.orderItems.length;
    }

    get confirmed() {
        return this.state === OrderStates.CONFIRMED;
    }

    get doneItems() {
        return this.orderItems.filter(itm => itm.done).length;
    }
    get progress() {
        return (this.doneItems * 100) / this.orderItems.length;
    }

}
