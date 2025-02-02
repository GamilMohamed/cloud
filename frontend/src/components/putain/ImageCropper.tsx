
// src/components/putain/ImageCropper.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useEffect, useState } from "react";
import Cropper from "react-cropper";
import {
  RefreshCcw,
  Expand,
  RotateCcw,
  FlipHorizontal,
  Save,
} from "lucide-react";
import "cropperjs/dist/cropper.css";

const ASPECT_RATIOS = [
  { value: 2/1, label: "Landscape" },
  { value: 1/1, label: "Square" },
];

interface ImageCropperProps {
  imageUrl: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}

export default function ImageCropper({ imageUrl, onCrop, onCancel }: ImageCropperProps) {
  const cropperRef = useRef<Cropper>(null);
  const [ratio, setRatio] = useState(2/1);

  useEffect(() => {
    if (cropperRef.current) {
      cropperRef.current.cropper.setAspectRatio(ratio);
    }
  }, [ratio]);

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="rounded-lg overflow-hidden bg-gray-50">
          <Cropper
            src={imageUrl}
            style={{ height: 'calc(100vh - 300px)', minHeight: '300px' }}
            initialAspectRatio={ratio}
            aspectRatio={ratio}
            guides={true}
            ref={cropperRef}
            viewMode={1}
            dragMode="move"
            responsive={true}
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <Button onClick={() => cropperRef.current?.cropper.reset()} variant="outline">
            <RefreshCcw className="w-4 h-4 mr-2" />Reset
          </Button>
          <Button onClick={() => {
            const idx = ASPECT_RATIOS.findIndex(r => r.value === ratio);
            setRatio(ASPECT_RATIOS[(idx + 1) % ASPECT_RATIOS.length].value);
          }} variant="outline">
            <Expand className="w-4 h-4 mr-2" />
            {ASPECT_RATIOS.find(r => r.value === ratio)?.label}
          </Button>
          <Button onClick={() => cropperRef.current?.cropper.rotate(90)} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />Rotate
          </Button>
          <Button onClick={() => cropperRef.current?.cropper.scaleX(-1)} variant="outline">
            <FlipHorizontal className="w-4 h-4 mr-2" />Flip
          </Button>
          <Button onClick={() => {
            const canvas = cropperRef.current?.cropper.getCroppedCanvas();
            if (canvas) onCrop(canvas.toDataURL());
          }}>
            <Save className="w-4 h-4 mr-2" />Crop
          </Button>
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
