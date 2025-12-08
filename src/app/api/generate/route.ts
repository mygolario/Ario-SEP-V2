import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with OpenRouter configuration
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idea, audience, vibe, budget, goal } = body;

    if (!idea || !audience || !vibe || !budget || !goal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const systemPrompt = `
    You are a professional Startup Consultant and an expert Graphic Designer. You speak fluent, professional Farsi.
    
    You must analyze the following user inputs and generate a comprehensive business plan in JSON format.
    
    User Inputs:
    - Idea: ${idea}
    - Audience: ${audience}
    - Vibe: ${vibe}
    - Budget: ${budget}
    - Goal: ${goal}

    Instructions:
    1. "businessName": Suggest a creative, catchy name in FARSI.
    2. "tagline": A short, punchy slogan in FARSI.
    3. "summary": A 2-sentence executive summary in FARSI.
    4. "colorPalette": An array of 3 hex color codes.
    5. "marketingSteps": An array of 3 actionable marketing steps in FARSI.
    6. "landingPageCopy": An object with "headline", "subheadline", and "cta" (Call to Action) in FARSI.
    7. "logoSVG": Create a modern, professional, minimalist SVG code string for this business. Use the suggested color palette. The SVG should be simple (icon + text or abstract shape). Do NOT use markdown code blocks, just the raw SVG string starting with <svg and ending with </svg>.

    Your response MUST be a valid JSON object with the following structure:
    {
      "businessName": "...",
      "tagline": "...",
      "summary": "...",
      "colorPalette": ["...", "...", "..."],
      "marketingSteps": ["...", "...", "..."],
      "landingPageCopy": {
        "headline": "...",
        "subheadline": "...",
        "cta": "..."
      },
      "logoSVG": "<svg ...>...</svg>"
    }
    `;

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Generate the business plan.' },
      ],
      response_format: { type: 'json_object' },
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
       throw new Error('No content received from AI');
    }

    const parsedContent = JSON.parse(content);

    return NextResponse.json(parsedContent);
  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
