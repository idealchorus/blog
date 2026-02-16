import { Link } from "react-router"
import type { PostSummaryType } from "../library/schemas.ts"
import { dateToLocaleDateString } from "../library/utils.ts"

export default function PostSummary({
  postSummary,
}: {
  postSummary: PostSummaryType
}) {
  const date = postSummary.editedDate ?? postSummary.createdDate

  return (
    <article className="article p-3">
      <header className="flex flex-col mb-1">
        <Link to={`/posts/${postSummary.slug}`}>
          <h2>{postSummary.title}</h2>
        </Link>
        <time
          className="text-sm text-paper-900 font-mono tracking-tight"
          dateTime={date.toISOString()}
        >
          {dateToLocaleDateString(date)}
        </time>
      </header>
      <p>{postSummary.description}</p>
    </article>
  )
}
