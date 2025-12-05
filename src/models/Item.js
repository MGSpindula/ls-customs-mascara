import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  qty: { type: Number, required: true }
});

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['raw', 'manufactured'], required: true },
  purchasePrice: { type: Number },
  components: [ComponentSchema],
  stock: { type: Number, default: 0 }
});

// Dynamic net price calculation
ItemSchema.methods.getNetPrice = async function() {
  if (this.type === 'raw') return this.purchasePrice;

  let total = 0;

  for (const comp of this.components) {
    const item = await mongoose.model('Item').findById(comp.item);

    // Safe check: skip missing raw materials
    if (!item) {
      console.warn(`Component item missing: ${comp.item}`);
      continue;
    }

    // Safe recursive price call
    const price = await item.getNetPrice();
    total += price * comp.qty;
  }

  return total;
};

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
