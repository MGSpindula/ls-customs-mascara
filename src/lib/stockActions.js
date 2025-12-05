'use server';

import { connectDB } from './mongo';
import Item from '../models/Item';

export async function addStock(id, amount = 1) {
  await connectDB();

  const item = await Item.findById(id);
  if (!item) throw new Error('Item not found');

  item.stock += amount;
  await item.save();

  return item.stock;
}

export async function removeStock(id, amount = 1) {
  await connectDB();

  const item = await Item.findById(id);
  if (!item) throw new Error('Item not found');

  item.stock -= amount;
  if (item.stock < 0) item.stock = 0;

  await item.save();

  return item.stock;
}
