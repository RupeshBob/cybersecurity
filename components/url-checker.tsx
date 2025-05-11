// components/url-checker.tsx
"use client";

import React, { FormEvent, useState } from "react";
import {
  Shield,
  AlertTriangle,
  AlertOctagon,
  Check,
  Loader2,
  ExternalLink,
} from "lucide-react";

type UrlStatus = "safe" | "suspicious" | "malicious";

interface UrlResults {
  harmless: number;
  suspicious: number;
  malicious: number;
  status: UrlStatus;
  note?: string;
}

export default function UrlChecker() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<UrlResults | null>(null);
  const [error, setError] = useState("");

  // Normalize for display (remove protocol/trailing slash)
  const normalizeUrl = (input: string) =>
    input.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const checkUrl = async (e: FormEvent) => {
    e.preventDefault();

    // 1) Clear old state
    setError("");
    setResults(null);

    // 2) Required check
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    // 3) Robust URL validation
    let finalUrl = url.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = `https://${finalUrl}`;
    }
    try {
      new URL(finalUrl);
    } catch {
      setError(
        "Please enter a valid URL (include a proper domain or protocol)"
      );
      return;
    }

    // 4) Fire off the request
    setIsLoading(true);
    try {
      const res = await fetch("/api/check-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: finalUrl }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }

      const data = (await res.json()) as UrlResults;

      if (data.harmless > data.suspicious && data.harmless > data.malicious) {
        data.status = "safe";
      } else if (data.suspicious > data.malicious) {
        data.status = "suspicious";
      } else {
        data.status = "malicious";
      }

      setResults({
        harmless: data.harmless,
        suspicious: data.suspicious,
        malicious: data.malicious,
        status: data.status,
        note: data.note,
      });
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || "An error occurred while checking the URL. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={checkUrl}
        className="
          flex flex-col space-y-2 w-full
          sm:flex-row sm:space-y-0 sm:space-x-2 sm:max-w-lg
        "
      >
        <input
          type="text"
          placeholder="Enter URL to check"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="
            w-full p-2 border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
            dark:bg-slate-700 dark:text-white dark:border-slate-600
          "
        />
        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full sm:w-auto p-2 bg-blue-600 hover:bg-blue-700
            text-white rounded-md focus:outline-none focus:ring-2
            focus:ring-blue-500 disabled:opacity-70
          "
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Check"}
        </button>
      </form>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {results && (
        <div className="mt-6 p-4 border rounded-md dark:border-slate-600">
          {/* Header with link */}
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

          {/* Counts */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-800 dark:text-green-300 font-medium">
                  Harmless
                </span>
              </div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400 mt-1">
                {results.harmless}
              </p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                <span className="text-amber-800 dark:text-amber-300 font-medium">
                  Suspicious
                </span>
              </div>
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">
                {results.suspicious}
              </p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
              <div className="flex items-center">
                <AlertOctagon className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                <span className="text-red-800 dark:text-red-300 font-medium">
                  Malicious
                </span>
              </div>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400 mt-1">
                {results.malicious}
              </p>
            </div>
          </div>

          {/* Status banner */}
          <div
            className={`
              p-4 rounded-md
              ${
                results.status === "safe"
                  ? "bg-green-100 dark:bg-green-900/30"
                  : results.status === "suspicious"
                  ? "bg-amber-100 dark:bg-amber-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
              }
            `}
          >
            <div className="flex items-center">
              {results.status === "safe" ? (
                <>
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-green-800 dark:text-green-300 font-medium">
                    This URL appears to be safe
                  </span>
                </>
              ) : results.status === "suspicious" ? (
                <>
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-2" />
                  <span className="text-amber-800 dark:text-amber-300 font-medium">
                    This URL is suspicious – proceed with caution
                  </span>
                </>
              ) : (
                <>
                  <AlertOctagon className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
                  <span className="text-red-800 dark:text-red-300 font-medium">
                    This URL is likely malicious – avoid visiting
                  </span>
                </>
              )}
            </div>
            {results.note && (
              <p className="mt-2 text-sm italic text-yellow-700 dark:text-yellow-300">
                ⚠️ {results.note}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
