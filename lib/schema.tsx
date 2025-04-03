import React from 'react';

export const OrganizationSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'Gard Security',
          'url': 'https://gard.cl',
          'logo': 'https://gard.cl/logo.png',
          'sameAs': [
            'https://www.facebook.com/gardsecuritychile',
            'https://www.instagram.com/gardsecurity',
            'https://www.linkedin.com/company/gard-security'
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+56 2 2954 8500',
            'contactType': 'customer service',
            'areaServed': 'CL',
            'availableLanguage': 'Spanish'
          },
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Av. Libertador Bernardo O\'Higgins 1449',
            'addressLocality': 'Santiago',
            'addressRegion': 'RM',
            'postalCode': '8320000',
            'addressCountry': 'CL'
          }
        })
      }}
    />
  );
};

export const ServiceSchema = ({ 
  name, 
  description, 
  url, 
  imageUrl 
}: { 
  name: string; 
  description: string; 
  url: string; 
  imageUrl: string; 
}) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          'name': name,
          'description': description,
          'provider': {
            '@type': 'Organization',
            'name': 'Gard Security',
            'url': 'https://gard.cl'
          },
          'url': url,
          'image': imageUrl,
          'areaServed': {
            '@type': 'Country',
            'name': 'Chile'
          },
          'serviceType': 'Seguridad Privada'
        })
      }}
    />
  );
};

export const FAQSchema = ({ 
  questions 
}: { 
  questions: { question: string; answer: string }[] 
}) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': questions.map(q => ({
            '@type': 'Question',
            'name': q.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': q.answer
            }
          }))
        })
      }}
    />
  );
};

export const LocalBusinessSchema = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          'name': 'Gard Security',
          'image': 'https://gard.cl/logo.png',
          'url': 'https://gard.cl',
          'telephone': '+56 2 2954 8500',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Av. Libertador Bernardo O\'Higgins 1449',
            'addressLocality': 'Santiago',
            'addressRegion': 'RM',
            'postalCode': '8320000',
            'addressCountry': 'CL'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': -33.4488897,
            'longitude': -70.6692655
          },
          'openingHoursSpecification': [
            {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday'
              ],
              'opens': '09:00',
              'closes': '18:00'
            }
          ],
          'priceRange': '$$'
        })
      }}
    />
  );
}; 