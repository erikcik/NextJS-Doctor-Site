'use client';

import { useParams } from 'next/navigation';

type LocalizedTitleProps = {
  turkishTitle: string;
  englishTitle: string;
  className?: string;
};

export function LocalizedTitle({ turkishTitle, englishTitle, className = "" }: LocalizedTitleProps) {
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <span className={className}>
      {locale === 'tr' ? turkishTitle : englishTitle}
    </span>
  );
} 