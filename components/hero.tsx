'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'
import { LucideIcon } from '@/lib/lucide-icon'

import VisualLanding from '@/public/assets/images/visuals/visual_landing.svg'
import VisualV1release from '@/public/assets/images/visuals/visual_v1release.svg'
import VisualHerogrid from '@/public/assets/images/visuals/visual_herogrid.svg'
import VisualHeroh1 from '@/public/assets/images/visuals/visual_heroh1.svg'

const Hero = () => {
  const { t } = useTranslation()

  return (
    <section className="relative flex items-center justify-center py-[12vh] sm:py-[18vh] md:py-[20vh] lg:py-[26vh]">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative h-full w-screen">
          <Image
            src={VisualHerogrid}
            alt="grid"
            className="pointer-events-none absolute inset-0 -z-10 size-full select-none"
          />
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center gap-4 text-center">
        <div className="flex flex-col gap-1">
          <Image
            src={VisualHeroh1}
            alt="Free, but Better"
            height={80}
            className="flex"
          />
          <h3 className="text-md font-regular tracking-tight text-neutral-800">
            Curated high-quality, commercial free fonts.
          </h3>
        </div>
        <div className="space-between mt-2 flex flex-row items-center gap-2 rounded-full border border-neutral-200 bg-white p-1 drop-shadow-sm">
          <LucideIcon
            name="Sparkles"
            className="ml-3 h-5 w-5 text-neutral-200"
          />
          <input
            type="text"
            placeholder="어떤 폰트를 찾으시나요?"
            className="text-md leading-none outline-none focus:ring-0"
          ></input>
          <Button
            type="submit"
            className="rounded-full bg-brandPrimary text-white hover:bg-brandPrimary/75"
          >
            찾아줘!
          </Button>
        </div>
      </div>
    </section>

    // <section className="relative w-full py-4 md:py-6">
    //   <div className="container">
    //     <div className="flex flex-col items-center justify-center space-y-4 text-center">
    //       <Image
    //         src={VisualHerogrid}
    //         className="pointer-events-none absolute z-0 w-screen"
    //       />
    //       <div className="z-10 flex flex-col gap-2">
    //         {/* <div className="flex flex-row items-center gap-1 rounded-full border border-neutral-200 bg-white px-4 py-1 text-center">
    //           <LucideIcon name="Ligature" className="h-4 w-4" />
    //           <p className="text-center text-sm font-medium text-neutral-700">
    //             매주 새로운 무료 폰트
    //           </p>
    //         </div> */}
    //         <div className="flex flex-col">
    //           <Image
    //             src={VisualHeroh1}
    //             alt="Free, but Better"
    //             height={80}
    //             className="hidden md:flex"
    //           />
    //         </div>
    //         <div className="flex flex-row items-center space-between gap-2 rounded-full border border-neutral-200 bg-white p-1">
    //           <LucideIcon
    //             name="Sparkles"
    //             className="ml-3 h-5 w-5 text-neutral-200"
    //           />
    //           <input
    //             type="text"
    //             placeholder="어떤 폰트를 찾으시나요?"
    //             className="text-md leading-none outline-none focus:ring-0"
    //           ></input>
    //           <Button type="submit" className="rounded-full">
    //             찾아줘!
    //           </Button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  )
}

export { Hero }
