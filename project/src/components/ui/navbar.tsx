import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "./button";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", value: "home" },
    { name: "Pricing", value: "pricing" },
    { name: "Products", value: "products" },
    { name: "Detector", value: "detector" },
    { name: "About", value: "about" },
    { name: "Contact", value: "contact" },
  ];

  return (
    <nav className="relative z-20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                {/* text-5xl font-bold mb-4  */}
              <Button
                variant="ghost"
                className="text-xl font-bold flex items-center gap-2 text-purple-400"
                onClick={() => setCurrentPage("home")}
              >
                <Sparkles className="h-5 w-5" />
                AI Detector
              </Button>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Button
                  key={item.value}
                  variant="ghost"
                  className={`${
                    currentPage === item.value
                      ? "text-purple-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setCurrentPage(item.value)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-4 ml-4 border-l border-white/10 pl-4">
              <button className="auth-button login">Log in</button>
              <button className="auth-button signup">Sign up</button>
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
              <Button
                key={item.value}
                variant="ghost"
                className={`${
                  currentPage === item.value
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-white"
                } block w-full text-left`}
                onClick={() => {
                  setCurrentPage(item.value);
                  setIsOpen(false);
                }}
              >
                {item.name}
              </Button>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-white/10">
              <button className="auth-button login w-full">Log in</button>
              <button className="auth-button signup w-full">Sign up</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
