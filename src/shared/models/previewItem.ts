import { BaseObject } from './BaseObject';

export class PreviewItem extends BaseObject {
    id: string;
    fileName: string;
    fileData: string;
    contentype: string;

    constructor(fields?: Partial<PreviewItem>) {
        super(); this.init(fields);
    }

}
