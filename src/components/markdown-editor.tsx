import { useCallback, useMemo, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  BaseEditor,
  createEditor,
  Descendant,
  Element as SlateElement,
  Editor,
  Transforms,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  ReactEditor,
  useFocused,
  useSelected,
} from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";
import { Button } from "./ui/button";
import { Toolbar } from "./ui/toolbar";
import { cn } from "~/lib/utils";
import { ImageIcon, Undo2, Redo2, Link2 } from "lucide-react";
import { useUploadThing } from "~/utils/uploadthing";
import { useToast } from "~/hooks/use-toast";
import { ResizeHandle } from "./resize-handle";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type CustomElement = {
  type:
    | "paragraph"
    | "heading-one"
    | "heading-two"
    | "heading-three"
    | "heading-four"
    | "heading-five"
    | "heading-six"
    | "bulleted-list"
    | "list-item"
    | "image";
  children: CustomText[];
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
};

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  link?: string;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const isImageUrl = (url: string) => {
  if (url.startsWith("https://utfs.io/")) {
    return true;
  }
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
};

const withImages = (editor: Editor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        if (file.type.startsWith("image/")) {
          const { startUpload } = useUploadThing("imageUploader");
          startUpload([file]).then((res) => {
            if (res && res.length > 0 && res[0]?.url) {
              const image: CustomElement = {
                type: "image",
                url: res[0].url,
                alt: file.name,
                children: [{ text: "" }],
              };
              Transforms.insertNodes(editor, image);
            }
          });
          return;
        }
      }
    } else if (isImageUrl(text)) {
      const image: CustomElement = {
        type: "image",
        url: text,
        alt: "Pasted image",
        children: [{ text: "" }],
      };
      Transforms.insertNodes(editor, image);
      return;
    }

    insertData(data);
  };

  return editor;
};

