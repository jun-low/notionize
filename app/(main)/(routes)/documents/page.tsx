"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) =>
      router.push(`/documents/${documentId}`),
    );

    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note has been successfully created.",
      error: "Failed to create a new note. Please try again.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.svg"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
        priority={true}
      />
      <Image
        src="/empty-dark.svg"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
        priority={true}
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Notionize
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
