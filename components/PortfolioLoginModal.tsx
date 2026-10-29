'use client'

import React, { useState } from 'react'
import { X, Lock, ShieldCheck, Mail, ArrowRight, CheckCircle2, User, KeyRound } from 'lucide-react'

interface PortfolioLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToContact?: () => void
}

export default function PortfolioLoginModal({ isOpen, onClose, onSwitchToContact }: PortfolioLoginModalProps) {
  const [tab, setTab] = useState<'client' | 'distributor'>('client')
  const [clientId, setClientId] = useState('')
  const [password, setPassword] = useState('')
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatusMessage(null)

    // Simulate secure client portal authentication
    setTimeout(() => {
      setIsLoading(false)
      setStatusMessage('Portal access credentials verified. Redirecting to your secure portfolio dashboard...')
      setTimeout(() => {
        setStatusMessage(null)
        onClose()
        // Provide mock alert feedback
        alert('Welcome to MJV Finserv Secure Client Portal. Your account session is active.')
      }, 1500)
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="grid size-11 place-items-center rounded-xl bg-blue-50 text-[#064789] border border-blue-100">
            <Lock className="size-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Investor Portal</h3>
            <p className="text-xs text-slate-500">256-bit encrypted secure login</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-lg bg-slate-100 p-1 mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab('client')}
            className={`flex-1 py-2 rounded-md transition ${
              tab === 'client' ? 'bg-white text-[#064789] shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Client Login
          </button>
          <button
            type="button"
            onClick={() => setTab('distributor')}
            className={`flex-1 py-2 rounded-md transition ${
              tab === 'distributor' ? 'bg-white text-[#064789] shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Partner / NRI Desk
          </button>
        </div>

        {statusMessage ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center text-emerald-800">
            <CheckCircle2 className="size-8 mx-auto text-emerald-600 mb-2 animate-bounce" />
            <p className="text-sm font-semibold">{statusMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                {tab === 'client' ? 'PAN / Client ID / Mobile' : 'ARN / Partner ID'}
              </label>
              <div className="relative">
                <input
                  required
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder={tab === 'client' ? 'e.g. ABCDE1234F or 9823456789' : 'ARN-253442'}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#064789] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064789]/20"
                />
                <User className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Password / OTP PIN</label>
                <a
                  href="#contact"
                  onClick={() => {
                    onClose()
                    onSwitchToContact?.()
                  }}
                  className="text-xs text-[#064789] hover:underline font-medium"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#064789] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#064789]/20"
                />
                <KeyRound className="absolute right-3.5 top-3.5 size-4 text-slate-400" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#064789] py-3.5 px-4 text-sm font-bold text-white hover:bg-[#053d75] transition shadow-md disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Secure Sign In</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="size-4" /> AMFI Verified ARN-253442
          </span>
          <button
            onClick={() => {
              onClose()
              onSwitchToContact?.()
            }}
            className="text-[#064789] hover:underline font-semibold"
          >
            New Investor? Register
          </button>
        </div>
      </div>
    </div>
  )
}
