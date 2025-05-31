import type { PageProps } from 'waku/router';

import fs from 'fs'

import rehypeStringify from 'rehype-stringify'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize from 'rehype-sanitize'
import rehypeClassNames from 'rehype-class-names'
import rehypeSectionize from '@hbsnow/rehype-sectionize'
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
  .use(rehypeSectionize)
  .use(rehypeClassNames)
  .use(rehypeSanitize)
  .use(rehypeStringify)

// Create blog article pages
export default async function BlogArticlePage({
  slug,
}: PageProps<'/blog/[slug]'>) {
  const data = await getData(slug);

  return <article dangerouslySetInnerHTML={{ __html: data.body }} />
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