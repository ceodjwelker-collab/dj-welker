// Single source of truth for DJ Welker's projects.
// Seeded from projects.json and enriched with verified facts from the content brief.
// Honesty rules: Titanium Detailing is the only verified paying client. TSO and Top
// Flavorz are real client/venture deliverables. Everything else is DJ's own venture or
// concept — labeled CONCEPT, never as a fake client. No fabricated metrics or logos.

export type ProofStatus = 'LAUNCHED' | 'CONCEPT' | 'SHELVED';

export interface Fact { l: string; v: string; href?: string }
export interface Feature { n: string; title: string; desc: string }
export interface Figure { src: string; alt: string; caption: string; dark?: boolean }
export interface Stat { n: string; accent?: string; l: string }

export interface Project {
  slug: string;
  title: string;
  titleSuffix?: string;
  client: string;
  year: number;
  status: string;
  role: string;
  categories: string[];
  featured: boolean;
  draft: boolean;
  hasCase: boolean;
  proofStatus: ProofStatus;
  summary: string;
  proof: string;              // shown in Proof Mode on cards
  liveUrl?: string;
  instagram?: string;
  thumb?: string;             // card/home image; omit for typographic placeholder
  thumbContain?: boolean;     // logo-style contain vs cover
  thumbBg?: string;
  // case-page fields
  kicker?: string;
  tagline?: string;
  facts?: Fact[];
  problemHeading?: string;
  problem?: string[];
  systemHeading?: string;
  systemBuilt?: Feature[];
  beforeAfter?: { before: string; after: string };
  figures?: Figure[];
  deliverables?: string[];    // chips
  results?: Stat[];           // only REAL metrics
  proofNote?: string;         // honest status line inside case body
  closing?: string[];         // "why it matters"
}

export const categories = [
  { f: 'brand', label: 'Brand Systems' },
  { f: 'product', label: 'Digital Products' },
  { f: 'campaign', label: 'Campaigns' },
  { f: 'experience', label: 'Experiences' },
  { f: 'ops', label: 'Operations' },
];

