import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$9",
      features: [
        "100 analyses per month",
        "Basic reporting",
        "Email support",
        "API access",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      features: [
        "1,000 analyses per month",
        "Advanced reporting",
        "Priority support",
        "API access",
        "Custom integration",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited analyses",
        "Custom reporting",
        "24/7 support",
        "API access",
        "Custom integration",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Choose the plan that best fits your needs. All plans include our core
          detection features.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg hover:border-purple-500/40 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-4 text-purple-400">
              {plan.price}
              {plan.price !== "Custom" && <span className="text-sm">/mo</span>}
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <Check className="h-5 w-5 text-purple-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Get Started
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
