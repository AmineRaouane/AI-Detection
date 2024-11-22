import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Loader2 } from "lucide-react";

export function Info() {

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Content Analysis</h2>
        <Textarea
          placeholder="Paste your content here..."
          className="min-h-[200px] mb-4 bg-white/10 border-purple-500/20 text-white"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={analyzeContent}
          disabled={!content || loading}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Bot className="mr-2 h-4 w-4" />
          )}
          {loading ? "Analyzing..." : "Analyze Content"}
        </Button>

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-2">Result</h3>
            <p className="text-gray-300">
              This content is likely{" "}
              <span className={result.isAI ? "text-red-400" : "text-green-400"}>
                {result.isAI ? "AI-generated" : "human-written"}
              </span>{" "}
              with {result.confidence.toFixed(1)}% confidence.
            </p>
          </div>
        )}
      </Card> */}
    <Card className="p-6 bg-inherit border-gray-500/20 flex flex-col items-center justify-items-center">
      <CardHeader className="flex flex-col items-center justify-items-center">
        <div className="text-2xl font-bold text-white mb-4">How it works</div>
        <div className="text-5xl sm:text-5xl font-bold text-transparent bg-clip-text text-white mb-4">Effortlessly know the content authenticity</div>
      </CardHeader>
      <CardContent className="w-full">
        <Tabs defaultValue="input" className="w-full flex flex-row-reverse">
        <TabsList className="w-1/2 flex flex-col h-auto bg-inherit">
          <TabsTrigger value="input" className="bg-white flex flex-col">
            <h1>Input</h1>
            <p className="shrink-0">Streamline your images on a single platform by uploading and storing them in bulk</p>
          </TabsTrigger>
          <TabsTrigger value="analyse" className="bg-white flex flex-col">
            <h1>Input</h1>
            <p className="shrink-0">Streamline your images on a single platform by uploading and storing them in bulk</p>
          </TabsTrigger>
          <TabsTrigger value="result" className="bg-white flex flex-col">
            <h1>Input</h1>
            <p className="shrink-0">Streamline your images on a single platform by uploading and storing them in bulk</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="input" className="w-2/5 grow">
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500">Hello</div>
        </TabsContent>
        <TabsContent value="analyse" className="w-2/5 grow">
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500">Hello</div>
        </TabsContent>
        <TabsContent value="result" className="w-2/5 grow">
          <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500">Hello</div>
        </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
    </div>
  );
}
