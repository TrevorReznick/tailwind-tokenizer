'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { ConversionResult } from '../components/ConversionResult'
import { useSession, signIn } from "next-auth/react"

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [repoUrl, setRepoUrl] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [conversionResult, setConversionResult] = useState(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsConverting(true)
    setError('')
    setConversionResult(null)

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl }),
      })

      if (!response.ok) {
        throw new Error('Errore nella richiesta API')
      }

      const result = await response.json()
      if (result.jobId) {
        setConversionResult(result)
      } else {
        throw new Error('Nessun job ID ricevuto')
      }
    } catch (err) {
      setError('Si è verificato un errore durante la conversione. Riprova.')
    } finally {
      setIsConverting(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">Caricamento...</div>
      </div>
    )
  }

  if (!session) {
    return null // This will prevent any flash of unauthenticated content
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Convertitore Tailwind in Design Tokens</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Inserisci l'URL del repository GitHub"
          required
        />
        <Button type="submit" disabled={isConverting}>
          {isConverting ? 'Conversione in corso...' : 'Converti'}
        </Button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {conversionResult && <ConversionResult {...conversionResult} />}
    </div>
  )
}

