export const plans = [
    {
      name: "Basic",
      price: "$9",
      features: [
        "100 analyses per month",
        "Basic reporting",
        "Email support",
        "API access",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      features: [
        "1,000 analyses per month",
        "Advanced reporting",
        "Priority support",
        "API access",
        "Custom integration",
      ],
      recommended: true, // Marking this plan as recommended
    },
    {
      name: "Premium", // New plan added
      price: "$50",
      features: [
        "5,000 analyses per month",
        "Premium reporting",
        "24/7 priority support",
        "API access",
        "Custom integration",
        "Dedicated account manager",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Unlimited analyses",
        "Custom reporting",
        "24/7 support",
        "API access",
        "Custom integration",
        "Dedicated account manager",
      ],
    },
  ];
