import { Link } from 'waku';

export const Header = () => {
  return (
    <header className="flex items-center gap-4 p-6">
      <nav className="text-lg font-bold tracking-tight">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
      </nav>
    </header>
  );
};
