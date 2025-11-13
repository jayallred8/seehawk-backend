export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body || {};

  return res.status(200).json({
    reply: `SEEHAWK test OK. Received: "${message}".`
  });
}
