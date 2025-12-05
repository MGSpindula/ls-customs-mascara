import { redirect } from 'next/navigation';
import { addRawAction } from '../../../actions/items';

export default function CreateRaw() {
  async function handleSubmit(formData) {
    'use server';
    
    const name = formData.get('name');
    const purchasePrice = Number(formData.get('purchasePrice'));
    
    const result = await addRawAction({ name, purchasePrice });
    
    if (result.success) {
      redirect('/dashboard');
    }
  }

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <form action={handleSubmit} className="bg-white p-8 max-w-md mx-auto rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Add Raw Item</h1>

        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Name"
          name="name"
          required
        />

        <input
          className="border p-3 w-full rounded mb-4"
          placeholder="Purchase Price"
          type="number"
          name="purchasePrice"
          required
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">
          Save
        </button>
      </form>
    </div>
  );
}
