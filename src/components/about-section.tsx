"use client";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { Link } from "~/i18n/routing";

export function AboutSection() {
  const router = useRouter();
  return (
    <section className="container mx-auto bg-gradient-to-b from-white to-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-16 text-center text-4xl font-bold text-primary">
          About Dr. Cüneyt Tamam
        </h2>

        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Image Column - Modified order for mobile */}
          <div className="order-first lg:order-last lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
              <Image
                src="https://drcuneyttamam.com/wp-content/uploads/2023/02/hakkimda.png"
                alt="Dr. Name - Orthopedics and Traumatology Specialist"
                fill
                objectFit="contain"
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="order-last lg:order-first lg:col-span-7">
            {/* Introduction */}
            <p className="text-lg leading-relaxed text-gray-700">
              Born in Mersin in 1971, I have dedicated over two decades to the
              field of Orthopedics and Traumatology. My career has been focused
              on integrating traditional medical practices with cutting-edge
              complementary therapies to provide comprehensive care for my
              patients.
            </p>

            {/* Education & Experience Grid */}
            <div className="grid gap-8 md:grid-cols-2 mt-4">
              {/* Education */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-2xl font-semibold text-primary">
                  Education
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Tarsus American High School (1989)
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Hacettepe University Faculty of Medicine
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Gülhane Military Medical Academy (1995)
                  </li>
                </ul>
              </div>

              {/* Specialization */}
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-2xl font-semibold text-primary">
                  Specialization
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    GATA Haydarpaşa Training Hospital
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Orthopedics and Traumatology Specialist (2001)
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    Complementary Medicine Expert
                  </li>
                </ul>
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm mt-4">
              <h3 className="mb-4 text-2xl font-semibold text-primary">
                Additional Certifications
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Neural Therapy Certification
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Advanced Acupuncture Training
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  Prolotherapy Specialist Certification
                </li>
              </ul>
            </div>
            <Link href="/about" className="w-full   ">
              <button className="w-full rounded-lg bg-primary translate-y-4 px-8 py-3 text-white transition-colors hover:bg-primary/90 md:w-auto">
                More Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
