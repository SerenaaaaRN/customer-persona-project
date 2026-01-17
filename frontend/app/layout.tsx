import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Customer Persona ML",
  description: "Clustering & Prediction App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <div className="p-4 border-b flex items-center gap-4 bg-background sticky top-0 z-10">
              <SidebarTrigger />
              <span className="font-semibold text-sm text-muted-foreground">/ Dashboard Panel</span>
            </div>
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
