import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import * as opentype from 'opentype.js'

interface FontAnalyzerProps {
  onAnalysis: (data: any) => void
  fontName: string
}

export function FontAnalyzer({ onAnalysis, fontName }: FontAnalyzerProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const analyzeFont = useCallback(async () => {
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file.',
        variant: 'destructive',
      })
      return
    }

    setIsAnalyzing(true)

    try {
      // Analyze font
      const arrayBuffer = await file.arrayBuffer()
      const font = opentype.parse(arrayBuffer)

      // Extract metadata
      const metadata = {
        fontFamily: font.names.fontFamily?.en || '',
        fontSubfamily: font.names.fontSubfamily?.en || '',
        fullName: font.names.fullName?.en || '',
        version: font.names.version?.en || '',
        copyright: font.names.copyright?.en || '',
        license: font.names.license?.en || '',
      }

      // Process font name
      let processedFontName = metadata.fontFamily
        .replace(/Variable/g, '')
        .trim()

      // Generate storage URL and actual storage path
      const folderName = processedFontName.replace(/\s+/g, '_').toLowerCase()
      const storageUrl = `${folderName}/${file.name}` // This will be stored in the database
      const actualStoragePath = `${folderName}/${file.name}` // This is where the file will be uploaded

      // Return both in the analysis result
      const analysisResult = {
        ...metadata,
        processedFontName,
        storageUrl,
        actualStoragePath,
        originalFile: file,
      }

      onAnalysis(analysisResult)

      toast({
        title: 'Success',
        description: 'Font analyzed successfully.',
      })
    } catch (error) {
      console.error('Error during font analysis:', error)
      toast({
        title: 'Error',
        description: 'An error occurred during font analysis.',
        variant: 'destructive',
      })
    } finally {
      setIsAnalyzing(false)
    }
  }, [file, onAnalysis])

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="font-file">Upload Font File</Label>
        <Input
          id="font-file"
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          onChange={handleFileChange}
        />
      </div>
      <Button onClick={analyzeFont} disabled={!file || isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Analyze Font'}
      </Button>
    </div>
  )
}
