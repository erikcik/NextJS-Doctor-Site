'use client'
import Image from "next/image"
import { useState, useEffect } from "react"
import { Link } from "~/i18n/routing"
import { useTranslations } from 'next-intl'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('Navigation')

  const navigationItems = [
    { key: "about", href: "/about" },
    { key: "orthopedics", href: "/orthopedics" },
    { key: "complementary_medicine", href: "/complementary-medicine" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" }
  ]

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    
    <nav className="top-0 w-full border-b bg-white shadow-sm z-[100]">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Image src="https://drcuneyttamam.com/wp-content/uploads/2023/03/AnyConv.com__DRCT_-LOGO-810X197-2.png" alt="Logo" width={300} height={100} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="relative py-2 text-gray-700 hover:text-primary transition-colors duration-300 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {t(key)}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex flex-col space-y-1.5 z-[110]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-white z-[105] transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            {navigationItems.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="text-gray-700 hover:text-primary transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

