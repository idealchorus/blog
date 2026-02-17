import type { AppLoadContext, EntryContext } from "react-router"
import { ServerRouter } from "react-router"
import { isbot } from "isbot"
import { renderToReadableStream } from "react-dom/server"

export const streamTimeout = 5_000

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
  // If you have middleware enabled:
  // loadContext: RouterContextProvider
) {
  // https://httpwg.org/specs/rfc9110.html#HEAD
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders,
    })
  }

  const userAgent = request.headers.get("user-agent")
  const waitForAllContent = (userAgent && isbot(userAgent)) || routerContext.isSpaMode
  const controller = new AbortController()

  // Abort the rendering stream after the `streamTimeout` so it has time to
  // flush down the rejected boundaries
  const timeoutId = setTimeout(() => controller.abort(), streamTimeout + 1000)

  try {
    const stream = await renderToReadableStream(
      <ServerRouter context={routerContext} url={request.url} />,
      {
        signal: controller.signal,
        onError(error: unknown) {
          responseStatusCode = 500
          console.error(error)
        },
      },
    )

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToReadableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    if (waitForAllContent) {
      await stream.allReady
    }

    responseHeaders.set("Content-Type", "text/html")
    return new Response(stream, {
      headers: responseHeaders,
      status: responseStatusCode,
    })
  } finally {
    // Clear the timeout to prevent retaining the closure and memory leak
    clearTimeout(timeoutId)
  }
}
