import { Navbar } from "@/components/navbar";

interface DefaultLayoutProps {
  showLogout?: boolean;
  children: React.ReactNode;
}

export default function DefaultLayout({showLogout = false, children}: DefaultLayoutProps)
{
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar showLogout={showLogout} />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <div className="flex-1 flex justify-center">
          <span>V1.0</span>
        </div>
      </footer>
    </div>
  );
}
