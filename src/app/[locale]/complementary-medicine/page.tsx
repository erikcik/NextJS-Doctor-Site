import { SiteHeader } from "@/components/site-header"
import { Navigation } from "@/components/navigation"
import { TreatmentCard } from "@/components/treatment-card"

export default function OrthopedicsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#47afe2] mb-4">
            Complementary and Alternative Medicine
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Complementary and alternative medicine (CAM) is a broad term for medical practices that are not part of traditional Western medicine. These practices include acupuncture, herbal medicine, chiropractic care, massage therapy, and more. CAM therapies are often used alongside conventional medicine to enhance health and well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TreatmentCard
            title="Arthroscopic Surgery"
            description="Arthroscopic surgery is used for the diagnosis and treatment of diseases within the joint. This minimally invasive procedure allows for faster recovery and better outcomes."
            imageSrc="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=500"
            learnMoreHref="/orthopedics/arthroscopic-surgery"
          />
          
          <TreatmentCard
            title="Stem Cell"
            description="Stem cell therapy repairs damaged or diseased cells in the body. This revolutionary treatment promotes natural healing and tissue regeneration."
            imageSrc="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=500"
            learnMoreHref="/orthopedics/stem-cell"
          />
          
          <TreatmentCard
            title="Cytokine Therapy"
            description="Cytokines are substances secreted by the body's immune system that facilitate communication between cells. This therapy helps modulate immune response."
            imageSrc="https://images.unsplash.com/photo-1582560474992-385ebb9b71c3?q=80&w=500"
            learnMoreHref="/orthopedics/cytokine-therapy"
          />
          
          <TreatmentCard
            title="Platelet Rich Plasma"
            description="Platelet Rich Plasma (PRP) is obtained from the patient's own blood. This concentrated form of platelets accelerates healing in various orthopedic conditions."
            imageSrc="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=500"
            learnMoreHref="/orthopedics/prp"
          />
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Contact Information</h3>
              <address className="text-sm text-gray-400 not-italic">
                123 Medical Plaza, Suite 100<br />
                Cityville, State 12345<br />
                Phone: (+90) 224 453 31 53<br />
                Email: info@drname.com
              </address>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Office Hours</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Monday - Friday: 9:00 AM - 5:00 PM</li>
                <li>Saturday: 9:00 AM - 1:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#47afe2]">Quick Links</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-[#47afe2] transition-colors">Book Appointment</a></li>
                <li><a href="#" className="hover:text-[#47afe2] transition-colors">Patient Resources</a></li>
                <li><a href="#" className="hover:text-[#47afe2] transition-colors">Emergency Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Dr. Name. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

