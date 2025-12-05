import { connectDB } from '../../../lib/mongo';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  await connectDB();

  const { name, components } = req.body;

  const item = await Item.create({
    name,
    type: 'manufactured',
    components
  });

  res.json(item);
}
