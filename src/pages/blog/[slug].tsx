import type { PageProps } from 'waku/router';

import fs from 'fs'

import rehypeStringify from 'rehype-stringify'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize from 'rehype-sanitize'
import rehypeClassNames from 'rehype-class-names'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypeAutolinkHeadings)
  .use(rehypeClassNames, {
    'h1, h2, h3, h4, h5, h6': "font-serif font-bold tracking-tight antialiased text-pretty",
    h1: 'text-6xl mb-8', 
    h2: 'text-5xl mb-6 my-4',
    h3: 'text-4xl mb-5 my-3',
    h4: 'text-3xl mb-4 my-2',
    h5: 'text-2xl mb-3 my-1', 
    h6: 'text-xl mb-2 my-1',
    pre: 'font-mono'
  })
  .use(rehypeSanitize, {
    attributes: {
      '*': ['className'],
    }
  })
  .use(rehypeStringify)

// Create blog article pages
export default async function BlogArticlePage({
  slug,
}: PageProps<'/blog/[slug]'>) {
  const data = await getData(slug);

  return <div>
    <article dangerouslySetInnerHTML={{ __html: data.body }} />
    <pre className="bg-cookie-crumble text-cream">
      <code >
        {`function hello() {
          return 'world';
        }`}
      </code>
    </pre>
  </div>
}

const getData = async (slug: string) => {
  const file = fs.readFileSync(`./private/posts/${slug}.md`, 'utf8')

  const result = processor.processSync(file)

  return {
    title: 'Blog',
    headline: 'Blog',
    body: String(result),
  };
};

export const getConfig = async () => {
  const slugs = fs.readdirSync('./private/posts').map(file => file.replace('.md', ''))

  return {
    render: 'static',
    staticPaths: slugs,
  } as const;
};