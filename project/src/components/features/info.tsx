import React, { useState, useEffect } from "react";
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
import { FlipWords } from "@/components/ui/flip-words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
// import { Button } from "@/components/ui/moving-border";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Star, StarHalf, UserRound } from "lucide-react";

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


import img0 from '../images/image0.png';
import img1 from '../images/image1.png';
import img2 from '../images/image2.png';
import img3 from '../images/image3.png';

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
const userComments = [
    {
        name: "Sophia Ramirez",
        rating: 4.5,
        description: "Amazing tool! It accurately detected AI-generated content in my project. Highly recommend it!"
    },
    {
        name: "Liam Johnson",
        rating: 4.7,
        description: "I’m genuinely impressed by the precision of this platform. Saved me tons of time verifying content!"
    },
    {
        name: "Amelia Chen",
        rating: 4.8,
        description: "Super helpful! Loved how easy it was to use and the detailed results. Thank you for this!"
    },
    {
        name: "Oliver Brown",
        rating: 4.2,
        description: "Great product! It helps distinguish real and AI content effectively. Keep up the good work!"
    },
    {
        name: "Emma Garcia",
        rating: 4.6,
        description: "Fantastic tool for content verification. Works like a charm and delivers consistent results."
    },
    {
        name: "Noah Wilson",
        rating: 4.9,
        description: "This platform is incredible! Very user-friendly and precise in detecting AI-generated material."
    }
];
const words = [
    {
      text: "Effortlessly",
      className:"text-white"
    },
    {
      text: "detect",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "the",
      className:"text-white"
    },
    {
      text: "content",
      className:"text-white"
    },
    {
      text: "authenticity.",
      className:"text-white"
    },
  ];
const images = [img0, img1, img2, img3];

export function Info() {
    const [activeTab, setActiveTab] = useState(features[0]?.id || "upload");
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTab((prevTab) => {
                const currentIndex = features.findIndex((feature) => feature.id === prevTab);
                const nextIndex = (currentIndex + 1) % features.length;
                return features[nextIndex].id;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, [features]);
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/*  Features */}
            <Card className="p-6 bg-inherit border-gray-500/20 flex flex-col items-center justify-items-center gap-3">
                <CardHeader className="flex flex-col items-center justify-items-center">
                    <div className="text-3xl font-bold bg-clip-text mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-600">How it works</div>
                    <div className="text-5xl sm:text-5xl font-bold  text-white mb-4">
                        <TypewriterEffectSmooth words={words} />
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
            {/* Benefits */}
            <Card className="p-6 bg-inherit border-none gap-3 flex flex-col items-center justify-items-center">
                <CardHeader className="flex flex-col items-center justify-items-center">
                    <div className="text-3xl font-bold bg-clip-text mb-4 text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Why choose Us</div>
                    <div className="text-5xl sm:text-5xl font-bold text-transparent bg-clip-text text-white mb-4">
                        Achieve the most accurate content detection
                    </div>
                </CardHeader>
                <CardContent className="grid md:grid-rows-2 md:grid-cols-2 gap-2 items-center">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex flex-row gap-2 items-stretch h-full">
                            <Card
                                className="bg-transparent backdrop-blur-sm cursor-pointer transition-all duration-300 flex flex-row items-center h-full border border-transparent hover:border-white/20 hover:bg-white/10">
                                <div className="w-1/3 h-full overflow-hidden">
                                    <img
                                        src={images[index]}
                                        className="w-full bg-transparent object-cover"
                                    />
                                </div>
                                <CardContent className="flex-grow p-4">
                                    <h2 className="text-xl font-semibold text-white mb-2">{benefit.title}</h2>
                                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button
                        className="bg-slate-900 text-white border-gray-500/20 "
                    >
                        Get started
                    </Button>
                </CardFooter>
            </Card>
            {/*  */}
            <Card className="p-6 bg-inherit border-none gap-3">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {userComments.map((Comment, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                                        <CardHeader className="flex flex-row w-full items-center justify-items-center gap-3">
                                            <UserRound size={50} />
                                            <div>
                                                <CardTitle>{Comment.name}</CardTitle>
                                                <StarRating rating={Comment.rating} />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <p className="text-3xl font-semibold">{Comment.description}</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </Card>
        </div>
    );
}
