"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import { EdgeStoreApiClientError } from "@edgestore/react/shared";
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

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor: BlockNoteEditor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
