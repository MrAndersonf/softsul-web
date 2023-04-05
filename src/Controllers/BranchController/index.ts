import catchAsyncErrors from '../../middleware/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'Database';

const all = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const branch = await prisma.branch.findMany({
			where: { active: true },
			orderBy: { name: 'asc' },
			include: { address: true },
		});

		res.status(200).json(branch);
	},
);

const create = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { name, cnpj, lat, long, active, addressId, email } = req.body;
		const address = await prisma.branch.create({
			data: {
				name,
				cnpj,
				address: {
					connect: { id: addressId },
				},
				email,
				lat,
				long,
				active,
			},
			select: {},
		});
		res.status(200).json(address);
	},
);

const deleteId = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		await prisma.branch.delete({
			where: {
				id: id.toString(),
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
		const branch = await prisma.branch.findUnique({
			where: {
				id: id.toString(),
			},
			include: { address: true },
		});
		res.status(200).json(branch);
	},
);

const update = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		const { name, cnpj, lat, long, active, addressId, email } = req.body;

		const address = await prisma.branch.update({
			where: {
				id: id.toString(),
			},
			data: {
				name,
				cnpj,
				address: {
					connect: { id: addressId.toString() },
				},
				email,
				lat,
				long,
				active,
			},
			include: { address: true },
		});
		res.status(200).json(address);
	},
);

export { all, create, deleteId, update, getById };
