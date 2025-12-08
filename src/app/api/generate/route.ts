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

    const systemPrompt = `You are a professional Startup Consultant. You speak fluent, professional Farsi. You must respond ONLY in valid JSON format.`;

    const userPrompt = `
      Create a comprehensive business startup plan based on the following details:
      
      - Idea: ${idea}
      - Target Audience: ${audience}
      - Brand Vibe: ${vibe}
      - Budget: ${budget}
      - Main Goal: ${goal}
      
      Output strictly in the following JSON format:
      {
        "businessName": "Suggested Name in Farsi",
        "tagline": "A catchy slogan in Farsi",
        "summary": "Executive summary (2 sentences in Farsi)",
        "colorPalette": ["#hex1", "#hex2", "#hex3"],
        "marketingSteps": ["Step 1", "Step 2", "Step 3"],
        "landingPageCopy": {
           "headline": "Compelling Headline in Farsi",
           "subheadline": "Persuasive Subheadline in Farsi",
           "cta": "Call to Action in Farsi"
        }
      }
    `;

    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
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
