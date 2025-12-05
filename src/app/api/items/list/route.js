import { NextResponse } from 'next/server';
import { listItems } from '../../../../lib/itemsActions';

export async function GET() {
  try {
    const items = await listItems();

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}
