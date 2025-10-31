import { Geist, Geist_Mono, Mitr } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mitr = Mitr({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Exam Creator",
  description: "Generated exam by ai",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`w-full ${mitr.className}`}>
        <div>{children}</div>
      </body>
    </html>
  );
}
