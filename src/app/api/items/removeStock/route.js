import { NextResponse } from 'next/server';
import { removeStock } from '../../../../lib/itemsActions';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const amount = Number(searchParams.get('amount') || 0);

  try {
    const stock = await removeStock(id, amount);
    return NextResponse.json({ success: true, stock }, { status: 200 });
  } catch (err) {
    // Specific handling if item not found
    if (err.message === 'Item not found') {
      return NextResponse.json({ success: false, error: err.message }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
