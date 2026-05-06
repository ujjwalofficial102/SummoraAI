export const pricingPlans = [
  {
    name: "Free",
    price: 0,
    description: "For individuals getting started",
    items: [
      "5 PDF summaries per month",
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
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1TTozi5Zc7SLydmv8Ojm0672"
        : "",
  },
];
