import { Navigation } from "@/components/navigation"
import { AboutSection } from "@/components/about-section"
import { TreatmentCard } from "@/components/treatment-card"
import { TestimonialsAnnouncements } from "@/components/testimonials-announcements"
import { BlogSection } from "@/components/blog-section"
import { SiteHeader } from "@/components/site-header"
import { CarouselComponent } from "~/components/carousel"
import { Link } from "~/i18n/routing"

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Navigation />
      <CarouselComponent />
      
      <main>
        <AboutSection />
        
        {/* Orthopedics Section */}
        <section id="orthopedics" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-primary text-center">Orthopedics and Traumatology</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TreatmentCard
                title="Arthroscopic Surgery"
                description="Minimally invasive diagnostic and treatment procedure for joint conditions."
                imageSrc="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=500"
                learnMoreHref="/orthopedics/arthroscopic-surgery"
              />
              <TreatmentCard
                title="Stem Cell Therapy"
                description="Innovative treatment using the body's natural healing mechanisms."
                imageSrc="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=500"
                learnMoreHref="/orthopedics/stem-cell"
              />
              <TreatmentCard
                title="Cytokine Therapy"
                description="Targeted treatment to modulate the immune response and reduce inflammation."
                imageSrc="https://images.unsplash.com/photo-1582560474992-385ebb9b71c3?q=80&w=500"
                learnMoreHref="/orthopedics/cytokine-therapy"
              />
            </div>
            <div className="text-center mt-8">
              <Link
                href="/orthopedics"
                className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                View More Treatments
              </Link>
            </div>
          </div>
        </section>

        {/* Complementary Medicine Section */}
        <section id="complementary" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-primary text-center">Complementary Medicine</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TreatmentCard
                title="Neural Therapy"
                description="Targeted injections to alleviate pain and restore proper nervous system function."
                imageSrc="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=500"
                learnMoreHref="/complementary/neural-therapy"
                />
              <TreatmentCard
                title="Acupuncture"
                description="Ancient Chinese healing practice to balance the body's energy flow."
                imageSrc="https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=500"
                learnMoreHref="/complementary/acupuncture"
              />
              <TreatmentCard
                title="Prolotherapy"
                description="Regenerative injection therapy to strengthen ligaments and tendons."
                imageSrc="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=500"
                learnMoreHref="/complementary/prolotherapy"
              />
            </div>
            <div className="text-center mt-8">
              <Link
                href="/complementary"
                className="inline-block px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                View More Treatments
              </Link>
            </div>
          </div>
        </section>

        <TestimonialsAnnouncements />
        <BlogSection />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-secondary">About Dr. Name</h3>
              <p className="text-sm text-gray-400">Orthopedics and Traumatology Specialist, Complementary Medicine Practitioner</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-secondary">Quick Links</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-tertiary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-tertiary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-tertiary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-secondary">Recent Posts</h3>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-tertiary transition-colors">Basic Acupuncture Points</a></li>
                <li><a href="#" className="hover:text-tertiary transition-colors">Psychoneuro Immunology</a></li>
                <li><a href="#" className="hover:text-tertiary transition-colors">Advances in Orthopedic Care</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-secondary">Contact</h3>
              <address className="text-sm text-gray-400 not-italic">
                123 Medical Plaza, Suite 100<br />
                Cityville, State 12345<br />
                Phone: (+90) 224 453 31 53<br />
                Email: info@drname.com
              </address>
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

