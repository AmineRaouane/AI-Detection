import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { faqData } from "@/components/data/faqData";
import { FAQItem } from "@/components/features/FaqItem";
import { features } from "@/components/data/about";

export function About() {

  return (
    <div className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          About Our Technology
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          We combine state-of-the-art machine learning with years of research in
          natural language processing to deliver accurate content analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg hover:border-purple-500/40 transition-all"
          >
            <feature.icon className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl text-white font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </Card>
        ))}
      </div>

      <Card className="bg-transparent border-none mt-16 text-white">
      {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
      </Card>
    </div>
  );
}
