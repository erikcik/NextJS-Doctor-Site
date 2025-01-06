"use client";
import { Navigation } from "@/components/navigation";
import { AboutSection } from "@/components/about-section";
import { TreatmentCard } from "@/components/treatment-card";
import { TestimonialsAnnouncements } from "@/components/testimonials-announcements";
import { BlogSection } from "@/components/blog-section";
import { SiteHeader } from "@/components/site-header";
import { CarouselComponent } from "~/components/carousel";
import { Link } from "~/i18n/routing";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Footer from "~/components/footer";

export default function Home() {
  return (
    <>

      <div className="min-h-screen">
        <CarouselComponent />

        <main>
          <AboutSection />

          {/* Orthopedics Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            id="orthopedics"
            className="bg-gray-50 py-16"
          >
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-12 text-center text-4xl font-bold text-primary font-display"
              >
                Orthopedics and Traumatology
              </motion.h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  <TreatmentCard
                    title="Arthroscopic Surgery"
                    description="Minimally invasive diagnostic and treatment procedure for joint conditions."
                    imageSrc="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=500"
                    learnMoreHref="/orthopedics/arthroscopic-surgery"
                  />
                </motion.div>
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                  <TreatmentCard
                    title="Stem Cell Therapy"
                    description="Innovative treatment using the body's natural healing mechanisms."
                    imageSrc="https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=500"
                    learnMoreHref="/orthopedics/stem-cell"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                >
                  <TreatmentCard
                    title="Cytokine Therapy"
                    description="Targeted treatment to modulate the immune response and reduce inflammation."
                    imageSrc="https://images.unsplash.com/photo-1582560474992-385ebb9b71c3?q=80&w=500"
                    learnMoreHref="/orthopedics/cytokine-therapy"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="mt-8 text-center"
              >
                <Link
                  href="/orthopedics"
                  className="inline-block rounded-md bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
                >
                  View More Treatments
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* Complementary Medicine Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            id="complementary"
            className="py-16"
          >
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-12 text-center text-4xl font-bold text-primary font-display"
              >
                Complementary Medicine
              </motion.h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  <TreatmentCard
                    title="Neural Therapy"
                    description="Targeted injections to alleviate pain and restore proper nervous system function."
                    imageSrc="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?q=80&w=500"
                    learnMoreHref="/complementary/neural-therapy"
                  />
                </motion.div>
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                  <TreatmentCard
                    title="Acupuncture"
                    description="Ancient Chinese healing practice to balance the body's energy flow."
                    imageSrc="https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=500"
                    learnMoreHref="/complementary/acupuncture"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                >
                  <TreatmentCard
                    title="Prolotherapy"
                    description="Regenerative injection therapy to strengthen ligaments and tendons."
                    imageSrc="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=500"
                    learnMoreHref="/complementary/prolotherapy"
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                className="mt-8 text-center"
              >
                <Link
                  href="/complementary"
                  className="inline-block rounded-md bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
                >
                  View More Treatments
                </Link>
              </motion.div>
            </div>
          </motion.section>

          <TestimonialsAnnouncements />
          <section className="mx-auto w-full bg-[#47afe2] bg-opacity-50 lg:px-48 px-4 mt-12 py-8 ">
            <h2 className="mb-8 text-3xl font-bold font-display">Announcements</h2>
            <Card className="max-w-2xl">
              <CardHeader >
                <CardTitle className="text-xl text-red-600">
                  IX. INTERNATIONAL CONGRESS OF NEURAL THERAPY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Congress Center: Hotel Name Here
                    <br />
                    Date: 17 - 20 June 2024
                  </p>
                  <div className="space-y-2">
                    <p className="font-semibold">
                      For detailed information, please contact:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Congress Organization:
                      <br />
                      +90 (850) 333 33 33
                      <br />
                      info@congress.com
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>  
          <BlogSection />
        </main>

      </div>
    </>
  );
}
