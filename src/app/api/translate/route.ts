import { NextRequest, NextResponse } from "next/server";

const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate";
const DEEPL_AUTH_KEY = process.env.DEEPL_AUTH_KEY;

export async function POST(request: NextRequest) {
  try {
    const { text, preserveFormatting } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    // If the text is an array (from Slate editor), join it with newlines
    const textToTranslate = Array.isArray(text) ? text.join('\n') : text;

    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_AUTH_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [textToTranslate],
        source_lang: 'TR',
        target_lang: 'EN',
        split_sentences: '1',
        preserve_formatting: preserveFormatting || false
      }),
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    const translation = data.translations[0].text;
    
    return NextResponse.json({ translation });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: "Failed to translate text" },
      { status: 500 }
    );
  }
} 