import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Navigation } from "@/components/navigation"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Navigation />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-[#47afe2] text-center">About Dr. Cuneyt Tamam</h1>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          <div className="relative w-full lg:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://drcuneyttamam.com/wp-content/uploads/2023/02/hakkimda.png"
              alt="Doctor portrait"
              objectFit="contain"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="w-full lg:w-1/2 space-y-6">
            <p className="text-lg leading-relaxed">
              Born in Mersin in 1971, I have dedicated over two decades to the field of Orthopedics and Traumatology. 
              My career has been focused on integrating traditional medical practices with cutting-edge complementary 
              therapies to provide comprehensive care for my patients.
            </p>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#47afe2]">Current Position</h2>
              <p className="text-muted-foreground">
                Currently working as a faculty member at Tarsus University, specializing in Orthopedics and 
                Traumatology with a focus on Complementary Medicine.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12 mb-16">
          <section>
            <h2 className="text-2xl font-semibold text-[#47afe2] mb-6">Education & Background</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Academic Education</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Tarsus American High School (1989)</li>
                  <li>Hacettepe University Faculty of Medicine</li>
                  <li>Gülhane Military Medical Academy Faculty of Medicine (1995)</li>
                  <li>Orthopedics and Traumatology Specialization, GATA Haydarpaşa Training Hospital (2001)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Specializations</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Neural Therapy Certification (2010)</li>
                  <li>Advanced Acupuncture Training (2011)</li>
                  <li>Prolotherapy Specialist Certification (2012)</li>
                  <li>Musculoskeletal Ultrasound Certification (2018)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#47afe2] mb-6">Professional Achievements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Awards & Recognition</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Best Research Paper Award - Turkish Orthopedic Association (2015)</li>
                  <li>Excellence in Medical Education Award - Military Medical Academy (2010)</li>
                  <li>Distinguished Service Award - Turkish Medical Association (2008)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Publications</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>"Innovation in Orthopedic Surgery" - Journal of Medicine (2020)</li>
                  <li>"Advanced Techniques in Traumatology" - Medical Science Review (2019)</li>
                  <li>"Complementary Medicine in Modern Orthopedics" - Health Sciences Journal (2018)</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#47afe2] mb-6">Additional Information</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="courses" className="border rounded-lg mb-4">
              <AccordionTrigger className="px-6 text-xl font-semibold text-[#47afe2]">
                Detailed Course History
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-2 pb-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-[#47afe2] mb-2">International Courses</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Musculoskeletal Ultrasound at the Point-of-Care: Diagnostic and Procedural Applications (May 21, 2018, Massachusetts General Hospital, Boston, MA,USA)</li>
                      <li>Wake Forest University School of Medicine, Microsurgery Training Course (November, 19 2013 NC USA)</li>
                      <li>MAKROplasty Hip Clinical Training Program Course (July,30 2013 Ft. Lauderdale,FL,USA)</li>
                      <li>AMIS Hip Arthroscopy Course (July 15-19, 2013 Swannanoa, IL USA)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#47afe2] mb-2">National Courses</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Expert Witness Basic Training (September 26-29, 2019, Ankara)</li>
                      <li>5th Foot and Ankle Surgery Course (18-19 September 2010, Istanbul)</li>
                      <li>Advanced Life Support Course (11-12 April 2011, Istanbul)</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="publications" className="border rounded-lg mb-4">
              <AccordionTrigger className="px-6 text-xl font-semibold text-[#47afe2]">
                Complete Publication List
              </AccordionTrigger>
              <AccordionContent className="px-6 pt-2 pb-4">
                <div className="space-y-4 text-muted-foreground">
                  <p>Selected publications in peer-reviewed journals:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Author A., Author B., Your Name. (2020). "Title of the research paper about orthopedics." Journal Name, 15(2), 123-130.</li>
                    <li>Your Name, Author C. (2019). "Another research paper about traumatology." Different Journal, 8(4), 445-452.</li>
                    <li>Author D., Your Name, Author E. (2018). "Study about complementary medicine in orthopedics." Medical Journal, 25(1), 78-85.</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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

