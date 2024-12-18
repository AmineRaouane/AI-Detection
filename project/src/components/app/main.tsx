import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ScanIcon } from 'lucide-react';
import TextContent from '@/components/app/files/Text';
import ImageContent from '@/components/app/files/Image';
import AudioContent from '@/components/app/files/Audio';
import VideoContent from '@/components/app/files/Video';

export function Detector() {
  const [result, setResult] = useState<string | null>(null);
  const [content, setContent] = useState<string>(''); // Text content
  const [image, setImage] = useState<File | null>(null); // Image content
  const [audio, setAudio] = useState<File | null>(null); // Audio content
  const [video, setVideo] = useState<File | null>(null); // Video content
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleAnalyze = () => {
    const results = ['AI Generated', 'Human Created'];
    setResult(results[Math.floor(Math.random() * results.length)]);
  };

  const handleTabSwitch = () => {
    setResult(null);
    setContent('');
    setImage(null);
    setAudio(null);
    setVideo(null);
  };

  const isAnalyzeEnabled = content.trim() || image || audio || video;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
            AI Content Detector
          </h1>
          <p className="text-gray-400">
            Analyze content to determine if it's AI-generated or human-created
          </p>
        </header>

        <div className="bg-gray-800/50 border-gray-700 rounded-lg p-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid grid-cols-4 gap-4 bg-gray-900/50 p-1">
              <TabsTrigger value="text" className="data-[state=active]:bg-cyan-500" onClick={handleTabSwitch}>
                Text
              </TabsTrigger>
              <TabsTrigger value="image" className="data-[state=active]:bg-cyan-500" onClick={handleTabSwitch}>
                Image
              </TabsTrigger>
              <TabsTrigger value="audio" className="data-[state=active]:bg-cyan-500" onClick={handleTabSwitch}>
                Audio
              </TabsTrigger>
              <TabsTrigger value="video" className="data-[state=active]:bg-cyan-500" onClick={handleTabSwitch}>
                Video
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="text">
                <TextContent content={content} setContent={setContent} />
              </TabsContent>
              <TabsContent value="image">
                <ImageContent
                  image={image}
                  setImage={setImage}
                  uploadProgress={uploadProgress}
                  setUploadProgress={setUploadProgress}
                  setResult={setResult}
                />
              </TabsContent>
              <TabsContent value="audio">
                <AudioContent
                  audio={audio}
                  setAudio={setAudio}
                  uploadProgress={uploadProgress}
                  setUploadProgress={setUploadProgress}
                  setResult={setResult}
                />
              </TabsContent>
              <TabsContent value="video">
                <VideoContent
                  video={video}
                  setVideo={setVideo}
                  uploadProgress={uploadProgress}
                  setUploadProgress={setUploadProgress}
                  setResult={setResult}
                />
              </TabsContent>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              <Button
                onClick={handleAnalyze}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                disabled={!isAnalyzeEnabled}
              >
                <ScanIcon className="mr-2 h-4 w-4" />
                Analyze Content
              </Button>

              {result && (
                <div
                  className={`w-full p-4 rounded-lg text-center font-semibold ${
                    result === 'AI Generated'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  Result: {result}
                </div>
              )}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
