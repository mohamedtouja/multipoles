'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="relative z-10">
          <div className="h-12 w-36 relative">
            {/* Replace with actual logo */}
            <div className="font-bold text-navy text-xl">MULTI-PÔLES</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-navy hover:text-navy-light transition-colors">
            Accueil
          </Link>
          <Link href="/solutions" className="text-navy hover:text-navy-light transition-colors">
            Solutions
          </Link>
          <Link href="/realisations" className="text-navy hover:text-navy-light transition-colors">
            Réalisations
          </Link>
          <Link href="/apropos" className="text-navy hover:text-navy-light transition-colors">
            À propos
          </Link>
          <Link href="/blog" className="text-navy hover:text-navy-light transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-navy hover:text-navy-light transition-colors">
            Contact
          </Link>
        </nav>

        {/* Simulator Button */}
        <motion.div 
          className="hidden md:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/simulateur" className="bg-yellow text-navy font-semibold px-5 py-2 rounded-md hover:bg-yellow-dark transition-colors shadow-md">
            Simulateur 3D
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-navy focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link href="/" className="text-navy hover:text-navy-light transition-colors">
              Accueil
            </Link>
            <Link href="/solutions" className="text-navy hover:text-navy-light transition-colors">
              Solutions
            </Link>
            <Link href="/realisations" className="text-navy hover:text-navy-light transition-colors">
              Réalisations
            </Link>
            <Link href="/apropos" className="text-navy hover:text-navy-light transition-colors">
              À propos
            </Link>
            <Link href="/blog" className="text-navy hover:text-navy-light transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-navy hover:text-navy-light transition-colors">
              Contact
            </Link>
            <Link href="/simulateur" className="bg-yellow text-navy font-semibold px-5 py-2 rounded-md hover:bg-yellow-dark transition-colors shadow-md text-center">
              Simulateur 3D
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
