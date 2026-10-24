import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Noto_Sans_SC } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const notoSans = Noto_Sans_SC({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-noto-sc', display: 'swap' })

export const metadata: Metadata = {
  title: '云屿 · 风栖城堡｜一个可以走进去的童话',
  description: '自由探索云海上的中世纪城堡：翻开三层房间，遇见小小的居民，漫游森林、玫瑰花园与瀑布。基于 Three.js 的交互式浮空岛，支持完整世界 ZIP 下载。',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f4ee',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`light bg-background ${manrope.variable} ${notoSans.variable}`}>
      <body className="font-sans antialiased">
        <TooltipProvider>{children}</TooltipProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
