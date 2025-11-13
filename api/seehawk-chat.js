import OpenAI from "openai";

// Make sure you add your API key in Vercel → Settings → Environment Variables
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
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
          content: "You are SEEHAWK AI, a personal assistant that organizes schedules, tasks, study plans, work priorities, and gives clear structured responses."
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
