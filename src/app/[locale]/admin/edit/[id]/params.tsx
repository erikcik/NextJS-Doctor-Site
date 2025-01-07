"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MarkdownEditor from "~/components/markdown-editor";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import { Skeleton } from "~/components/ui/skeleton";
import { FileUpload } from "~/components/file-upload";

interface SlateNode {
  type?: string;
  text?: string;
  children?: SlateNode[];
  [key: string]: any;
}

export default function EditEntryForm({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const entryType = searchParams.get("type");

  const [formData, setFormData] = useState({
    turkishTitle: "",
    englishTitle: "",
    author: "",
    coverImage: "",
    linkToBook: "",
    minutesToRead: "",
    turkishContent: "",
    englishContent: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationKey, setTranslationKey] = useState(0);

  useEffect(() => {
    if (!entryType) {
      router.push("/admin");
      return;
    }

    const fetchEntry = async () => {
      try {
        const response = await fetch(`/api/entries/${id}?type=${entryType}`);
        if (!response.ok) throw new Error("Failed to fetch entry");
        
        const { data } = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching entry:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch entry",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [id, entryType, toast, router]);

  const handleTranslateTitle = async () => {
    if (!formData.turkishTitle) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a Turkish title first",
      });
      return;
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formData.turkishTitle }),
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const { translation } = await response.json();
      setFormData(prev => ({ ...prev, englishTitle: translation }));

      toast({
        title: "Success",
        description: "Title translated successfully",
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to translate title",
      });
    }
  };

  const handleTranslate = async () => {
    if (!formData.turkishContent) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some Turkish content first",
      });
      return;
    }

    setIsTranslating(true);
    try {
      const turkishNodes = JSON.parse(formData.turkishContent);
      
      // Function to handle node translation while preserving formatting and images
      const translateNode = async (node: any): Promise<any> => {
        // If it's an image node, preserve it completely
        if (node.type === 'image') {
          return { ...node };
        }

        // If it's a text node, translate the text
        if (typeof node.text === 'string' && node.text.trim()) {
          const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: node.text }),
          });

          if (!response.ok) throw new Error('Translation failed');
          const { translation } = await response.json();

          // Return node with translated text but preserve formatting
          return { ...node, text: translation };
        }

        // If it has children, process them recursively
        if (Array.isArray(node.children)) {
          const translatedChildren = await Promise.all(
            node.children.map((child: any) => translateNode(child))
          );
          return { ...node, children: translatedChildren };
        }

        // Return unchanged node if none of the above conditions are met
        return node;
      };

      // Translate all nodes
      const translatedNodes = await Promise.all(
        turkishNodes.map((node: any) => translateNode(node))
      );

      setFormData(prev => ({
        ...prev,
        englishContent: JSON.stringify(translatedNodes)
      }));
      setTranslationKey(prev => prev + 1);

      toast({
        title: "Success",
        description: "Content translated successfully",
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to translate content",
      });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: entryType,
          ...formData,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update entry");
      }

      toast({
        title: "Success",
        description: "Entry updated successfully",
      });

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error updating entry:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update entry",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        Edit {entryType?.charAt(0).toUpperCase()}{entryType?.slice(1)} Entry
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="turkishTitle">Turkish Title</Label>
          <Input
            id="turkishTitle"
            value={formData.turkishTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, turkishTitle: e.target.value }))}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleTranslateTitle}
            className="mb-4"
          >
            Translate Title
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="englishTitle">English Title</Label>
          <Input
            id="englishTitle"
            value={formData.englishTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, englishTitle: e.target.value }))}
            required
          />
        </div>

        {(entryType === "blog" || entryType === "complementary" || entryType === "orthopedics") && (
          <>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image</Label>
              <FileUpload
                value={formData.coverImage}
                onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
              />
            </div>
          </>
        )}

        {entryType === "blog" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="linkToBook">Link to Book (Optional)</Label>
              <Input
                id="linkToBook"
                value={formData.linkToBook}
                onChange={(e) => setFormData(prev => ({ ...prev, linkToBook: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minutesToRead">Minutes to Read (Optional)</Label>
              <Input
                id="minutesToRead"
                type="number"
                value={formData.minutesToRead}
                onChange={(e) => setFormData(prev => ({ ...prev, minutesToRead: e.target.value }))}
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <Label>Turkish Content</Label>
          <MarkdownEditor
            initialValue={formData.turkishContent}
            onChange={(value) => setFormData(prev => ({ ...prev, turkishContent: value }))}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleTranslate}
            disabled={isTranslating}
            className="mb-4"
          >
            {isTranslating ? "Translating..." : "Translate to English"}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>English Content</Label>
          <div key={translationKey}>
            <MarkdownEditor
              initialValue={formData.englishContent}
              onChange={(value) => setFormData(prev => ({ ...prev, englishContent: value }))}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
} 