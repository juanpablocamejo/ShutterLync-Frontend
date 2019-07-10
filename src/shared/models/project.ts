import { BaseObject } from './BaseObject';
import { PreviewItem } from './PreviewItem';
import { Order } from './Order';
import { ProjectStates } from './enums/ProjectStates';
import { Client } from './Client';

interface PreviewItemMap { [id: string]: PreviewItem; }
export class Project extends BaseObject {
    id: string;
    title: string;
    state: ProjectStates;
    date: Date;
    location: string;
    notes: string;
    quotation: number;
    aditionalItemPrice: number;
    client: Client;
    order: Order;
    previewItems: PreviewItem[] = [];
    private previewItemsMap: PreviewItemMap;
    quantity: number;

    constructor(fields?: Partial<Project>) {
        super(); this.init(fields);
        this.previewItems = (fields.previewItems || []).map(i => new PreviewItem(i));
        this.order = new Order(fields.order, this.previewItems.map(itm => itm.id));
        this.client = new Client(fields.client);
        this.loadItemsMap();
    }

    loadItemsMap() {
        this.previewItemsMap = this.previewItems.reduce(
            (dict, itm) => ({ [itm.id]: itm, ...dict }),
            {} as PreviewItemMap
        );
    }

    get orderProgress() {
        return this.order.progress;
    }

    getItem(id: string) {
        return this.previewItemsMap[id];
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
    markItemAsDone(id: string, value: boolean) {
        this.order.markItemAsDone(id, value);
    }

    // ACCESSORS ESTADOS //
    get created() {
        return this.state === ProjectStates.CREATED;
    }
    get previewLoaded() {
        return this.state === ProjectStates.PREVIEW_LOADED;
    }
    get orderLoaded() {
        return this.state === ProjectStates.ORDER_LOADED;
    }
    get completed() {
        return this.state === ProjectStates.COMPLETED;
    }
    get delivered() {
        return this.state === ProjectStates.DELIVERED;
    }
    // ACCESSORS ESTADOS //

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
    get orderItems() {
        return this.order.orderItems;
    }
}
