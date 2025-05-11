"use client"

import type React from "react"

import { useState } from "react"
import { Shield, AlertTriangle, AlertOctagon, Check, Loader2, ExternalLink } from "lucide-react"

export default function UrlChecker() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<null | {
    harmless: number
    suspicious: number
    malicious: number
    status: "safe" | "suspicious" | "phishing"
    note?: string
  }>(null)
  const [error, setError] = useState("")

  const checkUrl = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic URL validation
    if (!url) {
      setError("Please enter a URL")
      return
    }

    try {
      // URL validation using regex
      const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
      if (!urlPattern.test(url)) {
        setError("Please enter a valid URL")
        return
      }

      setIsLoading(true)
      setError("")

      // Call our API route that interfaces with VirusTotal
      const response = await fetch("/api/check-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        throw new Error("Failed to check URL")
      }

      const data = await response.json()

      // Determine status based on results
      let status: "safe" | "suspicious" | "phishing" = "safe"
      if (data.malicious > 2) {
        status = "phishing"
      } else if (data.suspicious > 3 || data.malicious > 0) {
        status = "suspicious"
      }

      setResults({
        harmless: data.harmless,
        suspicious: data.suspicious,
        malicious: data.malicious,
        status,
        note: data.note,
      })
    } catch (err) {
      console.error(err)
      setError("An error occurred while checking the URL. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Function to normalize URL for display (remove protocol, etc.)
  const normalizeUrl = (inputUrl: string) => {
    return inputUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
  }

  return (
    <div>
      <form onSubmit={checkUrl} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Enter URL to check
          </label>
          <div className="flex">
            <input
              type="text"
              id="url"
              placeholder="https://example.com"
              className="flex-1 rounded-l-md border border-slate-300 dark:border-slate-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check"}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
      </form>

      {results && (
        <div className="mt-6 p-4 border rounded-md dark:border-slate-600">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Scan Results</h3>
            {url && (
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <span className="mr-1">for</span>
                <a
                  href={url.startsWith("http") ? url : `https://${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:underline text-blue-600 dark:text-blue-400"
                >
                  {normalizeUrl(url)}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-800 dark:text-green-300 font-medium">Harmless</span>
              </div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">{results.harmless}</p>
            </div>

            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                <span className="text-amber-800 dark:text-amber-300 font-medium">Suspicious</span>
              </div>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">{results.suspicious}</p>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              <div className="flex items-center">
                <AlertOctagon className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <span className="text-red-800 dark:text-red-300 font-medium">Malicious</span>
              </div>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400 mt-1">{results.malicious}</p>
            </div>
          </div>

          <div
            className={`p-4 rounded-md ${
              results.status === "safe"
                ? "bg-green-100 dark:bg-green-900/30"
                : results.status === "suspicious"
                  ? "bg-amber-100 dark:bg-amber-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
            }`}
          >
            <div className="flex items-center">
              {results.status === "safe" ? (
                <>
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-green-800 dark:text-green-300 font-medium">This URL appears to be safe</span>
                </>
              ) : results.status === "suspicious" ? (
                <>
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-2" />
                  <span className="text-amber-800 dark:text-amber-300 font-medium">
                    This URL is suspicious - proceed with caution
                  </span>
                </>
              ) : (
                <>
                  <AlertOctagon className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
                  <span className="text-red-800 dark:text-red-300 font-medium">
                    This URL is likely a phishing attempt - avoid visiting
                  </span>
                </>
              )}
            </div>

            {results.note && (
              <p className="mt-2 text-xs italic text-slate-600 dark:text-slate-400">Note: {results.note}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
