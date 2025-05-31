import type { PageProps } from 'waku/router';

// Create blog article pages
export default async function BlogArticlePage({
  slug,
}: PageProps<'/blog/[slug]'>) {
  const data = await getData(slug);

  return <div>Blog page {slug}</div>
}

const getData = async (slug: string) => {
  return {
    title: 'Blog',
    headline: 'Blog',
    body: 'Blog',
  };
};

export const getConfig = async () => {
  return {
    render: 'static',
    staticPaths: ['test'],
  } as const;
};