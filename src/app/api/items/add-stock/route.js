import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongo';
import Item from '../../../../models/Item';

export async function GET(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const amount = searchParams.get('amount') || '0';

  try {
    const itm = await Item.findById(id);
    if (!itm) return NextResponse.json({ success: false, error: 'Item not found' }, { status: 404 });

    itm.stock += Number(amount);
    await itm.save();

    return NextResponse.json({ success: true, stock: itm.stock });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
