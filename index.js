import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const STUDIO_AI_21 = "https://api.ai21.com/studio/v1/chat/completions";
// enable CORS for cross-browser support
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});
app.use(express.json());

//proxy for StudioAI21
app.post("/proxy/santa", async (req, res) => {
  try {
    const { messages } = req.body;
    const processedMessages = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));
    // Sent response to the StudioAi21 API
    const response = await fetch(`${STUDIO_AI_21}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STUDIO_AI_21_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "jamba-1.5-mini",
        messages: processedMessages,
      }),
    });

    if (!response.ok) {
      console.error(`Error from StudioAi21: ${response.statusText}`);
      return res
        .status(response.status)
        .json({ error: `StudioAi21 API error: ${response.statusText}` });
    }

    const { choices } = await response.json();

    res.json(choices[0].message);
  } catch (error) {
    console.error("Access error on StudioAi21:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server works on http://localhost:${PORT}`);
});
