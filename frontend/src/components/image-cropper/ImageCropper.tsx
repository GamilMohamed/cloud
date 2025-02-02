"use client";
import { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { UploadCard } from "./UploadCard";
import { CropperView } from "./CropperView";
import { Card, CardContent } from "@/components/ui/card";
import DrawingCanvas from "../../app/uploadcloud/DrawingCanvas";
import { useAuth } from "../../app/contexts/AuthContext";
const ASPECT_RATIOS = [
	{ value: 2 / 1, label: "Landscape" },
	{ value: 1 / 1, label: "Square" },
];

export default function ImageCropper() {
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [croppedImage, setCroppedImage] = useState<string | null>(null);
	const [ratio, setRatio] = useState<number>(2 / 1);
	const cropperRef = useRef<Cropper>(null);
	const { user, loading } = useAuth();

	useEffect(() => {
		if (cropperRef.current) {
			cropperRef.current.cropper.setAspectRatio(ratio);
		}
	}, [ratio]);

	// if (loading) {
	// 	return <p>Loading...</p>;
	// }

	if (!user) {
		return (
			<p className="text-center p-4">
				You need to be logged in to upload a cloud.{" "}
				<a href="/api/auth/signin?callbackUrl=/uploadcloud" className="text-blue-500 hover:underline">
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
			cropperRef.current.cropper.rotate(90);
			cropperRef.current.cropper.zoomTo(0);
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
			const url = croppedCanvas.toDataURL();
			setCroppedImage(url);
			handleDownload(url);
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

	const handleZoomIn = () => {
		if (cropperRef.current) {
			cropperRef.current.cropper.zoom(0.1);
		}
	};

	const handleZoomOut = () => {
		if (cropperRef.current) {
			cropperRef.current.cropper.zoom(-0.1);
		}
	};

	return (
		<div className="w-full max-w-6xl mx-auto p-4">
			{!preview && <UploadCard onFileChange={handleFileChange} />}

			{preview && !croppedImage && (
				<CropperView
					preview={preview}
					ratio={ratio}
					cropperRef={cropperRef}
					onReset={handleReset}
					onRatio={handleRatio}
					onRotate={handleRotate}
					onZoomIn={handleZoomIn}
					onZoomOut={handleZoomOut}
					onMirror={handleMirror}
					onCrop={handleCrop}
					onFileChange={handleFileChange}
					currentRatio={ASPECT_RATIOS.find((r) => r.value === ratio)!}
				/>
			)}

			{croppedImage && (
				<Card className="bg-white/80 backdrop-blur-sm w-full max-w-3xl mx-auto">
					<CardContent className="p-3 sm:p-6">
						<DrawingCanvas imageUrl={croppedImage} />
					</CardContent>
				</Card>
			)}
		</div>
	);
}