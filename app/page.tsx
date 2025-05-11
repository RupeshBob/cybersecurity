"use client"
import { Shield, AlertTriangle, Lock } from "lucide-react"
import UrlChecker from "@/components/url-checker"
import MessageDetector from "@/components/message-detector"
import PasswordChecker from "@/components/password-checker"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">CyberGuard</h1>
          <p className="text-slate-600 dark:text-slate-300">Protect yourself online with these security tools</p>
        </header>

        <div className="space-y-12 max-w-4xl mx-auto">
          {/* Phishing URL Checker Section */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Phishing URL Checker</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Check if a URL is potentially malicious or a phishing attempt.
            </p>

            <UrlChecker />
          </section>

          {/* Scam Message Detector Section */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-500 mr-2" />
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Scam Message Detector</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Analyze suspicious messages to identify potential scams.
            </p>

            <MessageDetector />
          </section>

          {/* Password Strength Checker Section */}
          <section className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <Lock className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
              <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Password Strength Checker</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Test the strength of your passwords and get improvement suggestions.
            </p>

            <PasswordChecker />
          </section>
        </div>

        <footer className="mt-16 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} CyberGuard. All rights reserved.</p>
          <p className="mt-1">This is a demo application. Do not use for critical security decisions.</p>
        </footer>
      </div>
    </main>
  )
}
