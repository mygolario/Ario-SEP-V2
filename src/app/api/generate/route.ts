
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const systemPrompt = `
You are an expert Startup Consultant & AI Architect specialized in the Iranian market.
Your task is to generate a comprehensive, professional Business Plan for a new startup based on user input.

Output Format: JSON only. No markdown. No intro/outro text.
Structure:
{
  "businessName": "Suggest a creative, modern Farsi name",
  "tagline": "A catchy Farsi slogan",
  "summary": "A professional executive summary (2-3 paragraphs) in Farsi",
  "colorPalette": ["#Hex1", "#Hex2", "#Hex3", "#Hex4"],
  "marketingSteps": [
    "Step 1 (Farsi)",
    "Step 2 (Farsi)",
    "Step 3 (Farsi)",
    "Step 4 (Farsi)",
    "Step 5 (Farsi)"
  ],
    "landingPageCopy": {
    "headline": "High-converting H1 outcome-based headline in Farsi",
    "subheadline": "Persuasive H2 subheadline in Farsi",
    "cta": "Strong Call to Action button text in Farsi",
    "features": [
        { "title": "Feature 1 (Farsi)", "description": "Short benefit description (Farsi)", "iconName": "Zap" },
        { "title": "Feature 2 (Farsi)", "description": "Short benefit description (Farsi)", "iconName": "Shield" },
        { "title": "Feature 3 (Farsi)", "description": "Short benefit description (Farsi)", "iconName": "TrendingUp" }
    ],
    "testimonials": [
        { "name": "Customer Name (Farsi)", "role": "Job Title (Farsi)", "quote": "Short glowing review (Farsi)" },
        { "name": "Customer Name (Farsi)", "role": "Job Title (Farsi)", "quote": "Short glowing review (Farsi)" }
    ],
    "footer": {
        "copyrightText": "© 2024 Business Name. All rights reserved (Farsi)",
        "socialLinks": ["Instagram", "LinkedIn", "Twitter"]
    }
  },
  "logoSVG": "<svg ...> ... </svg>",
  "leanCanvas": {
    "problem": "Top 1-3 problems (Farsi)",
    "solution": "Top 1-3 features (Farsi)",
    "uniqueValue": "Single, clear, compelling message (Farsi)",
    "unfairAdvantage": "Can't be easily copied or bought (Farsi)",
    "customerSegments": "Target customers (Farsi)",
    "channels": "Path to customers (Farsi)",
    "revenueStream": "Revenue model (Farsi)",
    "costStructure": "Fixed and variable costs (Farsi)"
  },
  "legal": {
    "ndaSummary": "A 1-paragraph summary of confidentiality terms in Farsi.",
    "founderRoles": ["CEO Role description", "CTO Role description"],
    "riskFactors": ["Risk 1", "Risk 2", "Risk 3"]
  },
  "financials": {
    "suggestedPrice": 500000, 
    "costPerUnit": 150000,
    "initialUsers": 100,
    "monthlyGrowth": 10
  },
  "marketAnalysis": {
    "tam": "Estimated Total Market Size (e.g., $10B)",
    "sam": "Serviceable Market (e.g., $1B)",
    "som": "Target Market (e.g., $100M)",
    "competitors": [
        { "name": "Competitor A", "strength": "...", "weakness": "..." },
        { "name": "Competitor B", "strength": "...", "weakness": "..." },
        { "name": "Competitor C", "strength": "...", "weakness": "..." }
    ]
  },
  "roadmap": [
     { "week": "هفته اول", "focus": "Research & Setup", "tasks": ["Task 1", "Task 2"] },
     { "week": "هفته دوم", "focus": "MVP Development", "tasks": ["Task 1", "Task 2"] },
     { "week": "هفته سوم", "focus": "Marketing & Launch", "tasks": ["Task 1", "Task 2"] },
     { "week": "هفته چهارم", "focus": "Growth & Scale", "tasks": ["Task 1", "Task 2"] }
  ]
}

Role:
- Act as a senior consultant.
- Use formal but engaging, modern Farsi (Persian).
- Ensure the 'logoSVG' is a simple, modern, geometric design using the generated colorPalette.
- Ensure the 'roadmap' is actionable and specific.
`;

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { idea, stage, budget } = body;

    const completion = await openai.chat.completions.create({
      model: "google/gemini-flash-1.5",
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `Startup Idea: ${idea}\nCurrent Stage: ${stage}\nBudget: ${budget}\n\nGenerate the complete JSON business plan.` 
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error("No content generated");
    }

    const businessData = JSON.parse(content);

    // Save to Supabase
    const { data: project, error: dbError } = await supabase
      .from('projects')
      .insert({
        user_id: user.id,
        business_data: businessData
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
    }

    return NextResponse.json({ ...businessData, projectId: project.id });

  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate plan' },
      { status: 500 }
    );
  }
}
