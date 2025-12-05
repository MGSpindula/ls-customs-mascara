import { connectDB } from '../../../lib/mongo';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  await connectDB();

  const { id, amount } = req.query;

  try {
    const itm = await Item.findById(id);
    if (!itm) return res.status(404).json({ success: false, error: 'Item not found' });

    itm.stock += Number(amount);
    await itm.save();

    res.json({ success: true, stock: itm.stock });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
