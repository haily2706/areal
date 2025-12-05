import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { pricingPlans } from "./pricing-data";

export const metadata: Metadata = {
  title: "Pricing - AI Flashcards",
  description: "Choose your plan. Start for free, upgrade when you're ready. Pro plan includes unlimited decks and advanced features.",
};

export const dynamic = "force-static";

export default function SubscriptionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Choose Your Plan
        </h1>
        <p className="text-lg text-muted-foreground">
          Start for free, upgrade when you&apos;re ready
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            className={plan.popular ? "border-primary shadow-lg" : ""}
          >
            <CardHeader>
              {plan.popular && (
                <div className="mb-2">
                  <span
                    className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground"
                    aria-label="Most popular plan"
                  >
                    Most Popular
                  </span>
                </div>
              )}
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant={plan.variant} className="w-full" asChild>
                <Link href={plan.ctaLink}>
                  {plan.cta}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-xl">Need help choosing?</CardTitle>
            <CardDescription>
              Start with our Free Plan and upgrade anytime. No credit card
              required to get started.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
