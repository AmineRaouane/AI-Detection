import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/ui/hero";
import { Info } from "@/components/features/info";
import { About } from "@/components/features/about";
import { Pricing } from "@/components/features/pricing";
import { Contact } from "@/components/features/contact";
import { Footer } from "@/components/features/footer";
import { Products } from "@/components/features/products";


function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen bg-black text-white relative">
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
        {currentPage === "products" && <Products />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
