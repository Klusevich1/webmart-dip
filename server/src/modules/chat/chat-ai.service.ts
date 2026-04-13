import { Injectable } from "@nestjs/common";

const SYSTEM_PROMPT = `Ты — дружелюбный помощник дизайн-студии Webmart. Отвечай кратко (1–3 предложения), по-русски.
Услуги: рекламные креативы, motion-дизайн, UX/UI, брендинг. 
Отвечай на вопросы о дизайне, ценах, сроках. Если нужны детали — задавай уточняющие вопросы.
Когда пользователь готов оставить заявку, скажи: "Оставьте ваш телефон или email — мы свяжемся с вами."`;

@Injectable()
export class ChatAiService {
  async getResponse(
    messages: { role: string; text: string }[],
  ): Promise<string> {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.warn("[ChatAI] GROQ_API_KEY не задан в .env");
      return "ИИ пока недоступен. Оставьте заявку через кнопку ниже — мы свяжемся с вами.";
    }

    const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
    console.log(`[ChatAI] Groq запрос: model=${model}, messages=${messages.length}`);

    if (!messages.length) {
      return "Чем могу помочь? Опишите вашу задачу по дизайну.";
    }

    const openaiMessages = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...messages.map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("assistant" as const),
        content: m.text,
      })),
    ];

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: openaiMessages,
          max_tokens: 512,
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content?.trim() || "";

      if (res.status !== 200) {
        console.error("[ChatAI] Groq HTTP error:", {
          status: res.status,
          statusText: res.statusText,
          body: JSON.stringify(data, null, 2),
        });
        return "Ошибка подключения к ИИ. Оставьте заявку — мы ответим вручную.";
      }

      if (!text) {
        console.error("[ChatAI] Пустой ответ от Groq:", {
          fullResponse: JSON.stringify(data, null, 2),
        });
        return "Извините, не удалось обработать запрос. Оставьте заявку — мы свяжемся с вами.";
      }

      console.log(`[ChatAI] OK, ответ: ${text.slice(0, 80)}...`);
      return text;
    } catch (err) {
      console.error("[ChatAI] Groq API exception:", err);
      return "Ошибка подключения к ИИ. Оставьте заявку — мы ответим вручную.";
    }
  }
}
