import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongo';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { email, password } = body;

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  return NextResponse.json({ success: true, userId: user._id });
}
