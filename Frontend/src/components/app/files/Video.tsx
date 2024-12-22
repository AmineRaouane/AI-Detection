import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { VideoIcon, CircleX, FileVideo } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    setResult: () => void;
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
                <div
                    key={"file"}
                    className={cn(
                        "relative overflow-hidden z-40 bg-gray-900/50 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto border-gray-700 rounded-lg",
                        "shadow-sm"
                    )}
                >
                    <div className="flex justify-between w-full items-center gap-4">
                        <p className="text-white truncate max-w-xs">
                            {video.name}
                        </p>
                        <p className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-white shadow-input">
                            {(video.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                    </div>

                    <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-400">
                        <p className="px-1 py-0.5 rounded-md bg-gray-600/50 ">
                            {video.type}
                        </p>

                        <p>
                            modified {new Date(video.lastModified).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            )}

        </div>
    );
}

export default VideoContent;
