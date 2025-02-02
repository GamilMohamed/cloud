import { ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UploadCardProps {
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function UploadCard({ onFileChange }: UploadCardProps) {
	return (
		<Card className="border-2 border-dashed border-gray-200 bg-white/50 backdrop-blur-sm text-red-400 max-w-3xl mx-auto w-[200px]  sm:w-[300px] flex justify-center items-center">
			<CardContent className="flex flex-col items-center justify-center p-4 sm:p-12">
				<ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mb-4" />
				<Label htmlFor="image-upload" className="cursor-pointer text-center">
					<span className="block text-base sm:text-lg font-medium text-gray-700 mb-2">
						Upload an image
					</span>
					<span className="text-xs sm:text-sm text-gray-500">
						Drop your image here or click to browse
					</span>
				</Label>
				<Input
					id="image-upload"
					type="file"
					accept="image/*"
					onChange={onFileChange}
					className="hidden"
				/>
			</CardContent>
		</Card>
	);
}