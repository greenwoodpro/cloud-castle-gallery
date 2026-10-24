import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google'
import './globals.css'

const sans = Noto_Sans_SC({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-body', display: 'swap' })
const serif = Noto_Serif_SC({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-story', display: 'swap' })

export const metadata: Metadata = {
  title: '星屿 STAR ISLE · 在云的上面，住一会儿',
  description: '一座漂浮在想象里的中世纪城堡。自由探索温柔的童话浮岛、城堡内部、岛上居民与自然秘境，下载属于你的离线 3D 小世界。',
  applicationName: '星屿 STAR ISLE',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f2e9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`bg-background ${sans.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
