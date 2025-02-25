'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { somnia } from './somnia-chains'

export const config = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_PROJECT_NAME ?? 'Your Be Fun',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
  chains: [
    somnia,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [somnia] : []),
  ],
  ssr: true,
})
