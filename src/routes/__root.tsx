import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'
import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument

})

function RootDocument({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Proactive cleanup for the hash token immediately on mount
    // Supabase can sometimes leave the hash even after the session is established.
    const purgeAuthHash = () => {
      if (window.location.hash.includes('access_token')) {
        console.log('Purging auth hash from URL');
        const newUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, '', newUrl);
      }
    };

    purgeAuthHash();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // 2. Secondary cleanup within the listener to handle race conditions
        purgeAuthHash();

        // Redirect from landing pages to dashboard if logged in
        if (window.location.pathname === '/' || window.location.pathname === '/login') {
          navigate({ to: '/dashboard', replace: true });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <Header />
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />

      </body>
    </html>
  )
}
