"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "publisher" | "advertiser"

interface User {
  id: string
  email: string
  role: UserRole
  name: string
  avatar?: string
}

interface SessionContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  updateUser: (data: Partial<User>) => Promise<void>
}

// Test users for development
const TEST_USERS = [
  {
    id: "pub_1",
    email: "publisher@test.com",
    password: "test123", // In real app, never store plain text passwords
    role: "publisher" as UserRole,
    name: "John Publisher",
    avatar: "/avatars/publisher.png",
  },
  {
    id: "adv_1",
    email: "advertiser@test.com",
    password: "test123",
    role: "advertiser" as UserRole,
    name: "Jane Advertiser",
    avatar: "/avatars/advertiser.png",
  },
]

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const savedUser = localStorage.getItem("user")
        const savedRole = localStorage.getItem("userRole")

        if (savedUser && savedRole) {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)

          // Redirect based on role if on auth pages
          const path = window.location.pathname
          if (path === "/sign-in" || path === "/sign-up") {
            router.push(
              parsedUser.role === "publisher"
                ? "/dashboard/offers/publisher"
                : "/dashboard/offers"
            )
          }
        }
      } catch (error) {
        console.error("Session check failed:", error)
        await signOut()
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Find matching test user
      const matchedUser = TEST_USERS.find(
        (user) => user.email === email && user.password === password
      )

      if (!matchedUser) {
        throw new Error("Invalid credentials")
      }

      // Create session user object (omit password)
      const sessionUser = {
        id: matchedUser.id,
        email: matchedUser.email,
        role: matchedUser.role,
        name: matchedUser.name,
        avatar: matchedUser.avatar,
      }

      // Save to state and localStorage
      setUser(sessionUser)
      localStorage.setItem("user", JSON.stringify(sessionUser))
      localStorage.setItem("userRole", sessionUser.role)

      // Redirect based on role
      if (sessionUser.role === "publisher") {
        router.push("/dashboard/offers/publisher")
      } else {
        router.push("/dashboard/offers")
      }
    } catch (error) {
      console.error("Sign in failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setIsLoading(true)
    try {
      // Clear state and storage
      setUser(null)
      localStorage.removeItem("user")
      localStorage.removeItem("userRole")
      router.push("/sign-in")
    } catch (error) {
      console.error("Sign out failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateUser = async (data: Partial<User>) => {
    setIsLoading(true)
    try {
      if (!user) throw new Error("No user to update")

      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
      localStorage.setItem("userRole", updatedUser.role)
    } catch (error) {
      console.error("Update user failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SessionContext.Provider
      value={{ user, isLoading, signIn, signOut, updateUser }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
