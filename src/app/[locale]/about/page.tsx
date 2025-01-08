"use client";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Image from "next/image";
import { CanvasRevealEffect } from "~/components/ui/canvas-reveal-effect";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { JsonLd } from "react-schemaorg";

export default function AboutPage() {
  const t = useTranslations("About");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Dr. Cüneyt Tamam",
            jobTitle: "Orthopedics and Traumatology Specialist",
            workLocation: {
              "@type": "Place",
              name: "Private Practice",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mersin",
                addressCountry: "Turkey"
              }
            },
            description: "Orthopedics and Traumatology Specialist with expertise in complementary medicine",
            url: "https://drcuneyttamam.com",
            sameAs: [
              "https://www.facebook.com/DocDrCuneytTamam/",
              "https://www.instagram.com/doc.dr.cuneyttamam/",
              "https://www.linkedin.com/in/cüneyt-tamam-2624a517/"
            ]
          })
        }}
      />
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-3 lg:col-span-4">
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              <Image
                src="https://drcuneyttamam.com/wp-content/uploads/2023/02/hakkimda.png"
                alt="Dr. John Doe"
                layout="fill"
                objectFit="contain"
                className="rounded-xl transition-transform duration-700 hover:scale-105"
                priority
              />
            </div>
            <div className="mt-8 text-center">
              <h1 className="mb-3 text-4xl font-bold text-[#47afe2] transition-colors duration-300 hover:text-[#3890c0]">
                {t("doctorName")}
              </h1>
              <p className="mb-2 text-xl font-medium text-muted-foreground">
                {t("position")}
              </p>
              <p className="text-lg text-muted-foreground/80">
                Orthopedic Surgery Specialist
              </p>
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-3">
            <BiographySection />
          </div>
          <div className="md:col-span-1 lg:col-span-1">
            <EducationSection />
          </div>
          <div className="md:col-span-3 lg:col-span-2">
            <CoursesSection />
          </div>
          <div className="md:col-span-3 lg:col-span-2">
            <AchievementsSection />
          </div>
        </div>
      </div>
    </>
  );
}

function BiographySection() {
  const t = useTranslations("About");
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-full w-full overflow-hidden rounded-lg bg-black"
    >
      {/* Content */}
      <div className="relative z-20 space-y-6 p-6">
        <h2 className="text-3xl font-bold text-white">{t("aboutTitle")}</h2>
        <div className="space-y-4 text-white/95">
          <p>{t("bornInMersin")}</p>
          <p>{t("graduatedFromTarsus")} {t("graduatedFromGulhane")}</p>
          <p>{t("interestedInComplementaryMedicine")}</p>
          <p>
            {t("receivedInternationalNeuralTherapyCertificate")}{" "}
            {t("workedWithProfPoehling")} {t("completedMakoPlastyTraining")}
          </p>
          <p>
            {t("workedAtHarvard")} {t("completedCertificatesAtYildirimBeyazit")}
          </p>
          <p>
            {t("currentlyWorkingAtToros")} {t("providesHealingInPrivatePractice")}
          </p>
        </div>
      </div>

      {/* Canvas Effect */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent"
              colors={[
                [71, 175, 226], // #47afe2
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={3}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50" />
    </div>
  );
}

function EducationSection() {

  const t = useTranslations("About");
  const education = [
    t("torosUniversityAssociateProfessorship"),
    t("haydarpasaGataSpecialist"),
    t("gulhaneMilitaryMedicalAcademy"),
    t("tarsusAmericanHighSchool"),
  ];

  return (
    <Card className="h-full border-[#47afe2] bg-[#47afe2]/5">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[#47afe2]">
          {t("education")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-2">
          {education.map((item, index) => (
            <li key={index} className="text-[#47afe2]">
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function CoursesSection() {
  const t = useTranslations("About");
  const courses = {
    [t("internationalCourses")]: [
      t("musculoskeletalUltrasoundCourse"),
      t("zimmerBiometCourse"),
      t("wakeForestMicrosurgeryCourse"),
      t("makoplastyHipCourse"),
      t("makoplastyKneeCourse"),
      t("aanaHipArthroscopyCourse"),
      t("arthrexKneeCourse"),
      t("aoPediatricTraumaCourse"),
      t("aoHandCourse"),
      t("ircadShoulderCourse"),
      t("ircadKneeCourse"),
      t("aoDavosCourse"),
    ],
    [t("nationalCourses")]: [
      t("expertWitnessTraining"),
      t("stemCellCourse"),
      t("kinesioTapingCourse"),
      t("advancedLifeSupportCourse"),
      t("footAndAnkleSurgeryCourse"),
      t("basicAdvancedLifeSupportCourse"),
      t("intramedullaryNailingCourse"),
      t("gulhaneArthroscopicSurgeryCourse"),
      t("firstFootAndAnkleSurgeryCourse"),
      t("advancedArthroscopicSurgeryCourse"),
      t("ankleBasicArthroscopyCourse"),
      t("advancedIlizarovCourse"),
      t("gulhaneMicrosurgeryCourse"),
      t("infantileHipUltrasonographyCourse"),
      t("basicIlizarovCourse"),
      t("pediatricOrthopedicsCourse"),
    ],
    [t("certifiedTrainingPrograms")]: [
      t("acupunctureCertifiedProgram"),
      t("phytotherapyCertifiedProgram"),
      t("cuppingCertifiedProgram"),
      t("mesotherapyCertifiedProgram"),
      t("ozoneCertifiedProgram"),
      t("prolotherapyCertifiedProgram"),
    ],
  };

  return (
    <Card className="h-full bg-[#47afe2]/10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-[#47afe2]">
          {t("coursesAndTraining")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(courses).map(([category, courseList], index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-xl font-semibold text-[#47afe2]">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-inside list-disc space-y-1">
                  {courseList.map((course, courseIndex) => (
                    <li key={courseIndex}>{course}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

function AchievementsSection() {
  const t = useTranslations("About");
  const awards = [
    t("turkishOrthopedicsAward2017"),
    t("turkishOrthopedicsAward2014"),
    t("turkishOrthopedicsAward2011"),
    t("sicotAward2007"),
  ];

  return (
    <Card className="h-full bg-gradient-to-tl from-[#47afe2] via-[#ffd700]/20 to-[#47afe2]/10 shadow-lg hover:shadow-[#ffd700]/20">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ffd700]/20 via-transparent to-transparent" />
        <CardTitle className="relative text-2xl font-semibold ">
          {t("awards")} 
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-0">
            <AccordionTrigger className="text-xl font-semibold  hover:text-[#ffd700]">
              {t("awards")}
            </AccordionTrigger>
            <AccordionContent className="">
              <ul className="list-inside list-[square] space-y-2 marker:text-[#ffd700]">
                {awards.map((award, index) => (
                  <li key={index} className="hover:text-[#ffd700]/90 transition-colors">
                    {award}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold  hover:text-[#ffd700]">
              {t("publications")}
            </AccordionTrigger>
            <AccordionContent className="">
              <p>{t("clickToSeePublications")}</p>
              <a
                href="http://drcuneyttamam.com/wp-content/uploads/2023/04/Yayinlar.pdf"
                className="mt-2 inline-block text-[#ffd700] hover:text-[#ffd700]/80 hover:underline transition-colors"
              >
                {t("viewCompleteListOfPublications")}
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
