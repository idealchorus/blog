import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"

import type { Route } from "../.react-router/types/app/+types/root.ts"

import "./app.css"

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Spline+Sans+Mono:ital,wght@0,300..700;1,300..700&display=swap",
  },
  {
    rel: 'icon',
    href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☁️</text></svg>'
  }
]

export function meta() {
  return [
    { title: "Ideal Chorus" },
    {
      name: "description",
      content: "A personal blog about software development and other topics.",
    },
  ]
}

const paths = [
  ["/", "Home"],
  ["/posts", "Posts"],
  ["/about", "About"],
] as const

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-sky-200 text-paper-900">
        <div className="container flex flex-col gap-4 max-w-4xl px-3 lg:px-0 mx-auto py-3 md:py-7">
          <header className="flex justify-center">
            <Link to="/" className="heading text-2xl md:text-3xl no-underline">
              Ideal Chorus
            </Link>
          </header>
          <div className="flex flex-col gap-5">
            <nav className="paper p-2">
              <ul className="flex items-center justify-center gap-5 md:gap-7">
                {paths.map(([to, name]) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive ? "decoration-wavy" : ""}
                    >
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <main className="paper p-3 md:p-5">{children}</main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

// TODO - custom error boundary
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details = error.status === 404
      ? "The requested page could not be found."
      : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
