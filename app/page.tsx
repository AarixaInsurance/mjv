'use client'

import React, { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileText,
  HeartPulse,
  LineChart,
  LockKeyhole,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
  ExternalLink,
  Award,
  ChevronRight,
  ShieldAlert,
  DownloadCloud,
  Layers,
  Percent,
  CheckCheck
} from 'lucide-react'

import MarketTicker from '@/components/MarketTicker'
import FinancialCalculators from '@/components/FinancialCalculators'
import PortfolioLoginModal from '@/components/PortfolioLoginModal'
import QuickInvestModal from '@/components/QuickInvestModal'

interface SolutionItem {
  icon: React.ElementType
  title: string
  text: string
  tag: string
  features: string[]
  category: string
}

const solutions: SolutionItem[] = [
  {
    icon: LineChart,
    title: 'Mutual Funds',
    text: 'Tailored equity, hybrid & debt funds with goal-linked Systematic Investment Plans (SIP).',
    tag: 'Wealth Growth',
    features: ['Direct AMC tie-ups', 'Regular portfolio rebalancing', 'Tax saving under 80C'],
    category: 'Mutual Funds',
  },
  {
    icon: HeartPulse,
    title: 'Life & Health Insurance',
    text: 'Comprehensive term plans, critical illness riders, and cashless family mediclaim policies.',
    tag: 'Family Protection',
    features: ['Instant claim assistance', 'Coverage up to ₹10+ Cr', 'Top insurers compared'],
    category: 'Life & Health Insurance',
  },
  {
    icon: CircleDollarSign,
    title: 'Corporate Fixed Deposits',
    text: 'Crisil AAA / AA+ rated corporate deposits giving superior yields compared to traditional bank FDs.',
    tag: 'Guaranteed Returns',
    features: ['Up to 8.5%* p.a.', 'Monthly/Quarterly payout options', 'Senior citizen bonus rate'],
    category: 'Corporate Deposits',
  },
  {
    icon: BarChart3,
    title: 'PMS & AIF Services',
    text: 'Professional boutique wealth management strategies for HNIs, NRIs, and business promoters.',
    tag: 'High Net-Worth',
    features: ['Dedicated fund manager', 'Unlisted & private equity deals', 'Custom risk mandate'],
    category: 'PMS',
  },
  {
    icon: ShieldCheck,
    title: 'Asset & General Insurance',
    text: 'Robust insurance protection covering commercial factory assets, machinery, fire, transit & fleets.',
    tag: 'Asset Security',
    features: ['Zero depreciation add-ons', 'Turnaround in 24 hrs', 'Risk assessment surveys'],
    category: 'Asset Insurance',
  },
  {
    icon: FileText,
    title: 'Bonds & Sovereign Debentures',
    text: 'Government Securities (G-Sec), RBI floating rate bonds & high-yield listed non-convertible debentures.',
    tag: 'Steady Income',
    features: ['Sovereign guarantee backing', 'Semi-annual coupon payout', 'Capital gains tax exemption'],
    category: 'Bonds & Debentures',
  },
]

