"use client";
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

      const data = await res.json();
      if (data.success) {
          window.location.href = '/login';
      } else {
          setMsg(data.error);
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl max-w-sm w-full shadow-lg">
        <h1 className="text-3xl font-bold mb-5 text-center">Register</h1>

        <input
          className="w-full border p-3 mb-4 rounded"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition">
          Create Account
        </button>

        {msg && <p className="mt-4 text-center text-sm text-gray-700">{msg}</p>}
      </form>
    </div>
  );
}
