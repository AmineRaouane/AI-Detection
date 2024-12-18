import { Image, Type, Video, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { products } from "@/components/data/products";

export function Products() {
    return (
        <div className="py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto my-4">
                    Choose the plan that best fits your needs. All plans include our core
                    detection features.
                </p>
            </div>

            <div className="grid md:grid-cols-2 md:grid-rows-2 gap-8">
                {products.map((product, index) => (
                    <Card
                        key={index}
                        className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg hover:border-purple-500/40 transition-all"
                    >
                        <CardHeader className="flex flex-row gap-5 text-white text-3xl w-full">
                            <product.logo size={48}/>
                            <CardTitle className="flex-1 indent-8 self-stretch">{product.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{product.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                Try for Free
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
