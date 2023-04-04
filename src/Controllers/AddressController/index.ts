import catchAsyncErrors from '../../middleware/catchAsyncErrors';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'Database';

const all = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const address = await prisma.address.findMany();

		res.status(200).json(address);
	},
);

const create = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const {
			zipcode,
			street,
			number,
			reference,
			neighborhood,
			complement,
			city,
			state,
		} = req.body;
		const address = await prisma.address.create({
			data: {
				zipcode,
				street,
				number,
				reference,
				neighborhood,
				complement,
				city,
				state,
			},
		});
		res.status(200).json(address);
	},
);

const deleteId = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		await prisma.address.delete({
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
		const address = await prisma.address.findUnique({
			where: {
				id: id.toString(),
			},
		});

		res.status(200).json(address);
	},
);

const update = catchAsyncErrors(
	async (req: NextApiRequest, res: NextApiResponse) => {
		const { id } = req.query;
		const {
			zipcode,
			street,
			number,
			reference,
			neighborhood,
			complement,
			city,
			state,
		} = req.body;

		const address = await prisma.address.update({
			where: {
				id: id.toString(),
			},
			data: {
				zipcode,
				street,
				number,
				reference,
				neighborhood,
				complement,
				city,
				state,
			},
		});
		res.status(200).json(address);
	},
);

export { all, create, deleteId, update, getById };