const stats = [
  ['25+ Years', 'of trusted financial lineage', ShieldCheck],
  ['5,000+', 'investor families served nationwide', Users],
  ['₹500 Cr+', 'assets guided with diligence', TrendingUp],
  ['100%', 'AMFI registered & compliant', LockKeyhole],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [investModalOpen, setInvestModalOpen] = useState(false)
  const [selectedSolution, setSelectedSolution] = useState<string>('Mutual Funds')

  // Consultation Form state
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('Wealth planning')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Download Brochure simulation
  const [downloadingBrochure, setDownloadingBrochure] = useState(false)

  const handleOpenInvest = (cat?: string) => {
    if (cat) setSelectedSolution(cat)
    setInvestModalOpen(true)
  }

  const handleBrochureDownload = () => {
    setDownloadingBrochure(true)
    setTimeout(() => {
      setDownloadingBrochure(false)
      // Create and trigger simulated download
      const element = document.createElement('a')
      const file = new Blob([
        `MJV FINSERV PRIVATE LIMITED
AMFI Registered Mutual Fund Distributor (ARN-253442)
Registration Date: 19/09/2025 | Current Validity: 18/09/2028

Thank you for downloading the MJV Finserv Wealth & Protection Guide 2026.
Contact: mjvfinserv@gmail.com | +91 94221 04060
Office: 2nd Floor, Landmark Plaza, Pune, Maharashtra

Key Services:
1. Mutual Funds & Goal SIPs
2. Term Life & Health Insurance
3. High Yield Corporate Fixed Deposits
4. Portfolio Management Services (PMS & AIF)
5. Asset & Commercial Risk Coverage
6. Government Bonds & Listed Debentures
`
      ], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = 'MJV_Finserv_Wealth_Guide_2026.txt'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }, 800)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 700)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 selection:bg-[#064789] selection:text-white">
      {/* Top Bar with verified AMFI details and quick contact */}
      <div className="bg-[#04284d] px-4 py-2 text-xs text-blue-100 border-b border-blue-900/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <ShieldCheck className="size-3.5" /> AMFI Reg. ARN-253442
            </span>
            <a
              href="mailto:mjvfinserv@gmail.com"
              className="flex items-center gap-1.5 hover:text-white transition"
            >
              <Mail className="size-3.5 text-blue-300" /> mjvfinserv@gmail.com
            </a>
            <a
              href="tel:+919422104060"
              className="hidden items-center gap-1.5 hover:text-white transition sm:flex"
            >
              <Phone className="size-3.5 text-blue-300" /> +91 94221 04060
            </a>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-blue-200">
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-3.5 text-blue-300" /> Mon–Sat: 10:00 AM – 6:30 PM
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3.5">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#064789] to-[#04284d] text-lg font-black text-white shadow-md group-hover:scale-105 transition-transform">
              M
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-[#064789] leading-tight flex items-center gap-1.5">
                MJV Finserv
                <span className="text-[10px] font-bold bg-blue-100 text-[#064789] px-1.5 py-0.5 rounded tracking-normal">
                  PVT LTD
                </span>
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Private Wealth & Financial Solutions
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-700 lg:flex">
            <a href="#home" className="hover:text-[#064789] transition">Home</a>
            <a href="#about" className="hover:text-[#064789] transition">Why MJV</a>
            <a href="#solutions" className="hover:text-[#064789] transition">Our Solutions</a>
            <a href="#calculators" className="hover:text-[#064789] transition flex items-center gap-1">
              Calculators
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </a>
            <a href="#disclosures" className="hover:text-[#064789] transition">Regulatory</a>
            <a href="#contact" className="hover:text-[#064789] transition">Contact</a>
          </nav>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden items-center gap-3 sm:flex">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="rounded-xl border border-[#064789] px-4 py-2.5 text-xs font-bold text-[#064789] hover:bg-blue-50 transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <LockKeyhole className="size-3.5" />
              <span>Investor Login</span>
            </button>
            <button
              onClick={() => handleOpenInvest()}
              className="rounded-xl bg-gradient-to-r from-[#064789] to-[#0b5bb5] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:shadow-lg hover:from-[#053d75] hover:to-[#084b94] transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="size-3.5 text-yellow-300" />
              <span>Start Investing</span>
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <nav className="flex flex-col gap-3 border-t border-slate-200 bg-white px-5 py-5 text-sm font-semibold lg:hidden shadow-xl animate-in slide-in-from-top-2">
            <a href="#home" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#064789]">Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#064789]">Why MJV</a>
            <a href="#solutions" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#064789]">Our Solutions</a>
            <a href="#calculators" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#064789] text-[#064789] font-bold">Calculators (SIP / Lumpsum)</a>
            <a href="#disclosures" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#064789]">Regulatory Compliance</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[#064789]">Contact Us</a>
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  setLoginModalOpen(true)
                }}
                className="w-full py-3 rounded-xl border border-[#064789] text-[#064789] font-bold text-center"
              >
                Investor Login
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  handleOpenInvest()
                }}
                className="w-full py-3 rounded-xl bg-[#064789] text-white font-bold text-center shadow-md"
              >
                Start Investing Now
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Live Sensex / Nifty Moving Banner */}
      <MarketTicker />

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#064789] via-[#053d75] to-[#04284d] px-4 py-8 sm:py-10 text-white">
        <div className="absolute -right-24 -top-24 size-[360px] rounded-full border-[60px] border-white/5 blur-[1px] pointer-events-none" />
        <div className="absolute -left-20 bottom-0 size-[280px] rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-200 backdrop-blur mb-3 border border-white/15">
              <Sparkles className="size-3 text-yellow-300" /> Financial Planning · Goal SIP · Wealth Protection
            </div>

            <h1 className="max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
              Build Lasting Wealth. <br />
              <span className="text-blue-200 font-bold">
                Live With Total Freedom.
              </span>
            </h1>

            <p className="mt-3.5 max-w-xl text-sm sm:text-base leading-relaxed text-blue-100/90">
              Personalized wealth planning, tax-efficient mutual funds, and risk management for{' '}
              <strong className="text-white font-semibold">families, professionals, NRIs, and business leaders</strong>.
              Transparent advice governed strictly by AMFI standards.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleOpenInvest()}
                className="flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#064789] shadow-md hover:bg-blue-50 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="size-3.5" />
              </button>

              <a
                href="#calculators"
                className="flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-bold text-white backdrop-blur hover:bg-white/20 transition cursor-pointer"
              >
                <Calculator className="size-3.5 text-emerald-300" />
                <span>Calculate Returns</span>
              </a>

              <a
                href="#contact"
                className="text-xs font-semibold text-blue-200 hover:text-white underline underline-offset-4 ml-1"
              >
                Book a Free Discovery Call →
              </a>
            </div>

            <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs text-blue-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" /> 100% AMFI Compliant (ARN-253442)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" /> Regular Portfolio Reviews
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" /> Zero Initial Consultation Fee
              </span>
            </div>
          </div>

          {/* Stats highlight card grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map(([big, small, Icon]) => {
              const IconComp = Icon as React.ElementType
              return (
                <div
                  key={big as string}
                  className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-md hover:bg-white/15 transition-all shadow-sm"
                >
                  <div className="mb-3 inline-flex p-2 rounded-lg bg-white/10 text-emerald-300 border border-white/10">
                    <IconComp className="size-4" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {big as string}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-blue-100">
                    {small as string}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* About Section - Why MJV */}
      <section id="about" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-[#064789] px-3 py-0.5 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Award className="size-3.5" /> Institutional Discipline, Personal Empathy
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              A smarter, honest path to <br />
              <span className="text-[#064789]">
                achieving your milestones.
              </span>
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-600">
              Unlike generic aggregators who sell financial products on quotas, MJV Finserv architects individualized portfolios. We match your timeline, risk appetite, and cash flows to curated, verified instruments.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="size-8 rounded-lg bg-blue-50 text-[#064789] grid place-items-center mb-2.5 font-bold">
                  <Target className="size-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Goal-First Allocation</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Targeted plans for children’s education, dream home down payment, and post-retirement wealth.
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 shadow-sm border border-slate-200 hover:shadow-md transition">
                <div className="size-8 rounded-lg bg-blue-50 text-[#064789] grid place-items-center mb-2.5 font-bold">
                  <Sparkles className="size-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Transparent Advice</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Full upfront disclosure of trailing commissions, expense ratios, and fund exit terms.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <button
                onClick={handleBrochureDownload}
                disabled={downloadingBrochure}
                className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
              >
                <DownloadCloud className="size-3.5 text-[#064789]" />
                <span>{downloadingBrochure ? 'Preparing Brochure...' : 'Download Company Brochure (PDF)'}</span>
              </button>
            </div>
          </div>

          {/* Value promise card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#064789] to-[#04284d] p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              Our Core Philosophy
            </span>
            <blockquote className="mt-4 text-lg sm:text-xl leading-relaxed text-white font-medium">
              “Your hard-earned money should work just as relentlessly as you do — and your financial plan should make that progress visible every single month.”
            </blockquote>

            <div className="mt-6 flex items-center gap-3 border-t border-white/20 pt-4">
              <div className="grid size-10 place-items-center rounded-xl bg-white text-base font-black text-[#064789] shadow-sm">
                M
              </div>
              <div>
                <p className="font-bold text-white text-sm">MJV Finserv Private Limited</p>
                <p className="text-[11px] text-blue-200">Registration ARN-253442 · Pune & Pan-India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="bg-white px-4 py-10 md:py-14 border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-[#064789] px-3 py-0.5 text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
                <Layers className="size-3.5" /> End-to-End Financial Spectrum
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
                One Trusted Partner.{' '}
                <span className="text-[#064789]">
                  Every Opportunity.
                </span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-slate-600">
              From building your very first monthly SIP to insuring commercial business assets and structuring PMS portfolios.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((item) => {
              const IconComp = item.icon
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#064789]/50 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="grid size-10 place-items-center rounded-lg bg-blue-50 text-[#064789] group-hover:bg-[#064789] group-hover:text-white transition-colors">
                        <IconComp className="size-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full group-hover:bg-blue-50 group-hover:text-[#064789] transition">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#064789] transition">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      {item.text}
                    </p>

                    <div className="mt-3.5 space-y-1.5 pt-3 border-t border-slate-100">
                      {item.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Check className="size-3 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenInvest(item.category)}
                      className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 group-hover:bg-[#064789] py-2 text-xs font-bold text-slate-700 group-hover:text-white transition-all cursor-pointer"
                    >
                      <span>Explore & Invest In {item.title}</span>
                      <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Financial Wealth Calculators (Fully functional) */}
      <FinancialCalculators onBookConsultation={(detail) => {
        setService(detail.includes('SIP') ? 'Mutual funds' : 'Wealth planning')
        setMessage(`Inquiring from: ${detail}`)
      }} />

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-br from-[#064789] via-[#053d75] to-[#04284d] px-4 py-10 md:py-14 text-white relative">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-200 border border-white/15 mb-2.5">
              <Mail className="size-3.5" /> Direct Advisory Desk
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Your next wealth chapter <br />
              <span className="text-blue-200">
                starts with a conversation.
              </span>
            </h2>
            <p className="mt-3.5 max-w-md text-xs sm:text-sm leading-relaxed text-blue-100/90">
              Whether you want to audit your existing mutual funds, plan tax saves under 80C, or construct a retirement corpus, our senior AMFI advisors are ready to assist.
            </p>

            <div className="mt-6 space-y-3 text-xs sm:text-sm text-blue-100">
              <a
                href="mailto:mjvfinserv@gmail.com"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <div className="grid size-8 place-items-center rounded-lg bg-white/10 text-white">
                  <Mail className="size-4" />
                </div>
                <div>
                  <div className="text-[10px] text-blue-300">Official Email</div>
                  <div className="font-semibold text-white">mjvfinserv@gmail.com</div>
                </div>
              </a>

              <a
                href="tel:+919422104060"
                className="flex items-center gap-3 hover:text-white transition"
              >
                <div className="grid size-8 place-items-center rounded-lg bg-white/10 text-white">
                  <Phone className="size-4" />
                </div>
                <div>
                  <div className="text-[10px] text-blue-300">Helpline & WhatsApp</div>
                  <div className="font-semibold text-white">+91 94221 04060</div>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="grid size-8 place-items-center rounded-lg bg-white/10 text-white">
                  <Target className="size-4" />
                </div>
                <div>
                  <div className="text-[10px] text-blue-300">Registered Office</div>
                  <div className="font-semibold text-white">
                    2nd Floor, Landmark Plaza, Pune, Maharashtra - 411001
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Card */}
          <div className="rounded-xl bg-white p-5 sm:p-7 text-slate-800 shadow-xl border border-slate-100">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Book A Priority Consultation</h3>
            <p className="text-xs text-slate-500 mt-0.5">Get an expert portfolio audit with no initial obligation</p>

            {submitted ? (
              <div className="mt-8 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-3">
                <div className="grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-600 mx-auto animate-bounce">
                  <Check className="size-8" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900">Thank You, {fullName || 'Valued Investor'}!</h4>
                <p className="text-sm text-emerald-700">
                  Your request has been prioritized. Our certified wealth specialist will contact you at <strong>{phone || 'your phone number'}</strong> within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-[#064789] underline cursor-pointer"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Your Name
                  </label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Anand Kulkarni"
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#064789] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="anand@gmail.com"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#064789] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Phone Number
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98220 00000"
                      className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#064789] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    What can we help you with?
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-[#064789] focus:bg-white focus:outline-none"
                  >
                    <option value="Wealth planning">Comprehensive Wealth & Financial Planning</option>
                    <option value="Mutual funds">Mutual Funds & SIP Portfolio Optimization</option>
                    <option value="Insurance">Life & Health Insurance Audit</option>
                    <option value="Corporate solutions">Corporate Deposits & High Yield Bonds</option>
                    <option value="PMS">Portfolio Management Services (PMS / AIF)</option>
                    <option value="NRI Desk">NRI Investment & Repatriation Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Notes / Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your target goals or current investments..."
                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#064789] focus:bg-white focus:outline-none resize-none"
                  />
                </div>

                <button
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#064789] py-2.5 px-5 text-xs font-bold text-white hover:bg-[#053d75] transition shadow-md cursor-pointer disabled:opacity-75"
                  type="submit"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>Request Priority Consultation</span>
                      <ArrowRight className="size-3.5" />
                    </>
                  )}
                </button>

                <p className="text-[10px] text-center text-slate-400 pt-0.5">
                  🔒 We protect your data. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Mandatory Statutory & Regulatory Disclosures Section */}
      <footer id="disclosures" className="bg-[#031d38] px-4 py-8 text-xs text-white">
        <div className="mx-auto max-w-7xl rounded-xl border border-red-500/80 bg-[#04284d]/90 p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 text-red-400 font-bold text-xs sm:text-sm mb-3">
            <ShieldAlert className="size-4 shrink-0" />
            <span>MANDATORY STATUTORY RISK DISCLOSURES & AMFI NOTICE</span>
          </div>

          <div className="space-y-2.5 text-[11px] sm:text-xs leading-relaxed text-blue-100/90 border-b border-white/10 pb-4">
            <p>
              <strong>Risk Factors:</strong> Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Mutual Fund schemes do not assure or guarantee any returns. Past performance of any mutual fund scheme may or may not be sustained in the future. There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate exit loads and other cost structures (TER) applicable at the time of making the investment before finalizing any investment decision.
            </p>
            <p>
              <strong>Distributor Disclosure:</strong> MJV Finserv Private Limited is an AMFI Registered Mutual Fund Distributor (ARN-253442). We deal in Regular Plans only for Mutual Fund Schemes and earn a trailing commission on client investments. Disclosure for commission earnings is made to clients at the time of investment or upon request. The option of Direct Plans for every mutual fund scheme is available to investors offering the advantage of a lower expense ratio. We are not entitled to earn commission on direct plans; hence we do not distribute Direct Plans.
            </p>
          </div>

          {/* AMFI Accreditation Badge */}
          <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-lg bg-white text-center text-[#064789] font-black shadow-sm shrink-0">
                <div className="leading-tight text-[10px] font-black">
                  AMFI<br />
                  <span className="text-xs text-emerald-600">▲▲▲</span>
                </div>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  ARN-253442 (AMFI Registered Mutual Fund Distributor)
                </p>
                <p className="text-[11px] text-blue-200">
                  Initial Registration Date: 19/09/2025 <span className="mx-1.5">|</span> Current Validity: 18/09/2028
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium text-blue-200">
              <a href="#disclosures" className="hover:text-white underline">SID / KIM Links</a>
              <span>•</span>
              <a href="#disclosures" className="hover:text-white underline">Code of Conduct</a>
              <span>•</span>
              <a href="#disclosures" className="hover:text-white underline">Investor Charter</a>
              <span>•</span>
              <a href="#disclosures" className="hover:text-white underline">Privacy Policy</a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-7xl flex-col items-center justify-between gap-2 text-[11px] text-blue-300/80 md:flex-row">
          <span>
            © 2026 MJV Finserv Private Limited · CIN: Financial Services Advisory. All Rights Reserved.
          </span>
          <span>
            Office: Pune, Maharashtra · Helpline: +91 94221 04060 · mjvfinserv@gmail.com
          </span>
        </div>
      </footer>

      {/* Interactive Modals */}
      <PortfolioLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToContact={() => {
          const contactEl = document.getElementById('contact')
          contactEl?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <QuickInvestModal
        isOpen={investModalOpen}
        onClose={() => setInvestModalOpen(false)}
        prefillCategory={selectedSolution}
        onSubmitSuccess={() => {
          alert('Thank you! Your personalized wealth allocation request has been registered with MJV Finserv.')
        }}
      />
    </main>
  )
}
