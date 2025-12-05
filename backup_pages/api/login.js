import { connectDB } from '../../lib/mongo';
import User from '../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  await connectDB();

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ success: true, userId: user._id });
}
