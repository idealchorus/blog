import {
	isRouteErrorResponse,
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router"

import type { Route } from "./+types/root"
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
		href: "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Spline+Sans+Mono:ital,wght@0,300..700;1,300..700&display=swap",
	},
]

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="bg-sky-100 text-sky-950">
				<div className="h-screen container flex flex-col gap-4 px-4 md:px-0 mx-auto py-4 md:py-8">
					<header className="flex justify-center">
						<h1 className="text-2xl md:text-4xl font-mono">gopherchucks</h1>
					</header>
					<div className="flex flex-col gap-4">
						{/* Box shadow stil debating if I'll use it - shadow-[4px_4px_0_0_var(--color-sky-900)] */}
						<nav className="border-2 border-dashed rounded-lg py-2 px-2 shadow-[4px_4px_0_0_theme(colors.sky.900)]">
							<ul className="flex items-center justify-center gap-4">
								{[
									["/", "Home"],
									["/posts", "Posts"],
									["/about", "About"],
								].map(([to, name]) => (
									<li key={to}>
										<NavLink
											to={to}
											className={({ isActive }) =>
												isActive ? "underline decoration-wavy" : ""
											}
										>
											{name}
										</NavLink>
									</li>
								))}
							</ul>
						</nav>
						<main className="grow">{children}</main>
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!"
	let details = "An unexpected error occurred."
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error"
		details =
			error.status === 404
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
