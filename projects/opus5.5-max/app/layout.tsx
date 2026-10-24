import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Serif_SC, ZCOOL_XiaoWei } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_SC({
  weight: ['400', '600', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: false,
})

const zcool = ZCOOL_XiaoWei({
  weight: '400',
  variable: '--font-zcool',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: '星辰城堡 · 浮空岛上的中世纪城堡',
  description:
    '用 three.js 绘制的小王子风格浮空岛城堡：可自由旋转的 3D 场景，剖面查看城堡内部构造，认识岛上的人物，探索麦田、雪山、湖泊瀑布、沙漠与火山，并切换清晨、正午、黄昏与星夜。',
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
  themeColor: '#34507e',
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
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
