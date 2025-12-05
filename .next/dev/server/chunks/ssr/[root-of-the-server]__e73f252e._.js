module.exports = [
"[externals]/mongoose [external] (mongoose, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}),
"[project]/src/lib/mongo.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "connectDB",
    ()=>connectDB
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
async function connectDB() {
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connection.readyState >= 1) return;
    await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(process.env.MONGO_URI);
}
}),
"[project]/src/models/Item.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const ComponentSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    item: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    qty: {
        type: Number,
        required: true
    }
});
const ItemSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [
            'raw',
            'manufactured'
        ],
        required: true
    },
    purchasePrice: {
        type: Number
    },
    components: [
        ComponentSchema
    ],
    stock: {
        type: Number,
        default: 0
    }
});
// Dynamic net price calculation
ItemSchema.methods.getNetPrice = async function() {
    if (this.type === 'raw') return this.purchasePrice;
    let total = 0;
    for (const comp of this.components){
        const item = await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Item').findById(comp.item);
        // Safe check: skip missing raw materials
        if (!item) {
            console.warn(`Component item missing: ${comp.item}`);
            continue;
        }
        // Safe recursive price call
        const price = await item.getNetPrice();
        total += price * comp.qty;
    }
    return total;
};
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.Item || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('Item', ItemSchema);
}),
"[project]/src/lib/errors.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DependencyError",
    ()=>DependencyError
]);
class DependencyError extends Error {
    constructor(message){
        super(message);
        this.name = 'DependencyError';
    }
}
}),
"[project]/src/lib/itemsActions.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00a86fdee841422d74f99c4158449cff9d6c42a0f9":"listItems","400fc8d113a3dff56f12c6a652022f15cf8171c94e":"searchItems","40c4e434e47439b08f766c97eda76d81a1a013935a":"deleteItem","600ccfaf1c1c1d8efcc8efe99ca2e77663eda1d65c":"createRaw","6022ea75f766d7a19968497222058aa6732d836f3f":"addStock","6062745cb81f6b8d7724a16ed16d015fb5c7878dc0":"removeStock","60dd399b61e7023bb3d9be9f4abd0a5da35dd4b5a3":"createManufactured"},"",""] */ __turbopack_context__.s([
    "addStock",
    ()=>addStock,
    "createManufactured",
    ()=>createManufactured,
    "createRaw",
    ()=>createRaw,
    "deleteItem",
    ()=>deleteItem,
    "listItems",
    ()=>listItems,
    "removeStock",
    ()=>removeStock,
    "searchItems",
    ()=>searchItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongo.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Item.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function createRaw(name, purchasePrice) {
    try {
        if (!name || purchasePrice == null) throw new Error("Missing required fields");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            name,
            type: "raw",
            purchasePrice
        });
    } catch (err) {
        throw new Error(`Failed to create raw item: ${err.message}`);
    }
}
async function createManufactured(name, components) {
    try {
        if (!name || !components) throw new Error("Missing required fields");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
            name,
            type: "manufactured",
            components
        });
    } catch (err) {
        throw new Error(`Failed to create manufactured item: ${err.message}`);
    }
}
async function addStock(id, amount = 1) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
        const item = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(id);
        if (!item) throw new Error("Item not found");
        item.stock += amount;
        await item.save();
        return item.stock;
    } catch (err) {
        throw new Error(`Failed to add stock: ${err.message}`);
    }
}
async function removeStock(id, amount = 1) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
        const item = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findById(id);
        if (!item) throw new Error("Item not found");
        item.stock -= amount;
        if (item.stock < 0) item.stock = 0;
        await item.save();
        return item.stock;
    } catch (err) {
        throw new Error(`Failed to remove stock: ${err.message}`);
    }
}
async function deleteItem(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
        const dependentCount = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].countDocuments({
            "components.item": id
        });
        if (dependentCount > 0) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DependencyError"]("Cannot delete. It is used in manufactured items");
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].findByIdAndDelete(id);
        return true;
    } catch (err) {
        if (err instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DependencyError"]) throw err;
        throw new Error(`Failed to delete item: ${err.message}`);
    }
}
async function listItems() {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
        const items = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find().populate("components.item");
        const data = [];
        for (const itm of items){
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
async function searchItems(query) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["connectDB"])();
        const results = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].find({
            name: {
                $regex: query,
                $options: "i"
            }
        }).limit(10).lean();
        return results;
    } catch (err) {
        throw new Error(`Failed to search items: ${err.message}`);
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createRaw,
    createManufactured,
    addStock,
    removeStock,
    deleteItem,
    listItems,
    searchItems
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createRaw, "600ccfaf1c1c1d8efcc8efe99ca2e77663eda1d65c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createManufactured, "60dd399b61e7023bb3d9be9f4abd0a5da35dd4b5a3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStock, "6022ea75f766d7a19968497222058aa6732d836f3f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeStock, "6062745cb81f6b8d7724a16ed16d015fb5c7878dc0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteItem, "40c4e434e47439b08f766c97eda76d81a1a013935a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(listItems, "00a86fdee841422d74f99c4158449cff9d6c42a0f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchItems, "400fc8d113a3dff56f12c6a652022f15cf8171c94e", null);
}),
"[project]/src/actions/items.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0004359a9353ace45cae70f12aac6562177dd3cdfc":"listItemsAction","4001aaf19d0a3818f909ef6a77bcb602d1cdd456fa":"searchItemsAction","40522e1ee9d25763a5cf2137ce6bd15bc6cf9dc820":"addManufacturedAction","40d4bb175200857cfdd7c985db3421d11cfb42c15f":"addRawAction","40e0318ec770de0b33484c62533fe48f5ca68b4d80":"deleteItemAction","60e0ecb56173b9c0e68dad4f3200eb4194eec46c79":"addStockAction","60fe4534d097d80684aa0587cdddf208665f5422a2":"removeStockAction"},"",""] */ __turbopack_context__.s([
    "addManufacturedAction",
    ()=>addManufacturedAction,
    "addRawAction",
    ()=>addRawAction,
    "addStockAction",
    ()=>addStockAction,
    "deleteItemAction",
    ()=>deleteItemAction,
    "listItemsAction",
    ()=>listItemsAction,
    "removeStockAction",
    ()=>removeStockAction,
    "searchItemsAction",
    ()=>searchItemsAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/itemsActions.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function addRawAction({ name, purchasePrice }) {
    try {
        const item = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRaw"])(name, purchasePrice);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(item))
        };
    } catch (err) {
        return {
            success: false,
            error: err.message || "Failed to add raw item"
        };
    }
}
async function addManufacturedAction({ name, components }) {
    try {
        const item = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createManufactured"])(name, components);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(item))
        };
    } catch (err) {
        return {
            success: false,
            error: err.message || "Failed to add manufactured item"
        };
    }
}
async function addStockAction(id, amount = 1) {
    try {
        const stock = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addStock"])(id, amount);
        return {
            success: true,
            stock
        };
    } catch (err) {
        return {
            success: false,
            error: err.message || `Failed to add stock for item ${id}`
        };
    }
}
async function removeStockAction(id, amount = 1) {
    try {
        const stock = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeStock"])(id, amount);
        return {
            success: true,
            stock
        };
    } catch (err) {
        return {
            success: false,
            error: err.message || `Failed to remove stock for item ${id}`
        };
    }
}
async function deleteItemAction(id) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteItem"])(id);
        return {
            success: true
        };
    } catch (err) {
        return {
            success: false,
            error: err.name === "DependencyError" ? err.message : err.message || `Failed to delete item ${id}`
        };
    }
}
async function listItemsAction() {
    try {
        const items = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listItems"])();
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
async function searchItemsAction(query) {
    try {
        const results = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchItems"])(query);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(results))
        };
    } catch (err) {
        return {
            success: false,
            error: err.message
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    addRawAction,
    addManufacturedAction,
    addStockAction,
    removeStockAction,
    deleteItemAction,
    listItemsAction,
    searchItemsAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addRawAction, "40d4bb175200857cfdd7c985db3421d11cfb42c15f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addManufacturedAction, "40522e1ee9d25763a5cf2137ce6bd15bc6cf9dc820", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStockAction, "60e0ecb56173b9c0e68dad4f3200eb4194eec46c79", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeStockAction, "60fe4534d097d80684aa0587cdddf208665f5422a2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteItemAction, "40e0318ec770de0b33484c62533fe48f5ca68b4d80", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(listItemsAction, "0004359a9353ace45cae70f12aac6562177dd3cdfc", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchItemsAction, "4001aaf19d0a3818f909ef6a77bcb602d1cdd456fa", null);
}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/items.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/itemsActions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/items.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/itemsActions.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/items.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/lib/itemsActions.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0004359a9353ace45cae70f12aac6562177dd3cdfc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listItemsAction"],
    "00a86fdee841422d74f99c4158449cff9d6c42a0f9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listItems"],
    "4001aaf19d0a3818f909ef6a77bcb602d1cdd456fa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchItemsAction"],
    "400fc8d113a3dff56f12c6a652022f15cf8171c94e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchItems"],
    "40522e1ee9d25763a5cf2137ce6bd15bc6cf9dc820",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addManufacturedAction"],
    "40c4e434e47439b08f766c97eda76d81a1a013935a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteItem"],
    "40d4bb175200857cfdd7c985db3421d11cfb42c15f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRawAction"],
    "40e0318ec770de0b33484c62533fe48f5ca68b4d80",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteItemAction"],
    "600ccfaf1c1c1d8efcc8efe99ca2e77663eda1d65c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createRaw"],
    "6022ea75f766d7a19968497222058aa6732d836f3f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addStock"],
    "6062745cb81f6b8d7724a16ed16d015fb5c7878dc0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeStock"],
    "60dd399b61e7023bb3d9be9f4abd0a5da35dd4b5a3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createManufactured"],
    "60e0ecb56173b9c0e68dad4f3200eb4194eec46c79",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addStockAction"],
    "60fe4534d097d80684aa0587cdddf208665f5422a2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeStockAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/items.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/lib/itemsActions.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/items.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$itemsActions$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/itemsActions.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e73f252e._.js.map