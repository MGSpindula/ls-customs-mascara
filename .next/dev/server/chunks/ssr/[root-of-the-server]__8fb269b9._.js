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

__turbopack_context__.s([
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$mongo$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/mongo.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$Item$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/Item.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.js [app-rsc] (ecmascript)");
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
}),
"[project]/src/actions/items.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00e83395fe429191b3eff859456bb8fbbd82d8d202":"listItemsAction","402d37ad1da09072ba1fcbfc5a871bd290a2d32124":"addRawAction","40cd0ad2a0892352ba44bc4394b6d70fb8edddea69":"deleteItemAction","40cf98c4b6dc2ee3bfc5faa3f03457f1dea35c8259":"searchItemsAction","40f549c5cdd969000fbf4fd53de45142e0448a36da":"addManufacturedAction","60802d8db4cfffa701707b2e4c0680dcb760786903":"removeStockAction","60b3623ef142e5654b012a07c4426312ab6e91fdc3":"addStockAction"},"",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addRawAction, "402d37ad1da09072ba1fcbfc5a871bd290a2d32124", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addManufacturedAction, "40f549c5cdd969000fbf4fd53de45142e0448a36da", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addStockAction, "60b3623ef142e5654b012a07c4426312ab6e91fdc3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(removeStockAction, "60802d8db4cfffa701707b2e4c0680dcb760786903", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteItemAction, "40cd0ad2a0892352ba44bc4394b6d70fb8edddea69", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(listItemsAction, "00e83395fe429191b3eff859456bb8fbbd82d8d202", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(searchItemsAction, "40cf98c4b6dc2ee3bfc5faa3f03457f1dea35c8259", null);
}),
"[project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx <module evaluation>", "default");
}),
"[project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx", "default");
}),
"[project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$AddManufacturedClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$AddManufacturedClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$AddManufacturedClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/dashboard/createManufactured/page.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00772ff4d20148ee71a559260e068ade1f470a6aaf":"default"},"",""] */ __turbopack_context__.s([
    "default",
    ()=>CreateManufactured
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/items.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$AddManufacturedClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/createManufactured/AddManufacturedClient.jsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
async function handleSubmit(formData) {
    const name = formData.get('name');
    const componentsJson = formData.get('componentsJson');
    const components = JSON.parse(componentsJson || '[]');
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addManufacturedAction"])({
        name,
        components
    });
    if (result.success) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])('/dashboard');
    }
}
async function handleSearch(query) {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchItemsAction"])(query);
}
function CreateManufactured() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$AddManufacturedClient$2e$jsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
        onSubmit: handleSubmit,
        onSearch: handleSearch
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/createManufactured/page.js",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    CreateManufactured
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(CreateManufactured, "00772ff4d20148ee71a559260e068ade1f470a6aaf", null);
}),
"[project]/.next-internal/server/app/dashboard/createManufactured/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/dashboard/createManufactured/page.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/items.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$page$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/createManufactured/page.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/items.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/dashboard/createManufactured/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/dashboard/createManufactured/page.js [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/items.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00772ff4d20148ee71a559260e068ade1f470a6aaf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$page$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    "00e83395fe429191b3eff859456bb8fbbd82d8d202",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["listItemsAction"],
    "402d37ad1da09072ba1fcbfc5a871bd290a2d32124",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addRawAction"],
    "40cd0ad2a0892352ba44bc4394b6d70fb8edddea69",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteItemAction"],
    "40cf98c4b6dc2ee3bfc5faa3f03457f1dea35c8259",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["searchItemsAction"],
    "40f549c5cdd969000fbf4fd53de45142e0448a36da",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addManufacturedAction"],
    "60802d8db4cfffa701707b2e4c0680dcb760786903",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["removeStockAction"],
    "60b3623ef142e5654b012a07c4426312ab6e91fdc3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addStockAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f$createManufactured$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$page$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/createManufactured/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/dashboard/createManufactured/page.js [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/actions/items.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$dashboard$2f$createManufactured$2f$page$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/dashboard/createManufactured/page.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$items$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/items.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8fb269b9._.js.map