import { NextResponse } from 'next/server'
import { Queue } from 'bullmq'

const conversionQueue = new Queue('conversion')

/*
const audioQueue = new Queue("audio transcoding", {
  redis: { port: 6379, host: "127.0.0.1", password: "foobared" },
})
*/

export async function POST(req: Request) {
  const { repoUrl } = await req.json()

  try {
    const job = await conversionQueue.add('convert', { repoUrl })
    return NextResponse.json({ jobId: job.id })
  } catch (error) {
    console.error('Error queueing conversion job:', error)
    return NextResponse.json({ 
      error: 'Si è verificato un errore durante l\'avvio della conversione.' 
    }, { status: 500 })
  }
}