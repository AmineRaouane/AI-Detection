import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ImageIcon, CircleX, FileImage } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

function ImageContent({
  image,
  setImage,
  uploadProgress,
  setUploadProgress,
  setResult
}: {
  image: File | null;
  setImage: (file: File | null) => void;
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  setResult:() => void;
}) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImage(file);
  };

  const handleCancel = () => {
    setImage(null);
    setUploadProgress(0);
    setResult(null);
  };

  return (
    <div className="gap-y-2 flex-col">
      <div className="border-2 border-dashed bg-gray-900/50 h-[300px] flex justify-center items-center border-gray-700 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageUpload}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
          <span className="text-gray-400">Drop an image here or click to upload</span>
        </label>
      </div>
      {image && (
                <div
                    key={"file"}
                    className={cn(
                        "relative overflow-hidden z-40 bg-gray-900/50 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto border-gray-700 rounded-lg",
                        "shadow-sm"
                    )}
                >
                    <div className="flex justify-between w-full items-center gap-4">
                        <p className="text-white truncate max-w-xs">
                            {image.name}
                        </p>
                        <p className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-white shadow-input">
                            {(image.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-400">
                        <p className="px-1 py-0.5 rounded-md bg-gray-600/50 ">
                            {image.type}
                        </p>

                        <p>
                            modified {new Date(image.lastModified).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )}
    </div>
  );
}

export default ImageContent;
