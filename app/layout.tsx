import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { SITE, FAQ_ITEMS } from '@/lib/site';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-logo',
  display: 'swap',
});


export const viewport: Viewport = {
  themeColor: '#1B24D8',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'NextLvlPay — Hands-Free Booking, Invoicing & Payments',
    template: '%s | NextLvlPay',
  },
  description:
    'Stop chasing unpaid invoices and reconciling card batches. NextLvlPay sets up and runs your customer scheduling, billing, and payment operations end-to-end.',
  applicationName: 'NextLvlPay',
  authors: [{ name: 'NextLvlPay LLC', url: SITE.domain }],
  creator: 'NextLvlPay LLC',
  publisher: 'NextLvlPay LLC',
  category: 'Finance & Business Operations',
  keywords: [
    'done for you payment processing',
    'small business invoicing service',
    'automated invoice collections',
    'client booking and scheduling operations',
    'back office payment management',
    'salon booking and billing setup',
    'clinic invoicing operations',
    'trade business payments',
    'white label payments for agencies',
    'NextLvlPay',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'NextLvlPay — Hands-Free Booking, Invoicing & Payments',
    description:
      'Stop chasing unpaid invoices and reconciling card batches. NextLvlPay sets up and runs your customer scheduling, billing, and payment operations end-to-end.',
    url: SITE.domain,
    siteName: 'NextLvlPay',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'NextLvlPay — Hands-Free Booking, Invoicing & Payments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextLvlPay — Hands-Free Booking, Invoicing & Payments',
    description:
      'Stop chasing unpaid invoices and reconciling card batches. NextLvlPay sets up and runs your customer scheduling, billing, and payment operations end-to-end.',
    images: ['/og.png'],
    creator: '@NextLvlPay',
    site: '@NextLvlPay',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE.domain}/#organization`,
        name: 'NextLvlPay LLC',
        alternateName: 'NextLvlPay',
        url: SITE.domain,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE.domain}/icon.svg`,
          width: 512,
          height: 512,
        },
        email: SITE.email,
        description:
          'NextLvlPay takes over your booking, invoicing, collections, and payments — sets it all up, then runs it.',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: SITE.email,
          availableLanguage: 'English',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.domain}/#website`,
        url: SITE.domain,
        name: 'NextLvlPay',
        publisher: {
          '@id': `${SITE.domain}/#organization`,
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'Service',
        '@id': `${SITE.domain}/#service`,
        name: 'Done-For-You Back Office & Payment Operations',
        serviceType: 'Financial Operations, Client Booking, Automated Invoicing & Payment Processing',
        provider: {
          '@id': `${SITE.domain}/#organization`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'United States',
        },
        description:
          'Stop chasing unpaid invoices and reconciling card batches. NextLvlPay sets up and runs your customer scheduling, billing, and payment operations end-to-end.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          description:
            'Flat monthly operations fee for setup and management plus standard interchange card & ACH processing rates.',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.domain}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-paper text-ink selection:bg-field selection:text-paper font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-field focus:text-paper focus:font-medium focus:rounded-md focus:shadow-md"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
