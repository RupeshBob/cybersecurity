"use client"

import type React from "react"

import { useState } from "react"
import { Check, AlertTriangle, AlertOctagon, Loader2, HelpCircle } from "lucide-react"

type MessageResult = {
  type: "safe" | "scam" | "phishing" | "suspicious" | "uncertain"
  confidence: number
  explanation: string
  detectedPatterns?: string[]
}

export default function MessageDetector() {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<MessageResult | null>(null)

  const analyzeMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Convert message to lowercase for case-insensitive matching
      const lowerMessage = message.toLowerCase()

      // Define keyword lists for each category
      const scamPatterns = [
        "congratulations",
        "you won",
        "winner",
        "lottery",
        "prize",
        "claim your",
        "million dollars",
        "inheritance",
        "lucky winner",
        "cash prize",
        "free gift",
        "you've been selected",
        "award winning",
        "unclaimed",
        "jackpot",
        "sweepstakes",
        "beneficiary",
        "donation",
        "charity needs",
        "funds transfer",
        "wire transfer",
        "western union",
        "money gram",
        "bitcoin",
        "cryptocurrency",
        "investment opportunity",
        "high return",
        "double your money",
        "risk free",
        "guaranteed return",
        "nigerian prince",
        "foreign prince",
        "diplomat",
        "overseas",
        "fortune",
        "wealthy",
        "business proposal",
        "confidential",
        "secret",
        "urgent attention",
        "urgent business",
      ]

      const phishingPatterns = [
        "verify your account",
        "confirm your details",
        "update your information",
        "validate your account",
        "suspicious activity",
        "unusual login",
        "security alert",
        "account suspended",
        "account locked",
        "account disabled",
        "password expired",
        "password reset",
        "click here",
        "login link",
        "sign in",
        "verify identity",
        "confirm identity",
        "security breach",
        "unauthorized access",
        "unusual sign-in",
        "unusual activity",
        "verify now",
        "authenticate",
        "secure your account",
        "limited access",
        "restore access",
        "billing information",
        "payment information",
        "credit card details",
        "banking details",
        "personal details",
        "identity verification",
        "document verification",
        "kyc",
        "know your customer",
        "account verification",
        "verification required",
        "action required",
        "immediate action",
        "failure to comply",
        "will be terminated",
        "will be suspended",
        "will be closed",
      ]

      const marketingPatterns = [
        "limited time offer",
        "exclusive deal",
        "special promotion",
        "discount",
        "sale",
        "buy now",
        "best rates",
        "best price",
        "clearance",
        "don't miss out",
        "one time offer",
        "act now",
        "while supplies last",
        "exclusive access",
        "members only",
        "premium",
        "vip",
        "upgrade",
        "subscribe",
        "free trial",
        "free shipping",
        "free delivery",
        "money back guarantee",
        "satisfaction guaranteed",
        "no obligation",
        "no commitment",
        "cancel anytime",
        "new arrival",
        "new product",
        "new service",
        "introducing",
        "just launched",
        "flash sale",
        "holiday special",
        "seasonal offer",
        "black friday",
        "cyber monday",
        "christmas sale",
        "new year sale",
        "summer sale",
        "winter sale",
      ]

      // Urgency indicators
      const urgencyPatterns = [
        "urgent",
        "immediate",
        "today only",
        "expires soon",
        "expires today",
        "deadline",
        "limited time",
        "running out",
        "last chance",
        "act fast",
        "act now",
        "hurry",
        "quickly",
        "don't delay",
        "time sensitive",
        "immediate attention",
        "respond asap",
        "respond immediately",
        "24 hours",
        "48 hours",
      ]

      // Suspicious request indicators
      const suspiciousRequestPatterns = [
        "send money",
        "wire funds",
        "transfer funds",
        "provide details",
        "submit details",
        "credit card",
        "debit card",
        "card number",
        "cvv",
        "expiry date",
        "expiration date",
        "password",
        "pin",
        "social security",
        "ssn",
        "tax id",
        "bank account",
        "routing number",
        "account number",
        "login credentials",
        "username",
        "mother's maiden name",
        "date of birth",
        "id number",
        "passport",
        "driver's license",
        "identity card",
        "verification code",
        "otp",
        "one time password",
        "authentication code",
        "security code",
        "access code",
      ]

      // Count matches for each category
      const scamMatches = scamPatterns.filter((pattern) => lowerMessage.includes(pattern)).length
      const phishingMatches = phishingPatterns.filter((pattern) => lowerMessage.includes(pattern)).length
      const marketingMatches = marketingPatterns.filter((pattern) => lowerMessage.includes(pattern)).length
      const urgencyMatches = urgencyPatterns.filter((pattern) => lowerMessage.includes(pattern)).length
      const suspiciousRequestMatches = suspiciousRequestPatterns.filter((pattern) =>
        lowerMessage.includes(pattern),
      ).length

      // Find the actual patterns that were matched for explanation
      const detectedPatterns = [
        ...scamPatterns.filter((pattern) => lowerMessage.includes(pattern)),
        ...phishingPatterns.filter((pattern) => lowerMessage.includes(pattern)),
        ...marketingPatterns.filter((pattern) => lowerMessage.includes(pattern)),
        ...urgencyPatterns.filter((pattern) => lowerMessage.includes(pattern)),
        ...suspiciousRequestPatterns.filter((pattern) => lowerMessage.includes(pattern)),
      ]

      // Calculate confidence scores
      // Base scores from pattern matches
      let scamScore = scamMatches * 15
      let phishingScore = phishingMatches * 15
      let marketingScore = marketingMatches * 10

      // Add weight for urgency and suspicious requests
      scamScore += urgencyMatches * 10
      phishingScore += urgencyMatches * 10
      scamScore += suspiciousRequestMatches * 15
      phishingScore += suspiciousRequestMatches * 20

      // Cap scores at 100
      scamScore = Math.min(scamScore, 100)
      phishingScore = Math.min(phishingScore, 100)
      marketingScore = Math.min(marketingScore, 100)

      // Determine the message type based on confidence scores
      let type: "safe" | "scam" | "phishing" | "suspicious" | "uncertain" = "uncertain"
      let confidence = 0
      let explanation = ""

      // Minimum threshold for classification
      const minConfidenceThreshold = 30

      if (scamScore >= phishingScore && scamScore >= marketingScore && scamScore >= minConfidenceThreshold) {
        type = "scam"
        confidence = scamScore
        explanation = `This message contains ${scamMatches} phrases commonly used in scams.`
        if (urgencyMatches > 0) {
          explanation += ` It also uses ${urgencyMatches} urgency indicators.`
        }
        if (suspiciousRequestMatches > 0) {
          explanation += ` The message requests sensitive information or action.`
        }
      } else if (
        phishingScore >= scamScore &&
        phishingScore >= marketingScore &&
        phishingScore >= minConfidenceThreshold
      ) {
        type = "phishing"
        confidence = phishingScore
        explanation = `This message contains ${phishingMatches} phrases typically used in phishing attempts.`
        if (urgencyMatches > 0) {
          explanation += ` It creates a sense of urgency with ${urgencyMatches} urgency indicators.`
        }
        if (suspiciousRequestMatches > 0) {
          explanation += ` The message requests sensitive information or action.`
        }
      } else if (marketingScore >= minConfidenceThreshold) {
        type = "suspicious"
        confidence = marketingScore
        explanation = `This message contains ${marketingMatches} marketing phrases that could be suspicious.`
      } else if (
        scamMatches > 0 ||
        phishingMatches > 0 ||
        marketingMatches > 0 ||
        urgencyMatches > 0 ||
        suspiciousRequestMatches > 0
      ) {
        type = "uncertain"
        confidence = Math.max(scamScore, phishingScore, marketingScore)
        explanation = "This message contains some suspicious elements, but not enough to confidently classify it."
      } else {
        type = "safe"
        confidence = 75
        explanation = "No suspicious patterns detected in this message."
      }

      setResult({
        type,
        confidence,
        explanation,
        detectedPatterns: detectedPatterns.length > 0 ? detectedPatterns : undefined,
      })
    } catch (error) {
      console.error("Error analyzing message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={analyzeMessage} className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Paste suspicious message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Paste a suspicious WhatsApp or SMS message here..."
            className="w-full rounded-md border border-slate-300 dark:border-slate-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isLoading || !message.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Analyzing...
            </span>
          ) : (
            "Analyze Message"
          )}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded-md dark:border-slate-600">
          <div
            className={`p-4 rounded-md ${
              result.type === "safe"
                ? "bg-green-100 dark:bg-green-900/30"
                : result.type === "suspicious"
                  ? "bg-amber-100 dark:bg-amber-900/30"
                  : result.type === "scam"
                    ? "bg-red-100 dark:bg-red-900/30"
                    : result.type === "phishing"
                      ? "bg-red-100 dark:bg-red-900/30"
                      : "bg-slate-100 dark:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center">
              {result.type === "safe" ? (
                <>
                  <Check className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
                  <span className="text-green-800 dark:text-green-300 font-medium">Safe Message</span>
                </>
              ) : result.type === "suspicious" ? (
                <>
                  <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-2" />
                  <span className="text-amber-800 dark:text-amber-300 font-medium">Suspicious Marketing</span>
                </>
              ) : result.type === "scam" ? (
                <>
                  <AlertOctagon className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
                  <span className="text-red-800 dark:text-red-300 font-medium">Potential Scam</span>
                </>
              ) : result.type === "phishing" ? (
                <>
                  <AlertOctagon className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
                  <span className="text-red-800 dark:text-red-300 font-medium">Phishing Attempt</span>
                </>
              ) : (
                <>
                  <HelpCircle className="h-6 w-6 text-slate-600 dark:text-slate-400 mr-2" />
                  <span className="text-slate-800 dark:text-slate-300 font-medium">Uncertain</span>
                </>
              )}
              <span className="ml-auto text-sm font-medium">{result.confidence}% confidence</span>
            </div>

            <p className="mt-2 text-sm">{result.explanation}</p>

            {result.detectedPatterns && result.detectedPatterns.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Detected patterns:</p>
                <div className="flex flex-wrap gap-1">
                  {result.detectedPatterns.slice(0, 5).map((pattern, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300"
                    >
                      {pattern}
                    </span>
                  ))}
                  {result.detectedPatterns.length > 5 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-300">
                      +{result.detectedPatterns.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
