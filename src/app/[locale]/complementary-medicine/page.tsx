import { SiteHeader } from "@/components/site-header"
import { Navigation } from "@/components/navigation"
import { TreatmentCard } from "@/components/treatment-card"
import Footer from "~/components/footer";

export default function OrthopedicsPage() {
  return (
    <div className="min-h-screen">

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#47afe2] mb-4 font-display">
            Complementary and Alternative Medicine
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-body">
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

    </div>
  );
}

