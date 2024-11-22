import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/ui/hero";
// import { Detector } from "@/components/detector";
import { Info } from "@/components/info";
import { About } from "@/components/about";
import { Pricing } from "@/components/pricing";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen bg-[#0a0118] text-white relative">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="relative z-10">
        {currentPage === "home" && (
          <>
            <Hero />
            <Info />
          </>
        )}
        {currentPage === "about" && <About />}
        {currentPage === "pricing" && <Pricing />}
        {currentPage === "contact" && <Contact />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
