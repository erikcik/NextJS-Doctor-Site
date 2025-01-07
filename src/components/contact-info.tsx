import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ContactInfo() {
  const t = useTranslations('ContactInfo')

  return (
    <Card className="border-[#47afe2]/10">
      <CardHeader>
        <CardTitle className="text-2xl text-[#47afe2]">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <MapPin className="w-5 h-5 text-[#47afe2] mt-1" />
          <div>
            <h3 className="font-medium mb-1">{t('address.label')}</h3>
            <p className="text-muted-foreground">
              {t('address.line1')}<br />
              {t('address.line2')}<br />
              {t('address.line3')}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Phone className="w-5 h-5 text-[#47afe2] mt-1" />
          <div>
            <h3 className="font-medium mb-1">{t('phone.label')}</h3>
            <p className="text-muted-foreground">
              {t('phone.number1')}<br />
              {t('phone.number2')}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Mail className="w-5 h-5 text-[#47afe2] mt-1" />
          <div>
            <h3 className="font-medium mb-1">{t('email.label')}</h3>
            <p className="text-muted-foreground">
              {t('email.address')}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="w-5 h-5 text-[#47afe2] mt-1" />
          <div>
            <h3 className="font-medium mb-1">{t('hours.label')}</h3>
            <div className="text-muted-foreground">
              <p>{t('hours.weekdays')}</p>
              <p>{t('hours.saturday')}</p>
              <p>{t('hours.sunday')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

