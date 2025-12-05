import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongo';
import Item from '../../../../models/Item';

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  const results = await Item.find({
    name: { $regex: query, $options: 'i' }
  })
    .limit(10)
    .lean();

  return NextResponse.json(results);
}
