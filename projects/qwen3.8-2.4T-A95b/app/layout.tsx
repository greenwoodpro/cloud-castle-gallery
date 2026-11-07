import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google'
import './globals.css'

// 拉丁文用 Cormorant Garamond 的绘本衬线感；中文衬线由 Noto Serif SC 补齐
const _cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display-latin',
  display: 'swap',
})

const _notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display-cjk',
  display: 'swap',
})

const _notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '浮空岛上的城堡 · Three.js 中世纪城堡',
  description:
    '用 Three.js 手绘的一座中世纪欧洲城堡，安放在漂浮的岛屿上。《小王子》的水彩画风，自由视角，可走进主堡四层房间、教堂、内庭，也能看遍岛上的湖泊、瀑布、农田、森林、玫瑰园与村庄。',
  generator: 'v0.app',
  keywords: ['Three.js', '3D', '中世纪城堡', '浮空岛', '小王子', 'WebGL', '城堡内部'],
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
  themeColor: '#f7f1e6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-CN"
      className={`light bg-background ${_cormorant.variable} ${_notoSerifSC.variable} ${_notoSansSC.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
