import { NextResponse } from 'next/server'

// Process boot timestamp - resets whenever PM2 restarts the process
const serverBootTime = Date.now()

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  return NextResponse.json(
    {
      serverBootTime,
      status: 'active',
      timestamp: Date.now(),
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  )
}
