"use client";

import { useState, useRef, useEffect } from "react";

type MessageRole = "bot" | "user";

type Message = {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  quickReplies?: string[];
};

type ConversationData = {
  designType?: string;
  format?: string;
  details?: string;
  contact?: string;
};

type Phase = "design" | "format" | "details" | "contact";

const BotAvatar = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1H2a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zM7.5 13A1.5 1.5 0 006 14.5 1.5 1.5 0 007.5 16 1.5 1.5 0 009 14.5 1.5 1.5 0 007.5 13zm9 0a1.5 1.5 0 00-1.5 1.5 1.5 1.5 0 001.5 1.5 1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5z" />
  </svg>
);

function formatTime(date: Date) {
  return date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationData, setConversationData] = useState<ConversationData>({});
  const [phase, setPhase] = useState<Phase>("design");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [useAiMode, setUseAiMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (
    role: MessageRole,
    text: string,
    quickReplies?: string[]
  ) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      role,
      text,
      timestamp: new Date(),
      quickReplies,
    };
    setMessages((prev) => [...prev, msg]);
  };

  const botReply = (text: string, quickReplies?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage("bot", text, quickReplies);
      setIsTyping(false);
    }, 500);
  };

  const initializeChat = () => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    setPhase("design");
    setConversationData({});
    addMessage(
      "bot",
      "Привет! Я помощник Webmart. Подберём дизайн под вашу задачу. Какой тип дизайна вам нужен?",
      [
        "Рекламные креативы",
        "Motion-дизайн",
        "UX/UI",
        "Брендинг",
        "Расскажу в сообщении",
        "Оставить заявку",
      ]
    );
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  const handleQuickReply = (text: string) => {
    addMessage("user", text);

    if (text === "Оставить заявку") {
      setPhase("contact");
      botReply(
        "Как с вами связаться? Напишите телефон или email, либо выберите мессенджер.",
        ["Telegram", "WhatsApp", "Позвоните мне"]
      );
      return;
    }

    if (phase === "design") {
      setConversationData((prev) => ({ ...prev, designType: text }));
      if (text === "Расскажу в сообщении") {
        setPhase("details");
        botReply("Хорошо, опишите вашу задачу в сообщении ниже.");
      } else {
        setPhase("format");
        botReply("Отлично! Для чего нужен дизайн?", [
          "Реклама в соцсетях",
          "Контекстная реклама",
          "Сайт или приложение",
          "Презентации",
          "Упаковка",
        ]);
      }
      return;
    }

    if (phase === "format") {
      setConversationData((prev) => ({ ...prev, format: text }));
      setPhase("details");
      botReply(
        "Понял. Опишите задачу подробнее или напишите, как с вами связаться."
      );
      return;
    }

    setPhase("contact");
    botReply(
      "Как с вами связаться? Напишите телефон или email, либо выберите мессенджер.",
      ["Telegram", "WhatsApp", "Позвоните мне"]
    );
  };

  const handleChipContact = (chip: string) => {
    addMessage("user", chip);
    if (chip === "Позвоните мне") {
      botReply("Напишите ваш номер телефона в поле ниже:");
      setPhase("contact");
      return;
    }
    setConversationData((prev) => ({ ...prev, contact: chip }));
    submitConversation(chip);
  };

  const submitConversation = async (contactInfo?: string) => {
    const parts: string[] = [];
    if (conversationData.designType)
      parts.push(`Тип дизайна: ${conversationData.designType}`);
    if (conversationData.format)
      parts.push(`Формат: ${conversationData.format}`);
    if (conversationData.details)
      parts.push(`Детали: ${conversationData.details}`);
    if (contactInfo) parts.push(`Контакт: ${contactInfo}`);

    let fullMessage = parts.join("\n");
    if (!fullMessage && messages.length > 0) {
      fullMessage = messages
        .filter((m) => m.role === "user")
        .map((m) => m.text)
        .join("\n");
    }
    if (!fullMessage) fullMessage = "Заявка из чат-бота";

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/chat-requests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: fullMessage,
            contact: contactInfo || conversationData.contact || null,
            name: null,
          }),
        }
      );

      if (res.ok) {
        setIsSubmitted(true);
        botReply("Спасибо! Мы свяжемся с вами в ближайшее время.");
      } else {
        botReply("Не удалось отправить. Позвоните нам: +375 29 182 82 75");
      }
    } catch {
      botReply("Ошибка отправки. Позвоните: +375 29 182 82 75");
    }
  };

  const fetchAiResponse = async (messageList: { role: string; text: string }[]) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/chat-requests/ai-message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: messageList }),
        }
      );
      const data = await res.json();
      return data?.text || "Не удалось получить ответ. Оставьте заявку — мы свяжемся.";
    } catch {
      return "Ошибка соединения. Оставьте заявку — мы свяжемся с вами.";
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    addMessage("user", text);
    setInputValue("");

    if (phase === "contact") {
      setConversationData((prev) => ({ ...prev, contact: text }));
      submitConversation(text);
      return;
    }

    if (useAiMode) {
      setIsTyping(true);
      const messageList = [
        ...messages.map((m) => ({ role: m.role, text: m.text })),
        { role: "user", text },
      ];
      const aiText = await fetchAiResponse(messageList);
      addMessage("bot", aiText);
      setIsTyping(false);
      return;
    }

    setUseAiMode(true);
    setIsTyping(true);
    const messageList = [
      ...messages.map((m) => ({ role: m.role, text: m.text })),
      { role: "user", text },
    ];
    const aiText = await fetchAiResponse(messageList);
    addMessage("bot", aiText);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-webmart-accent hover:bg-webmart-accent/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        aria-label="Открыть чат"
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-in-up">
          {/* Header */}
          <div className="bg-webmart-accent text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                <BotAvatar />
              </div>
              <div>
                <h3 className="font-semibold">Webmart</h3>
                <p className="text-xs opacity-90">онлайн</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label="Свернуть чат"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.role === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-webmart-accent/90 flex items-center justify-center text-white flex-shrink-0">
                    <BotAvatar />
                  </div>
                )}
                <div
                  className={`max-w-[80%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2.5 ${
                      msg.role === "user"
                        ? "bg-webmart-accent text-white rounded-br-md"
                        : "bg-gray-200 text-gray-900 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {formatTime(msg.timestamp)}
                  </span>
                  {msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.quickReplies.map((label) => {
                        const isContact =
                          label === "Telegram" ||
                          label === "WhatsApp" ||
                          label === "Позвоните мне";
                        return (
                          <button
                            key={label}
                            onClick={() =>
                              isContact
                                ? handleChipContact(label)
                                : handleQuickReply(label)
                            }
                            className="px-3 py-1.5 text-xs font-medium rounded-full border-2 border-webmart-accent text-webmart-accent bg-white hover:bg-webmart-accent hover:text-white transition-colors"
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-webmart-accent/90 flex items-center justify-center text-white flex-shrink-0">
                  <BotAvatar />
                </div>
                <div className="bg-gray-200 text-gray-500 rounded-2xl rounded-bl-md px-4 py-2.5">
                  <span className="inline-flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-200 shrink-0">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <button
                type="button"
                onClick={() => handleQuickReply("Оставить заявку")}
                className="text-[10px] text-webmart-accent hover:underline"
              >
                Оставить заявку
              </button>
              <p className="text-[10px] text-gray-400">Политика конфиденциальности</p>
            </div>
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Введите сообщение..."
                className="flex-1 px-4 py-2.5 rounded-full border-2 border-gray-200 focus:border-webmart-accent focus:outline-none text-gray-900 placeholder:text-gray-400 text-sm"
                disabled={isSubmitted}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-full bg-webmart-accent text-white flex items-center justify-center hover:bg-webmart-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                aria-label="Отправить"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
