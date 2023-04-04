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
			const branch = await axios.post<IUser>('/api/branch', create);
			if (branch.status === 200) {
				return branch.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response.data.message);
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
			const branch = await axios.put<IUser>(`/api/branch/${id}`, updated);
			if (branch.status === 200) {
				return branch.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response.data.message);
		}
	}

	public static async delete(id: string) {
		try {
			const branch = await axios.delete<IUser>(`/api/branch/${id}`);
			if (branch.status === 200) {
				return branch.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response.data.message);
		}
	}

	public static async all() {
		try {
			const branches = await axios<IUser[]>('/api/branch');
			if (branches.status === 200) {
				return branches.data;
			}
			return [];
		} catch (error: any) {
			Snackbar.error(error.message);
		}
	}

	public static async getById(id: string) {
		try {
			const branch = await axios<IUser>(`/api/branch/${id}`);
			if (branch.status === 200) {
				return branch.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message);
		}
	}
}
