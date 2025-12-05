import { NextResponse } from "next/server";
import { deleteItem } from "../../../../lib/itemsActions";
import { DependencyError } from "../../../../lib/errors";

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ success: false, error: "Missing item id" }, { status: 400 });
        }

        const deleted = await deleteItem(id);

        if (!deleted) {
            return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        if (err instanceof DependencyError) {
            return NextResponse.json({ success: false, error: err.message }, { status: 400 });
        }

        console.error("Unexpected error deleting item:", err);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
