import { Bot, Sparkles } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { InfiniteCards } from "@/components/features/movingComments";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
  Star,
  StarHalf,
  UserRound,
  BrainCircuit,
  UserCircle,
} from "lucide-react";
import {
  benefits,
  features,
  userComments,
  words,
} from "@/components/data/home";

interface StarRatingProps {
  rating: number;
}
const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex flex-row items-center">
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-star-${index}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <StarHalf className="text-yellow-500" />}
    </div>
  );
};

export function Home() {
  const [activeTab, setActiveTab] = useState(features[0]?.id || "upload");
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = features.findIndex(
          (feature) => feature.id === prevTab
        );
        const nextIndex = (currentIndex + 1) % features.length;
        return features[nextIndex].id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [features]);

  return (
    <>
      <div className="relative overflow-hidden bg-transparent">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center bg-transparent">
          <div className="h-[30rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
            <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
              Pragmatia
            </h1>
            <div className="w-[40rem] h-40 relative">
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
              <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
              <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
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
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Advanced machine learning algorithms to detect AI-generated
              content with high accuracy. Perfect for educators, publishers, and
              content managers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={() =>
                  document
                    .querySelector("#detector")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
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
      <div className="max-w-7xl mx-auto px-4 py-12 gap-6">
        {/*  Features */}
        <Card className="p-6 bg-inherit border-gray-500/20 flex flex-col items-center justify-items-center gap-3">
          <CardHeader className="flex flex-col items-center justify-items-center">
            <div className="text-5xl font-bold bg-clip-text mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              How it works
            </div>
            <div className="text-5xl sm:text-5xl font-bold  text-white mb-4">
              <TypewriterEffectSmooth words={words} />
            </div>
          </CardHeader>
          <CardContent className="w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">{activeTab}</div>

              <div className="space-y-6">
                {features.map((feature) => (
                  <Card
                    className={cn(
                      "backdrop-blur-sm border-none cursor-pointer transition-all duration-300 bg-inherit",
                      activeTab === feature.id &&
                        "border-muted bg-white/10 shadow-lg scale-[1.02]"
                    )}
                    onClick={() => setActiveTab(feature.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Benefits */}
        <Card className="p-6 bg-inherit border-gray-500/20 gap-3 flex flex-col items-center justify-items-center mt-4">
          <CardHeader className="flex flex-col items-center justify-items-center">
            <div className="text-5xl font-bold bg-clip-text mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Why choose Us
            </div>
            <div className="text-5xl sm:text-5xl font-bold text-transparent bg-clip-text text-white mb-4">
              Achieve the most accurate content detection
            </div>
          </CardHeader>
          <CardContent className="grid md:grid-rows-2 md:grid-cols-2 gap-x-2 gap-y-5 items-center">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-row gap-2 items-stretch h-full"
              >
                <Card className="bg-transparent backdrop-blur-sm cursor-pointer transition-all duration-300 flex flex-row items-center min-h-[200px] border border-transparent hover:border-white/20 hover:bg-white/10">
                  <CardHeader className="w-1/3 h-full flex items-center justify-center">
                    <BrainCircuit size={40} color="#ffffff" />
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {benefit.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-60 h-10">
              Get started
            </Button>
          </CardFooter>
        </Card>
        {/*  */}
      </div>
      <InfiniteCards comments={userComments} speed="20s" />
    </>
  );
}
