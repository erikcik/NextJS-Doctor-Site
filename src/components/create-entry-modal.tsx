"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { FileText, Heart, Activity, Bell } from "lucide-react";

interface CreateEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateEntryModal({ isOpen, onClose }: CreateEntryModalProps) {
  const router = useRouter();

  const entryTypes = [
    {
      title: "Blog Entry",
      icon: FileText,
      type: "blog",
      description: "Create a new blog post"
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
      title: "Announcement",
      icon: Bell,
      type: "announcement",
      description: "Post a new announcement"
    }
  ];

  const handleSelect = (type: string) => {
    router.push(`/admin/new?type=${type}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Entry</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {entryTypes.map((entry) => (
            <Button
              key={entry.type}
              variant="outline"
              className="flex items-center justify-start gap-3 h-auto p-4"
              onClick={() => handleSelect(entry.type)}
            >
              <entry.icon className="h-5 w-5" />
              <div className="text-left">
                <div className="font-semibold">{entry.title}</div>
                <div className="text-sm text-muted-foreground">
                  {entry.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
} 