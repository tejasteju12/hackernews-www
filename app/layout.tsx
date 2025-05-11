
import { Inter } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationBar from "@/components/NavigationBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hacker News",
  description: "Built by Kethan",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
         
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <NavigationBar onSearch={function (query: string): void {
              throw new Error("Function not implemented.");
            } } />
            <main className="flex-1 p-4 pt-[4.5rem]">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
