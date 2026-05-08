import { Variants } from "motion/react";

export const pricingPlans = [
  {
    name: "Free",
    price: 0,
    description: "For individuals getting started",
    items: [
      "10 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "free",
    paymentLink: "",
    priceId: "",
  },
  {
    name: "Pro",
    price: 2,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_8x23coeFR2NA3uPefO8Zq03"
        : "https://buy.stripe.com/test_4gMdR21T573Q2qLfjS8Zq05",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1TTozi5Zc7SLydmv8Ojm0672"
        : "price_1TTozi5Zc7SLydmv8Ojm0672",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};
