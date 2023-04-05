import { prisma } from 'Database';
import type { NextApiRequest, NextApiResponse } from 'next';
import { dencryptPassword } from 'utils';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const { email, password } = req.body;
		const data = await prisma.user.findFirst({ where: { email } });
		if (data) {
			let match = dencryptPassword(password, data.password);
			if (match) {
				data.password = '';
				return res.status(200).json({ status: 'success', user: data });
			}
			return res.status(401).json({ status: 'error' });
		}
		return res.status(401).json({ status: 'error' });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
