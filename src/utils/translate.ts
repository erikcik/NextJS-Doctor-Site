const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";
const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY;

export async function translateText(text: string, from: string = "TR", to: string = "EN") {
  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_AUTH_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        source_lang: from,
        target_lang: to,
        formality: "default"
      }),
    });
    
    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
}

// Helper function to extract plain text from Slate nodes
export function extractTextFromNodes(nodes: any[]): string {
  return nodes.map(node => {
    if (node.text) {
      return node.text;
    }
    if (node.children) {
      return extractTextFromNodes(node.children);
    }
    return '';
  }).join(' ');
} 