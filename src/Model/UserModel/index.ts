import Snackbar from 'components/Snack';
import { IUser } from 'interfaces';
import axios from 'service/axios';
export class UserModel {
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
	public set password(v: string) {
		this._password = v;
	}

	private _active: boolean;
	public get active(): boolean {
		return this._active;
	}
	public set active(v: boolean) {
		this._active = v;
	}

	constructor(user: IUser) {
		this._name = user.name;
		this._email = user.email;
		this._password = user.password;
		this._active = user.active;
	}

	public async create() {
		try {
			const create = {
				name: this._name,
				email: this._email,
				password: this._password,
				active: this._active,
			};
			const user = await axios.post<IUser>('/api/user', create);
			if (user.status === 200) {
				return user.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response.data.message);
			return false;
		}
	}

	public async update(id: string) {
		try {
			const updated = {
				name: this._name,
				email: this._email,
				password: this._password,
				active: this._active,
			};
			const user = await axios.put<IUser>(`/api/user/${id}`, updated);
			if (user.status === 200) {
				return user.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response.data.message);
			return null;
		}
	}

	public static async delete(id: string[]) {
		try {
			const user = await axios.delete<IUser>(`/api/user/${id}`);
			if (user.status === 200) {
				return user;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response.data.message);
			return null;
		}
	}

	public static async all() {
		try {
			const users = await axios<IUser[]>('/api/user');
			if (users.status === 200) {
				return users.data;
			}
			return [];
		} catch (error: any) {
			Snackbar.error(error.message);
			return null;
		}
	}

	public static async getById(id: string) {
		try {
			const user = await axios<IUser>(`/api/user/${id}`);
			if (user.status === 200) {
				return user.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message);
			return null;
		}
	}
}
