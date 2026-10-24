import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google'
import './globals.css'

const geist = Noto_Sans_SC({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-geist', display: 'swap' })
const storySerif = Noto_Serif_SC({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-story-serif', display: 'swap' })

export const metadata: Metadata = {
  title: '云间之境 · 把童话安放在云端',
  description: '一座漂浮在云海上的中世纪童话城堡。自由环游 Three.js 手工构建的浮空岛，探索城堡内部、玫瑰花园、风车小镇、低语森林与星落瀑布，并下载完整离线作品与 GLB 模型。',
  applicationName: '云间之境',
  keywords: ['浮空岛', '中世纪城堡', 'Three.js', '3D 模型', '童话世界'],
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f3ec',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`light bg-background ${geist.variable} ${storySerif.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
