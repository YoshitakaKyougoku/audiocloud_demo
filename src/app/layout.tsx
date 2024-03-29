

import type { Metadata } from 'next'
import { inter } from '@/ui/fonts';
import styles from '@/ui/homeLayout.module.css'
import './globals.css'
import WaveForm from '@/ui/wave/waveform';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.layout}`}>
      
        {children}
        
      </body>
    </html>
  )
}
