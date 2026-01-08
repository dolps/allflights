import { createFileRoute } from '@tanstack/react-router'
import { Award, Clock, Calendar, TrendingUp, MapPin, Wind, User, Settings, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/profile')({
    component: Profile,
})

const monthlyStats = [
    { month: 'May', hours: 12, flights: 28, bestGlide: 8.4 },
    { month: 'June', hours: 22, flights: 45, bestGlide: 8.8 },
    { month: 'July', hours: 35, flights: 68, bestGlide: 9.5 },
    { month: 'August', hours: 28, flights: 54, bestGlide: 9.2 },
    { month: 'September', hours: 25, flights: 62, bestGlide: 8.9 },
    { month: 'October', hours: 15, flights: 42, bestGlide: 8.1 },
    { month: 'November', hours: 5.5, flights: 13, bestGlide: 7.5 },
]

function Profile() {
    const maxHours = Math.max(...monthlyStats.map(s => s.hours))

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans selection:bg-cyan-500/30">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="relative mb-12">
                    <div className="h-48 rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-900 overflow-hidden relative">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <button className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-xl text-white hover:bg-white/20 transition-colors">
                                <Settings size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="absolute -bottom-10 left-10 flex items-end gap-6">
                        <div className="w-32 h-32 rounded-3xl border-4 border-slate-950 overflow-hidden shadow-2xl relative">
                            <img
                                src="/alex_stoked.png"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="mb-2">
                            <h2 className="text-3xl font-black text-white">Alex "The Eagle" Smith</h2>
                            <div className="flex items-center gap-3 text-cyan-400 font-medium mt-1">
                                <span className="flex items-center gap-1"><MapPin size={14} /> Swiss Alps</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                                <span className="text-slate-400">Member since May 2024</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Detailed Stats */}
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-wider text-slate-400">
                                <TrendingUp size={20} className="text-cyan-400" />
                                Performance Overview
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { label: 'Total Airtime', value: '142.5h', icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                                    { label: 'Flights Logged', value: '312', icon: Wind, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                                    { label: 'Personal Best L/D', value: '1:9.4', icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                                    { label: 'Highest Peak', value: '4,204m', icon: TrendingUp, color: 'text-rose-400', bg: 'bg-rose-500/10' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-6 hover:border-slate-700 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                                                <stat.icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                                <p className="text-2xl font-black text-white">{stat.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Monthly Comparison */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-wider text-slate-400">
                                    <Calendar size={20} className="text-blue-400" />
                                    Monthly Comparison
                                </h3>
                                <div className="flex gap-4 text-[10px] font-bold uppercase text-slate-500 tracking-widest leading-none items-center">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500" /> Hours
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500" /> Flights
                                    </div>
                                    <span className="text-slate-700">|</span>
                                    <span>2025 Season</span>
                                </div>
                            </div>

                            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-8">
                                <div className="flex items-end justify-between h-64 gap-2 md:gap-4 px-2 border-b border-slate-800/50 pb-2">
                                    {monthlyStats.map((stat, i) => {
                                        const maxFlights = Math.max(...monthlyStats.map(s => s.flights))
                                        return (
                                            <div key={i} className="flex-1 h-full flex flex-col justify-end gap-4 group">
                                                <div className="relative w-full flex-1 flex justify-center items-end gap-1 px-1">
                                                    {/* Hours Bar */}
                                                    <div
                                                        className="w-full max-w-[12px] bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-lg transition-all duration-700 group-hover:from-cyan-500 group-hover:to-cyan-300 relative shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                                                        style={{ height: `${(stat.hours / maxHours) * 100}%` }}
                                                    >
                                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-black text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            {stat.hours}h
                                                        </div>
                                                    </div>
                                                    {/* Flights Bar */}
                                                    <div
                                                        className="w-full max-w-[12px] bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all duration-700 group-hover:from-indigo-500 group-hover:to-indigo-300 relative shadow-[0_0_20px_rgba(79,70,229,0.15)]"
                                                        style={{ height: `${(stat.flights / maxFlights) * 100}%` }}
                                                    >
                                                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-black text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            {stat.flights}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter text-center">{stat.month.substring(0, 3)}</span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="mt-12 space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-2xl border border-slate-700/30">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                                <TrendingUp size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efficiency Insight</p>
                                                <p className="text-sm font-black text-white">July was your most productive month with 68 flights!</p>
                                            </div>
                                        </div>
                                        <ArrowRight size={18} className="text-slate-600" />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Sidebar Achievements */}
                    <div className="space-y-8">
                        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-6">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-500" />
                                Badges
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { name: 'Sky High', desc: '4km+ Flight', icon: '🏔️' },
                                    { label: 'The Eagle', desc: '100+ Flights', icon: '🦅' },
                                    { name: 'X-Country', desc: '50km+ Trip', icon: '🗺️' },
                                    { name: 'Night Owl', desc: 'Sunset Flight', icon: '🌙' },
                                ].map((badge, i) => (
                                    <div key={i} className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30 text-center group cursor-help hover:border-cyan-500/30 transition-all">
                                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{badge.icon}</div>
                                        <div className="text-[10px] font-black uppercase text-white mb-1 leading-none">{badge.name || badge.label}</div>
                                        <div className="text-[9px] text-slate-500">{badge.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-black mb-2">Strava Sync</h3>
                                <p className="text-indigo-100/80 mb-6 text-sm">Automatically import your latest activities.</p>
                                <button className="w-full py-4 bg-white text-indigo-700 font-bold rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg">
                                    Connect Account
                                </button>
                            </div>
                            <TrendingUp className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
