import Item from '../../../models/Item';
import { connectDB } from '../../../lib/mongo';

export default async function handler(req, res) {
  await connectDB();

  const { name, components } = req.body;

  // components: [{ item: "id", qty: 2 }, ...]

  const item = await Item.create({
    name,
    type: 'manufactured',
    components
  });

  res.json(item);
}