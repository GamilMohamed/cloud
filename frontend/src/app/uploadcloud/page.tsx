"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  ImageIcon,
  RotateCcw,
  FlipHorizontal,
  Save,
  Expand,
  Download,
  RefreshCcw,
  Upload,
  PlusIcon,
  MinusIcon,
} from "lucide-react";
import DrawingCanvas from "./DrawingCanvas";
import { useAuth } from "../contexts/AuthContext";

const ASPECT_RATIOS = [
  { value: 16 / 9, label: "Landscape" },
  { value: 1 / 1, label: "Square" },
  { value: 9 / 16, label: "Portrait" },
];

export default function ImageCropper() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [ratio, setRatio] = useState<number>(16 / 9);
  const cropperRef = useRef<Cropper>(null);

  const { user, loading } = useAuth();
  
  useEffect(() => {
	  if (cropperRef.current) {
		  cropperRef.current.cropper.setAspectRatio(ratio);
		}
	}, [ratio]);

	console.log(user);
  
	if (loading) {
	  return <p>Loading...</p>;
	}
  
	if (!user) {
	  return (
		<p>
		  You need to be logged in to upload a cloud.{" "}
		  <a href="http://localhost:3000/api/auth/signin?callbackUrl=http://localhost:4000/uploadcloud">
			Click here to sign in
		  </a>
		</p>
	  );
	}

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRatio = () => {
    const currentIndex = ASPECT_RATIOS.findIndex((r) => r.value === ratio);
    const nextIndex = (currentIndex + 1) % ASPECT_RATIOS.length;
    setRatio(ASPECT_RATIOS[nextIndex].value);
  };

  const handleRotate = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.rotate(90);
      // Reset zoom and position after rotation to ensure proper fitting
      cropper.zoomTo(0);
      //   cropper.reset()
    }
  };

  const handleMirror = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.scaleX(-cropper.getData().scaleX || 1);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas({
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: "#fff",
      });
      setCroppedImage(croppedCanvas.toDataURL());
      handleDownload(croppedCanvas.toDataURL());
      //
    }
  };

  const handleDownload = (url: string) => {
    if (url) {
      const link = document.createElement("a");
      link.download = "cropped-image.png";
      link.href = url;
      link.click();
    }
  };

  const handleReset = () => {
    if (cropperRef.current) {
      cropperRef.current.cropper.reset();
    }
  };

  const handlePlus = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.zoom(0.1);
    }
  };

  const handleMinus = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      cropper.zoom(-0.1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {(!preview && (
          <Card className="border-2 border-dashed border-gray-200 bg-white/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center p-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
              <Label
                htmlFor="image-upload"
                className="cursor-pointer text-center"
              >
                <span className="block text-lg font-medium text-gray-700 mb-2">
                  Upload an image
                </span>
                <span className="text-sm text-gray-500">
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
        )) || (
          <div className="space-y-6">
            {!croppedImage && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="relative rounded-lg overflow-hidden bg-gray-50">
                    <Cropper
                      src={preview}
                      style={{ width: "100%", height: 580 }}
                      initialAspectRatio={ratio}
                      aspectRatio={ratio}
                      guides={true}
                      ref={cropperRef}
                      viewMode={1}
                      background={true}
                      autoCropArea={1}
                      responsive={true}
                      restore={true}
                      checkOrientation={false}
                      cropBoxResizable={true}
                      dragMode="move"
                      toggleDragModeOnDblclick={false}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center mt-4">
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="gap-2"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Reset
                    </Button>

                    <Button
                      onClick={handleRatio}
                      variant="outline"
                      className="gap-2"
                    >
                      <Expand className="w-4 h-4" />
                      {ASPECT_RATIOS.find((r) => r.value === ratio)?.label}
                    </Button>
                    <Button
                      onClick={handleRotate}
                      variant="outline"
                      className="gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Rotate
                    </Button>
                    <Button
                      onClick={handlePlus}
                      variant="outline"
                      className="gap-2"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleMinus}
                      variant="outline"
                      className="gap-2"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={handleMirror}
                      variant="outline"
                      className="gap-2"
                    >
                      <FlipHorizontal className="w-4 h-4" />
                      Flip
                    </Button>
                    <Button onClick={handleCrop} className="gap-2">
                      <Save className="w-4 h-4" />
                      Crop Image
                    </Button>
                    <Button
                      onClick={() => {
                        // setPreview(null)
                        setCroppedImage(null);
                      }}
                      variant={null}
                      className=""
                    >
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer text-center "
                      >
                        <Upload className="w-8 h-8" />
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {croppedImage && (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <DrawingCanvas imageUrl={croppedImage} />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
