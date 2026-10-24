import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Serif_SC, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

const notoSerif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-noto-serif',
})

const notoSans = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans',
})

export const metadata: Metadata = {
  title: '浮空岛城堡 · 小王子画风 3D 场景',
  description:
    '一座漂浮在云端的欧洲中世纪城堡，以小王子绘本般的温柔画风呈现。自由视角漫游，点击探索城堡内部构造、人物故事与不同地形。',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5eddc',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={`bg-background ${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