export const projects: Project[] = [
  {
    slug: 'titanium-detailing',
    title: 'Titanium Detailing',
    client: 'Titanium Detailing (Red Lion / York, PA)',
    year: 2026,
    status: 'Live client · flagship',
    role: 'Brand, site, local SEO, booking, reviews + Titanium OS',
    categories: ['brand', 'experience', 'ops'],
    featured: true,
    draft: false,
    hasCase: true,
    proofStatus: 'LAUNCHED',
    summary:
      'The flagship: a full digital build for a mobile auto-detailing business that had an Instagram and a phone number and nothing else. Brand, a cinematic mobile-first site that books by text, 12 local city pages, and Titanium OS — a private daily control center. Live in about a week; 5.0★.',
    proof:
      'Only verified paying client. Brand + a 21-page mobile site (12 city pages) that books by text, plus Titanium OS. Live in ~1 week, rated 5.0★.',
    liveUrl: 'https://timely-chimera-4929f4.netlify.app',
    thumb: '/assets/shots/titanium-live.jpg',
    kicker: 'Case study No. 001 · Auto detailing · Red Lion / York, PA · Client project',
    tagline:
      'It had an Instagram and a phone number. Now it books by text off a luxury-tier site, ranks across 12 cities, and runs its whole day from Titanium OS. Live in about a week — the only fully verified paying client in this portfolio.',
    facts: [
      { l: 'Client', v: 'Titanium Detailing' },
      { l: 'Year', v: '2026' },
      { l: 'Status', v: 'Live · first paying client' },
      { l: 'Rating', v: '5.0★' },
      { l: 'Role', v: 'Full digital build, end to end' },
      { l: 'Build time', v: 'Live in ~1 week' },
      { l: 'Handoff', v: 'Client-owned, on-device' },
      { l: 'Tagline', v: '“Driven by Perfection.”' },
    ],
    problemHeading: 'The turnaround',
    beforeAfter: {
      before:
        'An Instagram and a phone number. No website, invisible on Google, bookings lost to slow replies, no lead or revenue tracking. It looked like a hobby and was priced like one.',
      after:
        'A cinematic, mobile-first site that books by text, built to rank across 12 York-area cities, with a daily tool to run leads and reviews. It looks — and operates — like a real brand.',
    },
    systemHeading: 'What I shipped',
    systemBuilt: [
      { n: '01', title: 'Cinematic mobile site', desc: 'A custom homepage and text-first booking flow, built luxury-tier and phone-first because that is where detailing leads come from.' },
      { n: '02', title: '12 local city pages', desc: 'Town-by-town pages across the York area with schema, sitemap, and security headers — built to rank where customers actually search.' },
      { n: '03', title: 'Titanium OS', desc: 'A private daily control center: lead pipeline, review sprint, quote calculator, revenue tracker, scripts and checklists. Runs offline, saves on-device.' },
      { n: '04', title: 'Growth System', desc: 'Audit, roadmap, SEO and Google Business setup, sales/ops/automation docs, brand guide, and a content calendar.' },
      { n: '05', title: 'Docs + handoff', desc: '16 playbooks, 4 proposals plus contract, and 6 client-facing docs — roughly 50 assets, handed over client-owned.' },
      { n: '06', title: 'Brand identity', desc: 'Matte black, titanium silver, and a purple accent, with a “T” emblem and the line “Driven by Perfection.”' },
    ],
    deliverables: ['21 live web pages', '12 city pages', 'Titanium OS tool', '16 playbooks', '4 proposals + contract', '~50 assets'],
    results: [
      { n: '21', l: 'Live web pages' },
      { n: '12', l: 'Local city pages' },
      { n: '5.0', accent: '★', l: 'Client rating' },
      { n: '1', accent: 'wk', l: 'Invisible → bookable' },
    ],
    proofNote:
      '◉ Proof: a real, paid, live client. 21 pages (12 city pages) that book by text, plus the Titanium OS tool. Deployed 0→live in about a week and rated 5.0★. The only fully verified paying engagement in this portfolio.',
    closing: [
      'This is the whole thesis in one project: a business doing good work that was invisible and unbookable. The fix was not a prettier logo — it was the identity, the site, the local pages, the booking flow, the review loop, and a tool to run it, built as one connected system and handed over client-owned.',
    ],
  },
  {
    slug: 'ce-os',
    title: 'CE OS',
    client: 'CE OS (own studio)',
    year: 2026,
    status: 'Active studio',
    role: 'Founder · builder, end to end',
    categories: ['brand', 'product', 'ops'],
    featured: true,
    draft: false,
    hasCase: true,
    proofStatus: 'LAUNCHED',
    summary:
      'A founder-run operating-system studio — brand, website, workflows, and software built as one connected operation across Build, Connect, Automate, and Run. Everything works together; the client owns the result.',
    proof:
      'Live public site, 49 Stripe services + 9 bundles, a Command Center, and a lead-site factory — with one verified paying client (Titanium Detailing).',
    liveUrl: 'https://ceos.ceo',
    thumb: '/assets/shots/ce-os-live.jpg',
    kicker: 'Case study · Studio + product company · Parent brand',
    tagline:
      'The connected system behind a business. CE OS builds the brand, website, workflows, and software as one operation — Build, Connect, Automate, Run — and ships its own products on the same rails. Everything works together; you own the result.',
    facts: [
      { l: 'Venture', v: 'CE OS' },
      { l: 'Year', v: '2026' },
      { l: 'Status', v: 'Active studio' },
      { l: 'Live at', v: 'ceos.ceo', href: 'https://ceos.ceo' },
      { l: 'Role', v: 'Founder · builder, start to finish' },
      { l: 'Model', v: 'Agency + product studio' },
      { l: 'Pillars', v: 'Build · Connect · Automate · Run' },
      { l: 'Base', v: 'York, PA + remote' },
    ],
    problemHeading: 'The idea',
    problem: [
      'Most small businesses do not have a marketing problem. They have a disconnected-tools problem — a site here, leads in an inbox, a booking app, a spreadsheet, payments somewhere else — and they lose leads between the gaps and look unfinished.',
      'CE OS is built around one answer: connect the brand, the website, the leads, the workflows, the payments, and the reporting into one operation the owner actually owns. It runs as two things at once — a studio that builds this for clients, and a company that ships its own products on the same system.',
    ],
    systemHeading: 'What I built',
    systemBuilt: [
      { n: '01', title: 'Build', desc: 'Brands, websites, portals, graphics, media, and applications — the visible surface of the business.' },
      { n: '02', title: 'Connect', desc: 'CRM, forms, calendars, payments, files, and APIs, wired so nothing falls through the gaps.' },
      { n: '03', title: 'Automate', desc: 'Follow-up, scheduling, proposals, reviews, and reporting — the repetitive work, gone.' },
      { n: '04', title: 'Run', desc: 'Dashboards, analytics, SOPs, and continuous improvement so the system keeps getting better.' },
      { n: '05', title: 'Command Center', desc: 'A private internal hub — scored leads, quote builder, and CRM-wired status — that runs the studio.' },
      { n: '06', title: 'Product portfolio', desc: 'Shiftly, STAKE, PLUG, AUXTION, and more, built on the same rails as the client work.' },
    ],
    figures: [
      { src: '/assets/shots/ceos-dark.jpg', alt: 'CE OS mark on dark', caption: 'The CE OS identity that ties the studio and its products together. (Current chrome mark is a working identity — a refined mark is in progress.)', dark: true },
      { src: '/assets/shots/ceos-emblem.png', alt: 'CE OS emblem', caption: 'The emblem extended across product and social surfaces.', dark: true },
    ],
    deliverables: ['Live site (ceos.ceo)', '49 Stripe services', '9 bundles', 'Command Center', 'Lead-site factory'],
    proofNote:
      '◉ Proof: an active studio with a live public site, 49 live Stripe services plus 9 bundles, and one verified paying client (Titanium Detailing). Its own products sit at varying stages and are labeled honestly on each case page — concept, building, or live infrastructure.',
    closing: [
      'CE OS is the clearest proof of the whole thesis: not decorating a business, but building the identity, the experience, the tools, and the operation behind it — as one connected system rather than six disconnected vendors.',
    ],
  },
  {
    slug: 'shiftly',
    title: 'Shiftly',
    titleSuffix: '(Fair Stand OS)',
    client: 'Own product · SaaS Lab',
    year: 2026,
    status: 'Concept · founding offer',
    role: 'Founder + product / brand design + build',
    categories: ['product', 'ops'],
    featured: true,
    draft: false,
    hasCase: true,
    proofStatus: 'CONCEPT',
    summary:
      'A live operations system for hourly businesses — POS, crew, tips, scheduling, and online orders in one view for fair stands, food trucks, pop-ups, and independent shops. Installable, offline-first, with no per-transaction markup. Built and working; no paying customers yet.',
    proof:
      'Real working POS, live board, clock, and tips — but no real customers yet. Self-built concept, not a launched client. Founding offer: first 5 businesses $49/mo lifetime for a testimonial.',
    liveUrl: undefined,
    thumb: '/assets/shots/shiftly-live.jpg',
    kicker: 'Case study · Live operations system for hourly business · SaaS (concept)',
    tagline:
      'Every shift, in sync. Run the whole floor from one screen — POS, crew, tips, scheduling, and online orders — for fair stands, food trucks, and independent shops. Installable, offline-first, and priced against the processor-fee model. Built and working; not yet sold.',
    facts: [
      { l: 'Product', v: 'Shiftly / Fair Stand OS' },
      { l: 'Type', v: 'SaaS · operations OS' },
      { l: 'Status', v: 'Concept · founding offer' },
      { l: 'Role', v: 'Founder · product + brand + build' },
      { l: 'Built as', v: 'Installable, offline-first' },
      { l: 'For', v: 'Fair stands · food trucks · shops' },
      { l: 'Fees', v: '0% Shiftly transaction markup' },
      { l: 'Tagline', v: '“Run the shift. Own the numbers.”' },
    ],
    problemHeading: 'The problem',
    problem: [
      'Local floors run on duct tape and card-processor fees. A POS here, a scheduling app there, a spreadsheet for tips, and a processor skimming every sale. For a fair stand or food truck it is chaos on the busiest day of the year.',
      'Shiftly puts the whole operation — sales, crew, tips, orders — on one screen anyone can run, then makes the pricing itself the argument: a flat fee instead of a percentage, so the busiest day does not become the most expensive.',
    ],
    systemHeading: 'What it does',
    systemBuilt: [
      { n: '01', title: 'Point of sale', desc: 'A fast POS built for a rush — menu, modifiers, and checkout a new hire can run in minutes.' },
      { n: '02', title: 'Crew board', desc: 'Clock in and out, roles, and who is on the floor right now, live on one screen.' },
      { n: '03', title: 'Scheduling', desc: 'Build shifts, swap them, and see coverage before the day starts.' },
      { n: '04', title: 'Tips + payouts', desc: 'Tips pooled and split fairly, with the math done for you.' },
      { n: '05', title: 'Online orders', desc: 'Take orders that land in the same live view as everything on the floor.' },
      { n: '06', title: 'White-label', desc: 'Each tenant controls its own logo, name, and a single accent — designed, not assembled.' },
    ],
    figures: [
      { src: '/assets/shots/shiftly-demo.jpg', alt: 'Shiftly live board', caption: 'The live board — sales rung, crew on the floor, open orders and tips in one glance. Sample data shown.' },
      { src: '/assets/shots/shiftly-app.jpg', alt: 'Shiftly role split — Operator or Crew', caption: 'The installed app opens to a role split — Operator runs the register and closeout; Crew clocks in and checks their record.' },
    ],
    deliverables: ['Installable app', 'Offline-first sync', 'POS + crew + tips', 'Online orders', 'White-label tenants'],
    proofNote:
      '◉ Proof: a real, working, installable POS/board/clock/tips build — but a self-built concept with no paying customers yet. Founding offer: the first 5 businesses get $49/mo lifetime in exchange for a testimonial. No fabricated logos, reviews, or revenue.',
    closing: [
      'Local operators do not fail because they lack software — they fail running four tools that do not talk while a processor skims every sale. Shiftly is one screen anyone can run, built offline-first because a fair stand or food truck loses signal constantly and a POS that stalls at the window is worthless.',
    ],
  },
  {
    slug: 'auxtion',
    title: 'AUXTION',
    client: 'Own product · sister to LIFTWAVE',
    year: 2026,
    status: 'Concept · live infrastructure',
    role: 'Founder · product · brand · build',
    categories: ['product', 'experience'],
    featured: true,
    draft: false,
    hasCase: true,
    proofStatus: 'CONCEPT',
    summary:
      'The live request line that pays. Guests scan a QR, search a real song, and pay to move up a transparent priority queue; the DJ approves what plays and rejected paid requests auto-refund. Real backend — Supabase, realtime, Stripe Connect, server-enforced fee. Self-built; no paying operators yet.',
    proof:
      'Functional app plus a marketing site, on real payment infrastructure (Supabase + Stripe Connect, server-enforced fee, refund logic). Self-built concept — not a launched client.',
    liveUrl: 'https://auxtion-red.vercel.app',
    thumb: '/assets/shots/auxtion-live.jpg',
    kicker: 'Case study · Live request app · Payments · DJ / nightlife',
    tagline:
      'Turn “play my song” into a queue that pays. A transparent paid-priority request line — QR entry, payment sets ranking, the operator approves, and rejected paid requests auto-refund. Custom “Signal A” mark, real payment rails. Built and working as a self-owned concept.',
    facts: [
      { l: 'Product', v: 'AUXTION' },
      { l: 'Type', v: 'Web app · payments' },
      { l: 'Status', v: 'Concept · live infra' },
      { l: 'Role', v: 'Product · brand · build' },
      { l: 'For', v: 'DJs · venues · guests' },
      { l: 'Money', v: 'Stripe Connect · 10% fee' },
      { l: 'Stack', v: 'Supabase · realtime · Deno' },
      { l: 'Mark', v: 'Custom “Signal A”' },
    ],
    problemHeading: 'The problem',
    problem: [
      'Every DJ knows the request problem: a wall of people shouting the same three songs, no way to tell who actually cares, and no upside for the DJ. The paper-and-shouting request line has no signal and no economics.',
      'AUXTION turns the request line into a transparent, opt-in market — the people who most want a song can say so with a tip, the ranking is always visible, and the DJ keeps control of the room.',
    ],
    systemHeading: 'How it works',
    systemBuilt: [
      { n: '01', title: 'DJ gets a QR', desc: 'The operator signs in, connects a payout account, and gets a personal QR for the night.' },
      { n: '02', title: 'Guests scan & search', desc: 'Guests search a real song — title, artist, artwork, preview — and pick how badly they want it.' },
      { n: '03', title: 'Paid priority', desc: 'Payment sets position in the queue transparently; higher bid ranks higher, always visible.' },
      { n: '04', title: 'Operator approves', desc: 'Nothing plays without the DJ. Reject a paid request and the guest is auto-refunded, fee reversed.' },
      { n: '05', title: 'Live queue', desc: 'The queue updates in realtime as payments come in, so the room can see the line move.' },
      { n: '06', title: 'Server-side fee', desc: 'A 10% platform fee is enforced server-side as a constant, not a setting a DJ can switch off.' },
    ],
    deliverables: ['Static web app', 'Supabase (auth · RLS · realtime)', 'Stripe Connect', 'Edge Functions', 'Auto-refund logic'],
    proofNote:
      '◉ Proof: real payment infrastructure, not a mockup — Stripe Connect destination charges with a server-enforced fee, plus live Edge Functions for connect, checkout, webhook, and refund. Still a self-built concept: no paying operators yet.',
    closing: [
      'The economics are the product. AUXTION is free for DJs and takes a mandatory 10% on every guest payment, enforced at the source. A rejected paid request refunds automatically, fee and all, so nobody pays for a song that never plays. It is the live module that feeds LIFTWAVE.',
    ],
  },
  {
    slug: 'liftwave',
    title: 'LIFTWAVE',
    client: 'Own product',
    year: 2026,
    status: 'Concept · building',
    role: 'Founder · product architecture + brand',
    categories: ['product', 'experience'],
    featured: false,
    draft: false,
    hasCase: true,
    proofStatus: 'CONCEPT',
    summary:
      'One live show system — audio-reactive visuals, mixing, a soundboard, paid requests, and earnings unified into a single browser-based app instead of six disconnected tools. A working audio/visual engine DJ runs at his own gigs; the surrounding platform is in build.',
    proof:
      'Working browser audio/visual engine used at live gigs; AUXTION is the live paid-requests module. Unified SaaS is in build. Self-built concept.',
    liveUrl: 'https://liftwave-delta.vercel.app',
    thumb: '/assets/shots/liftwave-live.jpg',
    kicker: 'Case study · DJ SaaS platform · Product architecture',
    tagline:
      'Make the room react. LIFTWAVE unifies the tools a DJ actually uses on a live night — visuals, mixing, a soundboard, paid requests, and earnings — into one browser-based system instead of six apps. Audio-reactive, no install. AUXTION is the live module.',
    facts: [
      { l: 'Product', v: 'LIFTWAVE' },
      { l: 'Type', v: 'Commercial DJ SaaS' },
      { l: 'Status', v: 'Concept · building' },
      { l: 'Role', v: 'Product architecture · brand' },
      { l: 'For', v: 'DJs · creators · venues' },
      { l: 'Live module', v: 'AUXTION' },
      { l: 'Runs', v: 'In-browser · no install' },
      { l: 'Base', v: 'York, PA + remote' },
    ],
    problemHeading: 'The idea',
    problem: [
      'A working DJ’s setup is a mess of tabs and apps: one thing for visuals, another for mixing, a soundboard somewhere else, a request system, and a spreadsheet for what the night actually made.',
      'LIFTWAVE is the decision to stop shipping those as separate products and build one app where they are modules of a single system — so a show runs from one place and the data is shared across all of it. Formerly “Fly Style Studio.”',
    ],
    systemHeading: 'The modules',
    systemBuilt: [
      { n: '01', title: 'OXYGEN', desc: 'The visual performance engine — audio-reactive visuals that react to the set, in the browser.' },
      { n: '02', title: 'MIX', desc: 'A local-file, two-deck mixing workspace built for the browser.' },
      { n: '03', title: 'DROPS', desc: 'Soundboard, producer tags, and custom sound packs on hand during a set.' },
      { n: '04', title: 'AUXTION', desc: 'Paid song requests, priority bids, tipping, and earnings — the live module already working.' },
      { n: '05', title: 'Library & events', desc: 'Songs, logos, visual presets, and packs, plus saved shows, QR links, and event history.' },
      { n: '06', title: 'Earnings', desc: 'AUXTION revenue, fees, payouts, and refunds in one ledger.' },
    ],
    deliverables: ['Browser audio/visual engine', 'Offline HTML build', 'AUXTION module (live)', 'Branded workspaces'],
    proofNote:
      '◉ Proof: a working audio/visual engine DJ runs at live gigs from an offline HTML build, architected as one app with shared data across modules. AUXTION is live infrastructure today; the surrounding platform is in build. Self-built concept.',
    closing: [
      'The hard part is not any single feature — it is designing one system that serves DJs, paying creators with branded workspaces, venues, and guests, all under one owner/admin layer, without splintering into six codebases.',
    ],
  },
  {
    slug: 'stake',
    title: 'STAKE',
    client: 'Own product · SaaS',
    year: 2026,
    status: 'Concept · building',
    role: 'Founder · product + deal-math design',
    categories: ['product', 'ops'],
    featured: true,
    draft: false,
    hasCase: true,
    proofStatus: 'CONCEPT',
    summary:
      'A real-estate acquisition OS — analyze a deal in seconds (MAO, ARV, repairs, ROI, risk score), run the pipeline from lead to paid, auto-generate contracts, and manage cash buyers in one workspace. A private tool in build; no customers.',
    proof:
      'A working deal-math engine with real formulas (MAO/ARV/ROI/risk), a pipeline CRM, and contract generation. Private self-built concept, in build.',
    liveUrl: undefined,
    thumb: '/assets/shots/stake-live.jpg',
    kicker: 'Case study · Real-estate acquisition OS · SaaS (concept)',
    tagline:
      'Find better deals. Make smarter offers. Close more profitably. A private acquisition OS for wholesalers and investors — the whole process, from first lead to closing, in one workspace built for real-estate deals. In build; marketing domain getstake.com.',
    facts: [
      { l: 'Product', v: 'STAKE' },
      { l: 'Type', v: 'SaaS · acquisition OS' },
      { l: 'Status', v: 'Concept · building' },
      { l: 'Role', v: 'Product + deal-math design' },
      { l: 'For', v: 'Wholesalers · investors' },
      { l: 'Core', v: 'Analyzer + pipeline + docs' },
      { l: 'Stack', v: 'Web app · JS · deal engine' },
      { l: 'Domain', v: 'getstake.com' },
    ],
    problemHeading: 'The problem',
    problem: [
      'Investors run deals across ten disconnected tools — spreadsheets, calculators, notes, contract templates, a CRM, and a buyers list that lives in someone’s phone.',
      'STAKE brings the entire acquisition process into one workspace built specifically for real-estate deals, so you spend less time on paperwork and more time closing.',
    ],
    systemHeading: 'What it does',
    systemBuilt: [
      { n: '01', title: 'Deal analysis', desc: 'MAO, ARV, repairs, assignment spread, projected profit, ROI, and a risk score — with a clear why.' },
      { n: '02', title: 'Pipeline', desc: 'Lead → Contact → Negotiation → Under Contract → Buyer Found → Closing → Paid, each deal its own workspace.' },
      { n: '03', title: 'Deal guidance', desc: 'Step-by-step next moves: follow-ups, negotiation reminders, buyer outreach, and closing tasks.' },
      { n: '04', title: 'Document generation', desc: 'Purchase and assignment agreements, LOIs, and buyer packages, pre-filled from the deal.' },
      { n: '05', title: 'Buyer database', desc: 'A searchable list of cash buyers by criteria, market, and budget — matched to the deal.' },
      { n: '06', title: 'Performance', desc: 'Active deals, pipeline value, projected profit, conversion, and revenue history at a glance.' },
    ],
    deliverables: ['Deal-math engine', 'Pipeline CRM', 'Contract generation', 'Buyer database', 'JavaScript'],
    proofNote:
      '◉ Proof: designed as a working deal engine with real formulas (MAO/ARV/ROI/risk), not a static screen. A private, self-built concept in build — no customers, no fabricated results.',
    closing: [
      'The mark shown is a working placeholder; a final STAKE identity is still in progress. The point of the build is the deal-math engine and the pipeline — the parts that actually decide whether a deal is worth making.',
    ],
  },
  {
    slug: 'plug',
    title: 'PLUG',
    client: 'Own product',
    year: 2026,
    status: 'Concept · internal tool',
    role: 'Founder · product + engine design',
    categories: ['product', 'campaign'],
    featured: false,
    draft: false,
    hasCase: true,
    proofStatus: 'CONCEPT',
    summary:
      'A TikTok Shop product + content engine — trending product data, a studio that writes hooks and scripts, and a compliance checker that flags medical and health claims before you post. An internal self-built concept.',
    proof:
      'A working engine combining product data, content generation, and a compliance rules-engine. Internal self-built concept.',
    liveUrl: undefined,
    thumb: undefined,
    kicker: 'Case study · TikTok Shop product + content engine (concept)',
    tagline:
      'Pick winners. Write the hooks. Stay compliant. PLUG surfaces trending, high-commission products, writes hooks and scripts, and checks your claims — so you post winners instead of guessing and protect the one account you have. Self-built internal concept.',
    facts: [
      { l: 'Product', v: 'PLUG' },
      { l: 'Type', v: 'Commerce + content engine' },
      { l: 'Status', v: 'Concept · internal' },
      { l: 'Role', v: 'Product + engine design' },
      { l: 'For', v: 'TikTok Shop sellers' },
      { l: 'Core', v: 'Data · studio · compliance' },
      { l: 'Stack', v: 'Web app · rules engine · JS' },
      { l: 'Base', v: 'York, PA + remote' },
    ],
    problemHeading: 'The problem',
    problem: [
      'Most sellers guess at products and torch their account on claims. The winners on TikTok Shop demonstrate a visible result in five seconds and pay real commission — but picking them is a guess, and one wrong health claim gets your account flagged.',
      'PLUG turns product selection into data and keeps content on the right side of the rules.',
    ],
    systemHeading: 'What it does',
    systemBuilt: [
      { n: '01', title: 'Trending product data', desc: 'Real categories, price bands, and commission ranges — the impulse band leads, low-commission electronics get flagged.' },
      { n: '02', title: 'Content studio', desc: 'Generate hooks and full scripts tuned to what actually demos in a short clip.' },
      { n: '03', title: 'Compliance checker', desc: 'Flags medical and health claims and risky language before you post, so you protect your account.' },
      { n: '04', title: 'Winner scoring', desc: 'Demand-to-effort plus commission scoring, so you promote first what pays best.' },
      { n: '05', title: 'Starter packs', desc: 'Ready-to-use product lists so you start with proven picks, not a blank page.' },
      { n: '06', title: 'Your first move', desc: 'Opinionated “do this today” guidance instead of a wall of options.' },
    ],
    deliverables: ['Product data', 'Content generation', 'Compliance rules engine', 'JavaScript'],
    proofNote:
      '◉ Proof: a working engine combining product data, content generation, and a compliance rules-engine. A self-built internal concept — no revenue claims.',
    closing: [
      'PLUG is a self-built tool, not a client product. It exists to prove the pattern: turn a guessing game into data, and put guardrails where a single mistake is expensive.',
    ],
  },
  {
    slug: 'mobile-bar',
    title: 'The Mobile Bar',
    client: 'The Mobile Bar (client)',
    year: 2026,
    status: 'Client · social & content',
    role: 'Marketing & content',
    categories: ['brand', 'campaign', 'experience'],
    featured: false,
    draft: false,
    hasCase: true,
    proofStatus: 'LAUNCHED',
    summary:
      'Marketing and content for a traveling 21+ mobile bar that runs events across the mid-Atlantic — Instagram content, short-form, and event promotion built to turn attention into booked events.',
    proof:
      'Active client content engagement — running the Instagram content system, short-form, and event promotion for a live events business. Exact business name and metrics pending confirmation with the client.',
    instagram: 'https://instagram.com/themobilebar247',
    thumb: undefined,
    kicker: 'Case study · Mobile bar · Social marketing & content',
    tagline:
      'The bar that travels. Marketing and content for a mobile bar that brings a full 21+ bar experience to events across Pennsylvania and the mid-Atlantic — built to turn attention into booked events.',
    facts: [
      { l: 'Client', v: 'The Mobile Bar' },
      { l: 'Type', v: 'Mobile bar · events' },
      { l: 'Status', v: 'Active client' },
      { l: 'Role', v: 'Marketing & content' },
      { l: 'Channel', v: 'Instagram · short-form' },
      { l: 'Serves', v: 'PA · mid-Atlantic' },
      { l: 'Focus', v: 'Content → bookings' },
      { l: 'Base', v: 'York, PA + remote' },
    ],
    problemHeading: 'The brand',
    problem: [
      'A traveling bar service — a full 21+ bar experience that shows up to weddings, parties, and private events and brings the atmosphere with it. The business lives and books on social: reach on Instagram is the top of the funnel, and every post either builds the brand or drives an inquiry.',
    ],
    systemHeading: 'What I run',
    systemBuilt: [
      { n: '01', title: 'Content system', desc: 'A repeatable posting rhythm — event recaps, behind-the-bar clips, and offers — so the feed stays active between bookings.' },
      { n: '02', title: 'Short-form / reels', desc: 'Event footage cut into scroll-stopping reels that show the vibe in seconds and travel further than static posts.' },
      { n: '03', title: 'Event promotion', desc: 'Promoting upcoming dates and open availability, and turning past events into proof that books the next one.' },
      { n: '04', title: 'Booking funnel', desc: 'Making the path from a post to a DM to a booked date obvious — clear calls to action and a consistent way to inquire.' },
      { n: '05', title: 'Brand consistency', desc: 'One voice, one look, one promise — “the bar that travels” — held steady across every post and caption.' },
      { n: '06', title: 'Audience', desc: 'Growing and engaging the following, and keeping it warm so the audience converts.' },
    ],
    deliverables: ['Instagram content', 'Reels / short-form', 'Event promotion', 'Brand voice', 'Audience growth'],
    proofNote:
      '◉ Proof: an active, ongoing client content engagement — running the Instagram content system, short-form, and event promotion for a live business. The exact registered business name (and any audience figures) are pending confirmation with the client.',
    closing: [
      'An events business does not need more content — it needs content that does a job. Every post is aimed at one of two outcomes: build the brand, or book a date.',
    ],
  },

  // ---- Overview-only ventures (no full case page yet) ----
  {
    slug: 'top-flavorz',
    title: 'Top Flavorz Grill',
    client: 'Top Flavorz Grill (Carlisle, PA)',
    year: 2026,
    status: 'Client · brand guide delivered',
    role: 'Brand strategist · content system designer',
    categories: ['brand', 'campaign'],
    featured: false,
    draft: false,
    hasCase: false,
    proofStatus: 'LAUNCHED',
    summary:
      'A delivered client brand + content system for a Carlisle grill — a full Viral Instagram Brand & Content Guide: positioning “Carlisle’s Loudest Plate,” the tagline “Flavor that hits different,” a 5-part viral formula, owned series, and a 30-day launch. Approved logo in hand.',
    proof:
      'Delivered client deliverable — a complete brand + content guide with an approved logo. Real client engagement (strategy/brand doc).',
    thumb: '/assets/logos/top-flavorz-logo.png',
    thumbContain: true,
    thumbBg: '#050505',
  },
  {
    slug: 'tso-apparel',
    title: 'TSO Apparel',
    client: 'Own venture',
    year: 2024,
    status: 'Active · 100+ sales · 4.65★',
    role: 'Founder · designer · photographer',
    categories: ['brand', 'campaign'],
    featured: false,
    draft: false,
    hasCase: false,
    proofStatus: 'LAUNCHED',
    summary:
      'Curated vintage plus one-of-one hand-customized apparel, sold on Depop and Grailed — a distressed, lived-in, Y2K-leaning aesthetic. DJ handles sourcing, photography, listing copy, pricing, and customers. Built to 100+ sales at a 4.65★ rating.',
    proof:
      'A real resale brand with real sales — 100+ sales at 4.65★. Self-run venture; DJ-designed apparel mark.',
    thumb: undefined,
  },
  {
    slug: 'scrollstop',
    title: 'ScrollStop',
    client: 'Own venture',
    year: 2026,
    status: 'Concept · store built, pre-scale',
    role: 'Founder · store + content + ops',
    categories: ['campaign', 'product'],
    featured: false,
    draft: false,
    hasCase: false,
    proofStatus: 'CONCEPT',
    summary:
      'A TikTok-first “cool finds” store — content so good it stops your scroll. A Shopify storefront (60–72 products with copy and SKUs), 7 collections, discount codes, a welcome email, ad videos, lead games, and a live ops dashboard. Built, pre-scale.',
    proof:
      'A built Shopify store with a content system and a dropship ops dashboard. Self-built concept, pre-scale.',
    thumb: '/assets/logos/scrollstop-wordmark.png',
    thumbContain: true,
    thumbBg: '#f4f0e6',
  },
  {
    slug: 'thrown-after',
    title: 'Thrown After',
    client: 'Own venture · flagship',
    year: 2026,
    status: 'Shelved · rebuilding',
    role: 'Founder & CEO',
    categories: ['product', 'brand'],
    featured: false,
    draft: false,
    hasCase: false,
    proofStatus: 'SHELVED',
    summary:
      'A community discovery platform — “Community. Events. Opportunity.” Events, creators, venues, businesses, nonprofits, and jobs, with claimable listings, a Founders Club, referrals, and the AFTER™ assistant. Launched then shelved 2026-06-29; being rebuilt from scratch with a native iOS app in development.',
    proof:
      'Built and launched, then shelved (code intact) and now being rebuilt. Real UI designed end to end. DJ-designed wordmark + “TA” mark.',
    liveUrl: 'https://thrownafter.com',
    thumb: '/assets/shots/thrown-after-live.jpg',
  },
  {
    slug: 'carbyn',
    title: 'CARBYN',
    client: 'Own venture',
    year: 2026,
    status: 'Long-game · backlog',
    role: 'Artist · creative direction',
    categories: ['brand', 'experience'],
    featured: false,
    draft: false,
    hasCase: false,
    proofStatus: 'CONCEPT',
    summary:
      'DJ’s music and personal artist brand — underground / rage / hyperpop / digicore, on SoundCloud and Spotify. A long-game identity built on the same system as everything else. Mark still in progress.',
    proof:
      'Personal artist/DJ brand line under CE OS. Long-game; no standalone logo pack yet (mark in progress).',
  },
];

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const published = projects.filter((p) => !p.draft);
export const featured = published.filter((p) => p.featured);
export const caseProjects = published.filter((p) => p.hasCase);

export const proofLabel: Record<ProofStatus, string> = {
  LAUNCHED: 'Launched',
  CONCEPT: 'Concept · self-built',
  SHELVED: 'Shelved',
};
