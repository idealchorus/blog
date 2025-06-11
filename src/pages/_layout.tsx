import '../styles.css';

import type { ReactNode } from 'react';

import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Link } from 'waku';

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await getData();

  return (
    <div className="mx-auto max-w-2xl px-4">
      <meta name="description" content={data.description} />
      <link rel="icon" type="image/png" href={data.icon} />
      <div className="flex flex-col gap-10">
      <header className="relative top-0 left-0">
        <div className="flex items-center gap-4 py-6">
          <nav className="flex gap-2 text-lg font-bold tracking-tight">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
          </nav>
        </div>
      </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}

const getData = async () => {
  const data = {
    description: 'An internet website!',
    icon: '/images/favicon.png',
  };

  return data;
};

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
