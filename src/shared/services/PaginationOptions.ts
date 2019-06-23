import { OrderDirection } from './OrderDirection';
import { BaseObject } from '../models/BaseObject';

export class PaginationOptions extends BaseObject {
    sort: string;
    page: number;
    pageSize: number;

    constructor(fields?: Partial<PaginationOptions>) {
        super(fields);
    }
}
