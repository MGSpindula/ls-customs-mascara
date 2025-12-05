import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongo';
import Item from '../../../../models/Item';

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { name, components } = body;

  const item = await Item.create({
    name,
    type: 'manufactured',
    components
  });

  return NextResponse.json(item);
}
