'use client';

import { Phone, Mail, Globe } from 'lucide-react'
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
    <header className="w-full bg-sky-500 text-white">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-2 px-4 max-w-7xl">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span>(+90) 224 453 31 53</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span>info@yourwebsite.com</span>
          </div>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1.5 px-2 py-1.5 text-sm hover:bg-sky-600 rounded-md transition-colors">
              <Globe className="h-3.5 w-3.5" />
              <span>Language</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[150px]">
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
    </header>
  )
}

