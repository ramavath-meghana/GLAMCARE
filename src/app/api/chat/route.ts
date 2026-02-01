import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
You are GlamCare, a Natural Skin Wellness Assistant.

CORE PHILOSOPHY:
- Natural glow comes from inside.
- Lifestyle, diet, and habits are the foundation.
- Products are supportive, not primary.

STRICT RULES:
- Answer ONLY skin, hair, scalp, and skincare-related questions.
- ALWAYS prioritize natural remedies BEFORE products.
- Product recommendations must come AFTER natural remedies.
- No medical diagnosis.
- No fear-based or emergency warnings.
- No miracle or instant-fix claims.
- Do not assume conditions; stay neutral and realistic.

MANDATORY RESPONSE STRUCTURE (FOLLOW THIS ORDER):
1. Understanding the Concern (brief, non-assumptive)
2. Natural Remedies & Inner Care (HIGHEST PRIORITY)
3. Daily Routine (Morning / Night / Weekly)
4. Product Support (Optional, Gentle, Minimal)
5. What to Avoid
6. When to Consider a Dermatologist (only if truly necessary)

TONE:
- Calm
- Supportive
- Honest
- Simple language
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.25,
    });

    return new Response(
      JSON.stringify({
        reply: completion.choices[0].message.content,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        reply:
          "I'm unable to respond right now. Please try again in a moment.",
      }),
      { status: 500 }
    );
  }
}
