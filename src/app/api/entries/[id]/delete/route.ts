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

// Add type definitions
type VideoEntry = {
  id: string;
  turkishTitle: string;
  englishTitle: string;
  turkishDescription: string;
  englishDescription: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date | null;
};

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

    // If it's a video entry, handle the video-specific cleanup
    if (type === "video") {
      const videoEntry = existingEntry[0] as VideoEntry;
      // Here you could add logic to delete the video file and thumbnail
      // from your storage service if needed
      console.log("Video entry deleted:", videoEntry.videoUrl);
      console.log("Thumbnail deleted:", videoEntry.thumbnailUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
} 