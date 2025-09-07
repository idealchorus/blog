import Markdoc from "@markdoc/markdoc"
import { Link } from "react-router"
import type { PostSummaryType } from "~/library/schemas"

export default function PostSummary({ postSummary }: {
  postSummary: PostSummaryType
}){
  return (
                  <article className="rounded-md bg-paper-50 text-sky-950 shadow-[4px_6px_0_0_theme(colors.sky.900)]">
                    <header className="rounded-t-md bg-paper-100">
                      <div className="flex items-center justify-between">
                        <time className="text-sm px-4 py-2" dateTime={postSummary.editedDate ?? postSummary.createdDate}>
                          {new Date(postSummary.editedDate ?? postSummary.createdDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
<div className="font-mono text-sm text-center rounded-tr-md bg-sky-50 px-4 py-2 whitespace-nowrap inline-flex items-center justify-center min-w-[10ch]">
                          {postSummary.postType === 'nibble' ? 'Nibble' : 'Byte'}
                        </div>
                      </div>
                    </header>
                    {postSummary.postType === 'nibble' ? (
                      <div className="px-4 py-2 flex flex-col" >
  {/** biome-ignore lint/security/noDangerouslySetInnerHtml: we know the content is legit> */}
  <div dangerouslySetInnerHTML={{ __html: Markdoc.renderers.html(postSummary.body) }} />
                          <Link to={`/posts/${postSummary.slug}`} className="underline text-sm self-end">
                          View &gt;
                        </Link>
</div>
                    ) : (
                      <div className="px-4 py-2 flex flex-col">
                        <Link to={`/posts/${postSummary.slug}`} className="underline">
                          <h2 className="text-lg font-bold">{postSummary.title}</h2>
                        </Link>
                        <p>{postSummary.description}</p>
                        <Link to={`/posts/${postSummary.slug}`} className="underline text-sm self-end">
                          View &gt;
                        </Link>
                      </div>
                    )}
                  </article>
  )
}