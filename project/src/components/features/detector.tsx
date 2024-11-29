import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Bot, Loader2 } from "lucide-react";

export function Detector() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { isAI: boolean; confidence: number }>(null);

  const analyzeContent = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResult({
      isAI: Math.random() > 0.5,
      confidence: Math.random() * 100
    });
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
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
      </Card>
    </div>
  );
}