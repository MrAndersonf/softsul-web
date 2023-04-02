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
}

export interface IBranch {
	id: string;
	name: string;
	cnpj: string;
	address: IAddress;
	email: string;
	coordinates?: { lat: string; long: string };
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
}

export interface IAddress {
	street: string;
	number: string;
	reference: string;
	neighborhood: string;
	complement?: string;
	city: string;
	state: string;
}
