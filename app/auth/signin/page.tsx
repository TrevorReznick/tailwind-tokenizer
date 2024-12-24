'use client'

import { signIn } from 'next-auth/react'
import { Button } from "../../../components/ui/button"

import { useSearchParams } from 'next/navigation'

export default function SignIn() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl') || '/'
  
    const handleSignIn = () => {
      signIn('github', { callbackUrl })
    }
  
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Accedi al Convertitore Tailwind</h1>
          <Button onClick={handleSignIn}>
            Accedi con GitHub
          </Button>
        </div>
      </div>
    )
  }