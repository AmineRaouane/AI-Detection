import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScanIcon, LoaderCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import TextContent from "@/components/app/files/Text";
import ImageContent from "@/components/app/files/Image";
import AudioContent from "@/components/app/files/Audio";
import VideoContent from "@/components/app/files/Video";

export function Detector() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<string>("text");

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let endpoint = "";
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {}, // Initialize headers as an object
      };

      const formData = new FormData();

      switch (activeTab) {
        case "text":
          if (!content.trim()) {
            throw new Error("Please enter some text to analyze");
          }
          endpoint = "/upload/text";
          requestOptions.body = JSON.stringify({ file: content.trim() });
          requestOptions.headers = { "Content-Type": "application/json" }; // Set headers as an object
          break;

        case "image":
          if (!image) {
            throw new Error("Please select an image to analyze");
          }
          endpoint = "/detect/image";
          formData.append("file", image);
          requestOptions.body = formData;
          break;

        case "audio":
          if (!audio) {
            throw new Error("Please select an audio file to analyze");
          }
          endpoint = "/upload/audio";
          formData.append("file", audio);
          requestOptions.body = formData;
          break;

        case "video":
          if (!video) {
            throw new Error("Please select a video file to analyze");
          }
          endpoint = "/upload/video";
          formData.append("file", video);
          requestOptions.body = formData;
          break;

        default:
          throw new Error("Invalid content type");
      }

      const response = await fetch(
        `http://127.0.0.1:8000${endpoint}`,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze content");
      }

      const responseData = await response.json();
      setResult(responseData.data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error analyzing content:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabSwitch = (tab: string) => {
    setActiveTab(tab);
    setResult(null);
    setError(null);
    setContent("");
    setImage(null);
    setAudio(null);
    setVideo(null);
  };

  const isAnalyzeEnabled =
    !loading && (content.trim() || image || audio || video);

  const getResultDisplay = () => {
    if (error) {
      return (
        <div className="w-full p-4 rounded-lg text-center font-semibold bg-red-500/20 text-red-400">
          Error: {error}
        </div>
      );
    }

    if (result) {
      const isAIGenerated = result.label.toUpperCase() === "FAKE";

      return (
        <div
          className={`w-full p-4 rounded-lg text-center font-semibold ${
            isAIGenerated
              ? "bg-red-500/20 text-red-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          <div className="text-lg">
            {isAIGenerated ? "AI Generated" : "Human Generated"}
          </div>
          <div className="text-sm mt-2">
            Confidence: {(result.score * 100).toFixed(2)}%
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-inherit text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-normal overflow-visible">
            AI Content Detector
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Analyze content to determine if it's AI-generated or human-created
          </p>
        </div>

        <Card className="bg-inherit border-purple-500/20 backdrop-blur-lg hover:border-purple-500/40 transition-all rounded-lg p-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid grid-cols-4 gap-4 bg-gray-900/50 p-1">
              <TabsTrigger
                value="text"
                className="data-[state=active]:bg-purple-500 text-white"
                onClick={() => handleTabSwitch("text")}
              >
                Text
              </TabsTrigger>
              <TabsTrigger
                value="image"
                className="data-[state=active]:bg-purple-500 text-white"
                onClick={() => handleTabSwitch("image")}
              >
                Image
              </TabsTrigger>
              <TabsTrigger
                value="audio"
                className="data-[state=active]:bg-purple-500 text-white"
                onClick={() => handleTabSwitch("audio")}
              >
                Audio
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-purple-500 text-white"
                onClick={() => handleTabSwitch("video")}
              >
                Video
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="text">
                <TextContent
                  content={content}
                  setContent={setContent}
                  setResult={setResult}
                />
              </TabsContent>
              <TabsContent value="image">
                <ImageContent
                  image={image}
                  setImage={setImage}
                />
              </TabsContent>
              <TabsContent value="audio">
                <AudioContent
                  audio={audio}
                  setAudio={setAudio}
                />
              </TabsContent>
              <TabsContent value="video">
                <VideoContent
                  video={video}
                  setVideo={setVideo}
                />
              </TabsContent>
            </div>

            <div className="mt-6 flex flex-col items-center gap-4">
              <Button
                onClick={handleAnalyze}
                className="w-full bg-purple-500 hover:bg-cyan-600 text-white"
                disabled={!isAnalyzeEnabled}
              >
                {loading ? (
                  <span className="flex items-center">
                    <LoaderCircle className="animate-spin mr-2" />
                    Analyzing...
                  </span>
                ) : (
                  <>
                    <ScanIcon className="mr-2 h-4 w-4" />
                    Analyze Content
                  </>
                )}
              </Button>

              {getResultDisplay()}
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
