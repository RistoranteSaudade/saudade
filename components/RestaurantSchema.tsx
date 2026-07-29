import React from 'react';
import { RESTAURANT_INFO, EXTERNAL_LINKS } from '../constants';
import { SITE_URL } from './Seo';

// Structured fields (address/openingHours) must match schema.org formats and
// won't auto-update from RESTAURANT_INFO's free-text strings — update both if they change.
const RestaurantSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: RESTAURANT_INFO.name,
    description: RESTAURANT_INFO.footerTagline,
    url: SITE_URL,
    telephone: RESTAURANT_INFO.phone,
    email: RESTAURANT_INFO.email,
    image: `${SITE_URL}/images/hero-picanha.jpg`,
    logo: `${SITE_URL}/logo-gold.png`,
    servesCuisine: 'Brasiliana',
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Piazza Vittorio Veneto 15/B',
      addressLocality: 'Torino',
      postalCode: '10124',
      addressCountry: 'IT',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: '17:30',
      closes: '23:59',
    },
    sameAs: [EXTERNAL_LINKS.instagram, EXTERNAL_LINKS.thefork],
    acceptsReservations: 'True',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default RestaurantSchema;
