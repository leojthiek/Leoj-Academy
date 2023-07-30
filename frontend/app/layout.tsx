import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./redux/provider"
import dynamic from "next/dynamic"

const Navbar = dynamic(()=>import('./component/navbar/page'))
const Footer = dynamic(()=>import("./component/footer/page"))


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",

  }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <header>
            <Navbar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer/>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
