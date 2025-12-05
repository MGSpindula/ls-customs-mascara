'use server';

import { redirect } from 'next/navigation';
import { addManufacturedAction, searchItemsAction } from '../../../actions/items';

export async function handleSubmit(formData) {
  const name = formData.get('name');
  const componentsJson = formData.get('componentsJson');
  const components = JSON.parse(componentsJson || '[]');
  
  const result = await addManufacturedAction({ name, components });
  
  if (result.success) {
    redirect('/dashboard');
  }
}

export async function handleSearch(query) {
  return await searchItemsAction(query);
}
