import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import { ThemeContextProvider } from "@/context/ThemContext";
import ThemeProviders from "@/providers/ThemeProviders";
import AuthProviders from "@/providers/AuthProviders";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <AuthProviders>
          <ThemeContextProvider>
            <ThemeProviders>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProviders>
          </ThemeContextProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
