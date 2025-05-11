"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function PasswordChecker() {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Calculate password strength
  const calculateStrength = (password: string) => {
    if (!password) return { score: 0, label: "", color: "" }

    let score = 0

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1 // Has uppercase
    if (/[a-z]/.test(password)) score += 1 // Has lowercase
    if (/[0-9]/.test(password)) score += 1 // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 1 // Has special char

    // Determine strength label and color
    let label = ""
    let color = ""

    if (score <= 2) {
      label = "Weak"
      color = "bg-red-500"
    } else if (score <= 4) {
      label = "Medium"
      color = "bg-amber-500"
    } else {
      label = "Strong"
      color = "bg-green-500"
    }

    return {
      score,
      label,
      color,
      percentage: Math.min(100, Math.round((score / 6) * 100)),
    }
  }

  const strength = calculateStrength(password)

  // Generate improvement suggestions
  const getSuggestions = () => {
    if (!password) return []

    const suggestions = []

    if (password.length < 12) {
      suggestions.push("Make your password at least 12 characters long")
    }

    if (!/[A-Z]/.test(password)) {
      suggestions.push("Add uppercase letters (A-Z)")
    }

    if (!/[a-z]/.test(password)) {
      suggestions.push("Add lowercase letters (a-z)")
    }

    if (!/[0-9]/.test(password)) {
      suggestions.push("Add numbers (0-9)")
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      suggestions.push("Add special characters (e.g., !@#$%^&*)")
    }

    // Check for common patterns
    if (/^[a-zA-Z]+$/.test(password) || /^[0-9]+$/.test(password)) {
      suggestions.push("Avoid using only letters or only numbers")
    }

    if (/(.)\1{2,}/.test(password)) {
      suggestions.push("Avoid repeating characters (e.g., 'aaa', '111')")
    }

    return suggestions
  }

  const suggestions = getSuggestions()

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Enter password to check
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter a password"
            className="w-full rounded-md border border-slate-300 dark:border-slate-600 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {password && (
        <>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Strength:</span>
              <span
                className={`text-sm font-medium ${
                  strength.label === "Weak"
                    ? "text-red-600 dark:text-red-400"
                    : strength.label === "Medium"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-green-600 dark:text-green-400"
                }`}
              >
                {strength.label}
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${strength.color}`}
                style={{ width: `${strength.percentage}%` }}
              ></div>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Suggestions to improve:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-slate-700 dark:text-slate-300">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}
