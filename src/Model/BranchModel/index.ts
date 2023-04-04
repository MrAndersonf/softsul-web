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

	private _addressId: number;
	public get addressId(): number {
		return this._addressId;
	}
	public set addressId(v: number) {
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

	constructor(branch: IBranch) {
		this._name = branch.name;
		this._cnpj = branch.cnpj;
		this._addressId = branch.addressId;
		this._lat = branch.lat;
		this._long = branch.long;
		this._active = branch.active;
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
}
