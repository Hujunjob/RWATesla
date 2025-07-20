"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  BarChartHorizontal, 
  HelpCircle,
  Menu,
  X
} from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  
  const navLinks = [
    { title: "首页", icon: <Home size={18} />, href: "/" },
    { title: "资产验证", icon: <BarChartHorizontal size={18} />, href: "/verify" },
    { title: "信用借贷", icon: <BarChartHorizontal size={18} />, href: "/loan" },
    { title: "关于我们", icon: <HelpCircle size={18} />, href: "/about" },
  ]

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-2' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="font-rajdhani text-xl font-bold text-white">R</span>
            </div>
            <span className="font-rajdhani font-bold text-xl md:text-2xl">
              RWA<span className="text-primary">信用</span>贷款
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/10 transition-colors"
                >
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              ))}
            </nav>
          )}

          {/* Wallet Connect */}
          <div className="flex items-center gap-2">
            <ConnectButton />
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMobileMenu}
                className="ml-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && mobileMenuOpen && (
          <nav className="mt-4 pb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-3 py-3 rounded-md hover:bg-primary/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.icon}
                <span>{link.title}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header