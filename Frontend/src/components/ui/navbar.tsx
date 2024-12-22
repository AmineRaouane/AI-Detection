import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./button";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get the current location

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Pricing", path: "/pricing" },
        { name: "Products", path: "/products" },
        { name: "Detector", path: "/detector" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="relative z-20 backdrop-blur-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                            <Link to="/" className="text-xl font-bold flex items-center gap-2 text-purple-400">
                                <Sparkles className="h-5 w-5" />
                                AI Detector
                            </Link>
                        </div>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Button asChild className="bg-inherit">
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`${location.pathname === item.path
                                                ? "text-purple-400"
                                                : "text-gray-300 hover:text-white"
                                            } text-sm font-medium `}
                                    >
                                        {item.name}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4 ml-4 border-l border-white/10 pl-4">
                            <Link to="/login" className="auth-button login">
                                Log in
                            </Link>
                            <Link to="/signup" className="auth-button signup">
                                Sign up
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden absolute w-full bg-black/90 backdrop-blur-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`${location.pathname === item.path
                                        ? "text-purple-400"
                                        : "text-gray-300 hover:text-white"
                                    } block w-full text-left text-sm font-medium`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-2 pt-2 border-t border-white/10">
                            <Link
                                to="/login"
                                className="auth-button login w-full text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/signup"
                                className="auth-button signup w-full text-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
