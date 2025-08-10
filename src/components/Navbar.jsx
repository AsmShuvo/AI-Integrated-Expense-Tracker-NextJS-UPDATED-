'use client';

import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-gray-50 via-white to-emerald-50 border-b border-gray-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group transition-all duration-300 hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <span className="text-white text-xs sm:text-sm md:text-lg font-bold">
                  💰
                </span>
              </div>
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-emerald-600">
                <span className="hidden sm:inline">ExpenseTracker AI</span>
                <span className="sm:hidden">ExpenseTracker</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="px-3 lg:px-4 py-2 text-black rounded-xl text-sm font-medium hover:bg-emerald-50">
              Home
            </Link>
            <Link href="/about" className="px-3 lg:px-4 py-2 text-black rounded-xl text-sm font-medium hover:bg-emerald-50">
              About
            </Link>
            <Link href="/contact" className="px-3 lg:px-4 py-2 text-black rounded-xl text-sm font-medium hover:bg-emerald-50">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Auth - Desktop */}
            <div className="hidden sm:block">
              <SignedOut>
                <SignInButton>
                  <button className="bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-emerald-600 transition-all duration-300">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-emerald-200">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-6 h-6 sm:w-8 sm:h-8 hover:scale-110 transition-transform duration-200',
                        userButtonBox: 'flex items-center justify-center',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-gray-600 hover:bg-emerald-50 transition-all duration-200 active:scale-95"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 pb-3 sm:pb-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-xl border border-gray-200 mt-2 shadow-lg">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-emerald-50 text-sm font-medium transition-all duration-200 active:scale-95"
              onClick={closeMobileMenu}
            >
              <span className="text-base">🏠</span>
              <span>Home</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-emerald-50 text-sm font-medium transition-all duration-200 active:scale-95"
              onClick={closeMobileMenu}
            >
              <span className="text-base">ℹ️</span>
              <span>About</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-emerald-50 text-sm font-medium transition-all duration-200 active:scale-95"
              onClick={closeMobileMenu}
            >
              <span className="text-base">📞</span>
              <span>Contact</span>
            </Link>

            {/* Mobile Auth */}
            <div className="pt-3 border-t border-gray-200">
              <SignedOut>
                <SignInButton>
                  <button
                    className="w-full bg-emerald-500 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                    onClick={closeMobileMenu}
                  >
                    <span>Sign In</span>
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-center p-3 rounded-xl border border-emerald-200">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 hover:scale-110 transition-transform duration-200',
                        userButtonBox: 'flex items-center justify-center',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
