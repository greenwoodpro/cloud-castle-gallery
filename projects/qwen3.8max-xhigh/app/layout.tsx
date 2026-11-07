import type { Metadata, Viewport } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google'
import './globals.css'

// 中文字形由 next/font 按 unicode-range 自动分包，subsets 只控制拉丁等附加子集
const _notoSans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const _notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '云上的城堡 · 浮空岛 3D 场景',
  description:
    '用 three.js 手绘的一座中世纪城堡，坐落在浮空岛上。五层主堡可以剖开来看内部构造，岛上有村落、麦田、玫瑰园、瀑布与风车，还有小王子、狐狸和城堡里的居民。',
  keywords: ['three.js', '3D', '中世纪城堡', '浮空岛', '小王子', 'WebGL'],
}

export const viewport: Viewport = {
  themeColor: '#e8dcc4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className={`${_notoSans.variable} ${_notoSerif.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
