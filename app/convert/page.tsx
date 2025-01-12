'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ConversionResult } from '@/components/ConversionResult'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ConvertPage() {
  const [repoUrl, setRepoUrl] = useState('')
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [conversionResult, setConversionResult] = useState(null)

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <Link 
          href="/" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alla Dashboard
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Convertitore Tailwind in Design Tokens</h1>
        
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="Inserisci l'URL del repository GitHub"
              className="w-full"
              required
            />
            <Button type="submit" disabled={isConverting} className="w-full">
              {isConverting ? 'Conversione in corso...' : 'Converti'}
            </Button>
          </form>
          
          {error && (
            <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}
          
          {conversionResult && <ConversionResult {...conversionResult} />}
        </div>
      </div>
    </div>
  )
}