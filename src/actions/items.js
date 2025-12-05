"use server";

import {
  createRaw,
  createManufactured,
  addStock,
  removeStock,
  deleteItem,
  listItems,
  searchItems
} from "../lib/itemsActions";

export async function addRawAction({ name, purchasePrice }) {
  try {
    const item = await createRaw(name, purchasePrice);
    return { success: true, data: JSON.parse(JSON.stringify(item)) };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to add raw item"
    };
  }
}

export async function addManufacturedAction({ name, components }) {
  try {
    const item = await createManufactured(name, components);
    return { success: true, data: JSON.parse(JSON.stringify(item)) };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to add manufactured item"
    };
  }
}

export async function addStockAction(id, amount = 1) {
  try {
    const stock = await addStock(id, amount);
    return { success: true, stock };
  } catch (err) {
    return {
      success: false,
      error: err.message || `Failed to add stock for item ${id}`
    };
  }
}

export async function removeStockAction(id, amount = 1) {
  try {
    const stock = await removeStock(id, amount);
    return { success: true, stock };
  } catch (err) {
    return {
      success: false,
      error: err.message || `Failed to remove stock for item ${id}`
    };
  }
}

export async function deleteItemAction(id) {
  try {
    await deleteItem(id);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error:
        err.name === "DependencyError"
          ? err.message
          : err.message || `Failed to delete item ${id}`
    };
  }
}

export async function listItemsAction() {
  try {
    const items = await listItems();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(items))
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Failed to list items"
    };
  }
}

export async function searchItemsAction(query) {
  try {
    const results = await searchItems(query);
    return { success: true, data: JSON.parse(JSON.stringify(results)) };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
