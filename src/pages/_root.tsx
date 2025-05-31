export default async function RootElement({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body data-version="1.0" className="bg-cream text-cookie-crumble">{children}</body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};