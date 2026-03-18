type Props = {
  highlightedHtml: string
  language: string
}

export default function Fence({ highlightedHtml, language }: Props) {
  return (
    <pre>
      <code
        className={`hljs language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </pre>
  )
}
