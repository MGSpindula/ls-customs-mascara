import { NextResponse } from "next/server";
import { createRaw } from "../../../../lib/itemsActions";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, purchasePrice } = body;

    // Required fields for RAW items
    if (!name || purchasePrice == null) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate numeric price
    if (typeof purchasePrice !== "number" || purchasePrice < 0) {
      return NextResponse.json(
        { error: "Invalid purchasePrice" },
        { status: 400 }
      );
    }

    const item = await createRaw(name, purchasePrice);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating raw item:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
