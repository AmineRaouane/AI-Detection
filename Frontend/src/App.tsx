import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from "@/components/ui/progress"
import { ImageIcon,
         FileTextIcon,
         AudioWaveformIcon,
         VideoIcon,
         ScanIcon,
         CircleX,
         FileImage
} from 'lucide-react';
import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [content, setContent] = useState<string>(''); // Text content
  const [image, setImage] = useState<File | null>(null); // Image content
  const [audio, setAudio] = useState<File | null>(null); // Audio content
  const [video, setVideo] = useState<File | null>(null); // Video content
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleAnalyze = () => {
    const results = ['AI Generated', 'Human Created'];
    setResult(results[Math.floor(Math.random() * results.length)]);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);

    try {
      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };

      // Handle completion
      xhr.onload = () => {
        if (xhr.status === 200) {
          setUploadProgress(100);
          // Handle successful upload
        }
      };

      // Handle errors
      xhr.onerror = () => {
        setUploadProgress(0);
        // Handle error
      };

      // Replace with your actual upload endpoint
      xhr.open('POST', '/api/upload');
      xhr.send(formData);

    } catch (error) {
      console.error('Upload failed:', error);
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setUploadProgress(0);
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

        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="p-6">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid grid-cols-4 gap-4 bg-gray-900/50 p-1">
                <TabsTrigger value="text" className="data-[state=active]:bg-cyan-500">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="image" className="data-[state=active]:bg-cyan-500">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Image
                </TabsTrigger>
                <TabsTrigger value="audio" className="data-[state=active]:bg-cyan-500">
                  <AudioWaveformIcon className="mr-2 h-4 w-4" />
                  Audio
                </TabsTrigger>
                <TabsTrigger value="video" className="data-[state=active]:bg-cyan-500">
                  <VideoIcon className="mr-2 h-4 w-4" />
                  Video
                </TabsTrigger>
              </TabsList>

              <div className="mt-8">
                <TabsContent value="text">
                  <Textarea
                    placeholder="Enter your text here to analyze..."
                    className="min-h-[300px] max-h-[300px] bg-gray-900/50 border-gray-700 text-gray-100"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </TabsContent>

                <TabsContent value="image" className="gap-y-2 flex-col">
                    <div className="border-2 border-dashed bg-gray-900/50 h-[300px] flex justify-center items-center border-gray-700 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden w-full h-full"
                          id="image-upload"
                          onChange={handleImageUpload}
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                          <span className="text-gray-400">
                            Drop an image here or click to upload
                          </span>
                        </label>
                    </div>
                      {image && (
                        <div className="border-2 border-dashed bg-gray-900/50 h-[100px] flex justify-around items-center border-gray-700 rounded-lg p-8 text-center">
                          {/* <Button size="icon" className="text-white bg-inherit rounded-full"> */}
                            <FileImage className="text-white bg-inherit rounded-full"/>
                          {/* </Button> */}
                          <div className="h-full flex flex-col gap-1 w-fit min-w-[80%]">
                            <div className="flex text-white justify-between">
                              <div>{image.name}</div>
                              <div>{(image.size / 1024).toFixed(2)} KB</div>
                            </div>
                            <div>
                              <Progress
                                value={uploadProgress}
                                className="transition-all duration-300"
                              />
                            </div>
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
                </TabsContent>

                <TabsContent value="audio">
                  <div className="border-2 border-dashed bg-gray-900/50 h-[300px] flex justify-center items-center border-gray-700 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      id="audio-upload"
                      onChange={(e) => setAudio(e.target.files?.[0] || null)}
                    />
                    <label
                      htmlFor="audio-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <AudioWaveformIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-gray-400">
                        Drop an audio file here or click to upload
                      </span>
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="video">
                  <div className="border-2 border-dashed bg-gray-900/50 h-[300px] flex justify-center items-center border-gray-700 rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      id="video-upload"
                      onChange={(e) => setVideo(e.target.files?.[0] || null)}
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <VideoIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-gray-400">
                        Drop a video file here or click to upload
                      </span>
                    </label>
                  </div>
                </TabsContent>

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
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
