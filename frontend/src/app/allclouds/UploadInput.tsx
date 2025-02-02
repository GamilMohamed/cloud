import ImageUploader from "@/components/putain/ImageUploader";
import { useRouter } from "next/navigation";

export function UploadPagex() {
  const router = useRouter();

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result as string;
      sessionStorage.setItem("uploadedImage", imageUrl);
      router.push("/crop");
    };
    reader.readAsDataURL(file);
  };

  return <ImageUploader onFileSelect={handleFileSelect} />;
}
