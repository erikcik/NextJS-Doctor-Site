import Link from "next/link"
import { Phone, Mail } from 'lucide-react'

export function SiteHeader() {
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
        <div className="flex items-center space-x-2">
          <Link href="?lang=en" className="flex items-center">
            <img src="/placeholder.svg?height=20&width=30" alt="English" className="h-5 w-auto" />
          </Link>
          <Link href="?lang=tr" className="flex items-center">
            <img src="/placeholder.svg?height=20&width=30" alt="Turkish" className="h-5 w-auto" />
          </Link>
        </div>
      </div>
    </header>
  )
}

