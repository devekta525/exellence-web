import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Strengths from "@/components/Strengths";
import WhyWeStarted from "@/components/WhyWeStarted";
import Services from "@/components/Services";
import Process from "@/components/Process";
import ScrollToTop from "@/components/ScrollToTop";
import SplashScreen from "@/components/SplashScreen";
import connectToDatabase from "@/lib/mongodb";
import { Content } from "@/models/Content";

async function getHeroContent() {
  try {
    const db = await connectToDatabase();
    if (!db) return null;
    const heroContent = await Content.findOne({ section: 'hero' });
    if (heroContent) return heroContent.data;
  } catch (error) {}
  return null;
}

async function getWhyWeStartedContent() {
  try {
    const db = await connectToDatabase();
    if (!db) return null;
    const content = await Content.findOne({ section: 'why-we-started' });
    if (content) return content.data;
  } catch (error) {}
  return null;
}

async function getServicesContent() {
  try {
    const db = await connectToDatabase();
    if (!db) return null;
    const content = await Content.findOne({ section: 'services' });
    if (content) return content.data;
  } catch (error) {}
  return null;
}

async function getProcessContent() {
  try {
    const db = await connectToDatabase();
    if (!db) return null;
    const content = await Content.findOne({ section: 'process' });
    if (content) return content.data;
  } catch (error) {}
  return null;
}

async function getWorkContent() {
  try {
    const db = await connectToDatabase();
    if (!db) return null;
    const content = await Content.findOne({ section: 'work' });
    if (content) return content.data;
  } catch (error) {}
  return null;
}

export default async function Home() {
  const heroData = await getHeroContent();
  const whyWeStartedData = await getWhyWeStartedContent();
  const servicesData = await getServicesContent();
  const processData = await getProcessContent();
  const workData = await getWorkContent();

  return (
    <main className="min-h-screen">
      <SplashScreen />
      <Hero initialData={heroData} />
      <Work initialData={workData} />
      <WhyWeStarted initialData={whyWeStartedData} />
      <Services initialData={servicesData} />
      <Process initialData={processData} />
      <ScrollToTop />
    </main>
  );
}
