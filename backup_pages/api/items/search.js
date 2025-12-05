import { connectDB } from '../../../lib/mongo';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  await connectDB();

  const { query } = req.query;

  const results = await Item.find({
    name: { $regex: query, $options: 'i' }
  })
    .limit(10)
    .lean();

  res.json(results);
}
