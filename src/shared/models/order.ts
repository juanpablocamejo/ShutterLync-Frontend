export class Order {
    confirmed = false;
    selectedItems: string[];

    includes(id: string) {
        return this.selectedItems.includes(id);
    }
}
