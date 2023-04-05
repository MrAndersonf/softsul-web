import Snackbar from 'components/Snack';
import { IAddress } from 'interfaces';
import axios from 'service/axios';
export class AddressModel {
	private _zipcode: string;
	public get zipcode(): string {
		return this._zipcode;
	}
	public set zipcode(v: string) {
		this._zipcode = v;
	}

	private _street: string;
	public get street(): string {
		return this._street;
	}
	public set street(v: string) {
		this._street = v;
	}

	private _number: string;
	public get number(): string {
		return this._number;
	}
	public set number(v: string) {
		this._number = v;
	}

	private _reference: string | null;
	public get reference(): string | null {
		return this._reference;
	}
	public set reference(v: string | null) {
		this._reference = v;
	}

	private _neighborhood: string;
	public get neighborhood(): string {
		return this._neighborhood;
	}
	public set neighborhood(v: string) {
		this._neighborhood = v;
	}

	private _complement: string | null;
	public get complement(): string | null {
		return this._complement;
	}
	public set complement(v: string | null) {
		this._complement = v;
	}

	private _city: string;
	public get city(): string {
		return this._city;
	}
	public set city(v: string) {
		this._city = v;
	}

	private _state: string;
	public get state(): string {
		return this._state;
	}
	public set state(v: string) {
		this._state = v;
	}

	constructor(address: IAddress) {
		this._zipcode = address.zipcode;
		this._street = address.street;
		this._number = address.number;
		this._reference = address.reference ?? '';
		this._neighborhood = address.neighborhood;
		this._complement = address.complement ?? '';
		this._city = address.city;
		this._state = address.state;
	}

	public async create() {
		try {
			const create = {
				zipcode: this._zipcode,
				street: this._street,
				number: this._number,
				reference: this._reference,
				neighborhood: this._neighborhood,
				complement: this._complement,
				city: this._city,
				state: this._state,
			};
			const response = await axios.post<IAddress>('/api/address', create);
			if (response.status === 200) {
				return response.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response);
			return null;
		}
	}

	public async update(id: string) {
		try {
			const updated = {
				zipcode: this._zipcode,
				street: this._street,
				number: this._number,
				reference: this._reference,
				neighborhood: this._neighborhood,
				complement: this._complement,
				city: this._city,
				state: this._state,
			};
			const response = await axios.put<IAddress>(`/api/address/${id}`, updated);
			if (response.status === 200) {
				return response.data as IAddress;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response);
			return null;
		}
	}

	public static async delete(id: string) {
		try {
			const response = await axios.delete<IAddress>(`/api/address/${id}`);
			if (response.status === 200) {
				return response.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message + ' ' + error.response);
		}
	}

	public static async all() {
		try {
			const response = await axios<IAddress[]>('/api/address');
			if (response.status === 200) {
				return response.data;
			}
			return [];
		} catch (error: any) {
			Snackbar.error(error.message);
		}
	}

	public static async getById(id: string) {
		try {
			const response = await axios<IAddress>(`/api/branch/${id}`);
			if (response.status === 200) {
				return response.data;
			}
			return null;
		} catch (error: any) {
			Snackbar.error(error.message);
		}
	}
}
