import { connectDB } from "./mongo";
import Item from "../models/Item";
import { DependencyError } from "./errors";

export async function createRaw(name, purchasePrice) {
  try {
    if (!name || purchasePrice == null) throw new Error("Missing required fields");

    await connectDB();
    return await Item.create({
      name,
      type: "raw",
      purchasePrice
    });
  } catch (err) {
    throw new Error(`Failed to create raw item: ${err.message}`);
  }
}

export async function createManufactured(name, components) {
  try {
    if (!name || !components) throw new Error("Missing required fields");

    await connectDB();
    return await Item.create({
      name,
      type: "manufactured",
      components
    });
  } catch (err) {
    throw new Error(`Failed to create manufactured item: ${err.message}`);
  }
}

export async function addStock(id, amount = 1) {
  try {
    await connectDB();

    const item = await Item.findById(id);
    if (!item) throw new Error("Item not found");

    item.stock += amount;
    await item.save();

    return item.stock;
  } catch (err) {
    throw new Error(`Failed to add stock: ${err.message}`);
  }
}

export async function removeStock(id, amount = 1) {
  try {
    await connectDB();

    const item = await Item.findById(id);
    if (!item) throw new Error("Item not found");

    item.stock -= amount;
    if (item.stock < 0) item.stock = 0;
    await item.save();

    return item.stock;
  } catch (err) {
    throw new Error(`Failed to remove stock: ${err.message}`);
  }
}

export async function deleteItem(id) {
  try {
    await connectDB();

    const dependentCount = await Item.countDocuments({ "components.item": id });
    if (dependentCount > 0) throw new DependencyError("Cannot delete. It is used in manufactured items");

    await Item.findByIdAndDelete(id);
    return true;
  } catch (err) {
    if (err instanceof DependencyError) throw err;
    throw new Error(`Failed to delete item: ${err.message}`);
  }
}

export async function listItems() {
  try {
    await connectDB();
    const items = await Item.find().populate("components.item");

    const data = [];
    for (const itm of items) {
      const netPrice = await itm.getNetPrice();
      data.push({
        _id: itm._id,
        name: itm.name,
        type: itm.type,
        netPrice,
        stock: itm.stock,
        components: itm.components
      });
    }
    return data;
  } catch (err) {
    throw new Error(`Failed to list items: ${err.message}`);
  }
}

export async function searchItems(query) {
  try {
    await connectDB();
    const results = await Item.find({ name: { $regex: query, $options: "i" } })
      .limit(10)
      .lean();
    return results;
  } catch (err) {
    throw new Error(`Failed to search items: ${err.message}`);
  }
}
