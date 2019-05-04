import { BaseObject } from './BaseObject';
import { UserRole } from '../models/enums/UserRole';

export class User extends BaseObject {
    id: string;
    name: string;
    lastName: string;
    location: string;
    email: string;
    password: string;
    role: UserRole;

    constructor(fields?: Partial<User>) {
        super(fields);
    }
}
