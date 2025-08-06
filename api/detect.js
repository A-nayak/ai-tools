export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const imageBuffer = Buffer.from(await req.arrayBuffer());
    const HF_API_URL = "https://api-inference.huggingface.co/models/prithivMLmods/deepfake-detector-model-v1";
    const HF_API_KEY = process.env.HF_API_KEY;

    const hfRes = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/octet-stream"
      },
      body: imageBuffer
    });

    const data = await hfRes.json();
    res.status(200).json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
