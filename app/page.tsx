import React from 'react';
import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/hero';
import { JobsList } from '@/components/jobs-list';
import { Handover } from '@/components/handover';
import { AfterWeek } from '@/components/after-week';
import { Process } from '@/components/process';
import { AgenciesCallout } from '@/components/agencies-callout';
import { Faq } from '@/components/faq';
import { ConsultationForm } from '@/components/consultation-form';
import { SiteFooter } from '@/components/site-footer';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <JobsList />
        <Handover />
        <AfterWeek />
        <Process />
        <AgenciesCallout />
        <Faq />
        <ConsultationForm />
      </main>
      <SiteFooter />
    </>
  );
}
