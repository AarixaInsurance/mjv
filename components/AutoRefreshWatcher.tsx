'use client'

import { useEffect, useRef } from 'react'

export default function AutoRefreshWatcher() {
  const initialBootTimeRef = useRef<number | null>(null)
  const isCheckingRef = useRef<boolean>(false)

  useEffect(() => {
    const clearBrowserCaches = async () => {
      if (typeof window !== 'undefined' && 'caches' in window) {
        try {
          const keys = await caches.keys()
          await Promise.all(keys.map((key) => caches.delete(key)))
        } catch (_) {}
      }
    }

    const checkServerVersion = async () => {
      if (isCheckingRef.current) return
      isCheckingRef.current = true

      try {
        const res = await fetch(`/api/version?_t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        })

        if (!res.ok) return

        const data = await res.json()
        const currentServerBootTime: number = data?.serverBootTime

        if (!currentServerBootTime) return

        if (initialBootTimeRef.current === null) {
          // Record the boot time of the server instance that initially served this page
          initialBootTimeRef.current = currentServerBootTime
          return
        }

        // If server boot time changed, PM2 was restarted or new code was deployed
        if (currentServerBootTime !== initialBootTimeRef.current) {
          console.warn('[AutoRefresh] Server restart / deployment detected. Auto-refreshing website...')
          initialBootTimeRef.current = currentServerBootTime
          await clearBrowserCaches()
          window.location.reload()
        }
      } catch (_) {
        // Ignore network hiccups
      } finally {
        isCheckingRef.current = false
      }
    }

    // 1. Initial check
    checkServerVersion()

    // 2. Poll every 10 seconds to catch PM2 restarts even if the tab is left open
    const interval = setInterval(checkServerVersion, 10000)

    // 3. Check immediately when the user switches back to the tab or focuses the window
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        checkServerVersion()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('focus', checkServerVersion)

    // 4. Recover automatically from stale chunk loading errors
    const handleChunkError = (msg: string) => {
      if (
        msg.includes('ChunkLoadError') ||
        msg.includes('Loading chunk') ||
        msg.includes('Failed to fetch dynamically imported module') ||
        msg.includes('CSS_CHUNK_LOAD_FAILED')
      ) {
        console.warn('[AutoRefresh] Stale chunk detected after deployment. Auto-reloading...')
        clearBrowserCaches().finally(() => {
          window.location.reload()
        })
      }
    }

    const handleError = (e: ErrorEvent) => handleChunkError(e?.message || '')
    const handleRejection = (e: PromiseRejectionEvent) => {
      const msg = e?.reason?.message || String(e?.reason || '')
      handleChunkError(msg)
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('focus', checkServerVersion)
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  }, [])

  return null
}
