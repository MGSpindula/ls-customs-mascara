import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongo';
import Item from '../../../../models/Item';

export async function DELETE(request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const dependentCount = await Item.countDocuments({ 'components.item': id });

    if (dependentCount > 0) {
      return NextResponse.json({ success: false, error: 'Cannot delete this item because it is used in manufactured items' }, { status: 400 });
    }

    await Item.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
