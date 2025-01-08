import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { 
  bookEntries,
  blogEntries, 
  complementaryEntries, 
  orthopedicsEntries,
  videoEntries,
} from "~/server/db/schema";
import { cookies } from "next/headers";
import { verifyAuth } from "~/server/auth";

// Helper function to get the appropriate table based on entry type
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

// Helper function to validate required fields based on entry type
const validateRequiredFields = (type: string, data: any) => {
  const commonFields = ["turkishTitle", "englishTitle"];
  
  const typeSpecificFields: Record<string, string[]> = {
    book: [...commonFields, "author", "coverImage", "linkToBook", "turkishContent", "englishContent"],
    blog: [...commonFields, "author", "coverImage", "category", "keywords", "turkishContent", "englishContent"],
    complementary: [...commonFields, "author", "coverImage", "turkishContent", "englishContent"],
    orthopedics: [...commonFields, "author", "coverImage", "turkishContent", "englishContent"],
    video: [...commonFields, "turkishDescription", "englishDescription", "videoUrl", "thumbnailUrl"],
  };

  const requiredFields = typeSpecificFields[type];
  if (!requiredFields) {
    throw new Error("Invalid entry type");
  }

  const missingFields = requiredFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
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

    // Validate required fields
    try {
      validateRequiredFields(type, entryData);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Validation failed" },
        { status: 400 }
      );
    }

    const table = getTableForType(type);
    
    // Calculate minutesToRead for content types that need it
    if (type !== 'video' && !entryData.minutesToRead) {
      const turkishContent = JSON.parse(entryData.turkishContent);
      const wordCount = countWords(turkishContent);
      entryData.minutesToRead = Math.ceil(wordCount / 200);
    }

    // Create the entry
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