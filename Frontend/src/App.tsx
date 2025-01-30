import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/ui/navbar";
import { Home } from "@/components/features/home";
import { About } from "@/components/features/about";
import { Pricing } from "@/components/features/pricing";
import { Contact } from "@/components/features/contact";
import { Footer } from "@/components/features/footer";
import { Products } from "@/components/features/products";
import { Detector } from "@/components/app/main";
// import { Team } from "@/components/features/Team";
import { Login } from "@/components/features/Login";
import { Signup } from "@/components/features/Signup";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white relative">
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/detector" element={<Detector />} />
            {/* <Route path="/Team" element={<Team />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
