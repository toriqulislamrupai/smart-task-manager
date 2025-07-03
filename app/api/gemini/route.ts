import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key missing' }, { status: 500 });
  }

  const prompt = `Break the task "${title}" into 3-5 actionable subtasks.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await res.json();

    console.log("👀 Gemini API response:", JSON.stringify(data, null, 2));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const suggestions = text
      .split('\n')
      .map((s: string) => s.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean);

    // ✅ Add auto-dueDate (3 days from now)
    const autoDueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    return NextResponse.json({
      suggestions,
      status: suggestions.length > 0 ? 'completed' : 'pending',
      dueDate: autoDueDate,
    });
  } catch (error) {
    console.error('🔥 Gemini API Error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
