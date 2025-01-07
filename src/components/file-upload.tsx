"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ImageIcon, Loader2, X } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "~/utils/uploadthing";

interface FileUploadProps {
  onChange: (url: string) => void;
  value: string;
}

export function FileUpload({ onChange, value }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        {value ? (
          <div className="relative aspect-video w-[200px] overflow-hidden rounded-md">
            <Image
              src={value}
              alt="Upload"
              fill
              className="object-cover"
            />
            <button
              onClick={() => onChange("")}
              className="absolute right-2 top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-md border border-dashed p-4">
            {isUploading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <p className="text-sm text-muted-foreground">
                  Upload a cover image
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {!value && (
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            onChange(res?.[0]?.url || "");
            setIsUploading(false);
          }}
          onUploadBegin={() => {
            setIsUploading(true);
          }}
          onUploadError={(error: Error) => {
            console.error(error);
            setIsUploading(false);
          }}
        />
      )}
    </div>
  );
} 