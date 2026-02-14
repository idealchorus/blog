import { Link } from "react-router"
import type { PostSummaryType } from "~/library/schemas"

export default function PostSummary({
	postSummary,
}: {
	postSummary: PostSummaryType
}) {
	return (
		<article className="p-3">
			<header className="flex flex-col">
				<time
					className="text-xs text-paper-900 font-mono tracking-tight"
					dateTime={postSummary.editedDate ?? postSummary.createdDate}
				>
					{new Date(
						postSummary.editedDate ?? postSummary.createdDate,
					).toLocaleDateString(undefined, {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</time>
				<Link to={`/posts/${postSummary.slug}`}>
					<h2>{postSummary.title}</h2>
				</Link>
			</header>
			<p>{postSummary.description}</p>
		</article>
	)
}
