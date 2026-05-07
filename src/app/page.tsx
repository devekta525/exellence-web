import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Stats from "@/components/Stats";
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
      <Stats />
      <Services />
      <Industries />
      <Process />
      <ScrollToTop />
    </main>
  );
}
