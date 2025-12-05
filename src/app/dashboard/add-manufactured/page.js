"use client";
import { useState, useEffect } from 'react';

export default function AddManufactured() {
  const [name, setName] = useState('');

  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (search.length < 1) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetch('/api/items/search?query=' + search)
        .then(r => r.json())
        .then(setResults);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  function addComponent() {
    if (!selectedId || qty <= 0) return;

    setComponents([...components, { item: selectedId, qty }]);
    setSelectedId('');
    setSearch('');
    setQty(1);
    setResults([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch('/api/items/add-manufactured', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        components
      })
    });

    window.location.href = '/dashboard';
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 max-w-xl mx-auto rounded-xl shadow">
        
        <h1 className="text-3xl font-bold mb-6">Add Manufactured Item</h1>

        <input
          className="border p-3 w-full rounded mb-6"
          placeholder="Product name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <div className="mb-6">
          <label className="block text-sm mb-2">Add component</label>

          <input
            className="border p-3 w-full rounded"
            placeholder="Search raw item"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedId('');
            }}
          />

          {results.length > 0 && (
            <div className="border p-3 rounded bg-white shadow mt-1 max-h-40 overflow-y-auto">
              {results.map(r => (
                <div
                  key={r._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedId(r._id);
                    setSearch(r.name);
                    setResults([]);
                  }}
                >
                  {r.name} (ID: {r._id})
                </div>
              ))}
            </div>
          )}

          {selectedId && (
            <p className="text-sm mt-2 text-green-600">Selected ID: {selectedId}</p>
          )}

          <input
            className="border p-3 w-full rounded mt-3"
            type="number"
            placeholder="Quantity"
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
            min="1"
          />

          <button
            type="button"
            onClick={addComponent}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add component
          </button>
        </div>

        {components.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Components</h2>
            <ul className="list-disc pl-6">
              {components.map((c, i) => (
                <li key={i}>
                  ID: {c.item} qty: {c.qty}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="w-full px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700">
          Save manufactured item
        </button>
      </form>
    </div>
  );
}
