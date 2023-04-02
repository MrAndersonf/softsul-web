const consultarCNPJ = require('consultar-cnpj');

import React from 'react';

import axios from 'axios';

import Snack from 'components/Snack';

import jsPDF from 'jspdf';
import { ICurrency } from 'interfaces';
import { EOrder } from 'enums';

export function toDollar(price: string) {
	const value = Number(price.replace(',', '.'));
	const dollar = value.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'USD',
	});
	return dollar;
}

export function getComparator<Key extends keyof any>(
	order: EOrder,
	orderBy: Key,
): (
	a: { [key in Key]: number | string | string[] },
	b: { [key in Key]: number | string | string[] },
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export const monetaryValue = (
	event: React.KeyboardEvent<HTMLDivElement>,
	amount: number,
	handle: (value: number) => void,
	next: string,
) => {
	event.preventDefault();

	const { code, key } = event;

	if (Number(key) >= 0 || Number(code) <= 9) {
		let value = sanitize(amount.toFixed(2));
		const p = value + key;
		let numeric = Number(p) / 100;
		handle(numeric);
	}
	if (code === 'Backspace') {
		let value = sanitize(amount.toString());
		let numeric = Number(value.slice(0, -1)) / 100;
		handle(numeric);
	}
	if (code === 'Tab') {
		document.getElementById(next)?.focus();
	}
};

export const floatValue = (
	event: React.KeyboardEvent<HTMLDivElement>,
	amount: number,
	handle: (value: number) => void,
	next: string,
) => {
	event.preventDefault();
	console.log(amount);
	const { code, key } = event;

	if (Number(key) >= 0 || Number(code) <= 9) {
		let value = sanitize(amount?.toFixed(2));
		const p = value + key;
		let numeric = Number(p) / 100;
		handle(numeric);
	}
	if (code === 'Backspace') {
		let value = sanitize(amount.toString());
		let numeric = Number(value.slice(0, -1)) / 100;
		handle(numeric);
	}
	if (code === 'Tab') {
		document.getElementById(next)?.focus();
	}
};

export const sanitize = (raw: string) => {
	return raw.replace(/[^a-zA-Z0-9 ]/g, '').replace(',', '');
};

export const formatter = (money: number, currency: string) => {
	if (currency === 'Real') {
		return money.toLocaleString('pt-BR', {
			minimumFractionDigits: 2,
			style: 'currency',
			currency: 'BRL',
		});
	} else {
		return money.toLocaleString('pt-BR', {
			minimumFractionDigits: 2,
			style: 'currency',
			currency: 'USD',
		});
	}
};

export const formatterPlainNumber = (money: number) => {
	return money.toLocaleString('pt-BR', {
		minimumFractionDigits: 2,
		style: 'decimal',
	});
};

export const thousand = (number: number) => {
	return number.toLocaleString('pt-BR');
};

export function currencyFormatter({
	amount,
	digits = 4,
	currency = 'BRL',
}: ICurrency): string {
	return amount?.toLocaleString('pt-BR', {
		currency: currency,
		maximumFractionDigits: digits,
		style: 'currency',
	});
}
export function dateTimeFormatter(date: Date) {
	const day = date.toLocaleDateString('pt-BR');
	const time = date.toLocaleTimeString('pt-BR');
	return `${day} ${time}`;
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export const sanitizeZipcode = (zipcode: string) => {
	return zipcode.replace('.', '').replace('-', '');
};

export function defaultLabelDisplayedRows({ from, to, count }: any) {
	return `${from}–${to} de ${count !== -1 ? count : `more than ${to}`}`;
}

export const cpfMask = (value: string) => {
	return value
		.replace(/\D/g, '')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})/, '$1-$2')
		.replace(/(-\d{2})\d+?$/, '$1');
};

export const cnpjMask = (text: string | undefined) => {
	if (text !== undefined) {
		return text
			.replace(/\D/g, '')
			.replace(/^(\d{2})(\d)/, '$1.$2')
			.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
			.replace(/\.(\d{3})(\d)/, '.$1/$2')
			.replace(/(\d{4})(\d)/, '$1-$2')
			.replace(/(-\d{2})(\d)/, '$1');
	}
	return '';
};

export const phoneMask = (v: string) => {
	let r = v.replace(/\D/g, '');
	r = r.replace(/^0/, '');

	if (r.length > 11) {
		r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
	} else if (r.length > 7) {
		r = r.replace(/^(\d\d)(\d{5})(\d{0,4}).*/, '($1) $2-$3');
	} else if (r.length > 2) {
		r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
	} else if (v.trim() !== '') {
		r = r.replace(/^(\d*)/, '($1');
	}
	return r;
};

