'use client'
export default function SentryTest() {
  return (
    <button
      className="bg-red-600 text-white px-4 py-2 rounded fixed bottom-4 left-4 z-50 opacity-50 hover:opacity-100"
      onClick={() => { throw new Error('Sentry Test Error: Hello from Tehran!') }}
    >
      🚨 Crash Me
    </button>
  )
}
