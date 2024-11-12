"use client";
import RichTextEditor from "@/components/editorjs/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Save, Upload } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
const page = () => {
  const editorRef = useRef(null);
  const editor = useRef(null);
  const blogTitle = useRef(null);
  const [content, setContent] = useState("");
  const [blogHead, setBlogHead] = useState("");
  const [savedData, setSavedData] = useState(null);
  const { getRootProps, getInputProps } = useDropzone();

  console.log(blogHead);

  const getHeadingClass = (level) => {
    switch (level) {
      case 2:
        return "text-4xl"; // h2 => 4xl
      case 3:
        return "text-3xl"; // h3 => 3xl
      case 4:
        return "text-2xl"; // h4 => 2xl
      case 5:
        return "text-xl"; // h5 => xl
      case 6:
        return "text-lg"; // h6 => lg
      default:
        return "text-2xl"; // Default fallback if no matching level
    }
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case "header":
        const headingClass = getHeadingClass(block.data.level);
        return React.createElement(
          `h${block.data.level}`,
          { className: `${headingClass} font-bold mt-4 mb-2` },
          block.data.text
        );
      case "paragraph":
        return (
          <p
            className="text-base text-gray-700 my-2"
            dangerouslySetInnerHTML={{ __html: styleLinks(block.data.text) }}
          />
        );
      case "image":
        return (
          <figure className="my-4">
            <Image
              src={block.data.file.url}
              alt={block.data.caption || "Image"}
              className="w-full rounded-lg shadow-md"
            />
            {block.data.caption && (
              <figcaption className="text-sm text-gray-500 mt-2 text-center">
                {block.data.caption}
              </figcaption>
            )}
          </figure>
        );
      case "quote":
        return (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
            <p>{block.data.text}</p>
            {block.data.caption && (
              <cite className="block mt-2 text-right text-gray-500">
                — {block.data.caption}
              </cite>
            )}
          </blockquote>
        );
      case "code":
        return (
          <pre className="bg-gray-800 text-white p-4 rounded-md my-4">
            <code>{block.data.code}</code>
          </pre>
        );
      case "table":
        return (
          <table className="w-full table-auto border-collapse my-4">
            <tbody>
              {block.data.content.map((row, i) => (
                <tr key={i} className="border-b border-gray-300">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="p-2 border border-gray-300 text-center"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      case "checklist":
        return (
          <ul className="list-disc pl-5 my-4">
            {block.data.items.map((item, index) => (
              <li key={index} className="flex items-center my-1">
                <input
                  type="checkbox"
                  checked={item.checked}
                  readOnly
                  className="mr-2"
                />
                <span
                  className={item.checked ? "line-through text-gray-500" : ""}
                >
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        );
      case "raw":
        return (
          <div
            className="my-4"
            dangerouslySetInnerHTML={{ __html: block.data.html }}
          />
        );
      default:
        return null;
    }
  };

  // Helper function to style links
  const styleLinks = (text) => {
    return text
      .replace(
        /<a /g,
        '<a class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" '
      )
      .replace(/<\/a>/g, "</a>");
  };

  // Helper function to parse inline links
  const parseLinks = (text) => {
    const regex = /(https?:\/\/[^\s]+)/g; // Match any URL starting with http:// or https://
    return text.split(regex).map((part, index) => {
      if (regex.test(part)) {
        // If the part matches a URL, wrap it in an <a> tag
        return (
          <a
            key={index}
            href={part}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  const handleSave = async () => {
    const outputData = await editorRef.current.save();
    setSavedData(outputData);
    console.log(outputData); // Set the saved data to state for rendering
  };

  return (
    <div className="pt-16 rounded-b-sm relative">
      <div className="min-h-80 top-0 min-w-full absolute -z-20 bg-primary"></div>
      <div className="container mx-auto p-2">
        {/* <Head>
          <title>Next.js Rich Text Editor</title>
          <meta
            name="description"
            content="Rich text editor with Editor.js in Next.js"
          />
        </Head> */}
        {/* <h1 className="py-2 text-primary-foreground font-bold text-center text-xl uppercase">
          Add a Post
        </h1> */}
        <div
          className="bg-primary/50
         p-2 rounded-sm"
        >
          <Textarea
            className="w-full py-5 px-5 text-3xl font-bold bg-white rounded-t-md rounded-b-none resize-none border-transparent"
            rows={1}
            placeholder="শিরোনাম"
          />

          <RichTextEditor editorRef={editorRef} onSave={handleSave} />

          <div className="container shadow-sm shadow-black/30 mx-auto flex gap-2 px-3 py-4 bg-secondary flex-col">
            <div className="flex gap-2">
              <Textarea
                className="w-full py-2 px-3 text-sm bg-white rounded-sm flex-wrap min-h-min resize-none"
                rows={1}
                placeholder="Tags"
              />
              <Textarea
                className="w-full py-2 px-3 text-sm bg-white rounded-sm flex-wrap min-h-min resize-none"
                rows={1}
                placeholder="Category"
              />
            </div>
            <div className="flex gap-2">
              <Textarea
                className="w-full py-2 px-3 text-sm bg-white rounded-sm flex-wrap min-h-min resize-none"
                rows={1}
                placeholder="Date"
              />
              <Textarea
                className="w-full py-2 px-3 text-sm bg-white rounded-sm flex-wrap min-h-min resize-none"
                rows={1}
                placeholder="Writer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Textarea
                className="w-full py-2 px-3 text-sm bg-white rounded-sm flex-wrap min-h-min resize-none"
                rows={1}
                placeholder="SEO Keyword"
              />
              <Textarea
                className="w-full py-2 px-3 text-sm bg-white rounded-sm flex-wrap min-h-min resize-none"
                rows={1}
                placeholder="Meta description"
              />
              <div
                className="bg-white shadow-sm flex items-center gap-2 flex-col p-2 py-5 border text-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Upload className="size-5" />
                <p className="text-xs">Add Featured photo</p>
              </div>
              <Textarea
                className="w-full py-2 px-3 text-sm bg-white rounded-sm flex-wrap min-h-min resize-none"
                rows={1}
                placeholder="Featured photo caption"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              className="px-4 bg-secondary-foreground py-2 rounded-t-none"
            >
              <Eye />
            </Button>
            <Button
              onClick={handleSave}
              className="px-4 bg-secondary-foreground py-2 rounded-t-none"
            >
              <Save />
            </Button>
            <Button
              onClick={handleSave}
              className="w-full px-4 py-2 rounded-t-none"
            >
              Publish
            </Button>
          </div>
        </div>

        {savedData && (
          <div className="mt-8 border rounded-sm">
            {savedData.blocks.map((block, index) => (
              <div key={index} className="block">
                {renderBlock(block)}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className="container rounded-sm shadow-sm shadow-black/30 mb-10 mx-auto pt-5 bg-primary-foreground px-5">
        <Textarea
          ref={blogTitle}
          value={blogHead}
          onChange={(e) => setBlogHead(e.target.value)}
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
          <div className="grid grid-cols-12 *:bg-secondary-foreground *:my-2 *:w-full *:rounded-sm *:px-2 gap-2 *:col-span-3 *:flex *:justify-center *:items-center *:text-white">
            <Textarea placeholder="Tags" className="resize-none"></Textarea>
            <Textarea placeholder="Category" className="resize-none"></Textarea>
            <Textarea placeholder="Times" className="resize-none"></Textarea>
            <Textarea
              placeholder="Meta title"
              className="resize-none"
            ></Textarea>
            <Textarea placeholder="Metadata" className="resize-none"></Textarea>
            <Textarea placeholder="Metadata" className="resize-none"></Textarea>
            <Textarea
              placeholder="Seo Keywords"
              className="resize-none"
            ></Textarea>
            <Textarea placeholder="Writers" className="resize-none"></Textarea>
          </div>
        </div>
        <div className="py-5 flex gap-4">
          <Button className="bg-secondary-foreground text-secondary">
            Save as Draft
          </Button>
          <Button className="w-full">Add Post</Button>
        </div>
      </div>
      <div className="min-h-20 bg-primary/20 mb-10 container mx-auto rounded-sm overflow-y-auto border border-primary p-4">
        <p className="text-4xl font-bold">{blogHead}</p>
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="bg-primary h-40 py-10">
        <Editor />
      </div> */}
    </div>
  );
};

export default page;
