import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Blynn - AI Sales Suite',
  description: 'Your Sales Team, On Autopilot. AI that finds prospects, engages them, and books meetings 24/7.',
  generator: 'v0.app',
  // Auto-deployment test - this will trigger a new build
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        
        {/* AI Chat SDR Widget */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.chatConfig = {
                companyId: '8bbf80ef-d7d4-43f2-8bf1-3ddb61788117',
                apiUrl: 'https://ai-sdr-production.up.railway.app'
              };
            `,
          }}
        />
        <script src="https://ai-sdr-production.up.railway.app/widget.js" async />
      </body>
    </html>
  )
}
