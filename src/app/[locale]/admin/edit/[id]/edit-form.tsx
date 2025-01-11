'use client'

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/hooks/use-toast";
import MarkdownEditor from "~/components/markdown-editor";
import { FileUpload } from "~/components/file-upload";
import { useRouter } from "next/navigation";

interface EditEntryFormProps {
  entry: any;
  entryType: 'blog' | 'complementary' | 'orthopedics' | 'book' | 'video';
}

export default function EditEntryForm({ entry, entryType }: EditEntryFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationKey, setTranslationKey] = useState(0);

  const [formData, setFormData] = useState({
    turkishTitle: entry.turkishTitle,
    englishTitle: entry.englishTitle,
    turkishContent: entry.turkishContent,
    englishContent: entry.englishContent,
    coverImage: entry.coverImage,
    author: entry.author,
    category: entry.category || '',
    keywords: entry.keywords || '',
    turkishDescription: entry.turkishDescription || '',
    englishDescription: entry.englishDescription || '',
    videoUrl: entry.videoUrl || '',
    thumbnailUrl: entry.thumbnailUrl || '',
  });

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

      if (!response.ok) throw new Error('Translation failed');

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

  const handleTranslateDescription = async () => {
    if (!formData.turkishDescription) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a Turkish description first",
      });
      return;
    }

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formData.turkishDescription }),
      });

      if (!response.ok) throw new Error('Translation failed');

      const { translation } = await response.json();
      setFormData(prev => ({ ...prev, englishDescription: translation }));

      toast({
        title: "Success",
        description: "Description translated successfully",
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to translate description",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/entries/${entry.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: entryType,
        }),
      });

      if (!response.ok) throw new Error('Failed to update entry');

      toast({
        title: "Success",
        description: "Entry updated successfully",
      });

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error('Update error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update entry",
      });
    } finally {
      setIsSubmitting(false);
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
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formData.turkishContent }),
      });

      if (!response.ok) throw new Error('Translation failed');

      const { translation } = await response.json();
      setFormData(prev => ({ ...prev, englishContent: translation }));
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Book Entry Fields */}
      {entryType === "book" && (
        <>
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
              accept="image/*"
            />
          </div>

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
              {isTranslating ? "Translating..." : "Translate Content"}
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
        </>
      )}

      {/* Blog Entry Fields */}
      {entryType === "blog" && (
        <>
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
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (comma separated)</Label>
            <Input
              id="keywords"
              value={formData.keywords}
              onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <FileUpload
              value={formData.coverImage}
              onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
              accept="image/*"
            />
          </div>

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
              {isTranslating ? "Translating..." : "Translate Content"}
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
        </>
      )}

      {/* Complementary and Orthopedics Entry Fields */}
      {(entryType === "complementary" || entryType === "orthopedics") && (
        <>
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
              accept="image/*"
            />
          </div>

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
              {isTranslating ? "Translating..." : "Translate Content"}
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
        </>
      )}

      {/* Video Entry Fields */}
      {entryType === "video" && (
        <>
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

          <div className="space-y-2">
            <Label>Turkish Description</Label>
            <textarea
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2"
              value={formData.turkishDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, turkishDescription: e.target.value }))}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleTranslateDescription}
              className="mb-4"
            >
              Translate Description
            </Button>
          </div>

          <div className="space-y-2">
            <Label>English Description</Label>
            <textarea
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2"
              value={formData.englishDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, englishDescription: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Video Upload</Label>
            <FileUpload
              value={formData.videoUrl}
              onChange={(url) => setFormData(prev => ({ ...prev, videoUrl: url }))}
              accept="video/mp4,video/webm,video/ogg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            <FileUpload
              value={formData.thumbnailUrl}
              onChange={(url) => setFormData(prev => ({ ...prev, thumbnailUrl: url }))}
              accept="image/jpeg,image/png,image/webp"
            />
          </div>
        </>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Entry"}
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
  );
} 