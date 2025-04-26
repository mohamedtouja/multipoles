'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Carousel data
const carouselItems = [
  {
    id: 1,
    title: "Solutions PLV innovantes",
    subtitle: "Valorisez votre marque avec nos créations sur-mesure",
    imageUrl: "/images/carousel/plv-cosmetics.jpg",
    videoUrl: null,
    ctaText: "Découvrir nos solutions",
    ctaLink: "/solutions",
  },
  {
    id: 2,
    title: "Expérience 3D interactive",
    subtitle: "Visualisez votre projet avant sa réalisation",
    imageUrl: "/images/carousel/3d-simulator.jpg",
    videoUrl: null,
    ctaText: "Essayer le simulateur",
    ctaLink: "/simulateur",
  },
  {
    id: 3,
    title: "Expertise cosmétique & pharmacie",
    subtitle: "Des solutions adaptées à votre secteur",
    imageUrl: "/images/carousel/pharmacy-displays.jpg",
    videoUrl: null,
    ctaText: "Voir nos réalisations",
    ctaLink: "/realisations",
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Placeholder for images that will be added later */}
            <div className={`absolute inset-0 bg-navy-dark opacity-50 z-0`}></div>
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl text-white"
                >
                  <h1 className="text-5xl font-bold mb-4">{item.title}</h1>
                  <p className="text-xl mb-8">{item.subtitle}</p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.ctaLink}
                      className="bg-yellow text-navy px-8 py-3 rounded-md font-semibold hover:bg-yellow-dark transition-colors shadow-lg"
                    >
                      {item.ctaText}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-4">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-yellow w-10' : 'bg-white opacity-50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-sm transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Nos services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multi-Pôles vous accompagne dans tous vos projets de PLV, packaging et solutions d'affichage sur-mesure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "PLV",
                icon: "💡",
                description: "Présentoirs, totems, vitrines et solutions d'affichage pour mettre en valeur vos produits.",
                link: "/solutions#plv"
              },
              {
                title: "Packaging",
                icon: "📦",
                description: "Packaging et conditionnements sur-mesure pour valoriser votre marque.",
                link: "/solutions#packaging"
              },
              {
                title: "Print",
                icon: "🖨️",
                description: "Solutions d'impression haute qualité pour tous vos supports de communication.",
                link: "/solutions#print"
              },
              {
                title: "Digital",
                icon: "📱",
                description: "Solutions digitales intégrées pour une expérience client omnicanale.",
                link: "/solutions#digital"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                className="bg-white rounded-lg p-8 border border-gray-100 hover:border-yellow transition-all"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href={service.link}
                  className="text-navy font-medium flex items-center hover:text-yellow transition-colors"
                >
                  En savoir plus 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy mb-6">Pourquoi choisir Multi-Pôles ?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Nous créons des expériences d'affichage qui valorisent votre marque et stimulent les ventes, avec une
                attention particulière portée à l'innovation et l'éco-responsabilité.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Expertise sectorielle",
                    description: "Spécialistes de la PLV pour cosmétiques et pharmacie depuis plus de 15 ans."
                  },
                  {
                    title: "Sur-mesure",
                    description: "Chaque projet est unique et personnalisé selon vos besoins spécifiques."
                  },
                  {
                    title: "Innovation 3D",
                    description: "Visualisez votre projet en 3D avant sa fabrication avec notre simulateur."
                  },
                  {
                    title: "Eco-responsable",
                    description: "Engagement pour des solutions durables et respectueuses de l'environnement."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-6 h-6 rounded-full bg-yellow flex items-center justify-center text-navy font-bold">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-lg">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link 
                  href="/apropos"
                  className="inline-flex items-center text-navy font-semibold hover:text-yellow transition-colors"
                >
                  En savoir plus sur nous
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="relative h-96 bg-gray-200 rounded-lg">
              {/* Placeholder for about image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span>Image à venir</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA - Quote */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à concrétiser votre projet ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/devis"
                className="bg-yellow text-navy px-8 py-3 rounded-md font-semibold hover:bg-yellow-dark transition-colors shadow-lg"
              >
                Demander un devis
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/contact"
                className="bg-transparent text-white px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/10 transition-colors"
              >
                Nous contacter
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
