"use client";

import { useState } from "react";

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            sourcePage: "contacts",
          }),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Контакты
          </h1>
          <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-2xl font-bold text-white mb-6">Напишите нам</h2>

            {isSubmitted ? (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Спасибо за сообщение!
                </h3>
                <p className="text-white text-opacity-80">
                  Мы свяжемся с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-opacity-80 mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-white text-opacity-80 mb-2">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="+375 (__) ___-__-__"
                  />
                </div>

                <div>
                  <label className="block text-white text-opacity-80 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white text-opacity-80 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Опишите ваш вопрос или проект..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={
                    isLoading ||
                    !formData.name ||
                    !formData.phone ||
                    !formData.message
                  }
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Отправка..." : "Отправить сообщение"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">
                Контактная информация
              </h2>

              <div className="space-y-6">
                <div>
                  <p className="text-webmart-accent text-sm mb-1">Email</p>
                  <a
                    href="mailto:ad@webmart.by"
                    className="text-white hover:text-webmart-accent transition-colors"
                  >
                    ad@webmart.by
                  </a>
                </div>

                <div>
                  <p className="text-webmart-accent text-sm mb-1">Телефон</p>
                  <a
                    href="tel:+375291828275"
                    className="text-white hover:text-webmart-accent transition-colors"
                  >
                    +375 29 182 82 75
                  </a>
                </div>

                <div>
                  <p className="text-webmart-accent text-sm mb-1">Адрес</p>
                  <p className="text-white text-opacity-80">
                    Минск
                  </p>
                </div>

                <div>
                  <p className="text-webmart-accent text-sm mb-1">Режим работы</p>
                  <p className="text-white text-opacity-80">
                    Пн-Пт: 9:00 — 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">
                Мы в соцсетях
              </h2>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://t.me/webmartby"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white border-opacity-40 hover:border-webmart-accent hover:text-webmart-accent transition-colors text-white text-sm"
                >
                  Telegram
                </a>
                <a
                  href="https://www.instagram.com/webmart.by"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white border-opacity-40 hover:border-webmart-accent hover:text-webmart-accent transition-colors text-white text-sm"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/WebmartGroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-white border-opacity-40 hover:border-webmart-accent hover:text-webmart-accent transition-colors text-white text-sm"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-6">
                Как нас найти
              </h2>
              <div className="overflow-hidden rounded-lg border border-white border-opacity-10">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A4ef502ea508b91964866f79dc033cbaaa8ae5b6aa078d34915d7663dd822fcbb&amp;source=constructor"
                  width="100%"
                  height="350"
                  frameBorder="0"
                  allowFullScreen
                  title="Карта"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 card">
          <h2 className="text-2xl font-bold text-white mb-8">
            Почему выбирают нас?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-2 border-webmart-accent pl-6">
              <span className="text-webmart-accent text-sm font-medium">01</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">
                Быстрый отклик
              </h3>
              <p className="text-white text-opacity-80 text-sm">
                Отвечаем на все запросы в течение 2 часов в рабочее время
              </p>
            </div>

            <div className="border-l-2 border-webmart-accent pl-6">
              <span className="text-webmart-accent text-sm font-medium">02</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">
                Индивидуальный подход
              </h3>
              <p className="text-white text-opacity-80 text-sm">
                Каждому клиенту уделяем максимум внимания и разрабатываем персональные решения
              </p>
            </div>

            <div className="border-l-2 border-webmart-accent pl-6">
              <span className="text-webmart-accent text-sm font-medium">03</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-2">
                Прозрачная отчётность
              </h3>
              <p className="text-white text-opacity-80 text-sm">
                Подробные отчёты о проделанной работе и достигнутых результатах
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
