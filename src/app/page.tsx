import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Strengths from "@/components/Strengths";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Process from "@/components/Process";
import ScrollToTop from "@/components/ScrollToTop";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SplashScreen />
      <Hero />
      <Work />
      <Strengths />
      <Services />
      <Industries />
      <Process />
      <ScrollToTop />
    </main>
  );
}
