export interface ICurrency {
	currency: 'BRL' | 'USD';
	amount: number;
	digits?: number;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	active: boolean;
}

export interface IUserShow {
	id: string;
	position: number;
	name: string;
	email: string;
	active: string;
}

export interface IBranch {
	id: string;
	name: string;
	cnpj: string;
	addressId: string;
	email: string;
	lat: string;
	long: string;
	active: boolean;
	address: IAddress;
}

export interface IBranchShow {
	id: string;
	position: number;
	name: string;
	cnpj: string;
	city: string;
	state: string;
	lat: string;
	long: string;
	active: string;
}

export interface IAddress {
	id: string;
	zipcode: string;
	street: string;
	number: string;
	reference: string | null;
	neighborhood: string;
	complement: string | null;
	city: string;
	state: string;
}
