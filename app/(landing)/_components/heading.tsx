"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight, BookText, ScrollText, Goal } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-5xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your
        <ScrollText className="inline w-8 h-8 md:h-12 md:w-12 mx-1 text-amber-400" />
        <span className="underline">ideas</span>,
        <BookText className="inline w-8 h-8 md:h-12 md:w-12 mx-1 text-rose-400" />
        <span className="underline">docs</span>,<br />
        &<Goal className="inline w-8 h-8 md:h-12 md:w-12 mx-1 text-blue-600" />
        <span className="underline">projects</span>. Together.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium mt-8">
        Notionize is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/documents">
            Enter Notionize
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Notionize free
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
