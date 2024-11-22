import { Bot, Sparkles } from "lucide-react";
import { Button } from "./button";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="relative z-10">
          <h1 className="text-7xl sm:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
            AI Content Detection
            <br />
            Made Simple
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Advanced machine learning algorithms to detect AI-generated content with
            high accuracy. Perfect for educators, publishers, and content managers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => document.querySelector("#detector")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Bot className="mr-2 h-5 w-5" />
              Try it now
            </Button>
            <Button
              size="lg"
              className="border-purple-500/50 bg-white/10 hover:bg-purple-500/10"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
