'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'Présentoir Cosmétique Luxury',
    client: 'Brand Cosmetics',
    category: 'PLV',
    description: 'Présentoir sur-mesure pour une gamme de produits cosmétiques haut de gamme avec éclairage LED intégré et finition dorée.',
    fullDescription: `
      Ce présentoir exclusif a été conçu pour mettre en valeur la nouvelle gamme de cosmétiques premium de Brand Cosmetics.
      
      L'objectif était de créer une expérience luxueuse qui reflète l'identité premium de la marque tout en maximisant la visibilité des produits.
      
      Caractéristiques techniques:
      - Structure en métal laqué noir mat
      - Finitions en laiton doré
      - Éclairage LED intégré avec variation d'intensité
      - Écran tactile avec catalogue produit
      - Dimensions: 120 x 60 x 180 cm
      
      Le présentoir a permis d'augmenter les ventes de 35% dans les points de vente équipés.
    `,
    images: [
      '/images/projets/cosmetique-1.jpg',
      '/images/projets/cosmetique-2.jpg',
      '/images/projets/cosmetique-3.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/PLACEHOLDER',
    year: 2024,
  },
  {
    id: 2,
    title: 'PLV Pharmacie Modulaire',
    client: 'PharmaBrand',
    category: 'PLV',
    description: 'Système d\'affichage modulaire pour pharmacies permettant différentes configurations selon les besoins et l\'espace disponible.',
    fullDescription: `
      PharmaBrand cherchait une solution d'affichage flexible pouvant s'adapter aux différentes configurations des pharmacies partenaires.
      
      Nous avons développé un système modulaire qui peut être assemblé de différentes façons selon les contraintes d'espace et les besoins promotionnels.
      
      Caractéristiques techniques:
      - Modules indépendants interconnectables
      - Structure en aluminium recyclé
      - Tablettes ajustables en hauteur
      - Système d'accroche sans outil
      - Signalétique personnalisable magnétique
      - Dimensions par module: 40 x 40 x 160 cm
      
      Ce système a été déployé dans plus de 200 pharmacies à travers la France avec un excellent retour des utilisateurs.
    `,
    images: [
      '/images/projets/pharma-1.jpg',
      '/images/projets/pharma-2.jpg',
      '/images/projets/pharma-3.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/PLACEHOLDER',
    year: 2023,
  },
  {
    id: 3,
    title: 'Coffret Édition Limitée',
    client: 'Parfums Élégance',
    category: 'Packaging',
    description: 'Coffret cadeau éco-responsable pour une édition limitée de parfums avec expérience d\'unboxing immersive.',
    fullDescription: `
      Pour le lancement d'une édition limitée de parfums, Parfums Élégance souhaitait un packaging qui soit à la fois premium et respectueux de l'environnement.
      
      Nous avons créé un coffret qui offre une véritable expérience d'unboxing tout en utilisant des matériaux 100% recyclables et biodégradables.
      
      Caractéristiques techniques:
      - Carton issu de forêts gérées durablement
      - Encres végétales
      - Intérieur en pulpe de papier moulée
      - Fermeture magnétique
      - QR code pour une expérience digitale complémentaire
      - Dimensions: 25 x 25 x 10 cm
      
      Le coffret a reçu le prix de l'innovation packaging écologique au salon PackExpo 2023.
    `,
    images: [
      '/images/projets/parfum-1.jpg',
      '/images/projets/parfum-2.jpg',
      '/images/projets/parfum-3.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/PLACEHOLDER',
    year: 2023,
  },
  {
    id: 4,
    title: 'Borne Interactive Dermocosmétique',
    client: 'DermaSkin',
    category: 'Digital',
    description: 'Borne interactive avec diagnostic de peau et recommandation de produits personnalisée pour une marque dermocosmétique.',
    fullDescription: `
      DermaSkin souhaitait transformer l'expérience client en points de vente grâce à une solution digitale innovante.
      
      Nous avons développé une borne interactive qui permet aux clients de réaliser un diagnostic de peau et d'obtenir des recommandations personnalisées.
      
      Caractéristiques techniques:
      - Écran tactile 27 pouces
      - Caméra HD pour analyse de la peau
      - Algorithme d'intelligence artificielle pour le diagnostic
      - Interface personnalisée aux couleurs de la marque
      - Impression de fiche conseil
      - Dimensions: 60 x 45 x 170 cm
      
      La borne a permis d'augmenter le temps passé en magasin et le panier moyen des clients de 28%.
    `,
    images: [
      '/images/projets/borne-1.jpg',
      '/images/projets/borne-2.jpg',
      '/images/projets/borne-3.jpg',
    ],
    videoUrl: 'https://www.youtube.com/embed/PLACEHOLDER',
    year: 2022,
  },
];

// Project detail modal component
const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!project) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-80 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Images carousel */}
            <div className="relative h-[300px] md:h-[400px] bg-gray-100">
              {/* Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                <span>Image {currentImageIndex + 1}</span>
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1));
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/50 transition-colors"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1));
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/50 transition-colors"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {project.images.length}
              </div>
            </div>
            
            {/* Project info */}
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-navy">{project.title}</h2>
                  <p className="text-gray-600">{project.client} &bull; {project.year}</p>
                </div>
                <span className="bg-navy/10 text-navy px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              
              <div className="prose prose-navy max-w-none mb-6">
                <p className="whitespace-pre-line">{project.fullDescription}</p>
              </div>
              
              {/* Video section */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-navy mb-4">Vidéo du projet</h3>
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                  {/* Video placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                    <span>Vidéo à venir</span>
                  </div>
                </div>
              </div>
              
              {/* Call to action */}
              <div className="mt-8 flex gap-4">
                <Link href="/devis" className="block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-yellow text-navy px-6 py-3 rounded-md font-semibold"
                  >
                    Demander un projet similaire
                  </motion.button>
                </Link>
                <Link href="/contact" className="block">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-navy text-navy px-6 py-3 rounded-md font-semibold bg-transparent hover:bg-navy/5 transition-colors"
                  >
                    Nous contacter
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Filter component
const ProjectFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'PLV', label: 'PLV' },
    { id: 'Packaging', label: 'Packaging' },
    { id: 'Print', label: 'Print' },
    { id: 'Digital', label: 'Digital' }
  ];
  
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setActiveFilter(filter.id)}
          className={`px-5 py-2 rounded-full transition-colors ${
            activeFilter === filter.id
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default function Realisations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);
  
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const closeProjectModal = () => {
    setModalOpen(false);
    // Re-enable body scrolling when modal is closed
    document.body.style.overflow = 'auto';
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
              Nos Réalisations
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-10"
            >
              Découvrez nos projets de PLV, packaging et solutions digitales pour les plus grandes marques
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <ProjectFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="h-64 bg-gray-200 relative">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span>Image à venir</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-navy">{project.title}</h3>
                    <span className="bg-navy/10 text-navy px-2 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{project.client}</p>
                  <p className="text-gray-700 mb-4 line-clamp-2">{project.description}</p>
                  <button
                    onClick={() => openProjectModal(project)}
                    className="text-navy font-medium inline-flex items-center hover:text-yellow transition-colors"
                  >
                    Voir le projet
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Prêt à démarrer votre projet ?</h2>
            <p className="text-xl mb-10">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et bénéficier de notre expertise.
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
                  href="/simulateur"
                  className="bg-transparent text-white px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/10 transition-colors"
                >
                  Essayer notre simulateur
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={modalOpen} 
        onClose={closeProjectModal} 
      />
    </div>
  );
}
