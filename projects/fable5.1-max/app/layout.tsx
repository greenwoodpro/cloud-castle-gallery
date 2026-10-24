import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google'
import './globals.css'

const _sans = Noto_Sans_SC({ subsets: ['latin'], weight: ['400', '500'] })
const _serif = Noto_Serif_SC({ subsets: ['latin'], weight: ['500', '600'] })

export const metadata: Metadata = {
  title: '浮空岛上的中世纪城堡 | 小王子风格 3D 展示',
  description: '用 Three.js 构建的小王子画风中世纪城堡，漂浮在云海之上。自由视角、剖面内部、人物与地形故事。',
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
  themeColor: '#f6ebe4',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
