import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  // --- CORS HEADERS ---
  // You can replace "*" with your exact Shopify domain later for tighter security,
  // e.g. "https://your-store.myshopify.com"
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Missing 'message' in body" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are SEEHAWK AI — a sharp, structured personal assistant that helps with studying, schedules, task breakdowns, and business workflows. Always reply with clarity and organization."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const reply = response.choices[0].message.content;
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("SEEHAWK error:", err);
    return res.status(500).json({
      error: "SEEHAWK failed",
      details: err.message
    });
  }
}
