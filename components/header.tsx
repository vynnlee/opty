'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { LucideIcon } from '@/lib/lucide-icon'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer' // shadcn/ui의 Drawer 컴포넌트 import
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { AccountMenu } from '@/components/account-menu'
import { SearchForm } from '@/components/search-form'
import { SearchFormDialog } from '@/components/search-form-dialog'

import LogoFull from '@/public/assets/logos/logo-full.svg'
import LogoSymbolWhite from '@/public/assets/logos/logo-symbol-white.svg' // 흰색 로고를 추가했다고 가정

import { useAuth } from '@/hooks/use-auth'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'minimal'
  showSearch?: boolean // 추가: SearchForm 표시 여부를 결정하는 prop
}

const Header = ({
  className,
  variant,
  showSearch = true,
  ...props
}: HeaderProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { user } = useAuth()

  // pathname에 따라 variant를 자동으로 결정
  const currentVariant =
    pathname === '/fonts' ? 'minimal' : variant || 'minimal'
  const isDefault = currentVariant === 'default'

  // 애니메이션 상태 관리
  const [animationClass, setAnimationClass] = React.useState('')

  React.useEffect(() => {
    setAnimationClass('opacity-0 transform scale-95')

    // 애니메이션 트리거를 위해 약간의 지연을 둠
    const timer = setTimeout(() => {
      setAnimationClass('opacity-100 transform scale-100')
    }, 50)

    return () => clearTimeout(timer)
  }, [currentVariant])

  return (
    <header
      className={`border-b-none relative sticky left-0 top-0 z-50 bg-black text-white backdrop-blur-md transition-all duration-500 ease-in-out md:border-b md:bg-white md:text-black ${
        animationClass
      } ${isDefault ? '' : 'border-gray-200 dark:border-gray-700'} ${
        className
      }`}
      {...props}
    >
      {/* 모바일 네비게이션 Drawer */}
      <Drawer>
        <VisuallyHidden.Root>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>
            This is a hidden description for screen readers.
          </DrawerDescription>
        </VisuallyHidden.Root>
        <DrawerContent className="bg-black dark:bg-gray-900" side="left">
          <MobileNavigation />
        </DrawerContent>
      </Drawer>

      <div
        className={`flex h-12 items-center px-4 transition-all duration-500 ease-in-out sm:px-6 md:h-16 lg:px-8`}
        style={{
          maxWidth: isDefault ? '1280px' : '100%',
          margin: '0 auto',
        }}
      >
        {isDefault && (
          <DrawerTrigger asChild>
            <Button
              type="button"
              className="p-2 md:hidden"
              size="icon"
              variant="outline"
              aria-label="Toggle navigation menu"
            >
              <LucideIcon name="Menu" className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
        )}
        <Link href="/" className="flex-shrink-0">
          {/* 모바일 뷰용 흰색 로고 */}
          <Image
            src={LogoSymbolWhite}
            alt="OpenTypo Logo"
            height={16}
            className={`block transition-transform duration-500 ease-in-out md:hidden`}
            priority
          />
          {/* 데스크탑 뷰용 기본 로고 */}
          <Image
            src={LogoFull}
            alt="OpenTypo Logo"
            height={20}
            className={`hidden transition-transform duration-500 ease-in-out md:block`}
            priority
          />
        </Link>
        <nav className="ml-6 hidden flex-1 md:flex">
          <Navigation />
        </nav>
        <div className="ml-auto flex items-center gap-4">
          {showSearch && isDefault && pathname !== '/' && (
            <>
              <div className="hidden sm:block">
                <SearchForm
                  path="/search"
                  placeholder="search_text"
                  translate="yes"
                  values={{
                    q: pathname?.startsWith('/search')
                      ? searchParams.get('q') || ''
                      : '',
                  }}
                />
              </div>
              <SearchFormDialog className="sm:hidden" />
            </>
          )}
          {user ? <SignedInNav /> : <SignedOutNav />}
        </div>
      </div>
    </header>
  )
}

const SignedInNav = () => <AccountMenu />

const SignedOutNav = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        className="flex items-center gap-1 rounded-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => router.push('/auth/signin')}
      >
        <LucideIcon name="LogIn" className="h-4 w-4" />
        <span className="hidden sm:inline">{t('signin')}</span>
      </Button>
      <Button
        variant="primary"
        className="hover:bg-primary-600 flex items-center gap-1 rounded-full px-3 py-2"
        onClick={() => router.push('/auth/signup')}
      >
        <LucideIcon name="UserPlus" className="h-4 w-4 sm:hidden" />
        <span className="hidden sm:inline">{t('sign_up')}</span>
      </Button>
    </div>
  )
}

export { Header, type HeaderProps }
