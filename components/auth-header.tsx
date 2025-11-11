"use client"

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useAuth,
} from "@clerk/nextjs"

export function AuthHeader() {
  const { isSignedIn } = useAuth()
  
  return (
    <header className="fixed top-0 right-0 z-50 p-4">
      {!isSignedIn ? (
        <div className="flex gap-2">
          <SignInButton />
          <SignUpButton />
        </div>
      ) : (
        <UserButton />
      )}
    </header>
  )
}


