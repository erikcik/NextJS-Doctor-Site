import { SiteHeader } from "@/components/site-header"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import { GoogleMap } from "@/components/google-map"
import { Toaster } from "~/components/ui/toaster"

export default function ContactPage() {
  return (
    <div className="min-h-screen">

      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#47afe2] mb-4 font-display">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
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

      <Toaster />
    </div>
  )
}
