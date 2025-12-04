import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clerk Next.js Quickstart",
  description: "Authentication powered by Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "hsl(240 10% 3.9%)",
          colorInputBackground: "hsl(240 10% 3.9%)",
          colorInputText: "hsl(0 0% 98%)",
          colorPrimary: "hsl(0 0% 98%)",
          colorText: "hsl(0 0% 98%)",
          colorTextSecondary: "hsl(240 5% 64.9%)",
          colorDanger: "hsl(0 62.8% 30.6%)",
          borderRadius: "0.5rem",
        },
        elements: {
          card: "bg-card border-border shadow-lg",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton:
            "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
          formButtonPrimary:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          formFieldInput:
            "bg-background border-input text-foreground ring-offset-background focus-visible:ring-ring",
          footer: "bg-background",
          footerAction: "bg-background",
          footerActionText: "text-muted-foreground",
          footerActionLink: "text-primary hover:text-primary/80",
          footerPages: "text-muted-foreground",
          footerPagesLink: "text-muted-foreground hover:text-foreground",
          identityPreviewText: "text-foreground",
          identityPreviewEditButton: "text-muted-foreground hover:text-foreground",
          formFieldLabel: "text-foreground",
          formFieldLabelRow: "text-foreground",
          otpCodeFieldInput:
            "bg-background border-input text-foreground ring-offset-background focus-visible:ring-ring",
          formResendCodeLink: "text-primary hover:text-primary/80",
          dividerLine: "bg-border",
          dividerText: "text-muted-foreground",
        },
      }}
    >
      <html lang="en">
        <body className="min-h-screen bg-background text-foreground">
          <header className="border-b">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-lg font-bold tracking-tight text-transparent">
                AI Flashcards
              </span>
              <div className="flex items-center gap-2">
                <SignedOut>
                  <div className="flex items-center gap-2">
                    <SignInButton mode="modal">
                      <Button variant="outline">Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button>Sign Up</Button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          <main className="mx-auto flex max-w-5xl flex-1 flex-col px-6 py-12">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}

