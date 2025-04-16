import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Shipment Tracker",
  description: "Shipment Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-auto bg-gray-50">
            {children}
            <Toaster position="top-right" richColors />
          </div>
        </main>
      </body>
    </html>
  );
}
