'use client';

import React from 'react'
import { Button } from "@/components/ui/button"

interface ConversionResultProps {
  tokens: any
  cssVariables: string
  componentStyles: string
  zipContent: string // base64 encoded zip content
}

export function ConversionResult({ tokens, cssVariables, componentStyles, zipContent }: ConversionResultProps) {
  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadZip = () => {
    const content = atob(zipContent)
    downloadFile(content, 'tailwind-to-tokens.zip', 'application/zip')
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Risultati della conversione</h2>
      
      <div>
        <h3 className="text-lg font-medium">Design Tokens:</h3>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {JSON.stringify(tokens, null, 2)}
        </pre>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Variabili CSS:</h3>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {cssVariables}
        </pre>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Stili dei componenti:</h3>
        <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
          {componentStyles}
        </pre>
      </div>
      
      <div className="flex space-x-4">
        <Button onClick={() => downloadFile(JSON.stringify(tokens, null, 2), 'design-tokens.json', 'application/json')}>
          Scarica Design Tokens
        </Button>
        <Button onClick={() => downloadFile(cssVariables, 'variables.css', 'text/css')}>
          Scarica Variabili CSS
        </Button>
        <Button onClick={() => downloadFile(componentStyles, 'component-styles.css', 'text/css')}>
          Scarica Stili Componenti
        </Button>
        <Button onClick={downloadZip}>
          Scarica ZIP
        </Button>
      </div>
    </div>
  )
}