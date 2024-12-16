import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

const PORT = 3000;

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

// Ретрансляция запроса к API модели
app.post("/proxy/santa", async (req, res) => {
  try {
    // console.log(req.body);
    const { messages } = req.body;
    const processedMessages = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));
    // Отправка запроса к API модели StudioAi21
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
    // Проверка успешного статуса ответа
    if (!response.ok) {
      console.error(`Error from StudioAi21: ${response.statusText}`);
      return res
        .status(response.status)
        .json({ error: `StudioAi21 API error: ${response.statusText}` });
    }

    // Извлечение тела ответа
    const { choices } = await response.json();
    // Пересылка данных клиенту
    res.json(choices[0].message);
  } catch (error) {
    console.error("Access error on StudioAi21:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server works on http://localhost:${PORT}`);
});
