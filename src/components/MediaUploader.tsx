"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, X, Loader2, Image as ImageIcon, Film, Play } from "lucide-react";

interface MediaUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept: "image" | "video" | "both";
  helperText?: string;
}

export default function MediaUploader({
  label,
  value,
  onChange,
  accept,
  helperText,
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptString = () => {
    if (accept === "image") return "image/*";
    if (accept === "video") return "video/*";
    return "image/*,video/*";
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload file");
      }

      const data = await response.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fileType = file.type;

      if (accept === "image" && !fileType.startsWith("image/")) {
        setError("Please drop an image file.");
        return;
      }
      if (accept === "video" && !fileType.startsWith("video/")) {
        setError("Please drop a video file.");
        return;
      }
      handleUpload(file);
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  const isVideoUrl = (url: string) => {
    return (
      url.endsWith(".mp4") ||
      url.endsWith(".webm") ||
      url.endsWith(".ogg") ||
      url.includes("/uploads/") && !url.match(/\.(jpg|jpeg|png|gif|webp)/i)
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase"
          >
            <X className="w-3 h-3" /> Clear Media
          </button>
        )}
      </div>

      {!value ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={triggerInput}
          className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-[#C8860A] bg-[#C8860A]/5 scale-[0.99]"
              : "border-gray-300 hover:border-[#C8860A] bg-gray-50 hover:bg-gray-100/50"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={getAcceptString()}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center justify-center text-center space-y-2 py-4">
              <Loader2 className="w-8 h-8 text-[#C8860A] animate-spin" />
              <p className="text-sm font-bold text-[#1B3A5C]">Uploading file...</p>
              <p className="text-xs text-gray-400">Processing and saving to disk...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-2 py-2">
              <UploadCloud className="w-10 h-10 text-gray-400 group-hover:text-[#C8860A] transition-colors" />
              <p className="text-sm font-bold text-[#1B3A5C] transition-colors">
                Drag & drop, or <span className="text-[#C8860A]">browse files</span>
              </p>
              <p className="text-xs text-gray-400">
                {helperText || `Supports ${accept === "both" ? "images & videos" : accept + "s"} up to 50MB`}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-gray-900 group shadow-inner">
          {/* Preview image or video */}
          {accept === "video" || isVideoUrl(value) ? (
            <div className="relative aspect-video w-full flex items-center justify-center bg-black">
              <video
                src={value}
                controls
                muted
                loop
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-[#C8860A] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full flex items-center gap-1.5 shadow-md">
                <Film className="w-3 h-3" /> Video Preview
              </div>
            </div>
          ) : (
            <div className="relative aspect-video w-full flex items-center justify-center bg-gray-50/50">
              <img
                src={value}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#1B3A5C] text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-full flex items-center gap-1.5 shadow-md">
                <ImageIcon className="w-3 h-3" /> Image Preview
              </div>
            </div>
          )}

          {/* Overlay info */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={triggerInput}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md backdrop-blur-sm"
            >
              Replace File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={getAcceptString()}
              className="hidden"
            />
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs font-semibold mt-2">{error}</p>
      )}

      {/* Manual link input as secondary option for convenience */}
      {value && (
        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-[10px] font-mono text-gray-400 shrink-0 select-all overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
            File URL: <span className="text-gray-600 font-bold">{value}</span>
          </span>
        </div>
      )}
    </div>
  );
}
