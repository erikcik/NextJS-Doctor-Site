import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { 
  blogEntries, 
  complementaryEntries, 
  orthopedicsEntries, 
  announcementEntries 
} from "~/server/db/schema";
import { cookies } from "next/headers";
import { verifyAuth } from "~/server/auth";

// Helper function to get the appropriate table based on entry type
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

// Create new entry
export async function POST(request: NextRequest) {
  // Verify authentication
  const cookiesStore = await cookies();
  const authToken = cookiesStore.get("auth_token");
  
  if (!authToken || !(await verifyAuth(authToken.value))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, ...entryData } = body;

    if (!type) {
      return NextResponse.json(
        { error: "Entry type is required" },
        { status: 400 }
      );
    }

    // Validate required fields based on entry type
    const requiredFields = ["turkishTitle", "englishTitle", "turkishContent", "englishContent"];
    if (type !== "announcement") {
      requiredFields.push("author", "coverImage");
    }

    for (const field of requiredFields) {
      if (!entryData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const table = getTableForType(type);
    
    const [newEntry] = await db.insert(table).values({
      ...entryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "Failed to create entry" },
      { status: 500 }
    );
  }
}

// Get entries list
export async function GET(request: NextRequest) {
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
    const entries = await db
      .select()
      .from(table)
      .orderBy(table.createdAt);

    return NextResponse.json({ success: true, data: entries });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
} 