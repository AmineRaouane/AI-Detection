import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { faqData } from "@/components/data/faqData";
import { FAQItem } from "@/components/features/FaqItem";
import { features } from "@/components/data/about";
import {testimonials} from "@/components/data/team";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

export function Team() {

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-normal overflow-visible">
                    About Us
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    We are a team of aspiring tech enthusiasts who are passionate about building innovative solutions to real-world problems. Our mission is to empower organizations with cutting-edge tools that drive growth and efficiency.
                </p>
            </div>

            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}
