import { useState } from 'react';

export default function AddRaw() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch('/api/items/add-raw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, purchasePrice: Number(price) })
    });

    window.location.href = '/dashboard';
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 max-w-md mx-auto rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Add Raw Item</h1>

        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Purchase Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">
          Save
        </button>
      </form>
    </div>
  );
}
