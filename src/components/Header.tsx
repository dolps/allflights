import { Link, useNavigate } from '@tanstack/react-router'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Network,
  SquareFunction,
  StickyNote,
  User,
  X,
} from 'lucide-react'
import { useRef } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const navigate = useNavigate()
  const [groupedExpanded, setGroupedExpanded] = useState<
    Record<string, boolean>
  >({})
  const profileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log('Header: Checking initial session...')
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Header: Session check result:', session ? 'User logged in' : 'No session')
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Header: Auth state changed:', event, session ? 'User found' : 'No session')
      setUser(session?.user ?? null)
    })

    // Click outside listener for profile menu
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      subscription.unsubscribe()
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setProfileOpen(false)
    setUser(null)
    navigate({ to: '/', replace: true })
  }

  const handleGithubLogin = async () => {
    console.log('Header: Initiating GitHub Login...')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error('Header: GitHub login error:', error.message);
      return;
    }

    console.log('Header: Redirecting to GitHub...', data.url)
    if (data.url) {
      window.location.href = data.url;
    }
  };

  const avatarUrl = user?.user_metadata?.avatar_url || '/alex_stoked.png'
  const fullName = user?.user_metadata?.full_name || 'Pilot'
  const githubHandle = user?.user_metadata?.user_name
  const displayName = fullName || (githubHandle ? `@${githubHandle}` : 'Pilot')

  return (
    <>
      <header className="p-4 pr-6 flex items-center justify-between bg-gray-800 text-white shadow-lg relative z-40">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-xl font-semibold">
            <Link to="/" className="flex items-center gap-3 no-underline group">
              <img
                src="/allflights_logo.png"
                alt="Allflights Logo"
                className="h-10 w-10 object-contain transition-transform group-hover:scale-110"
              />
              <span className="text-2xl font-black tracking-tighter text-white">
                ALLFLIGHTS
              </span>
            </Link>
          </h1>
        </div>

        <div className="relative" ref={profileMenuRef}>
          {user ? (
            <>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 p-1 hover:bg-gray-700 rounded-full transition-colors group"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <div className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden ring-2 ring-transparent group-hover:ring-cyan-500/30 transition-all">
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-slate-800 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                      <User size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white truncate max-w-[140px] font-bold">{displayName}</span>
                      {githubHandle && (
                        <span className="text-[10px] text-cyan-400 font-mono">@{githubHandle}</span>
                      )}
                      <span className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                        View Profile <ChevronRight size={10} />
                      </span>
                    </div>
                  </Link>
                  <div className="h-px bg-slate-800 my-1 mx-4" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
                      <LogOut size={16} />
                    </div>
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={handleGithubLogin}
              className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to={user ? "/dashboard" : "/"}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            {user ? <LayoutDashboard size={20} /> : <Home size={20} />}
            <span className="font-medium">{user ? "Dashboard" : "Home"}</span>
          </Link>

          {user && (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
              activeProps={{
                className:
                  'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
              }}
            >
              <User size={20} />
              <span className="font-medium">My Profile</span>
            </Link>
          )}

          {/* Demo Links Start */}

          <Link
            to="/demo/start/server-funcs"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <SquareFunction size={20} />
            <span className="font-medium">Start - Server Functions</span>
          </Link>

          <Link
            to="/demo/start/api-request"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
            }}
          >
            <Network size={20} />
            <span className="font-medium">Start - API Request</span>
          </Link>

          <div className="flex flex-row justify-between">
            <Link
              to="/demo/start/ssr"
              onClick={() => setIsOpen(false)}
              className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
              activeProps={{
                className:
                  'flex-1 flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
              }}
            >
              <StickyNote size={20} />
              <span className="font-medium">Start - SSR Demos</span>
            </Link>
            <button
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() =>
                setGroupedExpanded((prev) => ({
                  ...prev,
                  StartSSRDemo: !prev.StartSSRDemo,
                }))
              }
            >
              {groupedExpanded.StartSSRDemo ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          </div>
          {groupedExpanded.StartSSRDemo && (
            <div className="flex flex-col ml-4">
              <Link
                to="/demo/start/ssr/spa-mode"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
              >
                <StickyNote size={20} />
                <span className="font-medium">SPA Mode</span>
              </Link>

              <Link
                to="/demo/start/ssr/full-ssr"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
              >
                <StickyNote size={20} />
                <span className="font-medium">Full SSR</span>
              </Link>

              <Link
                to="/demo/start/ssr/data-only"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                activeProps={{
                  className:
                    'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                }}
              >
                <StickyNote size={20} />
                <span className="font-medium">Data Only</span>
              </Link>
            </div>
          )}

          {/* Demo Links End */}
        </nav>
      </aside>
    </>
  )
}
