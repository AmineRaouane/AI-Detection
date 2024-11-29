import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
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
import { FlipWords } from "@/components/ui/flip-words";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FeatureCard } from "@/components/features/FeatureCard"
import { Bot, Loader2 } from "lucide-react";

const benefits = [
    {
      title: "Seamless Tech Stack Integration",
      description: "Integrate APIs seamlessly with your existing tech stack for productive execution of image transformations, optimisations, and deliveries."
    },
    {
      title: "Leverage AI to Save Time",
      description: "AI-built features help conform to the user requests for accurate transformations and produce quality results in seconds."
    },
    {
      title: "Smart Automation",
      description: "Machine learning and AI trained datasets to perform automated transformations on diverse image formats like PNG, JPG, JPEG, WEB, HEIC",
    },
    {
        title: "Global Content Delivery Network",
        description: "Use our powerful CDN to reduce image load time and deliver optimised images at a lightening fast speed across the globe.",
      }
  ]
const features = [
    {
      id: "upload",
      title: "Upload files",
      description: "Streamline your images on a single platform by uploading and storing them in bulk"
    },
    {
      id: "transform",
      title: "Transform Images",
      description: "Automatically optimize your images with our real-time transformations"
    },
    {
      id: "deliver",
      title: "Deliver Content",
      description: "Download the image data in a CSV or ZIP format and share across your channels easily"
    }
  ]
const words = ["know", "detect", "determine", "verify"];

export function Info() {
  const [activeTab, setActiveTab] = useState("upload")
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
    <Card className="p-6 bg-inherit border-gray-500/20 flex flex-col items-center justify-items-center gap-3">
      <CardHeader className="flex flex-col items-center justify-items-center">
        <div className="text-3xl font-bold bg-clip-text mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-600">How it works</div>
        <div className="text-5xl sm:text-5xl font-bold  text-white mb-4">
            Effortlessly
            <FlipWords words={words} className="text-white"/>
        </div>
        <div className="text-5xl sm:text-5xl font-bold  text-white mb-4">
            the content authenticity
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
                {activeTab}
            </div>

            <div className="space-y-6">
              {features.map((feature) => (
                <Card
                className={cn(
                  "backdrop-blur-sm border-none cursor-pointer transition-all duration-300 bg-inherit",
                  activeTab === feature.id && "border-muted bg-white/10 shadow-lg scale-[1.02]"
                )}
                onClick={() => setActiveTab(feature.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
              ))}
            </div>
          </div>
      </CardContent>
    </Card>
{/*  */}
<Card className="p-6 bg-inherit border-none gap-3 flex flex-col items-center justify-items-center">
      <CardHeader className="flex flex-col items-center justify-items-center">
        <div className="text-3xl font-bold bg-clip-text mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Why choose Us</div>
        <div className="text-5xl sm:text-5xl font-bold text-transparent bg-clip-text text-white mb-4">
            Achieve the most accurate content detection
        </div>
      </CardHeader>
      <CardContent className="grid md:grid-rows-2 md:grid-cols-2 gap-12 items-center">
            {benefits.map((Benefit) => (
                <div className="flex flex-row gap-4 items-center">
                    <Card className= "bg-inherit backdrop-blur-sm border-muted h-full w-1/4 cursor-pointer transition-all duration-300">

                    </Card>
                    <Card className= "bg-inherit backdrop-blur-sm border-muted h-full cursor-pointer transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="text-xl text-white">{Benefit.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{Benefit.description}</p>
                        </CardContent>
                    </Card>
              </div>
              ))}
      </CardContent>
    </Card>
    </div>
  );
}
