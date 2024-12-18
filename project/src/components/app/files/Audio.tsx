import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AudioWaveformIcon, CircleX, FileAudio } from 'lucide-react';

function AudioContent({
  audio,
  setAudio,
  uploadProgress,
  setUploadProgress,
}: {
  audio: File | null;
  setAudio: (file: File | null) => void;
  uploadProgress: number;
  setUploadProgress: (progress: number) => void;
  setResult:() => void;
}) {
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAudio(file);
  };

  const handleCancel = () => {
    setAudio(null);
    setUploadProgress(0);
    setResult(null);
  };

  return (
    <div className="gap-y-2 flex-col">
      <div className="border-2 border-dashed bg-gray-900/50 h-[300px] flex justify-center items-center border-gray-700 rounded-lg p-8 text-center">
        <input
          type="file"
          accept="audio/*"
          className="hidden"
          id="audio-upload"
          onChange={handleAudioUpload}
        />
        <label
          htmlFor="audio-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <AudioWaveformIcon className="h-12 w-12 text-gray-400 mb-4" />
          <span className="text-gray-400">Drop an audio file here or click to upload</span>
        </label>
      </div>
      {audio && (
        <div className="border-2 border-dashed bg-gray-900/50 h-[100px] flex justify-between items-center border-gray-700 rounded-lg p-4 text-center">
          <FileAudio className="text-white bg-inherit rounded-full" />
          <div className="h-full flex flex-col gap-1 w-full">
            <div className="flex justify-between text-white">
              <span>{audio.name}</span>
              <span>{(audio.size / 1024).toFixed(2)} KB</span>
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

export default AudioContent;
