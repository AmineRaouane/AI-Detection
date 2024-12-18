import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { VideoIcon, CircleX, FileVideo } from 'lucide-react';

function VideoContent({
  video,
  setVideo,
  uploadProgress,
  setUploadProgress,
}: {
  video: File | null;
  setVideo: (file: File | null) => void;
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  setResult:() => void;
}) {
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setVideo(file);
  };

  const handleCancel = () => {
    setVideo(null);
    setUploadProgress(0);
    setResult(null);
  };

  return (
    <div className="gap-y-2 flex-col">
      <div className="border-2 border-dashed bg-gray-900/50 h-[300px] flex justify-center items-center border-gray-700 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="video/*"
          className="hidden"
          id="video-upload"
          onChange={handleVideoUpload}
        />
        <label
          htmlFor="video-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <VideoIcon className="h-12 w-12 text-gray-400 mb-4" />
          <span className="text-gray-400">Drop a video file here or click to upload</span>
        </label>
      </div>
      {video && (
        <div className="border-2 border-dashed bg-gray-900/50 h-[100px] flex justify-between items-center border-gray-700 rounded-lg p-4 text-center">
          <FileVideo className="text-white bg-inherit rounded-full" />
          <div className="h-full flex flex-col gap-1 w-full">
            <div className="flex justify-between text-white">
              <span>{video.name}</span>
              <span>{(video.size / 1024).toFixed(2)} KB</span>
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

export default VideoContent;
