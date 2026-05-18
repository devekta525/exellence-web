export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  body: string;
  category: string;
  image: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "sportswear-roas-optimization",
    title: "Sportswear brand Meta Ads turnaround, October 2025 to May 2026",
    body: "We inherited an underperforming Meta Ads account with declining results and a falling ROAS. Within one month of onboarding, we reversed the trend — delivering record purchases and consistently above-average ROAS ever since.",
    category: "Sportswear",
    image: "/images/case-studies/sportswear.png",
    stats: [
      { label: "ROAS", value: "4.2X" },
      { label: "Growth", value: "2.2X → 4.2X" },
      { label: "Timeline", value: "30 Days" }
    ]
  },
  {
    id: "3",
    slug: "shoe-brand-scale",
    title: "D2C barefoot brand Meta Ads campaign, October to November 2025",
    body: "How we built a full-funnel Meta Ads strategy from scratch and scaled a D2C footwear brand to 4x purchases in 30 days.",
    category: "Footwear",
    image: "/images/case-studies/barefoot-shoes.png",
    stats: [
      { label: "ROAS", value: "4X" },
      { label: "Scale", value: "6X" },
      { label: "Region", value: "India" }
    ]
  },
  {
    id: "5",
    slug: "air-purifier-revenue",
    title: "Wearable air purifier brand Meta Ads, September to December 2025",
    body: "We onboarded a wearable air purifier brand in September, built the campaign foundation through October, and were perfectly positioned when AQI levels spiked across India — delivering an 11.58x ROAS and over ₹1.56 Crore in November alone.",
    category: "Consumer Tech",
    image: "/images/case-studies/air-purifier.png",
    stats: [
      { label: "ROAS", value: "11X" },
      { label: "Revenue", value: "₹1.56Cr" },
      { label: "Timeline", value: "40 Days" }
    ]
  },
  {
    id: "6",
    slug: "sneaker-brand-growth",
    title: "Global shoe brand Meta Ads, May 2025 to January 2026, 7 countries",
    body: "Over 9 months of Meta Ads management, we drove 15,299 purchases and nearly ₹9.5 Crore in total revenue for a footwear brand — expanding their reach from India across the US, UK, UAE, Australia, Canada, and Singapore simultaneously.",
    category: "E-commerce",
    image: "/images/case-studies/sneaker-brand.png",
    stats: [
      { label: "Growth", value: "5X" },
      { label: "Revenue", value: "₹9.47Cr" },
      { label: "Timeline", value: "9 Months" }
    ]
  },
];
