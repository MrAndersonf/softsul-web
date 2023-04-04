import { prisma } from 'Database';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const data = await prisma.user.count();
		res.status(200).json({ data });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
