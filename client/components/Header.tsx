'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const activeLinkStyle = 'text-white lowercase text-sm font-normal underline underline-offset-1'
const activeLinkGlitch = {}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/about', label: 'о нас' },
    { href: '/blog', label: 'блог' },
    { href: '/vacancies', label: 'вакансии' },
    { href: '/contacts', label: 'контакты' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-webmart-bg border-b border-white border-opacity-10">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 hover:opacity-90 transition-opacity">
            {!logoError ? (
              <img
                src="/resources/logo_white.png"
                alt="Webmart"
                className="h-8 w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2C8 2 5 5 5 9c0 2.5 1.5 4.5 3.5 5.5L8 22h8l-.5-7.5c2-1 3.5-3 3.5-5.5 0-4-3-7-7-7z" />
              </svg>
            )}
          </Link>

          {/* Contacts - hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6 shrink-0">
            <a href="mailto:ad@webmart.by" className="text-white text-sm font-normal hover:text-webmart-accent transition-colors lowercase">
              ad@webmart.by
            </a>
            <a href="tel:+375291828275" className="text-white text-sm hover:text-webmart-accent transition-colors">
              +375 29 182 82 75
            </a>
          </div>

          {/* Social icons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a href="https://wa.me/375291828275" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white hover:bg-opacity-30 transition-colors" aria-label="WhatsApp">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <a href="https://t.me/webmartby" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-white hover:bg-opacity-30 transition-colors" aria-label="Telegram">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block shrink-0">
            <Link
              href="/services"
              className="inline-block px-5 py-2.5 text-white text-sm font-medium lowercase border border-white border-opacity-40 hover:border-webmart-accent hover:bg-white hover:bg-opacity-5 transition-colors"
            >
              дизайн-услуги
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const active = isActive(item.href)
              const linkClass = `transition-colors lowercase font-normal ${active ? activeLinkStyle : 'text-white text-sm hover:text-webmart-accent'}`
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass}
                  style={active ? activeLinkGlitch : undefined}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white hover:bg-opacity-10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Меню"
          >
            <div className="w-6 h-5 relative">
              <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all ${isMenuOpen ? 'top-2 rotate-45' : 'top-1'}`} />
              <span className={`absolute left-0 top-2 w-5 h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-5 h-0.5 bg-current transition-all ${isMenuOpen ? 'top-2 -rotate-45' : 'top-3'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all ${isMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
          <div className="py-4 border-t border-white border-opacity-10 space-y-2">
            <a href="mailto:ad@webmart.by" className="block text-white text-sm py-2 lowercase">ad@webmart.by</a>
            <a href="tel:+375291828275" className="block text-white text-sm py-2">+375 29 182 82 75</a>
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block text-sm font-normal py-2 lowercase text-white hover:text-webmart-accent ${active ? 'underline underline-offset-1' : ''}`}
                  style={active ? activeLinkGlitch : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/services" className="inline-block mt-4 px-5 py-2.5 text-white text-sm font-medium lowercase border border-white border-opacity-40 hover:border-webmart-accent" onClick={() => setIsMenuOpen(false)}>
              дизайн-услуги
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
