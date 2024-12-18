import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ImageIcon, CircleX, FileImage } from 'lucide-react';

function ImageContent({
  image,
  setImage,
  uploadProgress,
  setUploadProgress,
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
        <div className="border-2 border-dashed bg-gray-900/50 h-[100px] flex justify-between items-center border-gray-700 rounded-lg p-4 text-center">
          <FileImage className="text-white bg-inherit rounded-full" />
          <div className="h-full flex flex-col gap-1 w-full">
            <div className="flex justify-between text-white">
              <span>{image.name}</span>
              <span>{(image.size / 1024).toFixed(2)} KB</span>
            </div>
            <Progress
              value={uploadProgress}
              className="transition-all duration-300"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:text-red-600 hover:bg-inherit rounded-full"
            onClick={handleCancel}
          >
            <CircleX />
          </Button>
        </div>
      )}
    </div>
  );
}

export default ImageContent;
