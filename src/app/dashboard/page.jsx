"use client";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const page = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  console.log(content);
  return (
    <div className="bg-primary h-52 rounded-b-sm">
      <p className="pt-10 pb-10 text-primary-foreground font-bold text-center text-3xl uppercase">
        Add Post
      </p>
      <div className="container rounded-sm shadow-sm shadow-black/30 mb-10 mx-auto pt-5 bg-primary-foreground px-5">
        <Textarea
          type="text"
          className="w-full py-2 h-10 mb-5 border rounded-sm px-5 text-4xl font-bold bg-white shadow-inner overflow-y-auto resize-none"
          placeholder="শিরোনাম"
        ></Textarea>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => setContent(newContent)}
        ></JoditEditor>

        <div className="mt-10">
          <div>
            <Textarea className="bg-white resize-none"></Textarea>
            <p>tags</p>
            <p>category</p>
            <p>Times</p>
            <p>meta title</p>
            <p>metadata</p>
            <p>seo keywords</p>
          </div>
        </div>
        <div className="py-5 flex gap-4">
          <Button className="bg-secondary-foreground text-secondary">
            Save as Draft
          </Button>
          <Button className="w-full">Add Post</Button>
        </div>
      </div>
      <div className="min-h-20 bg-primary/20 mb-10 container mx-auto rounded-sm overflow-y-auto border border-primary p-4 max-h-60">
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="bg-primary h-40 py-10">
        <Editor />
      </div>
    </div>
  );
};

export default page;
