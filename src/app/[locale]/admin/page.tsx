import { desc } from "drizzle-orm";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { formatDate } from "~/lib/utils";
import { DeleteEntryButton } from "~/components/delete-entry-button";
import { db } from "~/server/db/index";
import {
  bookEntries,
  blogEntries,
  complementaryEntries,
  orthopedicsEntries,
  videoEntries,
} from "~/server/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { AdminEntrieAdd } from "~/components/admin-entrie-add";
import { LocalizedTitle } from "~/components/localized-title";
import { Badge } from "~/components/ui/badge";
import { Book, Clock, Video, Play } from "lucide-react";
import Image from "next/image";

export default async function AdminPage() {
  const allBookEntries = await db
    .select()
    .from(bookEntries)
    .orderBy(desc(bookEntries.createdAt));
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
  const allVideoEntries = await db
    .select()
    .from(videoEntries)
    .orderBy(desc(videoEntries.createdAt));

  return (
    <div className="container mx-auto py-8">
      <AdminEntrieAdd />

      <Tabs defaultValue="books" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="complementary">
            Complementary Medicine
          </TabsTrigger>
          <TabsTrigger value="orthopedics">Orthopedics</TabsTrigger>
          <TabsTrigger value="videos">Video Reels</TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          <BookList entries={allBookEntries} />
        </TabsContent>

        <TabsContent value="blog">
          <BlogList entries={allBlogEntries} />
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

        <TabsContent value="videos">
          <VideoList entries={allVideoEntries} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Type for book entries
type BookEntry = {
  id: string;
  turkishTitle: string;
  englishTitle: string;
  author: string;
  linkToBook: string;
  minutesToRead: number;
  createdAt: Date;
  updatedAt?: Date | null;
};

function BookList({ entries }: { entries: BookEntry[] }) {
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
              <p className="mb-1 text-sm text-gray-600">By: {entry.author}</p>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{entry.minutesToRead} min read</span>
                </div>
                <a 
                  href={entry.linkToBook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Book className="h-4 w-4" />
                  <span>View Book</span>
                </a>
              </div>
              <p className="text-sm text-gray-500">
                Created: {formatDate(entry.createdAt)}
                {entry.updatedAt &&
                  entry.updatedAt > entry.createdAt &&
                  ` • Updated: ${formatDate(entry.updatedAt)}`}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/edit/${entry.id}?type=book`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <DeleteEntryButton entryId={entry.id} entryType="book" />
            </div>
          </div>
        </div>
      ))}

      {entries.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No books yet. Create your first one!
        </div>
      )}
    </div>
  );
}

// Type for blog entries
type BlogEntry = {
  id: string;
  turkishTitle: string;
  englishTitle: string;
  author: string;
  category: string;
  keywords: string;
  minutesToRead: number;
  createdAt: Date;
  updatedAt?: Date | null;
};

function BlogList({ entries }: { entries: BlogEntry[] }) {
  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="rounded-lg border bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">
                  {entry.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{entry.minutesToRead} min read</span>
                </div>
              </div>
              <h2 className="mb-2 text-xl font-semibold">
                <LocalizedTitle 
                  turkishTitle={entry.turkishTitle}
                  englishTitle={entry.englishTitle}
                />
              </h2>
              <p className="mb-1 text-sm text-gray-600">By: {entry.author}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {entry.keywords.split(',').map((keyword, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {keyword.trim()}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Created: {formatDate(entry.createdAt)}
                {entry.updatedAt &&
                  entry.updatedAt > entry.createdAt &&
                  ` • Updated: ${formatDate(entry.updatedAt)}`}
              </p>
            </div>
            <div className="flex gap-2">
              <Link href={`/admin/edit/${entry.id}?type=blog`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <DeleteEntryButton entryId={entry.id} entryType="blog" />
            </div>
          </div>
        </div>
      ))}

      {entries.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No blog posts yet. Create your first one!
        </div>
      )}
    </div>
  );
}

// Type for regular entries (complementary and orthopedics)
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

// Type for video entries
type VideoEntry = {
  id: string;
  turkishTitle: string;
  englishTitle: string;
  turkishDescription: string;
  englishDescription: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt?: Date | null;
};

function VideoList({ entries }: { entries: VideoEntry[] }) {
  return (
    <div className="grid gap-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="rounded-lg border bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              {/* Video Thumbnail */}
              <div className="relative w-48 h-28 rounded-lg overflow-hidden bg-gray-100">
                {entry.thumbnailUrl ? (
                  <Image
                    src={entry.thumbnailUrl}
                    alt={entry.turkishTitle}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-8 w-8 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>

              <div>
                <h2 className="mb-2 text-xl font-semibold">
                  <LocalizedTitle 
                    turkishTitle={entry.turkishTitle}
                    englishTitle={entry.englishTitle}
                  />
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {entry.turkishDescription}
                </p>
                <p className="text-sm text-gray-500">
                  Created: {formatDate(entry.createdAt)}
                  {entry.updatedAt &&
                    entry.updatedAt > entry.createdAt &&
                    ` • Updated: ${formatDate(entry.updatedAt)}`}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/admin/edit/${entry.id}?type=video`}>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </Link>
              <DeleteEntryButton entryId={entry.id} entryType="video" />
            </div>
          </div>
        </div>
      ))}

      {entries.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No video reels yet. Create your first one!
        </div>
      )}
    </div>
  );
}
