import { connectDB } from '../../../lib/mongo';
import Item from '../../../models/Item';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await connectDB();

  const { id } = req.query;

  try {
    // Check if the item is used inside any manufactured item's components
    const dependentCount = await Item.countDocuments({
      'components.item': id
    });

    if (dependentCount > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete this item because it is used in manufactured items'
      });
    }

    await Item.findByIdAndDelete(id);

    return res.json({ success: true });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}