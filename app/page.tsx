import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-4" variant="secondary">
            AI-Powered Learning
          </Badge>
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Master Anything with
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"> AI Flashcards</span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Transform your learning with intelligent flashcards powered by AI.
            Create, study, and master any subject faster than ever before.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/decks">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  My Decks
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Why Choose AReal?
          </h2>
          <p className="text-muted-foreground">
            Cutting-edge AI technology meets proven learning science
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Brain className="mb-2 h-10 w-10 text-blue-500" />
              <CardTitle>AI-Generated Content</CardTitle>
              <CardDescription>
                Let AI create perfect flashcards from your notes, PDFs, or any text in seconds
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="mb-2 h-10 w-10 text-yellow-500" />
              <CardTitle>Smart Study Sessions</CardTitle>
              <CardDescription>
                Adaptive learning algorithms that focus on what you need to review most
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Target className="mb-2 h-10 w-10 text-green-500" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Visualize your learning journey with detailed analytics and insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Sparkles className="mb-2 h-10 w-10 text-purple-500" />
              <CardTitle>Intelligent Hints</CardTitle>
              <CardDescription>
                Get AI-powered hints when you're stuck, helping you learn without frustration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BookOpen className="mb-2 h-10 w-10 text-pink-500" />
              <CardTitle>Multi-Format Support</CardTitle>
              <CardDescription>
                Create flashcards from text, images, PDFs, or let AI generate them for you
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="mb-2 h-10 w-10 text-cyan-500" />
              <CardTitle>Spaced Repetition</CardTitle>
              <CardDescription>
                Scientifically-proven method to move information into long-term memory
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Get started in three simple steps
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10 text-2xl font-bold text-blue-500">
              1
            </div>
            <h3 className="mb-2 text-xl font-semibold">Create or Import</h3>
            <p className="text-muted-foreground">
              Create flashcards manually or let AI generate them from your materials
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10 text-2xl font-bold text-purple-500">
              2
            </div>
            <h3 className="mb-2 text-xl font-semibold">Study Smart</h3>
            <p className="text-muted-foreground">
              Review with AI-powered adaptive learning that focuses on your weak spots
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-2xl font-bold text-green-500">
              3
            </div>
            <h3 className="mb-2 text-xl font-semibold">Master It</h3>
            <p className="text-muted-foreground">
              Track your progress and watch your knowledge grow with detailed analytics
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 text-center md:p-12">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Transform Your Learning?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of students mastering their subjects with AI-powered flashcards
          </p>
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg">
                Start Learning for Free
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button size="lg">
                Continue Learning
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} AReal. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

