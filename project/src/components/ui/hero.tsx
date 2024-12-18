import { Bot, Sparkles } from "lucide-react";
import { Button } from "./button";
import { Vortex } from "../ui/vortex";
import { SparklesCore } from "@/components/ui/sparkles";

export function Hero() {
    return (
        <div className="relative overflow-hidden bg-transparent">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center bg-transparent">
                <div className="h-[30rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
                    <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
                        Pragmatia
                    </h1>
                    <div className="w-[40rem] h-40 relative">
                        {/* Gradients */}
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                        {/* Core component */}
                        <SparklesCore
                            background="transparent"
                            minSize={0.4}
                            maxSize={1}
                            particleDensity={1200}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />

                        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                    </div>
                </div>
                <div className="relative z-10">
                    {/* <h1 className="text-8xl sm:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
                        AI Content Detection
                        <br />
                        Made Simple
                    </h1> */}
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
// Vortex
