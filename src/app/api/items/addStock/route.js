import { NextResponse } from 'next/server';
import { addStock } from '../../../../lib/itemsActions';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const amount = Number(searchParams.get('amount') || 0);

  try {
    const stock = await addStock(id, amount);
    return NextResponse.json({ success: true, stock }, { status: 200 });
  } catch (err) {
    // Check if the error is due to item not found
    if (err.message === 'Item not found') {
      return NextResponse.json({ success: false, error: err.message }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
