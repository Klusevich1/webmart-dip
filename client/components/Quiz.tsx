"use client";

import { useState } from "react";

interface QuizData {
  designType: string;
  format: string;
  purposes: string[];
  budget: string;
  timeline: string;
  contactMethod: string;
  name: string;
  phone: string;
}

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizData, setQuizData] = useState<QuizData>({
    designType: "",
    format: "",
    purposes: [],
    budget: "",
    timeline: "",
    contactMethod: "",
    name: "",
    phone: "",
  });

  const steps = [
    {
      title: "Тип дизайна",
      question: "Какой тип дизайн-услуги вам нужен?",
      type: "single",
      options: [
        "Рекламные креативы (баннеры, статика)",
        "Motion-дизайн и видео",
        "UX/UI дизайн",
        "Брендинг и фирменный стиль",
        "Несколько видов",
      ],
      field: "designType",
    },
    {
      title: "Формат",
      question: "Для чего нужен дизайн?",
      type: "single",
      options: [
        "Реклама в соцсетях",
        "Контекстная реклама (Google, Яндекс)",
        "Сайт или приложение",
        "Презентации и материалы",
        "Упаковка и мерч",
      ],
      field: "format",
    },
    {
      title: "Задачи",
      question: "Какие задачи должен решить дизайн?",
      type: "multiple",
      options: [
        "Привлечь внимание",
        "Увеличить конверсию",
        "Узнаваемость бренда",
        "Продать продукт",
        "Улучшить пользовательский опыт",
      ],
      field: "purposes",
    },
    {
      title: "Бюджет",
      question: "Примерный бюджет на дизайн?",
      type: "single",
      options: [
        "До 50 000 BYN",
        "50 000 — 150 000 BYN",
        "150 000 — 300 000 BYN",
        "300 000 — 500 000 BYN",
        "Более 500 000 BYN",
      ],
      field: "budget",
    },
    {
      title: "Сроки",
      question: "Когда планируете начать?",
      type: "single",
      options: [
        "Как можно скорее",
        "В течение месяца",
        "Через 1–3 месяца",
        "Пока изучаю варианты",
      ],
      field: "timeline",
    },
    {
      title: "Способ связи",
      question: "Как с вами удобнее связаться?",
      type: "single",
      options: ["По телефону", "Через мессенджеры", "По email"],
      field: "contactMethod",
    },
  ];

  const handleOptionSelect = (
    field: keyof QuizData,
    value: string,
    isMultiple: boolean = false
  ) => {
    if (isMultiple) {
      const currentValues = quizData[field] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      setQuizData((prev) => ({ ...prev, [field]: newValues }));
    } else {
      setQuizData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      // Переходим к форме контактов
      setCurrentStep(steps.length);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Преобразуем данные для отправки на сервер
      const submissionData = {
        answers: {
          businessType: quizData.businessType,
          budget: quizData.budget,
          services: quizData.services,
          timeline: quizData.timeline,
          goals: quizData.goals,
        },
        contactMethod: quizData.contactMethod === "По телефону"
          ? "phone"
          : quizData.contactMethod === "Через мессенджеры"
          ? "messenger"
          : quizData.contactMethod === "По email"
          ? "email"
          : "phone", // fallback
        name: quizData.name,
        phone: quizData.phone,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz-submissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionData),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Server error:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Error details:", errorText);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    const step = steps[currentStep];
    const value = quizData[step.field as keyof QuizData];

    if (step.type === "multiple") {
      return (value as string[]).length > 0;
    }
    return value !== "" && value !== null;
  };

  if (isSubmitted) {
    return (
      <div className="card max-w-md mx-auto text-center py-8 md:py-12 px-4 sm:px-6 md:px-8">
        <h3 className="text-2xl font-bold text-white mb-4">
          Спасибо за ответы!
        </h3>
        <p className="text-white text-opacity-80 mb-6">
          Мы изучим вашу заявку и предложим решение по дизайну в ближайшее время.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(0);
            setQuizData({
              designType: "",
              format: "",
              purposes: [],
              budget: "",
              timeline: "",
              contactMethod: "",
              name: "",
              phone: "",
            });
          }}
          className="btn-secondary"
        >
          Пройти квиз заново
        </button>
      </div>
    );
  }

  if (currentStep === steps.length) {
    // Contact form step
    return (
      <div className="card max-w-md mx-auto p-4 sm:p-6 md:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 md:mb-6 text-center">
          Контактная информация
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-white text-opacity-80 mb-2">
              Имя *
            </label>
            <input
              type="text"
              value={quizData.name}
              onChange={(e) =>
                setQuizData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="input-field"
              placeholder="Ваше имя"
              required
            />
          </div>

          <div>
            <label className="block text-white text-opacity-80 mb-2">
              Телефон *
            </label>
            <input
              type="tel"
              value={quizData.phone}
              onChange={(e) =>
                setQuizData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="input-field"
              placeholder="+375 (__) ___-__-__"
              required
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={handlePrev} className="btn-secondary flex-1">
              Назад
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !quizData.name || !quizData.phone}
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const step = steps[currentStep];

  return (
    <div className="card max-w-md mx-auto p-4 sm:p-6 md:p-8">
      {/* Progress bar */}
      <div className="mb-4 md:mb-6">
        <div className="flex justify-between text-sm text-white text-opacity-60 mb-2">
          <span>
            Шаг {currentStep + 1} из {steps.length}
          </span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-webmart-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{step.title}</h3>
      <p className="text-sm sm:text-base text-white text-opacity-80 mb-4 md:mb-6">{step.question}</p>

      <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
        {step.options.map((option) => {
          const isSelected =
            step.type === "multiple"
              ? (quizData[step.field as keyof QuizData] as string[]).includes(
                  option
                )
              : quizData[step.field as keyof QuizData] === option;

          return (
            <button
              key={option}
              onClick={() =>
                handleOptionSelect(
                  step.field as keyof QuizData,
                  option,
                  step.type === "multiple"
                )
              }
              className={`w-full text-left p-3 sm:p-4 text-sm sm:text-base rounded-lg border transition-all duration-200 ${
                isSelected
                  ? "border-webmart-accent bg-webmart-accent bg-opacity-20 text-white"
                  : "border-white border-opacity-20 bg-white bg-opacity-5 text-white text-opacity-80 hover:bg-opacity-10"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex gap-2 md:gap-3">
        {currentStep > 0 && (
          <button onClick={handlePrev} className="btn-secondary flex-1">
            Назад
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!isStepValid()}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === steps.length - 1 ? "Завершить" : "Далее"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
