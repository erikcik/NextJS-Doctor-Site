export function getExcerpt(turkishContent: string, englishContent: string) {
  try {
    // Parse the JSON content
    const turkishNodes = JSON.parse(turkishContent);
    const englishNodes = JSON.parse(englishContent);

    // Function to extract text from nodes, excluding h1 content
    const extractText = (nodes: any[]): string => {
      let text = '';
      for (const node of nodes) {
        // Skip if the node is a heading-one
        if (node.type === 'heading-one') {
          continue;
        }

        // Handle text nodes
        if (typeof node.text === 'string') {
          text += node.text;
        }

        // Recursively process children, but skip if parent is heading-one
        if (Array.isArray(node.children) && node.type !== 'heading-one') {
          text += extractText(node.children);
        }
      }
      return text;
    };

    // Get first 150 characters of content (excluding h1 content)
    const turkishExcerpt = extractText(turkishNodes).slice(0, 150) + '...';
    const englishExcerpt = extractText(englishNodes).slice(0, 150) + '...';

    return {
      tr: turkishExcerpt,
      en: englishExcerpt
    };
  } catch (error) {
    console.error('Error parsing content:', error);
    return {
      tr: 'Content not available',
      en: 'Content not available'
    };
  }
} 