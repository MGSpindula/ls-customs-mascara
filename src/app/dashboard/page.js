import DashboardClient from './DashboardClient';
import {
  listItemsAction,
  addStockAction,
  removeStockAction,
  deleteItemAction
} from '../../actions/items';

export default async function Dashboard() {
  // Run listItemsAction on the server during render instead of invoking
  // it from the client (which triggers a server-action POST to /dashboard).
  const res = await listItemsAction();
  const items = res && res.success ? res.data : [];

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <a
        href="/api/logout"
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </a>

      <h1 className="text-4xl font-bold mb-8 text-center">Stock Dashboard</h1>

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Items</h2>

        <DashboardClient
          initialItems={items}
          listItemsAction={listItemsAction}
          addStockAction={addStockAction}
          removeStockAction={removeStockAction}
          deleteItemAction={deleteItemAction}
        />

        <div className="mt-10 flex gap-4">
          <a
            href="/dashboard/createRaw"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Raw Item
          </a>

          <a
            href="/dashboard/createManufactured"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Manufactured Item
          </a>
        </div>
      </div>
    </div>
  );
}
