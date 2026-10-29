'use client'

import React, { useState } from 'react'
import {
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  FileCheck,
  ShieldCheck,
  IndianRupee,
  Clock,
  Briefcase
} from 'lucide-react'

interface QuickInvestModalProps {
  isOpen: boolean
  onClose: () => void
  prefillCategory?: string
  onSubmitSuccess?: () => void
}

export default function QuickInvestModal({
  isOpen,
  onClose,
  prefillCategory = 'Mutual Funds',
  onSubmitSuccess,
}: QuickInvestModalProps) {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState(prefillCategory)
  const [horizon, setHorizon] = useState('3-5 Years')
  const [monthlyBudget, setMonthlyBudget] = useState('₹10,000 - ₹25,000')
  const [isDone, setIsDone] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDone(true)
    setTimeout(() => {
      setIsDone(false)
      onClose()
      onSubmitSuccess?.()
    }, 2200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="grid size-11 place-items-center rounded-xl bg-blue-50 text-[#064789] border border-blue-100">
            <TrendingUp className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Start Your Investment Plan</h3>
            <p className="text-xs text-slate-500">Zero distributor fees for personalized portfolio mapping</p>
          </div>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-600 animate-bounce">
              <CheckCircle2 className="size-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Application Received!</h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto">
              Our AMFI-certified wealth specialist will connect with you on <strong className="text-slate-900">{mobile || 'your phone'}</strong> within 2 hours with customized fund allocations.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Preferred Solution / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#064789] focus:bg-white focus:outline-none"
              >
                <option value="Mutual Funds">Mutual Funds (SIP / Lumpsum)</option>
                <option value="Life & Health Insurance">Comprehensive Life & Health Insurance</option>
                <option value="Corporate Deposits">High Yield Corporate Fixed Deposits</option>
                <option value="PMS">Portfolio Management Services (PMS / AIF)</option>
                <option value="Asset Insurance">Asset, Fire & Business Insurance</option>
                <option value="Bonds & Debentures">Tax-Saving Bonds & Sovereign Debentures</option>
                <option value="Retirement / Child Education">Retirement or Child Higher Education Fund</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Investment Horizon
                </label>
                <select
                  value={horizon}
                  onChange={(e) => setHorizon(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#064789] focus:bg-white focus:outline-none"
                >
                  <option value="Under 1 Year">Under 1 Year (Liquid/Arbitrage)</option>
                  <option value="1-3 Years">1 - 3 Years (Short-term)</option>
                  <option value="3-5 Years">3 - 5 Years (Medium-term)</option>
                  <option value="5-10 Years">5 - 10 Years (Wealth Creation)</option>
                  <option value="10+ Years">10+ Years (Retirement/Long-term)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Monthly / Capital Budget
                </label>
                <select
                  value={monthlyBudget}
                  onChange={(e) => setMonthlyBudget(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#064789] focus:bg-white focus:outline-none"
                >
                  <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
                  <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                  <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000+ / HNI">₹1,00,000+ / HNI Allocation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Your Full Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#064789] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Mobile Number (WhatsApp)
                </label>
                <input
                  required
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98220 00000"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#064789] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-[#064789] focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#064789] to-blue-700 py-3.5 px-4 text-sm font-bold text-white hover:from-[#053d75] hover:to-blue-800 transition shadow-lg"
              >
                <span>Get Customized Proposal</span>
                <ArrowRight className="size-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3.5 text-emerald-600" /> AMFI Reg. ARN-253442
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5 text-blue-600" /> Quick Callback
              </span>
              <span>•</span>
              <span>100% Confidential</span>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
