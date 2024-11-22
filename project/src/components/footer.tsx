import { Sparkles } from "lucide-react";

export function Footer() {
  const footerLinks = {
    Product: [
      "Features",
      "Integrations",
      "Pricing",
      "Changelog",
      "Documentation",
    ],
    Company: [
      "About Us",
      "Blog",
      "Careers",
      "Contact",
      "Partners",
    ],
    Resources: [
      "Community",
      "Help Center",
      "Status",
      "API Reference",
      "Security",
    ],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "GDPR",
      "Accessibility",
    ],
  };

  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="footer-grid mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-bold text-purple-400">
              <Sparkles className="h-5 w-5" />
              AI Detector
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              Advanced AI detection powered by state-of-the-art machine learning algorithms.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-white">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} AI Detector. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-purple-400">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-purple-400">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}