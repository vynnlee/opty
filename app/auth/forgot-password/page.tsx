import * as React from 'react'
import type { Metadata } from 'next'

import { Logo } from '@/components/auth/logo'
import { Title } from '@/components/auth/title'
import { Description } from '@/components/auth/description'
import { RelatedLink } from '@/components/auth/related-link'
import { ButtonLink } from '@/components/button-link'
import { LanguageToggleButton } from '@/components/auth/language-toggle-button'

import { ForgotPasswordForm } from './forgot-password-form'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Login to your account',
}

export default function ForgotPasswordPage() {
  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-8">
      <ButtonLink
        href="/auth/signin"
        title="Sign In"
        className="absolute left-4 top-4 md:left-8 md:top-8"
        startIconName="ChevronLeft"
      />
      <div className="mx-auto flex w-full max-w-[320px] flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <Logo />
          <Title>Forgot your password?</Title>
          <Description>
            Enter your email address below and we will send you a message to
            reset your password
          </Description>
        </div>
        <div className="grid gap-6">
          <ForgotPasswordForm />
        </div>
        <div className="flex justify-between text-center text-sm">
          <RelatedLink
            href="/auth/signup"
            title="Don't have an account? Sign Up"
          />
          <LanguageToggleButton />
        </div>
      </div>
    </div>
  )
}
