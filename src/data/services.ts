import { 
  PieChart, 
  Clapperboard, 
  LayoutTemplate, 
  Globe2,
  Users,
  Target,
  Lightbulb,
  PenTool,
  Camera,
  Heart,
  Scissors,
  LayoutGrid,
  Share2,
  Megaphone,
  RefreshCw,
  LineChart,
  LucideIcon
} from "lucide-react";

export interface ServiceItem {
  text: string;
  icon: LucideIcon;
  color: string;
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
    slug: "marketing-strategy",
    title: "Marketing Strategy",
    description: "Comprehensive audience mapping and brand positioning to drive long-term growth.",
    longDescription: "Our marketing strategy service is the foundation of every successful campaign. We deep-dive into audience psychology, market trends, and competitor landscapes to build a roadmap that doesn't just reach people, but resonates with them. From brand positioning to micro-campaign development, we ensure every dollar spent is backed by data-driven insights.",
    icon: PieChart,
    iconColor: "text-white",
    iconBg: "bg-blue-600",
    glowColorCode: "rgba(37, 99, 235, 0.15)",
    items: [
      { text: "Audience Mapping & Market Research", icon: Users, color: "text-purple-400" },
      { text: "Brand Positioning & Strategy", icon: Target, color: "text-red-400" },
      { text: "MicroCampaign Development", icon: Lightbulb, color: "text-yellow-400" },
    ],
    benefits: [
      "Targeted audience acquisition with 90% accuracy",
      "Stable brand voice across all digital touchpoints",
      "Optimized budget allocation for maximum ROI",
      "Quarterly market shift analysis and pivots"
    ]
  },
  {
    id: 2,
    slug: "content-creation",
    title: "Content Creation",
    description: "High-fidelity storytelling designed to capture attention and build brand loyalty.",
    longDescription: "In a world of infinite scrolling, content is the currency of attention. We specialize in high-production videography, strategic photography, and UGC that feels authentic. Our creative team doesn't just make 'posts'; we create brand assets that drive engagement and build a community around your business.",
    icon: Clapperboard,
    iconColor: "text-white",
    iconBg: "bg-green-500",
    glowColorCode: "rgba(34, 197, 94, 0.15)",
    items: [
      { text: "Content Writing & Ideation", icon: PenTool, color: "text-orange-400" },
      { text: "Videography & Photography", icon: Camera, color: "text-purple-400" },
      { text: "UGC & Influencer Collaboration", icon: Heart, color: "text-yellow-400" },
    ],
    benefits: [
      "Consistent high-quality output on a monthly basis",
      "Viral-ready creative hooks for Meta and TikTok",
      "Strategic storytelling that drives emotional connection",
      "Full ownership of all creative assets generated"
    ]
  },
  {
    id: 3,
    slug: "editing-distribution",
    title: "Editing & Distribution",
    description: "Professional post-production and multi-platform publishing for maximum reach.",
    longDescription: "The best content in the world is useless if it's not optimized for the platform it's on. Our editing team handles everything from SFX/VFX to platform-specific formatting. We ensure your message is delivered seamlessly across Instagram, LinkedIn, YouTube, and beyond, using a distribution strategy that maximizes organic and paid reach.",
    icon: LayoutTemplate,
    iconColor: "text-white",
    iconBg: "bg-purple-600",
    glowColorCode: "rgba(147, 51, 234, 0.15)",
    items: [
      { text: "Video Editing (SFX + VFX)", icon: Scissors, color: "text-red-400" },
      { text: "Platform-Specific Formatting", icon: LayoutGrid, color: "text-blue-400" },
      { text: "Cross-Platform Publishing", icon: Share2, color: "text-cyan-400" },
    ],
    benefits: [
      "Cinematic editing quality that beats competitors",
      "Multi-platform reach with zero extra effort for you",
      "Data-backed publishing schedules for high engagement",
      "Automated cross-posting workflows"
    ]
  },
  {
    id: 4,
    slug: "performance-marketing",
    title: "Performance Marketing",
    description: "Paid media scaling with a focus on ROAS, lead quality, and profitable growth.",
    longDescription: "We don't just 'run ads'; we build profitable scaling machines. Our performance marketing team focuses on Meta funnel optimization, retargeting strategies, and deep analytics. We scale your spend confidently while maintaining lead quality and ensuring every campaign contributes to your bottom line.",
    icon: Globe2,
    iconColor: "text-white",
    iconBg: "bg-red-500",
    glowColorCode: "rgba(239, 68, 68, 0.2)",
    items: [
      { text: "Paid Media Planning & Execution", icon: Megaphone, color: "text-pink-400" },
      { text: "Retargeting & Engagement Optimization", icon: RefreshCw, color: "text-blue-400" },
      { text: "Performance Tracking & Optimization", icon: LineChart, color: "text-gray-300" },
    ],
    benefits: [
      "4.2X Average ROAS across clients",
      "60% reduction in average Cost-Per-Lead (CPL)",
      "Daily campaign monitoring and real-time tweaks",
      "Transparent reporting with zero vanity metrics"
    ]
  },
];
