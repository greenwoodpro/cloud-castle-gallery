import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Serif_SC, ZCOOL_XiaoWei } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_SC({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: false,
})

const zcool = ZCOOL_XiaoWei({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-zcool',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: '云上城堡 · 浮空岛中世纪城堡 3D 模型',
  description:
    '用 three.js 绘制的小王子画风中世纪城堡：漂浮在云海上的岛屿、可剖视的主塔内部、城中人物与多样地形，视角自由探索。',
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
  themeColor: '#f6e1d3',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`${notoSerif.variable} ${zcool.variable} bg-background`}>
      <body className="font-serif antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
