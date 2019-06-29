import { BaseObject } from './BaseObject';
export class Client extends BaseObject {
    constructor(fields?: Partial<Client>) {
        super(); this.init(fields);
    }
    name: string;
    lastName: string;
    email: string;
    location: string;
    get fullName() {
        return `${this.lastName}, ${this.name}`;
    }
}
