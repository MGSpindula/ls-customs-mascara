import { NextResponse } from "next/server";
import { createManufactured } from "../../../../lib/itemsActions";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, components } = body;

    // Basic field validation
    if (!name || !components) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate component structure
    if (!Array.isArray(components) || components.length === 0) {
      return NextResponse.json(
        { error: "Components must be a non empty array" },
        { status: 400 }
      );
    }

    for (const c of components) {
      if (!c.item || c.qty == null) {
        return NextResponse.json(
          { error: "Each component must include item and qty" },
          { status: 400 }
        );
      }
    }

    const item = await createManufactured(name, components);

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating manufactured item:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
