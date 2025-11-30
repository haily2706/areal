import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Hello, Next.js!</h1>
      <p className="text-muted-foreground">shadcn/ui is successfully installed! 🎉</p>
      <SignedIn>
        <p className="text-sm text-muted-foreground">
          You are signed in via Clerk. Explore the UI components below.
        </p>
      </SignedIn>
      <SignedOut>
        <p className="text-sm text-muted-foreground">
          Use the Sign in / Sign up buttons above to get started with Clerk.
        </p>
      </SignedOut>
      <div className="flex flex-wrap justify-center gap-2">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}

