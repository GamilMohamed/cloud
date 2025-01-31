import { ImageIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input"


interface UploadImgType {
    handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadImg = ({ handleUpload }: UploadImgType) => {
    return (
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
                    onChange={handleUpload}
                    className="hidden"
                />
            </CardContent>
        </Card>
    )
};

export default UploadImg;