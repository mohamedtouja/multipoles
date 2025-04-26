'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';

const solutionCategories = [
  {
    id: 'plv',
    title: 'PLV',
    description: 'Nos solutions de Publicité sur Lieu de Vente mettent en valeur vos produits cosmétiques et pharmaceutiques avec élégance et efficacité.',
    items: [
      {
        title: 'Présentoirs sur-mesure',
        description: 'Présentoirs conçus sur-mesure pour mettre en avant vos produits avec élégance.',
        image: '/images/solutions/plv-presentoir.jpg'
      },
      {
        title: 'Totems',
        description: 'Solutions verticales pour maximiser l\'impact visuel de votre marque.',
        image: '/images/solutions/plv-totem.jpg'
      },
      {
        title: 'Vitrines',
        description: 'Vitrines premium pour mettre en valeur vos produits haut de gamme.',
        image: '/images/solutions/plv-vitrine.jpg'
      },
      {
        title: 'Signalétique',
        description: 'Solutions de signalétique pour guider vos clients vers vos produits.',
        image: '/images/solutions/plv-signaletique.jpg'
      }
    ]
  },
  {
    id: 'packaging',
    title: 'Packaging',
    description: 'Emballages et packagings innovants qui valorisent votre identité de marque et offrent une expérience client mémorable.',
    items: [
      {
        title: 'Coffrets',
        description: 'Coffrets premium pour valoriser vos produits et créer une expérience d\'unboxing mémorable.',
        image: '/images/solutions/packaging-coffret.jpg'
      },
      {
        title: 'Étuis',
        description: 'Étuis sur-mesure adaptés à vos produits avec finitions premium.',
        image: '/images/solutions/packaging-etui.jpg'
      },
      {
        title: 'Packaging écologique',
        description: 'Solutions d\'emballage respectueuses de l\'environnement sans compromettre l\'esthétique.',
        image: '/images/solutions/packaging-eco.jpg'
      },
      {
        title: 'Packaging événementiel',
        description: 'Packagings exclusifs pour vos lancements et éditions limitées.',
        image: '/images/solutions/packaging-event.jpg'
      }
    ]
  },
  {
    id: 'print',
    title: 'Print',
    description: 'Solutions d\'impression haut de gamme pour tous vos supports de communication marketing et vente.',
    items: [
      {
        title: 'Catalogues',
        description: 'Catalogues produits avec impression haute qualité et finitions premium.',
        image: '/images/solutions/print-catalogue.jpg'
      },
      {
        title: 'Brochures',
        description: 'Brochures et dépliants pour communiquer efficacement sur vos gammes de produits.',
        image: '/images/solutions/print-brochure.jpg'
      },
      {
        title: 'Cartes & Invitations',
        description: 'Cartes et invitations pour vos événements avec finitions luxueuses.',
        image: '/images/solutions/print-carte.jpg'
      },
      {
        title: 'Grand format',
        description: 'Impression grand format pour vos stands et affichages événementiels.',
        image: '/images/solutions/print-grand-format.jpg'
      }
    ]
  },
  {
    id: 'digital',
    title: 'Digital',
    description: 'Solutions digitales intégrées pour une expérience client cohérente entre le physique et le numérique.',
    items: [
      {
        title: 'Bornes interactives',
        description: 'Bornes tactiles pour une expérience client engageante en point de vente.',
        image: '/images/solutions/digital-borne.jpg'
      },
      {
        title: 'Réalité augmentée',
        description: 'Expériences de réalité augmentée pour enrichir l\'interaction avec vos produits.',
        image: '/images/solutions/digital-ar.jpg'
      },
      {
        title: 'Configurateurs 3D',
        description: 'Configurateurs 3D pour personnaliser les produits selon les besoins des clients.',
        image: '/images/solutions/digital-configurateur.jpg'
      },
      {
        title: 'QR Codes & NFC',
        description: 'Solutions connectées pour enrichir l\'expérience produit avec du contenu digital.',
        image: '/images/solutions/digital-connected.jpg'
      }
    ]
  }
];

export default function Solutions() {
  const refs = {
    plv: useRef<HTMLDivElement>(null),
    packaging: useRef<HTMLDivElement>(null),
    print: useRef<HTMLDivElement>(null),
    digital: useRef<HTMLDivElement>(null),
  };
  
  const scrollToSection = (id: string) => {
    refs[id as keyof typeof refs]?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-navy text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-6"
            >
              Solutions PLV & Packaging
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-10"
            >
              Découvrez notre gamme complète de solutions pour valoriser vos produits cosmétiques et pharmaceutiques
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {solutionCategories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-md transition-colors backdrop-blur-sm"
                >
                  {category.title}
                </button>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Solution Categories */}
      {solutionCategories.map((category, index) => (
        <section 
          key={category.id}
          ref={refs[category.id as keyof typeof refs]}
          className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          id={category.id}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-navy mb-4"
              >
                {category.title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600"
              >
                {category.description}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: itemIndex * 0.1 }}
                  whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <div className="h-48 bg-gray-200 relative">
                    {/* Placeholder for image */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span>Image à venir</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Link 
                      href="/contact" 
                      className="text-navy font-medium inline-flex items-center hover:text-yellow transition-colors"
                    >
                      En savoir plus
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
      
      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Besoin d'une solution sur-mesure ?</h2>
            <p className="text-xl mb-10">
              Notre équipe de designers et d'ingénieurs est à votre disposition pour créer la solution idéale pour vos besoins spécifiques.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/simulateur"
                  className="bg-yellow text-navy px-8 py-3 rounded-md font-semibold hover:bg-yellow-dark transition-colors shadow-lg"
                >
                  Essayer notre simulateur 3D
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/devis"
                  className="bg-transparent text-white px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/10 transition-colors"
                >
                  Demander un devis
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
