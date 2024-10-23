'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import LogoSymbol from '@/public/assets/logos/logo-symbol.svg'
import LogoDexSymbol from '@/public/assets/logos/logo-dex-symbol.svg'

import { LucideIcon } from '@/lib/lucide-icon'
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

const docs: {
  title: string
  href: string
  description: string
  icon: string
}[] = [
  {
    title: '글꼴에 대하여',
    href: '/docs/typography',
    description: '글꼴에 대한 탐구 일지',
    icon: 'Type',
  },
  {
    title: '웹 폰트에 대하여',
    href: '/docs/webfont',
    description: '웹 환경에서의 글꼴에 대하여',
    icon: 'FolderCode',
  },
  {
    title: '공지사항',
    href: '/docs/notice',
    description: '',
    icon: 'Flag',
  },
]

export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/ai" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              AI 검색
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>소개</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[600px] lg:grid-cols-[1fr_2fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-neutral-100 to-neutral-50 p-6 no-underline outline-none focus:shadow-md"
                    href="/about/opentypo"
                  >
                    <Image
                      src={LogoSymbol}
                      alt="OpenTypo"
                      height={24}
                      priority={true}
                    />
                    <div className="mb-2 mt-2 text-lg font-bold">
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
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-neutral-100 to-neutral-50 p-6 no-underline focus:shadow-md"
                    href="/about/dexer"
                  >
                    <Image
                      src={LogoDexSymbol}
                      alt="Design eXperience"
                      height={20}
                      priority={true}
                    />
                    <div className="mb-2 mt-2 text-lg font-bold">
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
          <NavigationMenuTrigger>알려드림</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[320px] md:grid-cols-1 lg:w-[320px]">
              {docs.map((docs) => (
                <ListItem
                  key={docs.title}
                  title={docs.title}
                  href={docs.href}
                  icon={docs.icon}
                >
                  {docs.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/fonts" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              글꼴 쓰임
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/fonts" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              자주 묻는 질문
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
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink className="flex flex-row gap-2" asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-neutral-200">
            <LucideIcon
              name={icon}
              className="size-5 min-w-5 text-neutral-800"
            />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-none text-muted-foreground">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
