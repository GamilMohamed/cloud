// src/app/draw/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../app/contexts/AuthContext";
import DrawingCanvas from "@/components/putain/DrawingCanvas";
// import DrawingCanvas from "../uploadcloud/DrawingCanvas";

export default function DrawPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const storedImage = sessionStorage.getItem('croppedImage');
    if (!storedImage) {
      router.replace('/allclouds');
      return;
    }
    setImageUrl(storedImage);
  }, [router]);

  const handleSave = async (drawing: string, answer: string, size: { width: number, height: number }) => {
    try {
      const response = await fetch('http://localhost:3000/api/clouds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          image: imageUrl,
          filter: drawing,
          answer,
          size,
        })
      });

      if (!response.ok) throw new Error('Failed to save image');

      // Clean up
      sessionStorage.removeItem('croppedImage');

      // Redirect to gallery or success page
      router.push('/allclouds');
    } catch (error) {
      console.error('Error saving image:', error);
      // Handle error (show toast notification, etc.)
    }
  };

  const handleCancel = () => {
    sessionStorage.removeItem('croppedImage');
    router.replace('/allclouds');
  };

  if (!imageUrl) return null;

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-2xl font-bold text-center mb-8">Draw On Your Image</h1>
      <DrawingCanvas imageUrl={imageUrl} onSave={handleSave} onCancel={handleCancel} />
      {/* <DrawingCanvas
        imageUrl={imageUrl}
        onSave={handleSave}
        onCancel={handleCancel}
      /> */}
    </div>
  );
}
