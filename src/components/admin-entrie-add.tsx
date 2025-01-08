"use client";

import React, { useState } from "react";
import { CreateEntryModal } from "./create-entry-modal";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const entryTypes = [
  { value: "book", label: "Book" },
  { value: "blog", label: "Blog Post" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "complementary", label: "Complementary Medicine" }
];

export function AdminEntrieAdd() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Content</h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Entry
        </Button>
      </div>

      <CreateEntryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
