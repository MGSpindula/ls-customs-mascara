import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongo';
import Item from '../../../../models/Item';

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { name, purchasePrice } = body;

  const item = await Item.create({
    name,
    type: 'raw',
    purchasePrice
  });

  return NextResponse.json(item);
}
