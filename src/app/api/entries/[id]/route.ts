import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { 
  blogEntries, 
  complementaryEntries, 
  orthopedicsEntries, 
  announcementEntries 
} from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { verifyAuth } from "~/server/auth";

const getTableForType = (type: string) => {
  switch (type) {
    case "blog":
      return blogEntries;
    case "complementary":
      return complementaryEntries;
    case "orthopedics":
      return orthopedicsEntries;
    case "announcement":
      return announcementEntries;
    default:
      throw new Error("Invalid entry type");
  }
};

// Get single entry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = await params.id; // Await the params

  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { error: "Entry type is required" },
        { status: 400 }
      );
    }

    const table = getTableForType(type);
    const entry = await db
      .select()
      .from(table)
      .where(eq(table.id, id))
      .limit(1);

    if (!entry.length) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: entry[0] });
  } catch (error) {
    console.error("Failed to fetch entry:", error);
    return NextResponse.json(
      { error: "Failed to fetch entry" },
      { status: 500 }
    );
  }
}

// Update entry
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = await params.id; // Await the params

  // Verify authentication
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("auth_token");
  
  if (!authToken || !(await verifyAuth(authToken.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, ...updateData } = await request.json();

    if (!type) {
      return NextResponse.json(
        { error: "Entry type is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = ["turkishTitle", "englishTitle", "turkishContent", "englishContent"];
    if (type !== "announcement") {
      requiredFields.push("author", "coverImage");
    }

    for (const field of requiredFields) {
      if (!updateData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Clean up the updateData
    const cleanedData = {
      ...updateData,
      updatedAt: new Date(),
      createdAt: undefined
    };

    const table = getTableForType(type);
    const [updatedEntry] = await db
      .update(table)
      .set(cleanedData)
      .where(eq(table.id, id))
      .returning();

    if (!updatedEntry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedEntry });
  } catch (error) {
    console.error("Failed to update entry:", error);
    return NextResponse.json(
      { error: "Failed to update entry" },
      { status: 500 }
    );
  }
} 