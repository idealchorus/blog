import type { PostSummaryType } from "../library/schemas.ts"
import PostSummary from "./post-summary.tsx"

export default function PostSummaries({
  postSummaries,
}: {
  postSummaries: PostSummaryType[]
}) {
  return (
    <ul className="flex flex-col divide-y divide-sky-950">
      {postSummaries.map((postSummary) => (
        <li key={postSummary.slug}>
          <PostSummary postSummary={postSummary} />
        </li>
      ))}
    </ul>
  )
}
