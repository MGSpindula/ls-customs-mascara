import { connectDB } from '../../../lib/mongo';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  await connectDB();

  const items = await Item.find().populate('components.item');

  const data = [];
  for (const itm of items) {
    const netPrice = await itm.getNetPrice();
    data.push({
      _id: itm._id,
      name: itm.name,
      type: itm.type,
      netPrice,
      stock: itm.stock,
      components: itm.components
    });
  }

  res.json(data);
}
