import { PreviewItem } from './previewItem';
import { Order } from './order';

export class Project {
    _id: string;
    title: string;
    order: Order;
    previewItems: PreviewItem[] = [];
}
