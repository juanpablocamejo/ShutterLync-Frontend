export class BaseObject {

    constructor(private fields?: any) {
        this.initialize();
    }
    protected initialize() {
        Object.assign(this, this.fields);
    }
}
