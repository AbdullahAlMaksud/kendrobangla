import Checklist from "@editorjs/checklist";
import Code from "@editorjs/code";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import RawTool from "@editorjs/raw";
import Table from "@editorjs/table";
import { useEffect } from "react";

const RichTextEditor = ({ editorRef }) => {
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      placeholder: "এখান থেকে ব্লগ লেখা শুরু করুন...",
      onReady: () => {
        editorRef.current = editor;
      },
      tools: {
        header: { class: Header, inlineToolbar: true },
        code: Code,
        quote: { class: Quote, inlineToolbar: true },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                const response = await fetch(
                  `https://api.imgbb.com/1/upload?key=1e1bb4ef74f324e59913c48aca9c1048`,
                  {
                    method: "POST",
                    body: formData,
                  }
                );
                const result = await response.json();
                if (result.success) {
                  return { success: 1, file: { url: result.data.url } };
                } else {
                  throw new Error("Image upload failed");
                }
              },
            },
          },
        },
        table: { class: Table, inlineToolbar: true },
        raw: RawTool,
        checklist: { class: Checklist, inlineToolbar: true },
      },
    });

    return () => {
      if (editor && typeof editor.destroy === "function") {
        editor.destroy();
      }
      editorRef.current = null;
    };
  }, [editorRef]);

  return (
    <div className="">
      <div
        id="editorjs"
        className="p-4 bg-white min-h-[calc(100vh-555px)]"
      ></div>
    </div>
  );
};

export default RichTextEditor;
