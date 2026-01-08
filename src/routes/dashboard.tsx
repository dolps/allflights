import { createFileRoute, Link } from '@tanstack/react-router'
import { Activity, Clock, MapPin, Wind, TrendingUp, Users, Trophy, Award, Timer, Mountain, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { UploadModal } from '../components/UploadModal'
import { supabase } from '../lib/supabase'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

const mockActivities = [
  {
    id: 1,
    user: 'Alex "The Eagle" Smith',
    type: 'Paragliding',
    location: 'Swiss Alps',
    duration: '2h 15m',
    altitude: '1,200m',
    timestamp: '2 hours ago',
    image: '/alex_eagle_flight.png',
    avatar: '/alex_stoked.png',
  },
  {
    id: 2,
    user: 'Sarah Miller',
    type: 'Hike & Fly',
    location: 'Interlaken, Switzerland',
    duration: '45m',
    altitude: '2,100m',
    timestamp: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=800&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    id: 3,
    user: 'Marco Rossi',
    type: 'Speedriding',
    location: 'Chamonix, France',
    duration: '12m',
    altitude: '3,800m',
    timestamp: 'Today',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop',
    avatar: 'https://i.pravatar.cc/150?u=marco',
  },
]

const topStats = {
  totalHours: '142h',
  totalFlights: 312,
  longestDistance: '84.2 km',
  longestTime: '5h 22m',
  maxHeight: '4,204m',
  maxLift: '+6.4 m/s'
}

function Dashboard() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  const avatarUrl = user?.user_metadata?.avatar_url || '/alex_stoked.png'
  const userName = user?.user_metadata?.full_name || user?.user_metadata?.user_name || 'Alex "The Eagle" Smith'

  const personalizedActivities = mockActivities.map(activity => {
    if (activity.id === 1) {
      return { ...activity, user: userName, avatar: avatarUrl }
    }
    return activity
  })

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans selection:bg-cyan-500/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Activities feed
            </h1>
            <p className="text-slate-400 text-lg">See what the community is up to</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl px-6 py-3 flex items-center gap-3">
              <Users className="text-cyan-400 w-5 h-5" />
              <span className="font-bold">1,204 Active</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-8">
            {personalizedActivities.map((activity) => (
              <div
                key={activity.id}
                className="group bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-cyan-500 text-slate-950 text-xs font-bold rounded-full uppercase tracking-wider">
                      {activity.type}
                    </span>
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium rounded-full">
                      {activity.duration}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <Link to="/profile" className="block shrink-0">
                        <img src={activity.avatar} alt={activity.user} className="w-12 h-12 rounded-full border-2 border-slate-800 ring-4 ring-cyan-500/5 hover:ring-cyan-400/30 transition-all" />
                      </Link>
                      <div>
                        <Link to="/profile" className="hover:text-cyan-400 transition-colors">
                          <h3 className="font-bold text-lg leading-tight">
                            {activity.user}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {activity.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.timestamp}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30">
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 uppercase tracking-widest font-semibold">
                        <Wind className="w-3 h-3 text-cyan-500" />
                        Max Alt
                      </div>
                      <div className="text-xl font-bold">{activity.altitude}</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30">
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-1 uppercase tracking-widest font-semibold">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        Efficiency
                      </div>
                      <div className="text-xl font-bold">Best Glide</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-black mb-2">Ready to fly?</h3>
                <p className="text-cyan-100/80 mb-6 text-sm">Upload your latest flight data and see how you stack up.</p>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full py-4 bg-white text-blue-700 font-bold rounded-2xl hover:bg-cyan-50 transition-colors shadow-lg shadow-blue-900/20"
                >
                  Upload Activity
                </button>
              </div>
              <Wind className="absolute bottom-[-20px] right-[-20px] w-32 h-32 text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Personal Bests
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30">
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Total Time</div>
                  <div className="text-xl font-black text-white">{topStats.totalHours}</div>
                </div>
                <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30">
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Flights</div>
                  <div className="text-xl font-black text-white">{topStats.totalFlights}</div>
                </div>
                <div className="col-span-2 bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30 relative overflow-hidden group/stat">
                  <div className="flex items-center gap-3 relative z-10">
                    <Award className="w-8 h-8 text-cyan-400" />
                    <div>
                      <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Longest Distance</div>
                      <div className="text-2xl font-black text-white">{topStats.longestDistance}</div>
                    </div>
                  </div>
                  <MapPin className="absolute right-[-10px] bottom-[-10px] w-16 h-16 text-white/5 -rotate-12" />
                </div>
                <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30">
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    <Timer className="w-3 h-3 text-emerald-400" />
                    Duration
                  </div>
                  <div className="text-lg font-black text-white">{topStats.longestTime}</div>
                </div>
                <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30">
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                    <Mountain className="w-3 h-3 text-blue-400" />
                    Height
                  </div>
                  <div className="text-lg font-black text-white">{topStats.maxHeight}</div>
                </div>
                <div className="col-span-2 bg-slate-800/40 rounded-2xl p-4 border border-slate-700/30 flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Max Lift</div>
                    <div className="text-xl font-black text-white">{topStats.maxLift}</div>
                  </div>
                  <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
                </div>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-3xl p-6">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Live conditions
              </h3>
              <div className="space-y-4">
                {[
                  { spot: 'Voss', wind: '4m/s NW', status: 'Good' },
                  { spot: 'Drammen', wind: '8m/s SE', status: 'Strong' },
                  { spot: 'Aurland', wind: '2m/s W', status: 'Cald' },
                ].map((spot, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/40 transition-colors cursor-pointer border border-transparent hover:border-slate-700/50">
                    <span className="font-medium">{spot.spot}</span>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">{spot.wind}</div>
                      <div className={`text-[10px] font-bold uppercase ${spot.status === 'Good' ? 'text-emerald-400' : spot.status === 'Strong' ? 'text-amber-400' : 'text-slate-400'}`}>{spot.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => {
          // TODO: Refresh activities feed
          console.log('Activity uploaded successfully!')
        }}
      />
    </div>
  )
}
