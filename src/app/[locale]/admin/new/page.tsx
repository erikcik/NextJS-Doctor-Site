"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import MarkdownEditor from "~/components/markdown-editor";
import { useToast } from "~/hooks/use-toast";
import { FileUpload } from "~/components/file-upload";
import { HelpCircle, Bold, Italic, Link2, Heading1, List, Image as ImageIcon, Undo, Mail, ChevronRight, MousePointerClick, Keyboard, ArrowRightLeft, Maximize2, FileWarning } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";

export default function NewEntryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationKey, setTranslationKey] = useState(0);
  const [showEditorHelp, setShowEditorHelp] = useState(false);

  if (!entryType) {
    router.push("/admin");
    return null;
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/entries", {
        method: "POST",
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
        throw new Error(error.error || "Failed to create entry");
      }

      toast({
        title: "Success",
        description: "Entry created successfully",
      });

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error creating entry:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create entry",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 sticky top-0 bg-background z-10 py-4 border-b">
        Create New {entryType.charAt(0).toUpperCase() + entryType.slice(1)} Entry
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
          <div className="flex items-center justify-between">
            <Label>Turkish Content</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setShowEditorHelp(true)}
            >
              <HelpCircle className="h-4 w-4" />
              Editor Help
            </Button>
          </div>
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
            {isSubmitting ? "Creating..." : "Create Entry"}
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

      <EditorHelpDialog open={showEditorHelp} onOpenChange={setShowEditorHelp} />
    </div>
  );
}

function EditorHelpDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">Editor Guide</DialogTitle>
        </DialogHeader>
        <div className="prose prose-slate max-h-[70vh] overflow-y-auto px-2">
          {/* Text Formatting Section */}
          <div className="space-y-6 mb-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-primary border-b pb-2">
              <MousePointerClick className="h-5 w-5" />
              Text Formatting
            </h3>
            <div className="space-y-4 pl-4">
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Bold className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <strong className="text-base">Bold</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select text and click <kbd className="rounded border px-1.5 py-0.5 text-xs">B</kbd> to make text bold
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Italic className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <strong className="text-base">Italic</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select text and click <kbd className="rounded border px-1.5 py-0.5 text-xs">I</kbd> to italicize text
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Link2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <strong className="text-base">Links</strong>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select text and click the link icon to add a URL
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Headings Section */}
          <div className="space-y-6 mb-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-primary border-b pb-2">
              <Heading1 className="h-5 w-5" />
              Headings
            </h3>
            <div className="space-y-4 pl-4">
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <ChevronRight className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Six levels of headings available (H1-H6)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lists Section */}
          <div className="space-y-6 mb-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-primary border-b pb-2">
              <List className="h-5 w-5" />
              Lists
            </h3>
            <div className="space-y-4 pl-4">
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <ChevronRight className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Create bulleted lists with different markers for each level:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• First level: disc</li>
                    <li>○ Second level: circle</li>
                    <li>■ Third level: square</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-6 mb-10">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-primary border-b pb-2">
              <ImageIcon className="h-5 w-5" />
              Images
            </h3>
            <div className="space-y-4 pl-4">
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <MousePointerClick className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Click the image icon to upload images
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Maximize2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Resize images using the handle in the bottom-right corner
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Features Section */}
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-primary border-b pb-2">
              <ArrowRightLeft className="h-5 w-5" />
              Other Features
            </h3>
            <div className="space-y-4 pl-4">
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Undo className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Undo/Redo: Use the arrow buttons to undo or redo changes
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Email addresses are automatically converted to clickable links
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 