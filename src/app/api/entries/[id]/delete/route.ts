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

export async function POST(
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
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type");

    if (!type) {
      return NextResponse.json(
        { error: "Entry type is required" },
        { status: 400 }
      );
    }

    const table = getTableForType(type);
    
    // First check if the entry exists
    const existingEntry = await db
      .select()
      .from(table)
      .where(eq(table.id, id))
      .limit(1);

    if (!existingEntry.length) {
      return NextResponse.json(
        { error: "Entry not found" },
        { status: 404 }
      );
    }

    // Delete the entry
    await db
      .delete(table)
      .where(eq(table.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
} 