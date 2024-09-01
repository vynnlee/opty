'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import LogoSymbol from '@/public/assets/logos/logo-symbol.svg'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const about: { title: string; href: string; description: string }[] = [
  {
    title: 'OpenTypo™',
    href: '/about/opentypo',
    description: '유료보다 예쁜 무료 폰트를 큐레이팅 해드립니다.',
  },
  {
    title: 'Design eXperience™ Team',
    href: '/about/dexer',
    description: '디자이너를 위한, 디자이너에 의한 프로덕트를 짓습니다.',
  },
]

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>소개</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[1fr_2fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/about/opentypo"
                  >
                    <Image
                      src={LogoSymbol}
                      alt="OpenTypo"
                      height={24}
                    />
                    <div className="mb-2 mt-2 text-lg font-medium">
                      OpenTypo™
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      유료보다 예쁜 무료 폰트를 큐레이팅 해드립니다.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md border border-neutral-200 p-6 no-underline focus:shadow-md"
                    href="/about/dexer"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Design eXperience™ Team
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      오픈타이포를 만들어나가는 개발 팀에 대해 알아보세요.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>소개</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {about.map((about) => (
                <ListItem
                  key={about.title}
                  title={about.title}
                  href={about.href}
                >
                  {about.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
