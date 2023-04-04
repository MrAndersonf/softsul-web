import { IUser } from 'interfaces';

export class User {
	private _id: string;
	public get id(): string {
		return this._id;
	}
	public set id(v: string) {
		this._id = v;
	}

	private _name: string;
	public get name(): string {
		return this._name;
	}
	public set name(v: string) {
		this._name = v;
	}

	private _email: string;
	public get email(): string {
		return this._email;
	}
	public set email(v: string) {
		this._email = v;
	}

	private _password: string;
	public get password(): string {
		return this._password;
	}
	public set passsword(v: string) {
		this._password = v;
	}

	constructor(user: IUser) {
		this._id = '';
		this._name = user.name;
		this._email = user.email;
		this._password = user.password;
	}

    public create = async () => {
        
    }


}
