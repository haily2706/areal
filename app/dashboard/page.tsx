import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Plus,
  TrendingUp,
  Target,
  Clock,
  Brain,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // TODO: Replace with actual data from database
  const stats = {
    totalDecks: 0,
    totalCards: 0,
    studiedToday: 0,
    streak: 0,
  };

  const recentDecks: Array<{
    id: string;
    name: string;
    description: string;
    cardCount: number;
  }> = [
    // TODO: Replace with actual data from database
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
          Welcome back!
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your learning journey?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/decks/new" className="flex-1">
          <Button size="lg" className="w-full">
            <Plus className="mr-2 h-5 w-5" />
            Create New Deck
          </Button>
        </Link>
        <Link href="/study" className="flex-1">
          <Button size="lg" variant="outline" className="w-full">
            <Brain className="mr-2 h-5 w-5" />
            Start Studying
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Decks</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDecks}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalDecks === 0 ? "Create your first deck" : "Across all subjects"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCards}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalCards === 0 ? "No cards yet" : "Ready to study"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Studied Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.studiedToday}</div>
            <p className="text-xs text-muted-foreground">
              {stats.studiedToday === 0 ? "Start your first session" : "cards reviewed"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak}</div>
            <p className="text-xs text-muted-foreground">
              {stats.streak === 0 ? "Build your streak" : "days in a row"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Decks Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Your Decks</h2>
            <p className="text-sm text-muted-foreground">
              Manage and study your flashcard collections
            </p>
          </div>
          <Link href="/decks">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {recentDecks.length === 0 ? (
          <Card className="border-dashed">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <CardTitle>No decks yet</CardTitle>
              <CardDescription className="mx-auto max-w-md">
                Create your first flashcard deck to start learning. You can create cards manually or let AI generate them for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-6">
              <Link href="/decks/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Deck
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentDecks.map((deck: any) => (
              <Card key={deck.id} className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-1">{deck.name}</CardTitle>
                    <Badge variant="secondary">{deck.cardCount} cards</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {deck.description || "No description"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/decks/${deck.id}`}>
                    <Button className="w-full" variant="outline">
                      Study Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Pro Tip
          </CardTitle>
          <CardDescription>
            Study consistently for better retention! Even 10 minutes a day is more effective than cramming. Set a daily goal and build your study streak.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}