export const cepMask = (text: string | undefined) => {
	if (text !== undefined) {
		return text
			.replace(/\D/g, '')
			.replace(/^(\d{2})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1-$2')
			.replace(/(-\d{3})\d+?$/, '$1');
	}
	return '';
};

export const cpfRegex = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/;
export const cepRegex = /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;
export const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/;
export const emailRegex =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const day = 1000 * 60 * 60 * 24;

export const states = [
	{ code: 12, short: 'AC', name: 'Acre' },
	{ code: 27, short: 'AL', name: 'Alogoas' },
	{ code: 13, short: 'AM', name: 'Amazonas' },
	{ code: 16, short: 'AP', name: 'Amapá' },
	{ code: 29, short: 'BA', name: 'Bahia' },
	{ code: 23, short: 'CE', name: 'Ceará' },
	{ code: 53, short: 'DF', name: 'Distrito Federal' },
	{ code: 32, short: 'ES', name: 'Espírito Santo' },
	{ code: 52, short: 'GO', name: 'Goiás' },
	{ code: 21, short: 'MA', name: 'Maranhão' },
	{ code: 31, short: 'MG', name: 'Minas Gerais' },
	{ code: 50, short: 'MS', name: 'Mato Grosso do Sul' },
	{ code: 51, short: 'MT', name: 'Mato Grosso' },
	{ code: 15, short: 'PA', name: 'Pará' },
	{ code: 25, short: 'PB', name: 'Paraíba' },
	{ code: 26, short: 'PE', name: 'Pernambuco' },
	{ code: 22, short: 'PI', name: 'Piauí' },
	{ code: 41, short: 'PR', name: 'Paraná' },
	{ code: 33, short: 'RJ', name: 'Rio de Janeiro' },
	{ code: 24, short: 'RN', name: 'Rio Grande do Norte' },
	{ code: 11, short: 'RO', name: 'Rondônia' },
	{ code: 14, short: 'RR', name: 'Roraima' },
	{ code: 43, short: 'RS', name: 'Rio Grando do Sul' },
	{ code: 42, short: 'SC', name: 'Santa Catarina' },
	{ code: 28, short: 'SE', name: 'Sergipe' },
	{ code: 35, short: 'SP', name: 'São Paulo' },
	{ code: 17, short: 'TO', name: 'Tocantins' },
];

export const getCNPJ = async (cnpj: string) => {
	return await consultarCNPJ(cnpj);
};

export const retrieveCitiesByState = async (state: number) => {
	const response = await axios.get(
		`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
	);
	if (response.status === 200 && response.data.length > 0) {
		return response.data;
	}
	return [];
};

// export const retriveZipcode = async (zipcode: string) => {
// 	try {
// 		const response = await axios.get(
// 			`https://viacep.com.br/ws/${zipcode}/json`,
// 		);
// 		if (response.data.erro === true) {
// 			Snack.warning('O CEP informado não foi localizado');
// 			return null;
// 		}
// 		return response.data as IZipCode;
// 	} catch (error) {
// 		Snack.error('Houve um erro ao buscar o CEP informado');
// 	}
// };

export const now = () => {
	return new Date().setHours(0, 0, 0, 0);
};

export const generatePassword = () => {
	let length = 8;
	let wishlist =
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';

	const value = Array.from(crypto.getRandomValues(new Uint32Array(length)))
		.map(x => wishlist[x % wishlist.length])
		.join('');

	return value;
};

export const localDate = (time: number | undefined | null) => {
	if (time) {
		return new Date(time).toLocaleDateString('pt-BR');
	}
	return '';
};

export const stringDate = () => {
	const meses = [
		'Jan',
		'Fev',
		'Mar',
		'Abr',
		'Mai',
		'Jun',
		'Jul',
		'Ago',
		'Set',
		'Out',
		'Nov',
		'Dez',
	];
	let date = new Date();
	let parsedDate =
		date.getDate() + ' ' + meses[date.getMonth()] + ' ' + date.getFullYear();
	return parsedDate;
};

export const delay = (milliseconds: number) => {
	return new Promise((resolve: any) => {
		setTimeout(resolve, milliseconds);
	});
};

/**
 * @param {number | undefined} total sum of all items *
 * @param {'BRL'|'USD'} currency formats the return string
 * @returns {string}
 */
export const formatCurrency = (
	amount: number | undefined,
	local: 'USD' | 'BRL',
	digits?: number,
) => {
	if (amount !== undefined) {
		if (local === 'BRL') {
			return new Intl.NumberFormat('pt-BR', {
				minimumFractionDigits: digits || 2,
			}).format(amount);
		}
		return new Intl.NumberFormat('en-US', {
			minimumFractionDigits: digits || 2,
			maximumFractionDigits: digits || 2,
		}).format(amount);
	}
	return '';
};

/**
 * @param {number | undefined} days date in milleseconds
 * @returns {number} returns a date in the format 00/00/0000
 */
export const dateParam = (date: Date): string => {
	const str = date.toISOString();
	const arr = str.substring(0, 10).split('-');
	return `${arr[1]}-${arr[2]}-${arr[0]}`;
};

export const paramDate = (date: Date): string => {
	const str = date.toLocaleDateString();
	const arr = str.split('/');
	return `${arr[1]}-${arr[0]}-${arr[2]}`;
};

export const truncate = (text: string | undefined, size: number) => {
	if (text) {
		return text.length > size ? text.slice(0, size - 1) + '...' : text;
	}
	return '...';
};

export const splitString = (text: string | undefined, position?: number) => {
	const len = text?.split(' ');
	if (text) {
		return len?.slice(0, position).join(' ');
	}

	return '';
};

export const generatePdf = (
	document: HTMLElement | null,
	name: () => string,
	hasItems: boolean,
) => {
	if (hasItems) {
		const doc = new jsPDF({
			orientation: 'p',
			unit: 'px',
			format: 'a4',
			floatPrecision: 16,
			putOnlyUsedFonts: true,
		});
		if (document !== null) {
			console.log('dss');
			doc.html(document, {
				callback: function (doc) {
					doc.save(name());
				},
				x: 10,
				y: 10,
				width: 420,
				windowWidth: 1000,
			});
		}
		return;
	}
	Snack.warning('É preciso selecionar pedidos para gerar o arquivo .PDF');
};

export const stableSort = <T>(
	array: readonly T[],
	comparator: (a: T, b: T) => number,
) => {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
};
