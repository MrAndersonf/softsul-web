import { prisma } from 'Database';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { name, email, active } = req.body;
		let arg: any = {};
		if (name !== '') {
			arg = {
				name: {
					contains: name,
					mode: 'insensitive',
				},
			};
		}

		if (email !== '') {
			arg = {
				...arg,
				email: {
					contains: email,
					mode: 'insensitive',
				},
			};
		}

		const data = await prisma.user.findMany({
			where: {
				...arg,
				active: {
					equals: active,
				},
			},
		});
		if (data) {
			return res.status(200).json(
				data.map(user => {
					return { ...user, password: '' };
				}),
			);
		}

		return res.status(401).json({ status: 'error' });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
