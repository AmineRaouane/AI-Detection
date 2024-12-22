import { Mail, MessageSquare, Phone, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export function Contact() {
    return (
        <div className="py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 leading-normal overflow-visible">
                    Get in Touch
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Have questions about our AI detection service? We're here to help.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-4">
                <div className="space-y-7">
                    <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
                        <div className="flex items-center">
                            <Instagram className="h-6 w-6 text-purple-400 mr-3" />
                            <div>
                                <h3 className="font-semibold text-white">Our Instagram</h3>
                                <p className="text-gray-400">aidetector</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
                        <div className="flex items-center">
                            <Facebook className="h-6 w-6 text-purple-400 mr-3" />
                            <div>
                                <h3 className="font-semibold text-white">Our facebook</h3>
                                <p className="text-gray-400">aidetector</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
                        <div className="flex items-center">
                            <MessageSquare className="h-6 w-6 text-purple-400 mr-3" />
                            <div>
                                <h3 className="font-semibold text-white">Live Chat</h3>
                                <p className="text-gray-400">Available 24/7</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
                    <form className="space-y-6">
                        <div>
                            <Input
                                placeholder="Your Name"
                                className="bg-white/10 border-purple-500/20"
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                placeholder="Your Email"
                                className="bg-white/10 border-purple-500/20"
                            />
                        </div>
                        <div>
                            <Textarea
                                placeholder="Your Message"
                                className="min-h-[130px] bg-white/10 border-purple-500/20"
                            />
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Send Message
                        </Button>
                    </form>
                </Card>

                <div className="space-y-7">
                    <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
                        <div className="flex items-center">
                            <Mail className="h-6 w-6 text-purple-400 mr-3" />
                            <div>
                                <h3 className="font-semibold text-white">Email Us</h3>
                                <p className="text-gray-400">support@aidetector.com</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
                        <div className="flex items-center">
                            <Phone className="h-6 w-6 text-purple-400 mr-3" />
                            <div>
                                <h3 className="font-semibold text-white">Call Us</h3>
                                <p className="text-gray-400">+1 (555) 123-4567</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6 bg-black/50 border-purple-500/20 backdrop-blur-lg">
                        <div className="flex items-center">
                            <MessageSquare className="h-6 w-6 text-purple-400 mr-3" />
                            <div>
                                <h3 className="font-semibold text-white">Live Chat</h3>
                                <p className="text-gray-400">Available 24/7</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
