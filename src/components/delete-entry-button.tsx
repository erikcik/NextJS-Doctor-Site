"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

interface DeleteEntryButtonProps {
  entryId: string;
  entryType: string;
}

export function DeleteEntryButton({ entryId, entryType }: DeleteEntryButtonProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!confirm("Are you sure you want to delete this entry?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/entries/${entryId}/delete?type=${entryType}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }

      toast({
        title: "Success",
        description: "Entry deleted successfully",
      });

      router.refresh();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete entry. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <Button 
        type="submit" 
        variant="destructive" 
        size="sm"
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
} 