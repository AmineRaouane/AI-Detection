import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { plans } from "@/components/data/pricing.ts"

export function Pricing() {

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-normal overflow-visible">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Choose the plan that best fits your needs. All plans include our core
                    detection features.
                </p>
            </div>


            <div className="grid md:grid-cols-4 gap-8">
                {plans.map((plan, index) => (
                    <Card
                        key={index}
                        className={`p-8 bg-black/50 border-purple-500/20 backdrop-blur-lg hover:border-purple-500/40 transition-all ${plan.recommended ? 'border-2 border-purple-400' : ''}`} // Highlight recommended plan
                    >
                        <h3 className="text-3xl font-semibold text-white mb-4">{plan.name}</h3> {/* Increased font size */}
                        <div className="text-5xl font-bold mb-6 text-purple-400"> {/* Increased font size */}
                            {plan.price}
                            {plan.price !== "Custom" && <span className="text-xl">/mo</span>} {/* Increased font size */}
                        </div>
                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center text-gray-300">
                                    <Check className="h-6 w-6 text-purple-400 mr-3" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <Button
                            className="w-full bg-purple-600 hover:bg-purple-700 py-3 text-lg"
                        >
                            Get Started
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
