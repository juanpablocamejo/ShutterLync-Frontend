import { BaseObject } from './BaseObject';

export class PreviewItem extends BaseObject {

    constructor(fields?: Partial<PreviewItem>) {
        super(fields);
    }

    id: string;
    fileName: string;
    fileData: string;
    contentype: string;
}
