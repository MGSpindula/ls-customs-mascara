import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [reload, setReload] = useState(false);
  const [openComponents, setOpenComponents] = useState({});

  useEffect(() => {
    fetch('/api/items/list')
      .then(r => r.json())
      .then(setItems);
  }, [reload]);

  async function deleteItem(id) {
    const res = await fetch(`/api/items/delete?id=${id}`, {
      method: 'DELETE'
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.error || 'Could not delete item.');
      return;
    }

    setReload(!reload);
  }

  async function addStock(id) {
    await fetch(`/api/items/add-stock?id=${id}&amount=1`);
    setReload(!reload);
  }

  async function removeStock(id) {
    await fetch(`/api/items/remove-stock?id=${id}&amount=1`);
    setReload(!reload);
  }

  function toggleComponents(id) {
    setOpenComponents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Stock Dashboard</h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Items</h2>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-3">Name</th>
              <th className="border-b p-3">Type</th>
              <th className="border-b p-3">Net Price</th>
              <th className="border-b p-3">Stock</th>
              <th className="border-b p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map(itm => (
              <tr key={itm._id}>
                <td className="border-b p-3">
                  {itm.name}

                  {/* Show components if manufactured */}
                  {itm.type === 'manufactured' && (
                    <button
                      onClick={() => toggleComponents(itm._id)}
                      className="ml-2 text-blue-600 underline"
                    >
                      Components
                    </button>
                  )}

                  {openComponents[itm._id] && itm.type === 'manufactured' && (
                    <div className="mt-2 text-sm text-gray-700">
                      {itm.components.length === 0 && (
                        <p>No components found</p>
                      )}

                      {itm.components.map((comp, i) => (
                        <div key={i}>
                          {comp.item?.name} x {comp.qty}
                        </div>
                      ))}
                    </div>
                  )}
                </td>

                <td className="border-b p-3 capitalize">{itm.type}</td>
                <td className="border-b p-3">{itm.netPrice}</td>
                <td className="border-b p-3">{itm.stock}</td>

                <td className="border-b p-3 flex gap-2">
                  <button
                    onClick={() => addStock(itm._id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeStock(itm._id)}
                    className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  >
                    -
                  </button>

                  <button
                    onClick={() => deleteItem(itm._id)}
                    className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-10 flex gap-4">
          <a
            href="/dashboard/add-raw"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Raw Item
          </a>

          <a
            href="/dashboard/add-manufactured"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Manufactured Item
          </a>
        </div>
      </div>
    </div>
  );
}
