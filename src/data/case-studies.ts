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
    title: "4.2X ROAS in 30 Days",
    body: "Scaled a sportswear brand from 2.2X to 4.2X ROAS while tripling ad spend through structured Meta funnel optimization.",
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
    title: "7X Scale. Consistent 4X ROAS.",
    body: "Successfully expanded a barefoot shoe brand’s Meta campaigns across India with profitable growth.",
    category: "Footwear",
    image: "/images/case-studies/barefoot-shoes.png",
    stats: [
      { label: "ROAS", value: "4X" },
      { label: "Scale", value: "7X" },
      { label: "Region", value: "India" }
    ]
  },
  {
    id: "5",
    slug: "air-purifier-revenue",
    title: "4X ROAS with ₹1Cr Revenue Generated",
    body: "Drove rapid growth for a portable air purifier brand within just 40 days using optimized Meta campaigns.",
    category: "Consumer Tech",
    image: "/images/case-studies/air-purifier.png",
    stats: [
      { label: "ROAS", value: "4X" },
      { label: "Revenue", value: "₹1Cr+" },
      { label: "Timeline", value: "40 Days" }
    ]
  },
  {
    id: "6",
    slug: "sneaker-brand-growth",
    title: "5X Revenue Growth in Less Than 9 Months",
    body: "Scaled a sneaker brand from ₹30 lakhs to ₹1.5 crores per month through performance-driven Meta campaigns.",
    category: "E-commerce",
    image: "/images/case-studies/sneaker-brand.png",
    stats: [
      { label: "Growth", value: "5X" },
      { label: "Monthly Revenue", value: "₹1.5Cr" },
      { label: "Timeline", value: "9 Months" }
    ]
  },
  {
    id: "2",
    slug: "b2b-lead-generation",
    title: "61% Lower Cost Per Quality Lead",
    body: "Reduced CPL from ₹400 to ₹156 while generating high-intent leads with a 2% conversion rate through Meta funnel optimization.",
    category: "B2B Lead Gen",
    image: "/images/case-studies/b2b-lead-gen.png",
    stats: [
      { label: "CPL Reduction", value: "61%" },
      { label: "New CPL", value: "₹156" },
      { label: "Conv. Rate", value: "2%" }
    ]
  },
  {
    id: "4",
    slug: "real-estate-lead-costs",
    title: "Reduced Real Estate Lead Costs by 40%",
    body: "Scaled lead generation campaigns in Bahrain with improved lead quality and lower acquisition costs.",
    category: "Real Estate",
    image: "/images/case-studies/real-estate.png",
    stats: [
      { label: "CPL Reduction", value: "40%" },
      { label: "Region", value: "Bahrain" },
      { label: "Status", value: "Scaled" }
    ]
  }
];
