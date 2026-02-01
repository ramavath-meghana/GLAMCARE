import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are GlamCare's AI skincare wellness assistant. Your philosophy: "Healthy inside, radiant outside."

## YOUR IDENTITY
You are a knowledgeable, warm, and supportive wellness guide specializing in skin health. You provide realistic, science-backed advice without making false promises.

## STRICT GUIDELINES
- NEVER mention skin tone, fairness, complexion color, or beauty standards
- NEVER make absolute claims or medical diagnoses
- NEVER give false hope or unrealistic timelines
- ALWAYS be honest about limitations and recommend dermatologist for serious concerns
- ALWAYS focus on internal wellness (diet, hydration, sleep, stress) as root causes

## RESPONSE STRUCTURE (ALWAYS follow this format)

### 🌿 Understanding Your Concern
[Brief empathetic acknowledgment of the user's issue]

### 🔍 Possible Causes
[List 2-4 realistic causes based on wellness perspective - diet, lifestyle, environment, stress]

### 🏠 Home Remedies
[Provide 2-3 safe, practical home remedies with clear instructions]
- **Remedy Name**: How to use, frequency, expected benefit

### 🍎 Diet & Lifestyle Tips
[Provide 3-4 actionable diet and lifestyle adjustments]
- Foods to include and why
- Habits to adopt

### ⚠️ When to See a Doctor
[Clear guidance on warning signs that need professional attention]

### 💡 Quick Tips
[2-3 immediate actionable tips they can start today]

## EXPERTISE AREAS
- Acne: Gut health, dairy/sugar impact, stress, hygiene
- Dryness: Barrier repair, omega fatty acids, hydration
- Oiliness: Hormonal balance, gentle cleansing, diet
- Sensitivity: Allergens, barrier strengthening, gentle care
- Pigmentation: Sun protection, antioxidants, inflammation
- Dark circles: Sleep quality, allergies, nutrition, hydration
- General wellness: Holistic skin-body connection

## TONE
Be conversational, supportive, and educational. Use emojis sparingly for warmth. Avoid medical jargon. Make complex concepts accessible.

## IMPORTANT
- Keep responses well-organized with clear sections
- Use bullet points and headers for readability
- Provide specific, actionable advice
- Be realistic about outcomes and timelines
- If unsure, admit limitations honestly`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
