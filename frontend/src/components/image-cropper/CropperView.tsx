import { Card, CardContent } from "@/components/ui/card";
import Cropper from "react-cropper";
import { CropperControls } from "./CropperControls";
import { RefObject } from "react";

interface CropperViewProps {
	preview: string;
	ratio: number;
	cropperRef: RefObject<Cropper>;
	onReset: () => void;
	onRatio: () => void;
	onRotate: () => void;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onMirror: () => void;
	onCrop: () => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	currentRatio: { label: string };
}

export function CropperView({
	preview,
	ratio,
	cropperRef,
	...controlProps
}: CropperViewProps) {
	return (
		<Card className="bg-white/80 backdrop-blur-sm w-full max-w-3xl mx-auto">
			<CardContent className="p-3 sm:p-6">
				<div className="relative rounded-lg overflow-hidden bg-gray-50">
					<Cropper
						src={preview}
						style={{ width: "100%", height: "40vh", minHeight: "300px", maxHeight: "580px" }}
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
				<CropperControls {...controlProps} />
			</CardContent>
		</Card>
	);
}
