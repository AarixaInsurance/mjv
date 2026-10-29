'use client'

import React, { useState, useId } from 'react'
import {
  Calculator,
  TrendingUp,
  PieChart as PieChartIcon,
  Shield,
  Clock,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

type CalcType = 'sip' | 'lumpsum' | 'goal' | 'delay'

export default function FinancialCalculators({ onBookConsultation }: { onBookConsultation?: (detail: string) => void }) {
  const [activeTab, setActiveTab] = useState<CalcType>('sip')

  // SIP State
  const [sipMonthly, setSipMonthly] = useState<number>(15000)
  const [sipRate, setSipRate] = useState<number>(12)
  const [sipYears, setSipYears] = useState<number>(15)

  // Lumpsum State
  const [lumpAmount, setLumpAmount] = useState<number>(200000)
  const [lumpRate, setLumpRate] = useState<number>(12)
  const [lumpYears, setLumpYears] = useState<number>(10)

  // Goal Planner State
  const [targetGoal, setTargetGoal] = useState<number>(5000000) // ₹50 Lakhs
  const [goalYears, setGoalYears] = useState<number>(10)
  const [goalRate, setGoalRate] = useState<number>(12)

  // Delay Cost State
  const [delayMonthly, setDelayMonthly] = useState<number>(10000)
  const [delayMonths, setDelayMonths] = useState<number>(24) // 2 years delay
  const [delayTotalYears, setDelayTotalYears] = useState<number>(20)
  const [delayRate, setDelayRate] = useState<number>(12)

  // Format currency in Indian standard
  const formatINR = (val: number) => {
    return '₹' + Math.round(val).toLocaleString('en-IN')
  }

  // Calculate SIP
  // M = P * ({[1 + i]^n - 1} / i) * (1 + i)
  const calculateSIP = () => {
    const P = sipMonthly
    const i = sipRate / 100 / 12
    const n = sipYears * 12
    const invested = P * n
    const total = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
    const gains = Math.max(0, total - invested)
    return { invested, gains, total }
  }

  // Calculate Lumpsum
  // A = P * (1 + r)^t
  const calculateLumpsum = () => {
    const P = lumpAmount
    const r = lumpRate / 100
    const t = lumpYears
    const total = P * Math.pow(1 + r, t)
    const gains = Math.max(0, total - P)
    return { invested: P, gains, total }
  }

  // Calculate Required SIP for Target Goal
  // P = M / (({[1 + i]^n - 1} / i) * (1 + i))
  const calculateGoalSIP = () => {
    const M = targetGoal
    const i = goalRate / 100 / 12
    const n = goalYears * 12
    const factor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
    const monthlyNeeded = M / factor
    const totalInvested = monthlyNeeded * n
    return { monthlyNeeded, totalInvested, targetGoal: M }
  }

  // Calculate Cost of Delay
  const calculateDelayCost = () => {
    const P = delayMonthly
    const i = delayRate / 100 / 12
    const nOriginal = delayTotalYears * 12
    const nDelayed = Math.max(12, (delayTotalYears * 12) - delayMonths)

    const totalOriginal = P * ((Math.pow(1 + i, nOriginal) - 1) / i) * (1 + i)
    const totalDelayed = P * ((Math.pow(1 + i, nDelayed) - 1) / i) * (1 + i)
    const loss = Math.max(0, totalOriginal - totalDelayed)
    return { totalOriginal, totalDelayed, loss }
  }

  const sipResult = calculateSIP()
  const lumpResult = calculateLumpsum()
  const goalResult = calculateGoalSIP()
  const delayResult = calculateDelayCost()

  return (
    <section id="calculators" className="py-10 md:py-14 bg-slate-50 relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-0 right-1/4 -z-0 size-72 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute bottom-0 left-10 -z-0 size-64 rounded-full bg-emerald-50/60 blur-2xl" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/80 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#064789] mb-2">
            <Calculator className="size-3.5" /> Interactive Wealth Engines
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            See What Your Money <br className="hidden sm:inline" />
            <span className="text-[#064789]">
              Can Really Achieve
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Real calculations using compounding algorithms. Adjust the sliders below to visualize wealth creation milestones.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('sip')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-xs transition-all shadow-xs ${
              activeTab === 'sip'
                ? 'bg-[#064789] text-white shadow-sm ring-1 ring-[#064789]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <TrendingUp className="size-3.5" /> SIP Growth Calculator
          </button>
          <button
            onClick={() => setActiveTab('lumpsum')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-xs transition-all shadow-xs ${
              activeTab === 'lumpsum'
                ? 'bg-[#064789] text-white shadow-sm ring-1 ring-[#064789]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <PieChartIcon className="size-3.5" /> One-time Lumpsum
          </button>
          <button
            onClick={() => setActiveTab('goal')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-xs transition-all shadow-xs ${
              activeTab === 'goal'
                ? 'bg-[#064789] text-white shadow-sm ring-1 ring-[#064789]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Shield className="size-3.5" /> Target Goal Planner
          </button>
          <button
            onClick={() => setActiveTab('delay')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-xs transition-all shadow-xs ${
              activeTab === 'delay'
                ? 'bg-rose-700 text-white shadow-sm ring-1 ring-rose-700'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <AlertCircle className="size-3.5 text-rose-500" /> Cost of Delay
          </button>
        </div>

        {/* Calculator Body */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Controls Column */}
          <div className="lg:col-span-7 p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-slate-200">
            {activeTab === 'sip' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Monthly Investment Amount</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {formatINR(sipMonthly)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="200000"
                    step="1000"
                    value={sipMonthly}
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Expected Annual Return Rate (p.a)</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {sipRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.5"
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>5% (Debt)</span>
                    <span>12% (Balanced)</span>
                    <span>15% (Equity)</span>
                    <span>20%+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Time Horizon (Years)</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {sipYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="35"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>1 Yr</span>
                    <span>10 Yrs</span>
                    <span>20 Yrs</span>
                    <span>35 Yrs</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lumpsum' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Initial One-Time Investment</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {formatINR(lumpAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="2000000"
                    step="10000"
                    value={lumpAmount}
                    onChange={(e) => setLumpAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>₹10,000</span>
                    <span>₹5,00,000</span>
                    <span>₹10,00,000</span>
                    <span>₹20,00,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Expected Annual Return Rate (p.a)</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {lumpRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="0.5"
                    value={lumpRate}
                    onChange={(e) => setLumpRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>5%</span>
                    <span>10%</span>
                    <span>15%</span>
                    <span>20%+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Investment Duration (Years)</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {lumpYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={lumpYears}
                    onChange={(e) => setLumpYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>1 Yr</span>
                    <span>10 Yrs</span>
                    <span>20 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goal' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Target Corpus Needed</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {formatINR(targetGoal)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="500000"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>₹5 Lakhs</span>
                    <span>₹50 Lakhs</span>
                    <span>₹2 Crores</span>
                    <span>₹5 Crores</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Years to Achieve Goal</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {goalYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="30"
                    step="1"
                    value={goalYears}
                    onChange={(e) => setGoalYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>2 Yrs</span>
                    <span>10 Yrs</span>
                    <span>20 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Expected Annual Returns (p.a)</label>
                    <span className="text-sm font-bold text-[#064789] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 font-mono">
                      {goalRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.5"
                    value={goalRate}
                    onChange={(e) => setGoalRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                </div>
              </div>
            )}

            {activeTab === 'delay' && (
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Planned Monthly Investment</label>
                    <span className="text-sm font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 font-mono">
                      {formatINR(delayMonthly)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2000"
                    max="100000"
                    step="1000"
                    value={delayMonthly}
                    onChange={(e) => setDelayMonthly(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Delay Period in Starting (Months)</label>
                    <span className="text-sm font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 font-mono">
                      {delayMonths} Months ({Math.round(delayMonths / 12 * 10) / 10} Yrs)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="60"
                    step="6"
                    value={delayMonths}
                    onChange={(e) => setDelayMonths(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold text-slate-700">Overall Target Horizon</label>
                    <span className="text-sm font-bold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-300 font-mono">
                      {delayTotalYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={delayTotalYears}
                    onChange={(e) => setDelayTotalYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#064789]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#064789] via-[#053d75] to-[#04284d] text-white p-5 sm:p-7 flex flex-col justify-between">
            {activeTab === 'sip' && (
              <div>
                <span className="text-[11px] uppercase tracking-widest text-blue-200 font-bold">
                  SIP Wealth Projection
                </span>
                <div className="mt-2 mb-4">
                  <div className="text-xs text-blue-200">Total Expected Corpus</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white mt-0.5">
                    {formatINR(sipResult.total)}
                  </div>
                </div>

                {/* Progress bar ratio */}
                <div className="space-y-3">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${(sipResult.invested / sipResult.total) * 100}%` }}
                      className="bg-blue-300 transition-all duration-300"
                      title="Invested"
                    />
                    <div
                      style={{ width: `${(sipResult.gains / sipResult.total) * 100}%` }}
                      className="bg-emerald-400 transition-all duration-300"
                      title="Estimated Wealth Gain"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="bg-white/10 backdrop-blur rounded-lg p-2.5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] text-blue-200">
                        <span className="size-1.5 rounded-full bg-blue-300"></span>
                        Invested Amount
                      </div>
                      <div className="text-base font-bold font-mono mt-0.5 text-white">
                        {formatINR(sipResult.invested)}
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur rounded-lg p-2.5 border border-white/10">
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                        <span className="size-1.5 rounded-full bg-emerald-400"></span>
                        Est. Gains
                      </div>
                      <div className="text-base font-bold font-mono mt-0.5 text-emerald-400">
                        {formatINR(sipResult.gains)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-500/15 border border-emerald-400/30 rounded-lg p-2.5 text-xs text-emerald-200 flex items-start gap-2 mt-2">
                    <Sparkles className="size-3.5 shrink-0 text-emerald-300 mt-0.5" />
                    <span className="text-[11px]">
                      Compounding creates <strong className="text-white font-bold">{Math.round((sipResult.gains / (sipResult.invested || 1)) * 100)}%</strong> return on your principal!
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lumpsum' && (
              <div>
                <span className="text-[11px] uppercase tracking-widest text-blue-200 font-bold">
                  Lumpsum Growth Projection
                </span>
                <div className="mt-2 mb-4">
                  <div className="text-xs text-blue-200">Estimated Maturity Value</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white mt-0.5">
                    {formatINR(lumpResult.total)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/10 rounded-lg p-2.5 border border-white/10">
                      <div className="text-[11px] text-blue-200">Invested Capital</div>
                      <div className="text-base font-bold font-mono mt-0.5 text-white">
                        {formatINR(lumpResult.invested)}
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2.5 border border-white/10">
                      <div className="text-[11px] text-emerald-300">Total Profit Generated</div>
                      <div className="text-base font-bold font-mono mt-0.5 text-emerald-400">
                        {formatINR(lumpResult.gains)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-[11px] text-blue-100 leading-relaxed">
                    A single deposit of {formatINR(lumpAmount)} multiplies approx{' '}
                    <strong className="text-white font-bold">
                      {(lumpResult.total / (lumpAmount || 1)).toFixed(1)}x
                    </strong>{' '}
                    over {lumpYears} years at {lumpRate}% p.a.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'goal' && (
              <div>
                <span className="text-[11px] uppercase tracking-widest text-blue-200 font-bold">
                  Required Monthly SIP
                </span>
                <div className="mt-2 mb-4">
                  <div className="text-xs text-blue-200">You need to invest monthly:</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-emerald-300 mt-0.5">
                    {formatINR(goalResult.monthlyNeeded)}
                    <span className="text-xs text-white/80 font-normal"> / mo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 flex justify-between items-center text-xs">
                    <span className="text-[11px] text-blue-200">Target Corpus:</span>
                    <span className="font-mono font-bold text-white">{formatINR(goalResult.targetGoal)}</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 flex justify-between items-center text-xs">
                    <span className="text-[11px] text-blue-200">Total Capital You Put In:</span>
                    <span className="font-mono font-bold text-white">{formatINR(goalResult.totalInvested)}</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 flex justify-between items-center text-xs">
                    <span className="text-[11px] text-emerald-300">Wealth Created by Markets:</span>
                    <span className="font-mono font-bold text-emerald-300">{formatINR(goalResult.targetGoal - goalResult.totalInvested)}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delay' && (
              <div>
                <span className="text-[11px] uppercase tracking-widest text-rose-300 font-bold">
                  Cost of Delay Analysis
                </span>
                <div className="mt-2 mb-4">
                  <div className="text-xs text-rose-200">Potential Wealth Lost Due to Waiting:</div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-rose-400 mt-0.5">
                    {formatINR(delayResult.loss)}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 flex justify-between">
                    <span className="text-blue-200 text-[11px]">Value if started TODAY:</span>
                    <span className="font-mono font-bold text-emerald-300">{formatINR(delayResult.totalOriginal)}</span>
                  </div>
                  <div className="bg-white/10 rounded-lg p-2 border border-white/10 flex justify-between">
                    <span className="text-rose-200 text-[11px]">Value if delayed {delayMonths} mos:</span>
                    <span className="font-mono font-bold text-white">{formatINR(delayResult.totalDelayed)}</span>
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-rose-500/20 border border-rose-400/30 rounded-lg text-[11px] text-rose-200">
                  ⚠️ Starting today saves you from forfeiting {formatINR(delayResult.loss)} in compounding returns!
                </div>
              </div>
            )}

            {/* CTA inside calculator */}
            <div className="mt-6 pt-4 border-t border-white/15">
              <a
                href="#contact"
                onClick={() => onBookConsultation?.(`Calculator Inquiry: ${activeTab.toUpperCase()}`)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-[#064789] shadow-md hover:bg-blue-50 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Plan This Portfolio With An Advisor</span>
                <ArrowRight className="size-3.5" />
              </a>
              <p className="text-[10px] text-center text-white/60 mt-1.5">
                Free 30-min strategy session · No commitment required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
