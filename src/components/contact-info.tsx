import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function ContactInfo() {
  return (
    <Card className="border-[#47afe2]/10">
      <CardHeader>
        <CardTitle className="text-2xl text-[#47afe2]">Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <MapPin className="w-5 h-5 text-[#47afe2] mt-1" />
          <div>
            <h3 className="font-medium mb-1">Address</h3>
            <p className="text-muted-foreground">
              Hürriyet Mah. 1792 Sok<br />
              Özgüzel Apt. K3 D6 Yenişehir<br />
              Mersin, Turkey
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Phone className="w-5 h-5 text-[#47afe2] mt-1" />
          <div>
            <h3 className="font-medium mb-1">Phone</h3>
            <p className="text-muted-foreground">
              (+90) 324 422 91 52<br />
              (+90) 543 599 85 69
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Mail className="w-5 h-5 text-[#47afe2] mt-1" />
          <div>
            <h3 className="font-medium mb-1">Email</h3>
            <p className="text-muted-foreground">
              info@drcuneyttamam.com
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <Clock className="w-5 h-5 text-[#47afe2] mt-1" />
          <div>
            <h3 className="font-medium mb-1">Working Hours</h3>
            <div className="text-muted-foreground">
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

