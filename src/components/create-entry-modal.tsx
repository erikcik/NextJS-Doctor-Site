"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { Book, FileText, Heart, Activity, Video } from "lucide-react";

interface CreateEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateEntryModal({ isOpen, onClose }: CreateEntryModalProps) {
  const router = useRouter();

  const entryTypes = [
    {
      title: "Book Entry",
      icon: Book,
      type: "book",
      description: "Add a new book with details and review"
    },
    {
      title: "Blog Post",
      icon: FileText,
      type: "blog",
      description: "Create a new blog article with categories and keywords"
    },
    {
      title: "Complementary Medicine",
      icon: Heart,
      type: "complementary",
      description: "Add new complementary medicine content"
    },
    {
      title: "Orthopedics",
      icon: Activity,
      type: "orthopedics",
      description: "Create new orthopedics content"
    },
    {
      title: "Video Reel",
      icon: Video,
      type: "video",
      description: "Upload a video reel with bilingual titles and descriptions"
    }
  ];

  const handleSelect = (type: string) => {
    router.push(`/admin/new?type=${type}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Entry</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {entryTypes.map((entry) => (
            <Button
              key={entry.type}
              variant="outline"
              className="w-full p-0 h-auto hover:bg-accent/50 transition-colors"
              onClick={() => handleSelect(entry.type)}
            >
              <div className="flex items-start w-full p-3 text-left">
                <entry.icon className="h-5 w-5 shrink-0 mt-0.5 mr-3" />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold truncate">{entry.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {entry.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 