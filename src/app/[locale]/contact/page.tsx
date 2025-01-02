import { SiteHeader } from "@/components/site-header"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { GoogleMap } from "@/components/google-map"
import { Toaster } from "~/components/ui/toaster"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#47afe2] mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for appointments and inquiries
          </p>
        </div>

        <div className="rounded-lg overflow-hidden shadow-lg border border-[#47afe2]/10 mb-8">
          <GoogleMap />
        </div>
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <ContactForm />
          <ContactInfo />
        </div>

      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Office Hours</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
                <li>Saturday: 9:00 AM - 1:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Emergency Contact</h3>
              <p className="text-sm text-gray-400">
                For emergencies outside of regular hours:<br />
                Phone: (+90) 543 599 85 69
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#47afe2] transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-[#47afe2] transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-[#47afe2] transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Dr. Name. All rights reserved.
          </div>
          <Toaster />
        </div>
      </footer>
    </div>
  )
}
