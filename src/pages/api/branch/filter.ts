import { prisma } from 'Database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dencryptPassword } from 'utils';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { name, cnpj, city, state, active } = req.body;
		let arg: any = {};
		if (name !== '') {
			arg = {
				name: {
					contains: name,
					mode: 'insensitive',
				},
			};
		}

		if (cnpj !== '') {
			arg = {
				...arg,
				cnpj: {
					contains: cnpj,
					mode: 'insensitive',
				},
			};
		}

		if (city !== '') {
			arg = {
				...arg,
				address: {
					city: {
						equals: city,
						mode: 'insensitive',
					},
				},
			};
		}

		if (state !== '') {
			arg = {
				...arg,
				address: {
					state: {
						equals: state,
						mode: 'insensitive',
					},
				},
			};
		}
		const data = await prisma.branch.findMany({
			where: {
				...arg,
				active: {
					equals: active,
				},
			},
			include: {
				address: true,
			},
		});
		if (data) {
			return res.status(200).json(data);
		}
		return res.status(401).json({ status: 'error' });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
