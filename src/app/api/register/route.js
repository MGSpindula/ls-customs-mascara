import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongo';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export async function POST(request) {
  await connectDB();

  const body = await request.json();
  const { email, password } = body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed });

  return NextResponse.json({ success: true, userId: user._id });
}
