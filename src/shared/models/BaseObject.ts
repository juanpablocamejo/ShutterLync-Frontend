export class BaseObject {

    protected constructor(fields?: any) { }
    protected init<T>(fields?: Partial<T>) {
        Object.assign(this, fields);
    }
}
