'use client'

import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { LucideIcon } from '@/lib/lucide-icon'
import { Button } from '@/components/ui/button'
import {
  SheetTrigger,
  SheetContent,
  Sheet,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

import { Navigation } from '@/components/navigation'
import { MobileNavigation } from '@/components/mobile-navigation'
import { AccountMenu } from '@/components/account-menu'
import { SearchForm } from '@/components/search-form'
import { SearchFormDialog } from '@/components/search-form-dialog'

import LogoFull from '@/public/assets/logos/logo-full.svg'

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
    pathname === '/fonts' ? 'minimal' : variant || 'default'
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
    <Sheet>
      <VisuallyHidden.Root>
        <SheetTitle>Sheet Content</SheetTitle>
        <SheetDescription>
          This is a hidden description for screen readers.
        </SheetDescription>
      </VisuallyHidden.Root>
      <SheetContent className="bg-white dark:bg-gray-900" side="left">
        <MobileNavigation />
      </SheetContent>
      <header
        className={`sticky left-0 top-0 z-10 bg-white/95 backdrop-blur transition-all duration-500 ease-in-out supports-[backdrop-filter]:bg-white/75 ${animationClass} ${
          isDefault ? '' : 'border-b'
        } ${className}`}
        {...props}
      >
        <div
          className={`flex h-[60px] items-center transition-all duration-500 ease-in-out`}
          style={{
            paddingLeft: isDefault ? '0' : '1rem',
            paddingRight: isDefault ? '0' : '1rem',
            maxWidth: isDefault ? '1280px' : '100%',
            margin: '0 auto',
          }}
        >
          {isDefault && (
            <SheetTrigger asChild>
              <Button
                type="button"
                className="md:hidden"
                size="icon"
                variant="outline"
              >
                <LucideIcon name="Menu" className="size-6 min-w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
          )}
          <Link href="/">
            <Image
              src={LogoFull}
              alt="OpenTypo"
              height={20}
              className={`mr-6 transition-all duration-500 ease-in-out ${
                isDefault ? 'hidden md:flex' : 'mx-auto'
              }`}
            />
          </Link>
          <Navigation />
          <div className="ml-auto flex gap-2">
            {showSearch && isDefault && pathname !== '/' && (
              <>
                <SearchForm
                  path="/search"
                  placeholder="search_text"
                  translate="yes"
                  values={{
                    q: pathname?.startsWith('/search')
                      ? (searchParams.get('q') ?? '')
                      : '',
                  }}
                  className="hidden sm:flex"
                />
                <SearchFormDialog className="sm:hidden" />
              </>
            )}
            {user ? <SignedInNav /> : <SignedOutNav />}
          </div>
        </div>
      </header>
    </Sheet>
  )
}

const SignedInNav = () => <AccountMenu />

const SignedOutNav = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <>
      <Button
        variant="ghost"
        className="w-10 gap-1 rounded-full sm:w-auto"
        onClick={() => router.push('/auth/signin')}
      >
        <LucideIcon name="LogIn" className="size-4 min-w-4" />
        <span className="hidden sm:inline">{t('signin')}</span>
      </Button>
      <Button
        className="w-10 gap-1 rounded-full sm:w-auto"
        onClick={() => router.push('/auth/signup')}
      >
        <LucideIcon name="UserPlus" className="size-4 min-w-4 sm:hidden" />
        <span className="hidden sm:inline">{t('sign_up')}</span>
      </Button>
    </>
  )
}

export { Header, type HeaderProps }
