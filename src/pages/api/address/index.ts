import nc from 'next-connect';
import onError from 'middleware/onError';
import { all, create } from '../../../Controllers/AddressController';

const handler = nc({ onError });

handler.get(all);
handler.post(create);

export default handler;
