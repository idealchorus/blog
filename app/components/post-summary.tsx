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
    <article className="post-summary">
      <header>
        <Link to={`/posts/${postSummary.slug}`}>
          <h2>{postSummary.title}</h2>
        </Link>
        <time
          className="date"
          dateTime={date.toISOString()}
        >
          {dateToLocaleDateString(date)}
        </time>
      </header>
      <p>{postSummary.description}</p>
    </article>
  )
}
