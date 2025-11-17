'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const scrollRevealTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);
      const isNearTop = currentY < 80;
      const isScrollingDown = currentY > lastScrollY.current + 2;

      if (scrollRevealTimeout.current) {
        clearTimeout(scrollRevealTimeout.current);
      }

      if (isMobileMenuOpen) {
        setIsHidden(false);
        lastScrollY.current = currentY;
        return;
      }

      if (isScrollingDown && !isNearTop) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      scrollRevealTimeout.current = setTimeout(() => {
        if (!isMobileMenuOpen) {
          setIsHidden(false);
        }
      }, 240);

      lastScrollY.current = currentY;
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true } as EventListenerOptions);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRevealTimeout.current) {
        clearTimeout(scrollRevealTimeout.current);
      }
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsHidden(false);
      if (scrollRevealTimeout.current) {
        clearTimeout(scrollRevealTimeout.current);
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsHidden(false);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 top-1 md:top-2 left-0 px-4 md:px-8 transform transition-transform duration-500 ease-out ${
        isHidden ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      <AnimatePresence initial={false}>
        {!isScrolled && (
          <motion.div
            key="top-banner"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="container mx-auto rounded-lg border border-[#000B58]/12 bg-white px-4 md:px-8 py-2 text-center text-xs font-medium text-[#000B58] shadow-sm shadow-white/15"
          >
            Bienvenue chez Multi-Pôles
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
        className={`container mx-auto mt-2 md:mt-2.5 rounded-lg border border-[#000B58]/10 bg-white px-6 md:px-12 transition-all duration-300 ${
          isScrolled ? 'py-2 text-[#000B58] shadow-md shadow-white/15 backdrop-blur' : 'py-3 text-[#000B58] shadow-sm shadow-white/10'
        }`}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.15,
                staggerChildren: 0.07,
              },
            },
          }}
          className="flex w-full items-center gap-4 md:gap-6"
        >
          <motion.div variants={{ hidden: { y: -12, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="flex items-center gap-3 md:gap-4">
            <Link href="/" className="relative z-10 flex h-16 items-center">
              <Image
                src="/LOGO%20WHITE.jpeg"
                alt="Multi-Pôles"
                width={200}
                height={70}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>
            <span className="hidden md:block h-6 w-px bg-[#000B58]/15" aria-hidden="true" />
          </motion.div>

          <motion.div
            variants={{ hidden: { y: -12, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="hidden md:flex flex-1 justify-center pointer-events-auto"
          >
            <NavigationMenuDemo />
          </motion.div>

          <motion.div
            variants={{ hidden: { y: -12, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="hidden md:flex items-center gap-4"
          >
            <span className="h-6 w-px bg-[#000B58]/15" aria-hidden="true" />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="outline" className="border-[#000B58] text-[#000B58] hover:bg-[#000B58]/10">
                <Link href="/simulateur">Simulateur</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.button
            variants={{ hidden: { y: -12, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            className="md:hidden text-navy focus:outline-none ml-auto"
            onClick={toggleMobileMenu}
            aria-label="Ouvrir le menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="relative">
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 py-4"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <Link href="/" className="text-[#000B58] hover:text-[#000B58]/80 transition-colors font-medium">
                Accueil
              </Link>
              <Link href="/solutions" className="text-[#000B58] hover:text-[#000B58]/80 transition-colors font-medium">
                Solutions
              </Link>
              <Link href="/realisations" className="text-[#000B58] hover:text-[#000B58]/80 transition-colors font-medium">
                Réalisations
              </Link>
              <Link href="/apropos" className="text-[#000B58] hover:text-[#000B58]/80 transition-colors font-medium">
                À propos
              </Link>
              <Link href="/blog" className="text-[#000B58] hover:text-[#000B58]/80 transition-colors font-medium">
                Blog
              </Link>
              <Link href="/contact" className="text-[#000B58] hover:text-[#000B58]/80 transition-colors font-medium">
                Contact
              </Link>
              <Link
                href="/simulateur"
                className="border border-[#000B58] text-[#000B58] font-semibold px-5 py-2 rounded-md hover:bg-[#000B58]/10 transition-colors text-center"
              >
                Simulateur
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
;

export default Header;

function NavigationMenuDemo() {
  const navLinks = [
    { label: 'Accueil', href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Réalisations', href: '/realisations' },
    { label: 'À propos', href: '/apropos' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ] as const;

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap gap-2">
        {navLinks.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
