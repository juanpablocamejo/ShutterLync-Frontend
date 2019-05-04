import { BaseObject } from './BaseObject';

export class PreviewItem extends BaseObject {

    constructor(fields?: Partial<PreviewItem>) {
        super(fields);
    }

    id: string;
    filename: string;
    fileData: string;
    contentype: string;
    selectedByClient: boolean;
}
