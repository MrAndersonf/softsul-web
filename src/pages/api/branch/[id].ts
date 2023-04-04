import nc from 'next-connect';
import onError from 'middleware/onError';
import {
	deleteId,
	getById,
	update,
} from '../../../Controllers/BranchController';

const handler = nc({ onError });

handler.get(getById);
handler.put(update);
handler.delete(deleteId);

export default handler;
