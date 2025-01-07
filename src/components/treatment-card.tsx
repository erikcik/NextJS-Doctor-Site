"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "~/i18n/routing";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useParams } from "next/navigation";

interface TreatmentCardProps {
  title: React.ReactNode;
  description: {
    tr: string;
    en: string;
  };
  imageSrc: string;
  author?: string;
  learnMoreHref: string;
}

export function TreatmentCard({
  title,
  description,
  imageSrc,
  author,
  learnMoreHref,
}: TreatmentCardProps) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <CardContainer className="w-full" containerClassName="py-10">
      <CardBody className="relative h-auto w-full">
        <Card className="overflow-hidden transition-all group-hover/card:shadow-lg h-full">
          <CardItem translateZ={100} className="aspect-square w-full h-64">
            <Image
              src={imageSrc}
              alt={typeof title === 'string' ? title : 'Treatment Image'}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
              width={500}
              height={500}
            />
          </CardItem>
          <CardHeader>
            <CardItem translateZ={30}>
              <CardTitle className="text-2xl text-primary line-clamp-1">
                {title}
              </CardTitle>
            </CardItem>
            {author && (
              <CardItem translateZ={20}>
                <p className="text-sm text-muted-foreground">
                  {locale === 'tr' ? 'Yazar' : 'Author'}: {author}
                </p>
              </CardItem>
            )}
          </CardHeader>
          <CardContent>
            <CardItem translateZ={40}>
              <p className="mb-4 text-base text-muted-foreground line-clamp-3">
                {locale === 'tr' ? description.tr : description.en}
              </p>
            </CardItem>
            <CardItem translateZ={50}>
              <Button
                variant="outline"
                size="sm"
                className="text-tertiary border-tertiary transition-colors duration-300 hover:text-black"
                asChild
              >
                <Link href={learnMoreHref}>
                  {locale === 'tr' ? 'Daha Fazla' : 'Learn More'}
                </Link>
              </Button>
            </CardItem>
          </CardContent>
        </Card>
      </CardBody>
    </CardContainer>
  );
}
