import { BaseObject } from './BaseObject';
import { PreviewItem } from './previewItem';
import { Order } from './order';
import { ProjectState } from './enums/ProjectState';
export class Client extends BaseObject {
    constructor(fields?: Partial<Client>) {
        super(fields);
    }
    name: string;
    lastName: string;
    email: string;
    location: string;

    get fullName() {
        return `${this.lastName}, ${this.name}`;
    }
}
export class Project extends BaseObject {
    id: string;
    title: string;
    state: ProjectState;
    date: Date;
    location: string;
    notes: string;
    quotation: number;
    aditionalItemPrice: number;
    client: Client;
    order: Order;
    previewItems: PreviewItem[] = [];

    quantity: number;

    constructor(fields?: Partial<Project>) {
        super(fields);
        this.previewItems = (fields.previewItems || []).map(i => new PreviewItem(i));
        this.order = new Order(fields.order, this.previewItems.map(itm => itm.id));
        this.client = new Client(fields.client);
    }

    addPreviewItem(item: PreviewItem) {
        this.previewItems.push(item);
        this.order.addSelectableItem(item.id);
    }

    removePreviewItem(item: PreviewItem) {
        this.previewItems = this.previewItems.filter(itm => itm.id !== item.id);
        this.order.removeSelectableItem(item.id);
    }

    get selectedItems() {
        return this.order.selectedItems;
    }

    selected(id: string) {
        return this.order.includes(id);
    }

    get completedSelection() {
        const [sel, total] = [this.selectedItems, this.quantity];
        return sel >= total ? 100 : Math.round((sel * 100) / total);
    }
    get completedQuantity() {
        const [sel, total] = [this.selectedItems, this.quantity];
        return sel >= total ? total : sel;
    }
    get aditionalQuantity() {
        const [sel, total] = [this.selectedItems, this.quantity];
        return sel > total ? sel - total : 0;
    }
    get aditionalPrice() {
        return this.aditionalQuantity ? (this.aditionalItemPrice * (this.selectedItems - this.quantity)) : 0;
    }
    get totalCost() {
        return this.quotation + this.aditionalPrice;
    }
}
