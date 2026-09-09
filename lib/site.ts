export const SITE = {
  name: 'NextLvlPay',
  domain: 'https://nextlvlpay.com',
  email: 'hello@nextlvlpay.com',
  // Where the consultation form POSTs. Any static-friendly endpoint
  // (Formspree, Web3Forms, Netlify Forms, a Zapier catch hook).
  formEndpoint: 'https://api.web3forms.com/submit',
  // Optional: if set, the header CTA links here instead of scrolling to the form.
  schedulerUrl: 'https://cal.com/nextlvlpay/consultation',
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What exactly are you taking over?',
    answer:
      'Booking, your service menu and intake forms, invoicing, collections, and payment processing. We configure all of it around your business, connect it, and test it before you go live.',
  },
  {
    question: "How long until it's running?",
    answer:
      "Usually about a week from the first call. Complicated service menus and multi-location setups take longer, and we'll tell you that on the call rather than after you've signed.",
  },
  {
    question: 'Do I have to change banks or processors?',
    answer:
      'No. We integrate directly with major processors including Stripe, Square, Authorize.Net, and Clover, and connect payouts straight to your existing commercial bank account. If you already have competitive merchant rates, you keep your current accounts intact.',
  },
  {
    question: 'What does it cost?',
    answer:
      'We charge a flat monthly operations fee for managing your booking, invoicing, and collections, plus standard interchange processing (typically 2.9% + 30¢ for cards, and 0.8% capped at $5 for ACH). No hidden contracts, no percentage cuts of your revenue, and no software license surcharges.',
  },
  {
    question: 'Can I keep the tools I already use?',
    answer:
      "Where they're worth keeping, yes. Working out what stays and what goes is part of the first call.",
  },
  {
    question: "What happens once it's live?",
    answer:
      'We keep running it. Changes to your prices, hours, services, or forms come to us.',
  },
];

export const JOBS_LIST = [
  'You booked six clients this week and texted five of them to confirm.',
  'You wrote the same invoice three times because the price changed.',
  "Two of them still haven't paid and you've been putting off the follow-up.",
  'Friday night, you sat down with the card statement and a calculator.',
  "None of that is your job. It's just the job nobody else was doing.",
];

export const HANDOVER_YOU_KEEP = [
  "The work you're good at",
  'The relationships',
  'The decisions about what you charge',
];

export const HANDOVER_WE_TAKE = [
  {
    title: 'Booking',
    description:
      'Scheduling, reminders, and a calendar built around how you actually work. Clients book themselves and fewer of them forget.',
  },
  {
    title: 'Your service menu',
    description:
      'Pricing, packages, and intake forms configured before you go live, and updated by us when they change.',
  },
  {
    title: 'Invoicing',
    description:
      'Invoices go out on their own, with deposits, terms, and recurring billing where it applies.',
  },
  {
    title: 'Collections',
    description:
      "Automatic follow-up on anything unpaid, worded so you don't lose the client.",
  },
  {
    title: 'Payments',
    description:
      'Card, ACH, and tap-to-pay. Money lands in your account already reconciled.',
  },
  {
    title: 'The maintenance',
    description:
      'When your hours, prices, or services change, you tell us and we handle it.',
  },
];

export const AFTER_WEEK_DAYS = [
  {
    day: 'Monday',
    event: 'Six appointments confirm themselves overnight.',
  },
  {
    day: 'Tuesday',
    event:
      'A new client books, pays a deposit, and fills in their intake form before they arrive.',
  },
  {
    day: 'Wednesday',
    event: "Last week's invoices go out. You don't write any of them.",
  },
  {
    day: 'Thursday',
    event: 'Two overdue accounts get a follow-up. One pays that afternoon.',
  },
  {
    day: 'Friday',
    event: "The week's takings land in your bank, reconciled.",
  },
];

export const SETUP_STEPS = [
  {
    number: '1',
    title: 'A phone call',
    description:
      'Fifteen minutes. What you sell, how people book you, how you like to get paid.',
  },
  {
    number: '2',
    title: 'We build it',
    description:
      'Configured around your workflow and tested end to end before you see it.',
  },
  {
    number: '3',
    title: 'Handover',
    description:
      'A working system, training for whoever needs it, and us still on the hook for running it.',
  },
];
