import { supabase } from '../lib/supabase'
import { HangGlidingIcon } from '../svg/HangglidingIcon'
import { HikeAndFlyIcon } from '../svg/Hikeandfly'
import { ParaglidingIcon } from '../svg/ParaglidingIcon'
import { SailplaneIcon } from '../svg/SailplaneIcon'
import { SpeedridingIcon } from '../svg/SpeedridingIcon'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import ReactCountryFlag from "react-country-flag";

export const Route = createFileRoute('/')({ component: App })

const features = [
  {
    icon: <HangGlidingIcon className="w-12 h-12 text-cyan-400" />,
    country: <ReactCountryFlag countryCode="CH" svg style={{ width: '2em', height: '2em' }} />,
    title: 'Flying is the best',
    description:
      'Write server-side code that seamlessly integrates with your client components. Type-safe, secure, and simple.',
  },
  {
    icon: <ParaglidingIcon className="w-12 h-12 text-cyan-400" />,
    country: <ReactCountryFlag countryCode="NO" svg style={{ width: '2em', height: '2em' }} />,
    title: 'Great hike and fly with the boyz',
    description:
      'Full-document SSR, streaming, and progressive enhancement out of the box. Control exactly what renders where.',
  },
  {
    icon: <SpeedridingIcon className="w-12 h-12 text-cyan-400" />,
    country: <ReactCountryFlag countryCode="SE" svg style={{ width: '2em', height: '2em' }} />,
    title: 'Acro course in the alps',
    description:
      'Build type-safe API endpoints alongside your application. No separate backend needed.',
  },
  {
    icon: <SailplaneIcon className="w-12 h-12 text-cyan-400" />,
    country: <ReactCountryFlag countryCode="CH" svg style={{ width: '2em', height: '2em' }} />,
    title: 'First time flying tandem',
    description:
      'End-to-end type safety from server to client. Catch errors before they reach production.',
  },
  {
    icon: <SailplaneIcon className="w-12 h-12 text-cyan-400" />,
    country: <ReactCountryFlag countryCode="FR" svg style={{ width: '2em', height: '2em' }} />,
    title: 'Fastest speedflight',
    description:
      'Stream data from server to client progressively. Perfect for AI applications and real-time updates.',
  },
  {
    icon: <HikeAndFlyIcon className="w-12 h-12 text-cyan-400" />,
    country: <ReactCountryFlag countryCode="ES" svg style={{ width: '2em', height: '2em' }} />,
    title: 'XC comp in Norway',
    description:
      'Built from the ground up for modern web applications. Deploy anywhere JavaScript runs.',
  },
]

function App() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })
  }, [])

  const handleGithubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error('GitHub login error:', error.message);
      return;
    }

    // Redirect user to GitHub OAuth page
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">

      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <img
              src="/allflights_logo.png"
              alt="Allflights Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain"
            />
            <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
              <span className="text-gray-300">ALLFLIGHTS</span>{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                START
              </span>
            </h1>
          </div>

          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Go fly, upload with Strava and let Allflights do the rest
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Allflights analyzes your flying data, and creates the best insights you ever could imagine!!!
          </p>

          <div className="flex flex-col items-center gap-4">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-cyan-500/25 scale-110"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <button
                  onClick={handleGithubLogin}
                  className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50"
                >
                  Signin with GitHub
                </button>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                  Join now to join the greatest flying community of all time
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="flex items-center gap-2">
                <div className="mb-4">{feature.country}</div>
                <div className="mb-4">{feature.icon}</div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
