import {
  PieChart,
  Globe2,
  Users,
  Target,
  Lightbulb,
  Megaphone,
  RefreshCw,
  LineChart,
  Layout,
  Smartphone,
  ShoppingBag,
  Code2,
  Palette,
  MessageSquare,
  Share2,
  TrendingUp,
  Search,
  LucideIcon
} from "lucide-react";

export interface ServiceItem {
  text: string;
  icon: LucideIcon;
  color: string;
  description?: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  glowColorCode: string;
  items: ServiceItem[];
  benefits: string[];
}

export const servicesData: Service[] = [
  {
    id: 1,
    slug: "performance-marketing",
    title: "Performance Marketing",
    description: "Data-driven advertising strategies focused on ROI and measurable growth.",
    longDescription: "Our performance marketing vertical is engineered for scale. We combine technical expertise with creative testing to ensure your ad spend converts into profit. From search engines to social feeds, we dominate every touchpoint of your customer's journey.",
    icon: TrendingUp,
    iconColor: "text-white",
    iconBg: "bg-blue-600",
    glowColorCode: "rgba(37, 99, 235, 0.15)",
    items: [
      { 
        text: "Google Ads (PPC)", 
        icon: Search, 
        color: "text-blue-400",
        description: "Capture high-intent traffic through strategic search and display campaigns on the world's largest search engine."
      },
      { 
        text: "Meta Ads (FB & IG)", 
        icon: Megaphone, 
        color: "text-pink-400",
        description: "Scale your brand with highly targeted visual advertising across Facebook and Instagram feeds."
      },
      { 
        text: "Retargeting Strategy", 
        icon: RefreshCw, 
        color: "text-yellow-400",
        description: "Re-engage lost visitors and guide them back through the funnel with personalized ad sequences."
      },
      { 
        text: "Conversion Optimization", 
        icon: Target, 
        color: "text-green-400",
        description: "Analyze and improve your landing pages to turn more visitors into paying customers."
      },
    ],
    benefits: [
      "Average 4.5x Return on Ad Spend (ROAS)",
      "Daily campaign monitoring and optimization",
      "Transparent real-time performance dashboards",
      "Focus on lead quality over quantity"
    ]
  },
  {
    id: 2,
    slug: "social-media-management",
    title: "Social Media Management",
    description: "Building brand authority and community through strategic social presence.",
    longDescription: "Social media is more than just posting; it's about building a movement. We handle everything from high-level strategy to daily engagement, ensuring your brand stays relevant and resonant in a crowded digital landscape.",
    icon: Users,
    iconColor: "text-white",
    iconBg: "bg-purple-600",
    glowColorCode: "rgba(147, 51, 234, 0.15)",
    items: [
      { 
        text: "Content Strategy", 
        icon: Lightbulb, 
        color: "text-orange-400",
        description: "A comprehensive roadmap for your brand's voice, aesthetic, and posting schedule across all platforms."
      },
      { 
        text: "Community Management", 
        icon: MessageSquare, 
        color: "text-blue-300",
        description: "Real-time engagement with your audience to build trust and foster a loyal brand community."
      },
      { 
        text: "Influencer Marketing", 
        icon: Share2, 
        color: "text-red-400",
        description: "Partner with authentic voices to expand your reach and gain instant credibility with new audiences."
      },
      { 
        text: "Social Analytics", 
        icon: LineChart, 
        color: "text-green-300",
        description: "In-depth reporting on growth, engagement, and reach to continuously refine your social strategy."
      },
    ],
    benefits: [
      "Consistent 20%+ month-over-month growth",
      "High-engagement content tailored for each platform",
      "Proactive crisis and community management",
      "Strategic alignment with overall business goals"
    ]
  },
  {
    id: 3,
    slug: "website-designing",
    title: "Website Designing",
    description: "Crafting high-conversion digital experiences that captivate and convert.",
    longDescription: "Your website is your 24/7 salesperson. We design and develop bespoke digital experiences that don't just look stunning but are engineered for speed, accessibility, and conversion.",
    icon: Layout,
    iconColor: "text-white",
    iconBg: "bg-green-500",
    glowColorCode: "rgba(34, 197, 94, 0.15)",
    items: [
      { 
        text: "UI/UX Design", 
        icon: Palette, 
        color: "text-purple-400",
        description: "User-centric design that balances aesthetic beauty with intuitive functionality and flow."
      },
      { 
        text: "Responsive Development", 
        icon: Smartphone, 
        color: "text-blue-400",
        description: "High-performance websites that look and work perfectly on every device, from mobile to desktop."
      },
      { 
        text: "E-commerce Solutions", 
        icon: ShoppingBag, 
        color: "text-orange-300",
        description: "Scalable online stores designed to maximize sales through optimized checkout experiences."
      },
      { 
        text: "Custom CMS Integration", 
        icon: Code2, 
        color: "text-cyan-400",
        description: "Empower your team with easy-to-use content management systems like WordPress or Webflow."
      },
    ],
    benefits: [
      "SEO-ready architecture from day one",
      "Blazing fast loading speeds (90+ PageSpeed)",
      "Mobile-first design philosophy",
      "Seamless integration with marketing tools"
    ]
  },
];
