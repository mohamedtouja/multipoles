'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4">MULTI-PÔLES</h3>
            <p className="text-gray-300 mb-4">
              Spécialiste PLV pour cosmétiques et pharmacie, nous créons des solutions d'affichage 
              personnalisées et innovantes pour valoriser votre marque.
            </p>
            <div className="flex space-x-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.02 10.02 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Nos Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions#plv" className="text-gray-300 hover:text-yellow transition-colors">
                  PLV
                </Link>
              </li>
              <li>
                <Link href="/solutions#packaging" className="text-gray-300 hover:text-yellow transition-colors">
                  Packaging
                </Link>
              </li>
              <li>
                <Link href="/solutions#print" className="text-gray-300 hover:text-yellow transition-colors">
                  Print
                </Link>
              </li>
              <li>
                <Link href="/solutions#digital" className="text-gray-300 hover:text-yellow transition-colors">
                  Digital
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/simulateur" className="text-gray-300 hover:text-yellow transition-colors">
                  Simulateur 3D
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="text-gray-300 hover:text-yellow transition-colors">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/devis" className="text-gray-300 hover:text-yellow transition-colors">
                  Demander un devis
                </Link>
              </li>
              <li>
                <Link href="/apropos" className="text-gray-300 hover:text-yellow transition-colors">
                  À propos de nous
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">123 Rue de l'Innovation</p>
              <p className="mb-2">75000 Paris, France</p>
              <p className="mb-2">
                <a href="tel:+33123456789" className="hover:text-yellow transition-colors">+33 1 23 45 67 89</a>
              </p>
              <p className="mb-2">
                <a href="mailto:contact@multi-poles.net" className="hover:text-yellow transition-colors">contact@multi-poles.net</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Multi-Pôles. Tous droits réservés.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/mentions-legales" className="text-gray-400 hover:text-yellow transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="text-gray-400 hover:text-yellow transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-yellow transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
