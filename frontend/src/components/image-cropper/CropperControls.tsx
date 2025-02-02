import { Button } from "@/components/ui/button";
import {
	RotateCcw,
	FlipHorizontal,
	Save,
	Expand,
	RefreshCcw,
	Upload,
	PlusIcon,
	MinusIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CropperControlsProps {
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

export function CropperControls({
	onReset,
	onRatio,
	onRotate,
	onZoomIn,
	onZoomOut,
	onMirror,
	onCrop,
	onFileChange,
	currentRatio,
}: CropperControlsProps) {
	return (
		<div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-4">
			<Button onClick={onReset} variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm">
				<RefreshCcw className="w-3 h-3 sm:w-4 sm:h-4" />
				<span className="hidden sm:inline">Reset</span>
			</Button>

			<Button onClick={onRatio} variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm">
				<Expand className="w-3 h-3 sm:w-4 sm:h-4" />
				{currentRatio.label}
			</Button>

			<Button onClick={onRotate} variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm">
				<RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
				<span className="hidden sm:inline">Rotate</span>
			</Button>

			<Button onClick={onZoomIn} variant="outline" className="p-2 sm:p-3">
				<PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
			</Button>

			<Button onClick={onZoomOut} variant="outline" className="p-2 sm:p-3">
				<MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
			</Button>

			<Button onClick={onMirror} variant="outline" className="gap-1 sm:gap-2 text-xs sm:text-sm">
				<FlipHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
				<span className="hidden sm:inline">Flip</span>
			</Button>

			<Button onClick={onCrop} className="gap-1 sm:gap-2 text-xs sm:text-sm">
				<Save className="w-3 h-3 sm:w-4 sm:h-4" />
				Crop
			</Button>

			<Button variant="outline" className="p-2 sm:p-3">
				<Label htmlFor="image-upload" className="cursor-pointer">
					<Upload className="w-4 h-4 sm:w-6 sm:h-6" />
				</Label>
				<Input
					id="image-upload"
					type="file"
					accept="image/*"
					onChange={onFileChange}
					className="hidden"
				/>
			</Button>
		</div>
	);
}