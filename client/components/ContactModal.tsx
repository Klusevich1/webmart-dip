'use client'

import { useState } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  serviceTitle?: string
}

const ContactModal = ({ isOpen, onClose, serviceTitle }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          sourcePage: serviceTitle ? `service:${serviceTitle}` : 'modal'
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            phone: '',
            email: '',
            company: '',
            message: ''
          })
          onClose()
        }, 3000)
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-webmart-accent text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">
              {serviceTitle ? `Заказать ${serviceTitle}` : 'Связаться с нами'}
            </h3>
            <button
              onClick={onClose}
              className="text-white hover:text-opacity-80 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Спасибо за заявку!</h3>
              <p className="text-gray-600">
                Мы свяжемся с вами в ближайшее время для обсуждения деталей.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Имя *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-webmart-accent focus:border-transparent"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Телефон *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-webmart-accent focus:border-transparent"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-webmart-accent focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Компания
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-webmart-accent focus:border-transparent"
                  placeholder="Название компании"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Сообщение
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-webmart-accent focus:border-transparent resize-none"
                  placeholder="Опишите ваш проект или задачу..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !formData.name || !formData.phone}
                className="w-full bg-webmart-accent hover:bg-opacity-90 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Отправка...' : 'Отправить заявку'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactModal



