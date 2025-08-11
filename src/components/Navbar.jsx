'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((v) => !v);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.15)]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#101828] to-[#1B2635]"></div>

      {/* Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#101828] to-[#1B2635] flex items-center justify-center shadow-lg group-hover:scale-105 group-active:scale-95 transition-all duration-200">
              <span className="text-white text-lg font-bold">💰</span>
            </div>
            <span className="text-lg lg:text-xl font-extrabold tracking-tight text-white">
              ExpenseTracker AI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white transition-colors font-[600]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Auth (desktop) */}
            <div className="hidden sm:block">
              <SignedOut>
                <SignInButton>
                  <button className="relative overflow-hidden px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 bg-gradient-to-r from-emerald-500 to-teal-500">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="p-1 rounded-xl border border-white/20 shadow-sm">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          'w-8 h-8 hover:scale-110 transition-transform duration-200',
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all active:scale-95"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-96 opacity-100 pb-4'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="mt-2 rounded-2xl border border-white/20 bg-[#101828]/95 backdrop-blur-md shadow-xl p-2 space-y-1">
            {[
              { href: '/', label: 'Home', icon: '🏠' },
              { href: '/about', label: 'About', icon: 'ℹ️' },
              { href: '/contact', label: 'Contact', icon: '📞' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/90 hover:bg-white/10 transition-colors font-[500]"
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}

            {/* Mobile auth */}
            <div className="pt-3 mt-2 border-t border-white/10">
              <SignedOut>
                <SignInButton>
                  <button
                    onClick={closeMobileMenu}
                    className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl active:scale-95 bg-gradient-to-r from-emerald-500 to-teal-500"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-between p-3 rounded-xl border border-white/20">
                  <span className="text-sm font-medium text-white/90">
                    Account
                  </span>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          'w-8 h-8 hover:scale-110 transition-transform duration-200',
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
