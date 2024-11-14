"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios"; // Make sure axios is installed
import { Eye, Save, Upload } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const RichTextEditor = dynamic(
  () => import("@/components/editorjs/RichTextEditor"),
  { ssr: false }
);

const Page = () => {
  const editorRef = useRef(null);
  const titleRef = useRef(null);
  const tagsRef = useRef(null);
  const categoryRef = useRef(null);
  const dateRef = useRef(null);
  const writerRef = useRef(null);
  const seoKeywordRef = useRef(null);
  const metaDescriptionRef = useRef(null);
  const featuredPhotoCaptionRef = useRef(null);
  const [savedData, setSavedData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          formData
        );
        setImageUrl(response.data.data.url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
  });

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

  const styleLinks = (text) => {
    return text
      .replace(
        /<a /g,
        '<a class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" '
      )
      .replace(/<\/a>/g, "</a>");
  };

  const handleSave = async () => {
    const editorData = await editorRef.current.save();

    const inputDataArray = {
      title: titleRef.current?.value,
      tags: tagsRef.current?.value,
      category: categoryRef.current?.value,
      publishedDate: dateRef.current?.value,
      writer: writerRef.current?.value,
      seoKeyword: seoKeywordRef.current?.value,
      metaDescription: metaDescriptionRef.current?.value,
      featurePhotoCaption: featuredPhotoCaptionRef.current?.value,
      featurePhotoUrl: imageUrl,
      editorData,
    };

    setSavedData(inputDataArray);
    console.log("Input Data Array:", inputDataArray);
  };

  return (
    <div className="pt-16 rounded-b-sm -z-10 relative">
      <div className="min-h-80 top-0 min-w-full absolute -z-20 bg-primary"></div>
      <div className="container mx-auto p-2">
        <div className="bg-primary/50 p-2 rounded-sm">
          <Textarea
            ref={titleRef}
            className="w-full py-5 px-5 text-3xl font-bold bg-white rounded-t-md rounded-b-none resize-none border-transparent"
            rows={1}
            placeholder="শিরোনাম"
          />

          <RichTextEditor editorRef={editorRef} onSave={handleSave} />

          <div className="container shadow-sm shadow-black/30 mx-auto flex gap-2 px-3 py-4 bg-secondary flex-col">
            <div className="flex gap-2">
              <Textarea
                ref={tagsRef}
                className="w-full py-2 px-3 text-sm bg-white rounded-sm"
                rows={1}
                placeholder="Tags"
              />
              <Textarea
                ref={categoryRef}
                className="w-full py-2 px-3 text-sm bg-white rounded-sm"
                rows={1}
                placeholder="Category"
              />
            </div>
            <div className="flex gap-2">
              <Textarea
                ref={dateRef}
                className="w-full py-2 px-3 text-sm bg-white rounded-sm"
                rows={1}
                placeholder="Date"
              />
              <Textarea
                ref={writerRef}
                className="w-full py-2 px-3 text-sm bg-white rounded-sm"
                rows={1}
                placeholder="Writer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Textarea
                ref={seoKeywordRef}
                className="w-full py-2 px-3 text-sm bg-white rounded-sm"
                rows={1}
                placeholder="SEO Keyword"
              />
              <Textarea
                ref={metaDescriptionRef}
                className="w-full py-2 px-3 text-sm bg-white rounded-sm"
                rows={1}
                placeholder="Meta description"
              />

              <div
                className="bg-white shadow-sm flex items-center justify-center gap-2 flex-col p-2 py-5 border text-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-full h-auto rounded-md"
                  />
                ) : (
                  <>
                    <Upload className="size-5" />
                    <p className="text-xs">Add Featured photo</p>
                  </>
                )}
              </div>

              <Textarea
                ref={featuredPhotoCaptionRef}
                className="w-full py-2 px-3 text-sm bg-white rounded-sm"
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
          <div className="mt-8 border rounded-sm p-2">
            <pre>{JSON.stringify(savedData?.editorData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
