"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Check, Copy, Globe2, CheckCircle2 } from "lucide-react";

import { Doc } from "@/convex/_generated/dataModel";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { useOrigin } from "@/hooks/use-location-origin";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

interface PublishProps {
  initialData: Doc<"documents">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note has been successfull published.",
      error: "Failed to publish note. Please try again.",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note has been successfull unpublished.",
      error: "Failed to unpublish note. Please try again.",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <CheckCircle2 className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mt-1" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe2 className="text-sky-500 animate-pulse h-4 w-4" />
              <p className="text-xs font-medium text-sky-500">
                This page is live on the web.
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              className="w-full text-xs"
              disabled={isSubmitting}
              onClick={onUnpublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe2 className="h-8 w-8 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-2">Publish to web</p>
            <span className="text-xs text-center text-muted-foreground mb-6">
            Publish a static website of this page. You can allow others to view, duplicate, and remix.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs bg-sky-600 hover:bg-sky-600"
              size="sm"
            >
              Publish to web
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
