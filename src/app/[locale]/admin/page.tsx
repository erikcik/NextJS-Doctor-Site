import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { formatDate } from "~/lib/utils";
import { DeleteEntryButton } from "~/components/delete-entry-button";
import { db } from "~/server/db/index";
import {
  blogEntries,
  complementaryEntries,
  orthopedicsEntries,
  announcementEntries,
} from "~/server/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { AdminEntrieAdd } from "~/components/admin-entrie-add";
import { LocalizedTitle } from "~/components/localized-title";

export default async function AdminPage() {
  const allBlogEntries = await db
    .select()
    .from(blogEntries)
    .orderBy(desc(blogEntries.createdAt));
  const allComplementaryEntries = await db
    .select()
    .from(complementaryEntries)
    .orderBy(desc(complementaryEntries.createdAt));
  const allOrthopedicsEntries = await db
    .select()
    .from(orthopedicsEntries)
    .orderBy(desc(orthopedicsEntries.createdAt));
  const allAnnouncementEntries = await db
    .select()
    .from(announcementEntries)
    .orderBy(desc(announcementEntries.createdAt));

  return (
    <div className="container mx-auto py-8">
      <AdminEntrieAdd />

      <Tabs defaultValue="blog" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="complementary">
            Complementary Medicine
          </TabsTrigger>
          <TabsTrigger value="orthopedics">Orthopedics</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <EntryList entries={allBlogEntries} type="blog" showAuthor={true} />
        </TabsContent>

        <TabsContent value="complementary">
          <EntryList
            entries={allComplementaryEntries}
            type="complementary"
            showAuthor={true}
          />
        </TabsContent>

        <TabsContent value="orthopedics">
          <EntryList
            entries={allOrthopedicsEntries}
            type="orthopedics"
            showAuthor={true}
          />
        </TabsContent>

        <TabsContent value="announcements">
          <EntryList
            entries={allAnnouncementEntries}
            type="announcement"
            showAuthor={false}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

type Entry = {
  id: string;
  turkishTitle: string;
  englishTitle: string;
  author?: string;
  createdAt: Date;
  updatedAt?: Date | null;
};

function EntryList({
  entries,
  type,
  showAuthor,
}: {
  entries: Entry[];
  type: string;
  showAuthor: boolean;
}) {
  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="rounded-lg border bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                <LocalizedTitle 
                  turkishTitle={entry.turkishTitle}
                  englishTitle={entry.englishTitle}
                />
              </h2>
              {showAuthor && entry.author && (
                <p className="mb-1 text-sm text-gray-600">By: {entry.author}</p>
              )}
              <p className="text-sm text-gray-500">
                Created: {formatDate(entry.createdAt)}
                {entry.updatedAt &&
                  entry.updatedAt > entry.createdAt &&
                  ` • Updated: ${formatDate(entry.updatedAt)}`}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/edit/${entry.id}?type=${type}`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <DeleteEntryButton entryId={entry.id} entryType={type} />
            </div>
          </div>
        </div>
      ))}

      {entries.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No entries yet. Create your first one!
        </div>
      )}
    </div>
  );
}
