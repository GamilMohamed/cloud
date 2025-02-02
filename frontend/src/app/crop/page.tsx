"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageCropper from "@/components/putain/ImageCropper";

export default function CropPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedImage = sessionStorage.getItem('uploadedImage');
    if (!storedImage) {
      router.replace('/upload');
      return;
    }
    setImageUrl(storedImage);
  }, [router]);

  const handleCrop = (croppedImage: string) => {
    sessionStorage.setItem('croppedImage', croppedImage);
    sessionStorage.removeItem('uploadedImage'); // Clean up
    router.push('/draw');
  };

  const handleCancel = () => {
    sessionStorage.removeItem('uploadedImage');
    router.replace('/allclouds');
  };

  if (!imageUrl) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Crop Your Image</h1>
      <ImageCropper
        imageUrl={imageUrl}
        onCrop={handleCrop}
        onCancel={handleCancel}
      />
    </div>
  );
}