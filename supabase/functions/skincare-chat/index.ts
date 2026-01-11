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

    const systemPrompt = `You are GlamCare's AI skincare wellness assistant. Your core philosophy is: "Healthy inside, radiant outside."

IMPORTANT GUIDELINES:
- Focus on skin HEALTH, not beauty standards or appearance
- Never mention skin tone, fairness, or cosmetic beauty standards
- Emphasize that skin conditions often reflect internal health, diet, and lifestyle
- Provide educational, supportive, and non-judgmental responses
- Avoid absolute claims or medical diagnoses
- Recommend consulting a dermatologist for serious concerns

RESPONSE APPROACH:
1. Acknowledge the user's concern empathetically
2. Explain possible causes from a health/wellness perspective (diet, stress, hydration, sleep)
3. Suggest practical lifestyle adjustments
4. Recommend safe home remedies when appropriate
5. Mention when professional consultation is advisable

SKIN CONCERNS YOU CAN HELP WITH:
- Acne: Focus on diet (dairy, sugar), stress, hygiene, gut health
- Dryness: Hydration, humidifier use, gentle products, nutrition
- Oiliness: Hormonal balance, diet, proper cleansing
- Pigmentation: Sun protection, inflammation, internal health
- Sensitivity: Barrier repair, allergens, stress management
- Dark circles: Sleep, hydration, nutrition, allergies
- Aging concerns: Lifestyle factors, sun protection, nutrition

Always be warm, supportive, and wellness-focused. Your goal is to educate and empower, not to sell products or promote beauty standards.`;

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