const MarkdownEditor = ({
  initialValue,
  onChange,
  readOnly = false,
}: {
  initialValue: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}) => {
  const editor = useMemo(
    () => withHistory(withImages(withReact(createEditor()))),
    [],
  );

  const [content, setContent] = useState<Descendant[]>(() => {
    try {
      return JSON.parse(initialValue) as Descendant[];
    } catch {
      return [
        {
          type: "paragraph" as const,
          children: [{ text: initialValue || "" }],
        },
      ];
    }
  });

  useEffect(() => {
    try {
      const newContent = JSON.parse(initialValue) as Descendant[];
      setContent(newContent);
    } catch {
      setContent([
        {
          type: "paragraph" as const,
          children: [{ text: initialValue || "" }],
        },
      ]);
    }
  }, [initialValue]);

  const handleChange = useCallback(
    (value: Descendant[]) => {
      setContent(value);
      const isAstChange = editor.operations.some(
        (op) => "set_selection" !== op.type,
      );

      if (isAstChange) {
        onChange(JSON.stringify(value));
      }
    },
    [editor.operations, onChange],
  );

  const { startUpload } = useUploadThing("imageUploader");
  const { toast } = useToast();

  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  
  const isLinkActive = useCallback((editor: Editor) => {
    const marks = Editor.marks(editor);
    return marks ? marks.link !== undefined : false;
  }, []);

  const toggleLink = useCallback((editor: Editor, url: string | null) => {
    if (!url) {
      Editor.removeMark(editor, 'link');
    } else {
      Editor.addMark(editor, 'link', url);
    }
  }, []);

  const handleLinkSubmit = useCallback((url: string) => {
    if (!url) return;
    toggleLink(editor, url);
    setShowLinkDialog(false);
    setLinkUrl("");
  }, [editor, toggleLink]);

  const ImageElement = useCallback(
    ({ attributes, children, element }: any) => {
      const selected = useSelected();
      const focused = useFocused();
      const path = ReactEditor.findPath(editor, element);
      const [size, setSize] = useState({
        width: element.width || "auto",
        height: element.height || "auto",
      });
      const [aspectRatio, setAspectRatio] = useState(1);
      const imageRef = useRef<HTMLImageElement>(null);

      useEffect(() => {
        if (imageRef.current && imageRef.current.complete) {
          setAspectRatio(
            imageRef.current.naturalWidth / imageRef.current.naturalHeight,
          );
        }
      }, [element.url]);

      const handleImageLoad = () => {
        if (imageRef.current) {
          const ratio =
            imageRef.current.naturalWidth / imageRef.current.naturalHeight;
          setAspectRatio(ratio);
          if (!element.width) {
            setSize({
              width: imageRef.current.naturalWidth,
              height: imageRef.current.naturalHeight,
            });
          }
        }
      };

      const updateSize = useCallback(
        (width: number, height: number) => {
          setSize({ width, height });
          Transforms.setNodes(editor, { width, height }, { at: path });
        },
        [editor, path],
      );

      const handleDelete = (event: React.MouseEvent) => {
        event.preventDefault();
        Transforms.removeNodes(editor, { at: path });
      };

      return (
        <div {...attributes}>
          <div contentEditable={false} className="group relative">
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src={element.url}
                alt={element.alt || ""}
                onLoad={handleImageLoad}
                style={{
                  width: size.width,
                  height: size.height,
                }}
                className={cn(
                  "block max-w-full object-contain",
                  selected && focused && "ring-2 ring-blue-500",
                )}
              />
              {selected && focused && (
                <>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className={cn(
                      "absolute left-2 top-2 h-8 w-8 p-1.5",
                      "opacity-0 transition-opacity group-hover:opacity-100",
                      "bg-white text-red-600 hover:bg-red-50",
                    )}
                    onMouseDown={handleDelete}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-full w-full"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </Button>
                  <ResizeHandle
                    currentWidth={size.width}
                    currentHeight={size.height}
                    aspectRatio={aspectRatio}
                    onResize={updateSize}
                  />
                </>
              )}
            </div>
          </div>
          {children}
        </div>
      );
    },
    [editor],
  );

  const renderElement = useCallback(
    (props: any) => {
      const key =
        props.element.id || props.element.key || JSON.stringify(props.element);

      switch (props.element.type) {
        case "image":
          return <ImageElement {...props} />;
        case "heading-one":
          return (
            <h1
              {...props.attributes}
              key={key}
              className="mb-4 text-3xl font-bold"
            >
              {props.children}
            </h1>
          );
        case "heading-two":
          return (
            <h2
              {...props.attributes}
              key={key}
              className="mb-3 text-2xl font-bold"
            >
              {props.children}
            </h2>
          );
        case "heading-three":
          return (
            <h3
              {...props.attributes}
              key={key}
              className="mb-3 text-xl font-bold"
            >
              {props.children}
            </h3>
          );
        case "heading-four":
          return (
            <h4
              {...props.attributes}
              key={key}
              className="mb-2 text-lg font-bold"
            >
              {props.children}
            </h4>
          );
        case "heading-five":
          return (
            <h5
              {...props.attributes}
              key={key}
              className="mb-2 text-base font-bold"
            >
              {props.children}
            </h5>
          );
        case "heading-six":
          return (
            <h6
              {...props.attributes}
              key={key}
              className="mb-2 text-sm font-bold"
            >
              {props.children}
            </h6>
          );
        case "bulleted-list":
          const path = ReactEditor.findPath(editor, props.element);

          let nestingLevel = 0;
          let currentPath = path;

          while (currentPath.length > 0) {
            const [parentNode] = Editor.parent(editor, currentPath);
            if (
              SlateElement.isElement(parentNode) &&
              parentNode.type === "bulleted-list"
            ) {
              nestingLevel++;
            }
            currentPath = currentPath.slice(0, -1);
          }

          let listStyle = "list-disc";
          if (nestingLevel === 1) {
            listStyle = "list-circle";
          } else if (nestingLevel >= 2) {
            listStyle = "list-square";
          }

          return (
            <ul
              {...props.attributes}
              key={key}
              className={cn("mb-2 pl-6", listStyle)}
            >
              {props.children}
            </ul>
          );
        case "list-item":
          return (
            <li {...props.attributes} key={key} className="mb-1">
              {props.children}
            </li>
          );
        default:
          return (
            <p {...props.attributes} key={key} className="mb-4">
              {props.children}
            </p>
          );
      }
    },
    [ImageElement, editor],
  );

  const isEmailAddress = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const renderLeaf = useCallback((props: any) => {
    let children = props.children;

    if (props.leaf.bold) {
      children = <strong>{children}</strong>;
    }

    if (props.leaf.italic) {
      children = <em>{children}</em>;
    }

    // Check if the text is an email address
    if (typeof props.leaf.text === 'string' && isEmailAddress(props.leaf.text.trim())) {
      children = (
        <a
          href={`mailto:${props.leaf.text.trim()}`}
          className={cn(
            "text-blue-600 underline decoration-blue-600/30",
            "transition-colors hover:decoration-blue-600",
            !readOnly && "cursor-text"
          )}
          onClick={(e) => {
            if (!readOnly) {
              e.preventDefault();
            }
          }}
        >
          {children}
        </a>
      );
    }

    if (props.leaf.link) {
      children = (
        <a
          href={props.leaf.link}
          className={cn(
            "text-blue-600 underline decoration-blue-600/30",
            "transition-colors hover:decoration-blue-600",
            !readOnly && "cursor-text"
          )}
          onClick={(e) => {
            if (!readOnly) {
              e.preventDefault();
            }
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return <span {...props.attributes}>{children}</span>;
  }, [readOnly]);

  const insertImage = async (editor: any) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file size (4MB limit)
      if (file.size > 4 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Image size must be less than 4MB",
        });
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Only image files are allowed",
        });
        return;
      }

      try {
        toast({
          title: "Uploading",
          description: "Please wait while we upload your image...",
          duration: 10000,
        });

        const files = await startUpload([file]);
        if (!files) return;

        const [res] = files;
        if (!res || !res.url) {
          throw new Error("Upload failed");
        }

        const image: CustomElement = {
          type: "image",
          url: res.url,
          alt: file.name,
          children: [{ text: "" }],
        };

        Transforms.insertNodes(editor, image);

        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      } catch (error) {
        console.error("Failed to upload image:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to upload image. Please try again.",
        });
      }
    };

    input.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "z": {
          event.preventDefault();
          if (event.shiftKey) {
            editor.redo();
          } else {
            editor.undo();
          }
          break;
        }
      }
    }

    // Handle Tab key for list indentation
    if (event.key === "Tab") {
      event.preventDefault();

      const { selection } = editor;
      if (!selection) return;

      const [node] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "list-item",
      });

      if (node) {
        // If Shift is held, unindent
        if (event.shiftKey) {
          Transforms.unwrapNodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "bulleted-list",
            split: true,
          });
        } else {
          // Indent: Wrap the list item in a new bulleted-list
          const block = { type: "bulleted-list", children: [] };
          Transforms.wrapNodes(editor, block);
        }
      }
    }

    // Handle Enter key in lists
    if (event.key === "Enter" && !event.shiftKey) {
      const { selection } = editor;
      if (!selection) return;

      const [node] = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n.type === "list-item",
      });

      if (node) {
        const [listItem] = node;
        const text = Node.string(listItem);

        // If the list item is empty, unindent or convert to paragraph
        if (text === "") {
          event.preventDefault();

          // Try to unwrap from bulleted-list first
          Transforms.unwrapNodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "bulleted-list",
            split: true,
          });

          // If we're still in a list item, convert it to a paragraph
          const [stillListItem] = Editor.nodes(editor, {
            match: (n) =>
              !Editor.isEditor(n) &&
              SlateElement.isElement(n) &&
              n.type === "list-item",
          });

          if (stillListItem) {
            Transforms.setNodes(editor, { type: "paragraph" });
          }
        }
      }
    }
  };

  const UndoButton = () => {
    const editor = useSlate();

    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("h-8 w-8 p-0")}
        onClick={() => editor.undo()}
        disabled={!editor.history?.undos?.length}
      >
        <Undo2 className="h-4 w-4" />
      </Button>
    );
  };

  const RedoButton = () => {
    const editor = useSlate();

    return (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={cn("h-8 w-8 p-0")}
        onClick={() => editor.redo()}
        disabled={!editor.history?.redos?.length}
      >
        <Redo2 className="h-4 w-4" />
      </Button>
    );
  };

  const LinkButton = () => {
    const editor = useSlate();
    const isActive = isLinkActive(editor);

    return (
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className={cn("h-8 w-8 p-0", isActive && "bg-muted")}
            onClick={() => {
              if (isActive) {
                toggleLink(editor, null);
              }
            }}
          >
            <Link2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowLinkDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => handleLinkSubmit(linkUrl)}
            >
              Add Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="rounded-lg border p-4">
      <Slate editor={editor} initialValue={content} onChange={handleChange}>
        {!readOnly && (
          <Toolbar className="sticky top-20 z-10 mb-2 bg-white">
            <UndoButton />
            <RedoButton />
            <MarkButton format="bold" icon="B" />
            <MarkButton format="italic" icon="I" />
            <LinkButton />
            <BlockButton format="heading-one" icon="H1" />
            <BlockButton format="heading-two" icon="H2" />
            <BlockButton format="heading-three" icon="H3" />
            <BlockButton format="heading-four" icon="H4" />
            <BlockButton format="heading-five" icon="H5" />
            <BlockButton format="heading-six" icon="H6" />
            <BlockButton format="bulleted-list" icon="•" />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => insertImage(editor)}
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </Toolbar>
        )}
        <div className="prose prose-slate mt-4 min-h-[200px] max-w-none">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={readOnly ? "" : "Write your content here..."}
            spellCheck
            className="outline-none"
            readOnly={readOnly}
            onKeyDown={handleKeyDown}
          />
        </div>
      </Slate>
    </div>
  );
};

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
};

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: Editor, format: CustomElement["type"]) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};

const toggleBlock = (editor: Editor, format: CustomElement["type"]) => {
  const isActive = isBlockActive(editor, format);
  const isList = format === "bulleted-list";

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ["bulleted-list"].includes(n.type),
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const MarkButton = ({ format, icon }: { format: string; icon: string }) => {
  const editor = useSlate();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn("h-8 w-8 p-0", isMarkActive(editor, format) && "bg-muted")}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const BlockButton = ({
  format,
  icon,
}: {
  format: CustomElement["type"];
  icon: string;
}) => {
  const editor = useSlate();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className={cn("h-8 w-8 p-0", isBlockActive(editor, format) && "bg-muted")}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

export default MarkdownEditor;
