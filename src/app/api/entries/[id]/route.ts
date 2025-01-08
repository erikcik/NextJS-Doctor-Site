import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { 
  bookEntries,
  blogEntries, 
  complementaryEntries, 
  orthopedicsEntries, 
  videoEntries,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { verifyAuth } from "~/server/auth";

const getTableForType = (type: string) => {
  switch (type) {
    case "book":
      return bookEntries;
    case "blog":
      return blogEntries;
    case "complementary":
      return complementaryEntries;
    case "orthopedics":
      return orthopedicsEntries;
    case "video":
      return videoEntries;
    default:
      throw new Error("Invalid entry type");
  }
};

// Get single entry
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = await params.id;

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
  const id = await params.id;

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
    try {
      validateRequiredFields(type, updateData);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Validation failed" },
        { status: 400 }
      );
    }

    // Calculate minutesToRead for non-video content types
    if (type !== 'video' && !updateData.minutesToRead) {
      const turkishContent = JSON.parse(updateData.turkishContent);
      const wordCount = countWords(turkishContent);
      updateData.minutesToRead = Math.ceil(wordCount / 200);
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

// Helper function to count words in content
function countWords(content: any[]): number {
  let wordCount = 0;
  
  const countInNode = (node: any) => {
    if (node.text) {
      wordCount += node.text.trim().split(/\s+/).length;
    }
    if (node.children) {
      node.children.forEach(countInNode);
    }
  };

  content.forEach(countInNode);
  return wordCount;
} 