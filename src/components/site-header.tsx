'use client';

import { Phone, Mail, Globe, Facebook, Instagram, Linkedin } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = pathname.split('/').slice(2).join('/');
    router.push(`/${newLocale}/${currentPath}`);
  };

  const getCurrentLocale = () => {
    return pathname.split('/')[1];
  };

  return (
    <header className="site-header z-[110]">
      <div className="site-header-container">
        <div className="site-header-content">
          <div className="header-left">
            <p className="site-slogan">SİZ DEĞERLİSİNİZ</p>
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                <span>+90 324 422 91 52</span>
              </div>
              <div className="contact-item">
                <Phone className="h-3.5 w-3.5 mr-1.5" />
                <span>+90 543 599 85</span>
              </div>
              <a 
                href="mailto:info@drcunettamam.com" 
                className="contact-item hover:opacity-80"
              >
                <Mail className="h-3.5 w-3.5 mr-1.5" />
                <span>info@drcunettamam.com</span>
              </a>
            </div>
          </div>

          <div className="header-right">
            <div className="social-links">
              <a 
                href="https://www.facebook.com/DocDrCuneytTamam/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/doc.dr.cuneyttamam/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/cüneyt-tamam-2624a517/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1.5 px-2 py-1.5 text-sm hover:bg-sky-600 rounded-md transition-colors">
                <Globe className="h-3.5 w-3.5" />
                <span>Language</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[150px] z-[120]">
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('en')}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://flagcdn.com/w40/gb.png" 
                      alt="English" 
                      className="h-3.5 w-auto object-contain"
                    />
                    <span>English</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleLanguageChange('tr')}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://flagcdn.com/w40/tr.png" 
                      alt="Turkish" 
                      className="h-3.5 w-auto object-contain"
                    />
                    <span>Turkish</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

