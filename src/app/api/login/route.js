import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectDB } from '../../../lib/mongo';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export async function POST(request) {
  await connectDB();

  const { email, password } = await request.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const res = NextResponse.json({ success: true });

  res.cookies.set('session', user._id.toString(), {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  return res;
}
