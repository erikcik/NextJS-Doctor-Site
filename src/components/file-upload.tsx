"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "~/utils/uploadthing";
import { Input } from "./ui/input";
import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
}

export function FileUpload({ value, onChange, accept }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Determine which endpoint to use based on accept prop
  const endpoint = accept?.startsWith('video/') ? 'videoUploader' : 'imageUploader';

  const { startUpload } = useUploadThing(endpoint);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error state
    setError(null);
    setIsUploading(true);

    try {
      // Check file size (example: 512MB limit for videos)
      const maxSize = accept?.startsWith('video/') ? 512 * 1024 * 1024 : 4 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File size too large');
      }

      const res = await startUpload([file]);
      if (res?.[0]?.url) {
        onChange(res[0].url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Failed to upload file');
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <Input
        type="file"
        onChange={handleFileChange}
        accept={accept}
        disabled={isUploading}
        className={cn(
          "cursor-pointer",
          error && "border-red-500"
        )}
      />
      {isUploading && (
        <div className="mt-2 text-sm text-muted-foreground">
          Uploading... Please wait
        </div>
      )}
      {error && (
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>
      )}
      {value && !isUploading && !error && (
        <div className="mt-2 text-sm text-green-500">
          File uploaded successfully
        </div>
      )}
    </div>
  );
} 