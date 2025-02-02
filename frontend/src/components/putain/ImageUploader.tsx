// src/components/putain/ImageUploader.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useEffect } from "react";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../app/contexts/AuthContext";

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.add('border-blue-500');
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-500');
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dropZone.classList.remove('border-blue-500');
      
      if (!checkAuth()) return;
      
      const file = e.dataTransfer?.files[0];
      if (file?.type.startsWith('image/')) {
        onFileSelect(file);
      }
    };

    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('drop', handleDrop);

    return () => {
      dropZone.removeEventListener('dragover', handleDragOver);
      dropZone.removeEventListener('dragleave', handleDragLeave);
      dropZone.removeEventListener('drop', handleDrop);
    };
  }, [onFileSelect]);

  const checkAuth = () => {
    if (!user) {
      router.push("/api/auth/signin?callbackUrl=/upload");
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkAuth()) return;
    
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      ref={dropZoneRef}
	  className="w-[200px] sm:w-[300px] aspect-square flex justify-center items-center">
      <Card className="border-2 border-dashed border-gray-200 bg-white/50 backdrop-blur-sm h-full w-full">
        <CardContent className="flex flex-col items-center justify-center p-12">
          <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
          <Label htmlFor="image-upload" className="cursor-pointer text-center">
            <span className="block text-lg font-medium text-gray-700 mb-2">
              Upload an image
            </span>
            <span className="text-sm text-gray-500 hidden sm:block">
              Drop your image here or click to browse
            </span>
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </CardContent>
      </Card>
    </div>
  );
}
