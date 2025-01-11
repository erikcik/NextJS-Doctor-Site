'use server'

import { db } from "~/server/db";
import { 
  blogEntries, 
  complementaryEntries, 
  orthopedicsEntries,
  bookEntries,
  videoEntries 
} from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditEntryForm from "./edit-form";

export default async function EditEntryPage({
  params,
}: {
  params: { id: string };
}) {
  // Try to find the entry in all tables
  const [blogEntry] = await db
    .select()
    .from(blogEntries)
    .where(eq(blogEntries.id, params.id));

  const [complementaryEntry] = await db
    .select()
    .from(complementaryEntries)
    .where(eq(complementaryEntries.id, params.id));

  const [orthopedicsEntry] = await db
    .select()
    .from(orthopedicsEntries)
    .where(eq(orthopedicsEntries.id, params.id));

  const [bookEntry] = await db
    .select()
    .from(bookEntries)
    .where(eq(bookEntries.id, params.id));

  const [videoEntry] = await db
    .select()
    .from(videoEntries)
    .where(eq(videoEntries.id, params.id));

  // Determine which type of entry we're editing
  const entry = blogEntry || complementaryEntry || orthopedicsEntry || bookEntry || videoEntry;
  if (!entry) {
    notFound();
  }

  // Determine the entry type for the form
  const entryType = blogEntry ? 'blog' : 
                    complementaryEntry ? 'complementary' : 
                    orthopedicsEntry ? 'orthopedics' :
                    bookEntry ? 'book' :
                    'video';

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        Edit {entryType.charAt(0).toUpperCase() + entryType.slice(1)} Entry
      </h1>

      <EditEntryForm 
        entry={entry} 
        entryType={entryType} 
      />
    </div>
  );
}
