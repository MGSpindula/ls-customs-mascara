import Item from '../../../models/Item';
import { connectDB } from '../../../lib/mongo';

export default async function handler(req, res) {
  await connectDB();

  const { name, purchasePrice } = req.body;

  const item = await Item.create({
    name,
    type: 'raw',
    purchasePrice
  });

  res.json(item);
}