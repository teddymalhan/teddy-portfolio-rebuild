"use client"

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"

export function AuthHeader() {
  return (
    <header className="fixed top-0 right-0 z-50 p-4">
      <SignedOut>
        <div className="flex gap-2">
          <SignInButton />
          <SignUpButton />
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}


