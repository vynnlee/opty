import * as React from 'react'
import { cn } from '@/lib/utils'

interface SiteLogoProps extends React.SVGProps<SVGSVGElement> {}

const SiteLogo = ({
  xmlns = 'http://www.w3.org/2000/svg',
  width = '512',
  height = '512',
  viewBox = '0 0 512 512',
  className,
  ...props
}: SiteLogoProps) => {
  return (
    <svg
      xmlns={xmlns}
      width={width}
      height={height}
      viewBox={viewBox}
      className={cn('size-8 min-w-8', className)}
      fill="none"
      {...props}
    >
      <rect width="512" height="512" fill="#FF3002" />
      <path
        d="M329 446C369.317 446 402 360.71 402 255.5H329C329 326.012 314.32 387.576 292.5 420.514C270.68 387.576 256 326.012 256 255.5H183C183 326.012 197.68 387.576 219.5 420.514C230.237 436.723 242.704 446 256 446H329Z"
        fill="white"
      />
      <path
        d="M183 65C142.683 65 110 150.29 110 255.5H183C183 184.988 197.68 123.424 219.5 90.4855C241.32 123.424 256 184.988 256 255.5H329C329 184.988 314.32 123.424 292.5 90.4855C281.768 74.2843 269.308 65.0086 256.018 65L255.982 65L183 65Z"
        fill="white"
      />
    </svg>
  )
}

export { SiteLogo, type SiteLogoProps }
