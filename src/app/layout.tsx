import "./globals.css";

export const metadata = {
  title: "Instagram",
  description: "Instagram",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="https://www.instagram.com/static/images/ico/favicon-192.png/68d99ba29cc8.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
