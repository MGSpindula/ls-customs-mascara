"use client";

import { useState } from 'react';

export default function DashboardClient({
  initialItems = [],
  listItemsAction,
  addStockAction,
  removeStockAction,
  deleteItemAction
}) {
  const [items, setItems] = useState(initialItems);
  const [openComponents, setOpenComponents] = useState({});

  async function reload() {
    try {
      const res = await listItemsAction();
      if (res && res.success) {
        setItems(res.data || []);
      } else {
        alert(res?.error || 'Failed to load items');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to load items');
    }
  }

  async function callDelete(id) {
    try {
      const res = await deleteItemAction(id);
      if (!res.success) {
        alert(res.error || 'Failed to delete');
        return;
      }
      await reload();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  }

  async function callAddStock(id) {
    try {
      const res = await addStockAction(id, 1);
      if (!res.success) {
        alert(res.error || 'Failed to add stock');
        return;
      }
      await reload();
    } catch (err) {
      console.error(err);
      alert('Failed to add stock');
    }
  }

  async function callRemoveStock(id) {
    try {
      const res = await removeStockAction(id, 1);
      if (!res.success) {
        alert(res.error || 'Failed to remove stock');
        return;
      }
      await reload();
    } catch (err) {
      console.error(err);
      alert('Failed to remove stock');
    }
  }

  function toggleComponents(id) {
    setOpenComponents(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <>
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
                    {itm.components.length === 0 && <p>No components found</p>}

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
                  onClick={() => callAddStock(itm._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  +
                </button>

                <button
                  onClick={() => callRemoveStock(itm._id)}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  -
                </button>

                <button
                  onClick={() => callDelete(itm._id)}
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
