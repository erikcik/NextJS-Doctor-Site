'use client'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Element as SlateElement } from 'slate';

type MarkdownDisplayProps = {
  turkishContent: string;
  englishContent: string;
};

const isEmailAddress = (text: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

export default function MarkdownDisplay({ turkishContent, englishContent }: MarkdownDisplayProps) {
  // Get the locale from the URL params
  const params = useParams();
  const locale = params?.locale as string;

  const content = locale === 'tr' ? turkishContent : englishContent;

  // Render a Slate node
  const renderNode = (node: any): JSX.Element | string | null => {
    if (node.text !== undefined) {
      let children = node.text;

      // Handle text formatting
      if (node.bold) {
        children = <strong key={children}>{children}</strong>;
      }
      if (node.italic) {
        children = <em key={children}>{children}</em>;
      }
      // Check if the text is an email address
      if (typeof children === 'string' && isEmailAddress(children.trim())) {
        children = (
          <a
            href={`mailto:${children.trim()}`}
            className="text-blue-600 underline decoration-blue-600/30 hover:decoration-blue-600 transition-colors"
            key={children}
          >
            {children}
          </a>
        );
      }
      if (node.link) {
        children = (
          <a
            href={node.link}
            className="text-blue-600 underline decoration-blue-600/30 hover:decoration-blue-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            key={children}
          >
            {children}
          </a>
        );
      }
      return children;
    }

    const children = node.children?.map((child: any, i: number) => (
      <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
    ));

    switch (node.type) {
      case 'paragraph':
        return <p className="mb-4">{children}</p>;
      case 'heading-one':
        return <h1 className="text-3xl font-bold mb-4">{children}</h1>;
      case 'heading-two':
        return <h2 className="text-2xl font-bold mb-3">{children}</h2>;
      case 'heading-three':
        return <h3 className="text-xl font-bold mb-3">{children}</h3>;
      case 'heading-four':
        return <h4 className="text-lg font-bold mb-2">{children}</h4>;
      case 'heading-five':
        return <h5 className="text-base font-bold mb-2">{children}</h5>;
      case 'heading-six':
        return <h6 className="text-sm font-bold mb-2">{children}</h6>;
      case 'bulleted-list':
        return <ul className="list-disc pl-6 mb-4">{children}</ul>;
      case 'list-item':
        return <li className="mb-1">{children}</li>;
      case 'image':
        return (
          <div className="my-4">
            <img
              src={node.url}
              alt={node.alt || ''}
              style={{
                width: node.width || 'auto',
                height: node.height || 'auto',
              }}
              className="max-w-full rounded-lg"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const content_parsed = useMemo(() => {
    try {
      return JSON.parse(content);
    } catch {
      return [{ type: 'paragraph', children: [{ text: content || '' }] }];
    }
  }, [content]);

  return (
    <article className="prose prose-slate max-w-none">
      {content_parsed.map((node: any, i: number) => (
        <div key={i}>{renderNode(node)}</div>
      ))}
    </article>
  );
} 