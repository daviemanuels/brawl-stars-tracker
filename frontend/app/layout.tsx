import "./globals.css";
import Topbar from "@/components/layout/Topbar";

export const metadata = {
  title: "Brawl Tracker",
  description: "Player analytics and battle tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-gray-50 text-gray-900 antialiased">
        {/* Top navigation */}
        <Topbar />

        {/* Page container */}
        <div className="flex min-h-[calc(100vh-64px)]">
          <main className="flex-1 max-w-6xl mx-auto w-full p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
