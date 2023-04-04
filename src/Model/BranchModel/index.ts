import Snackbar from 'components/Snack';
import { IBranch } from 'interfaces';
import axios from 'service/axios';
export class BranchModel {
	private _name: string;
	public get name(): string {
		return this._name;
	}
	public set name(v: string) {
		this._name = v;
	}

	private _cnpj: string;
	public get cnpj(): string {
		return this._cnpj;
	}
	public set cnpj(v: string) {
		this._cnpj = v;
	}

	private _email: string;
	public get email(): string {
		return this._email;
	}
	public set email(v: string) {
		this._email = v;
	}

	private _addressId: string;
	public get addressId(): string {
		return this._addressId;
	}
	public set addressId(v: string) {
		this._addressId = v;
	}

	private _lat: string;
	public get lat(): string {
		return this._lat;
	}
	public set lat(v: string) {
		this._lat = v;
	}

	private _long: string;
	public get long(): string {
		return this._long;
	}
	public set long(v: string) {
		this._long = v;
	}

	private _active: boolean;
	public get active(): boolean {
		return this._active;
	}
	public set active(v: boolean) {
		this._active = v;
	}

	constructor(
		name: string,
		cnpj: string,
		email: string,
		addressId: string,
		lat: string,
		long: string,
		active: boolean,
	) {
		this._name = name;
		this._cnpj = cnpj;
		this._email = email;
		this._addressId = addressId;
		this._lat = lat;
		this._long = long;
		this._active = active;
	}

	public async create() {
		try {
			const newBranch = {
				name: this._name,
				cnpj: this._cnpj,
				email: this.email,
				addressId: this._addressId,
				lat: this._lat,
				long: this._long,
				active: this._active,
			};
			const branch = await axios.post<IBranch>('/api/branch', newBranch);
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
				cnpj: this._cnpj,
				email: this.email,
				addressId: this._addressId,
				lat: this._lat,
				long: this._long,
				active: this._active,
			};
			const branch = await axios.put<IBranch>(`/api/branch/${id}`, updated);
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
			const branch = await axios.delete<IBranch>(`/api/branch/${id}`);
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
			const branches = await axios<IBranch[]>('/api/branch');
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
			const branch = await axios<IBranch>(`/api/branch/${id}`);
			if (branch.status === 200) {
				return branch.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message);
		}
	}
}
