"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ContactModal from "@/components/ContactModal";
import { apiClient, ServiceCategory, Service } from "@/lib/api";

interface ServiceData {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  results: string[];
  packages: Array<{
    name: string;
    price: string;
    features: string[];
  }>;
  category: {
    name: string;
    slug: string;
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

function CategoryPageContent({
  category,
  onContact,
}: {
  category: ServiceCategory;
  onContact: () => void;
}) {
  return (
    <>
      <div className="mb-12">
        {category.subtitle && (
          <p className="text-webmart-accent text-lg font-medium mb-2">{category.subtitle}</p>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{category.name}</h1>
        <p className="text-xl text-white text-opacity-80 max-w-3xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {category.ctaText && (
        <p className="text-white text-lg mb-8">{category.ctaText}</p>
      )}

      {/* Services grid */}
      {category.services && category.services.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="card group hover:scale-[1.02] transition-transform"
              >
                <div className="flex justify-between items-start gap-3 mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-webmart-accent transition-colors min-w-0 flex-1">
                    {service.name}
                  </h3>
                  <span className="text-webmart-accent font-semibold text-sm whitespace-nowrap shrink-0">
                    {service.packages?.[0]?.price || "Цена по запросу"}
                  </span>
                </div>
                <p className="text-white text-opacity-80 mb-4">{service.shortDescription}</p>
                <span className="text-webmart-accent group-hover:text-white transition-colors font-medium">
                  Подробнее →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {category.tags && category.tags.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">Подуслуги</h2>
          <div className="flex flex-wrap gap-2">
            {category.tags.map((tag, idx) => (
              <Link
                key={idx}
                href={`/services/${tag.slug}`}
                className="inline-block px-4 py-2 text-sm lowercase border border-white border-opacity-40 hover:border-webmart-accent hover:text-webmart-accent transition-colors"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="text-center card">
        <h2 className="text-3xl font-bold text-white mb-4">Готовы начать?</h2>
        <p className="text-white text-opacity-80 mb-6 max-w-md mx-auto">
          Свяжитесь с нами для обсуждения деталей и подбора подходящей услуги
        </p>
        <button onClick={onContact} className="btn-primary">
          Обсудить проект
        </button>
      </div>
    </>
  );
}

function ServicePageContent({
  service,
  onContact,
}: {
  service: ServiceData;
  onContact: () => void;
}) {
  return (
    <>
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{service.name}</h1>
        <p className="text-xl text-white text-opacity-80 max-w-2xl">
          {service.shortDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2">
          <div className="card mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Описание услуги</h2>
            <p className="text-white text-opacity-80 leading-relaxed">{service.fullDescription}</p>
          </div>

          {service.features && service.features.length > 0 && (
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Что входит в услугу</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-webmart-accent mr-3 mt-1">✓</span>
                    <span className="text-white text-opacity-80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service.results && service.results.length > 0 && (
            <div className="card">
              <h2 className="text-2xl font-bold text-white mb-4">Ожидаемый результат</h2>
              <div className="space-y-3">
                {service.results.map((result, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-webmart-accent mr-3 mt-1">✓</span>
                    <span className="text-white text-opacity-80">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          {service.packages && service.packages.length > 0 && (
            <div className="card sticky top-4">
              <h2 className="text-2xl font-bold text-white mb-6">Тарифы</h2>
              <div className="space-y-4">
                {service.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="border border-white border-opacity-20 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                      <span className="text-webmart-accent font-bold">{pkg.price}</span>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-white text-opacity-70 text-sm flex items-start"
                        >
                          <span className="text-webmart-accent mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={onContact} className="btn-primary w-full mt-6">
            Связаться с нами
          </button>
        </div>
      </div>

      <div className="text-center card">
        <h2 className="text-3xl font-bold text-white mb-4">Готовы начать?</h2>
        <p className="text-white text-opacity-80 mb-6 max-w-md mx-auto">
          Свяжитесь с нами для обсуждения деталей и начала работы над вашим проектом
        </p>
        <button onClick={onContact} className="btn-primary">
          Обсудить проект
        </button>
      </div>
    </>
  );
}

export default function ServiceOrCategoryPage({ params }: PageProps) {
  const [category, setCategory] = useState<ServiceCategory | null>(null);
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        try {
          const cat = await apiClient.getCategory(params.slug);
          setCategory(cat);
          setService(null);
          return;
        } catch {
          // not a category, try service
        }
        const svc = await apiClient.getService(params.slug);
        setService(svc as ServiceData);
        setCategory(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Страница не найдена");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-webmart-accent mx-auto mb-4"></div>
          <p className="text-white">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (error || (!category && !service)) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="card text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Страница не найдена</h1>
          <p className="text-white text-opacity-80 mb-6">{error}</p>
          <Link href="/services" className="btn-primary">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbName = category ? category.name : service!.name;

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/services" className="text-webmart-accent hover:text-white transition-colors">
            Каталог услуг
          </Link>
          <span className="text-white text-opacity-60 mx-2">/</span>
          <span className="text-white">{breadcrumbName}</span>
        </div>

        {category ? (
          <CategoryPageContent category={category} onContact={() => setIsModalOpen(true)} />
        ) : service ? (
          <ServicePageContent service={service} onContact={() => setIsModalOpen(true)} />
        ) : null}
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle={category?.name || service?.name || ""}
      />
    </div>
  );
}
