"use client";
import { Toaster } from "sonner";
import { ThemeProvider } from "./ThemeProvider";
import { GlobalContextProvider } from "../context/GlobalContext";

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <GlobalContextProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </GlobalContextProvider>
    </div>
  );
}
