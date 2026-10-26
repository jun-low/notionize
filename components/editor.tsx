"use client";

import { useTheme } from "next-themes";
import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { EdgeStoreApiClientError } from "@edgestore/react/errors";
import { formatFileSize } from "@edgestore/react/utils";
import { toast } from "sonner";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    let response: any = null;
    formatFileSize(10485760); // 10MB
    try {
      if (file) {
        response = await edgestore.publicFiles.upload({ file });
      }
    } catch (error) {
      if (error instanceof EdgeStoreApiClientError) {
        // if it fails due to the `maxSize` set in the router config
        if (error.data.code === 'FILE_TOO_LARGE') {
          toast.error(
            `File too large. Max size is ${formatFileSize(
              error.data.details.maxFileSize,
            )}`,
          );
        }
        // if it fails due to the `accept` set in the router config
        if (error.data.code === 'MIME_TYPE_NOT_ALLOWED') {
          toast.error(
            `File type not allowed. Allowed types are ${error.data.details.allowedMimeTypes.join(
              ', ',
            )}`,
          );
        }
        // if it fails during the `beforeUpload` check
        if (error.data.code === 'UPLOAD_NOT_ALLOWED') {
          toast.error("You don't have permission to upload files here.");
        }
      }
    }
    return response?.url;
  };

  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        editable={editable}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2));
        }}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
