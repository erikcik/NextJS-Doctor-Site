'use client'

import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

export function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      })

      const { Map } = await loader.importLibrary('maps')

      // Coordinates for Mersin location
      const position = { lat: 36.7865, lng: 34.5454 }

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 15,
        mapId: 'medical_office_map',
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: true,
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#47afe2' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }]
          },
          // Add more custom styles as needed
        ]
      }

      const map = new Map(mapRef.current!, mapOptions)

      // Add a marker for the location
      new google.maps.Marker({
        position,
        map,
        title: 'Dr. Name Medical Office',
        animation: google.maps.Animation.DROP,
      })
    }

    initMap()
  }, [])

  return <div ref={mapRef} className="w-full h-[500px]" />
}

