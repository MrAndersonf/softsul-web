import catchAsyncErrors from '../../middleware/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'Database';
import { encryptPassword } from 'utils';

const all = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const user = await prisma.user.findMany({
			where: { active: true },
			orderBy: { name: 'asc' },
		});
		user.map(u => (u.password = ''));
		res.status(200).json(user);
	},
);

const create = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { active, name, email, password } = req.body;
		const user = await prisma.user.create({
			data: {
				active,
				name,
				email,
				password: encryptPassword(password),
			},
		});
		user.password = '';
		res.status(200).json(user);
	},
);

const deleteId = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		await prisma.user.deleteMany({
			where: {
				id: {
					in: id,
				},
			},
		});

		res.status(200).json({
			status: 'success',
		});
	},
);

const getById = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		const user = await prisma.user.findUnique({
			where: {
				id: id.toString(),
			},
		});
		if (user) {
			user.password = '';
		}
		res.status(200).json(user);
	},
);

const update = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		const { active, name, email, password } = req.body;

		const user = await prisma.user.update({
			where: {
				id: id.toString(),
			},
			data: {
				active,
				name,
				email,
				password: encryptPassword(password),
			},
		});
		user.password = '';
		res.status(200).json(user);
	},
);

export { all, create, deleteId, update, getById };
