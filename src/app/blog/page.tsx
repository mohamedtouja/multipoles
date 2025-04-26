'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: 'Les tendances PLV cosmétiques en 2025',
    excerpt: 'Découvrez les dernières innovations en matière de PLV pour le secteur cosmétique et comment elles peuvent transformer l\'expérience client en point de vente.',
    category: 'Tendances',
    date: '15 avril 2025',
    author: 'Sophie Martin',
    image: '/images/blog/post-1.jpg',
    readTime: '5 min',
  },
  {
    id: 2,
    title: 'Comment optimiser l\'impact écologique de vos PLV',
    excerpt: 'Les solutions durables et éco-responsables pour réduire l\'empreinte environnementale de vos présentoirs tout en conservant leur efficacité commerciale.',
    category: 'Éco-responsabilité',
    date: '2 avril 2025',
    author: 'Antoine Bernard',
    image: '/images/blog/post-2.jpg',
    readTime: '7 min',
  },
  {
    id: 3,
    title: 'L\'intégration du digital dans les PLV pharmaceutiques',
    excerpt: 'Comment les nouvelles technologies transforment l\'expérience client en pharmacie et permettent une meilleure information produit.',
    category: 'Digital',
    date: '20 mars 2025',
    author: 'Julie Lefèvre',
    image: '/images/blog/post-3.jpg',
    readTime: '6 min',
  },
  {
    id: 4,
    title: 'Les matériaux innovants pour vos packagings',
    excerpt: 'Exploration des nouveaux matériaux durables qui révolutionnent le secteur du packaging cosmétique et pharmaceutique.',
    category: 'Innovation',
    date: '5 mars 2025',
    author: 'Thomas Dubois',
    image: '/images/blog/post-4.jpg',
    readTime: '8 min',
  },
  {
    id: 5,
    title: 'Personnalisation de masse : la nouvelle norme en PLV',
    excerpt: 'Comment proposer des solutions personnalisées à grande échelle pour répondre aux attentes spécifiques de chaque point de vente.',
    category: 'Tendances',
    date: '18 février 2025',
    author: 'Sophie Martin',
    image: '/images/blog/post-5.jpg',
    readTime: '5 min',
  },
  {
    id: 6,
    title: 'L\'importance de la PLV dans la stratégie omnicanale',
    excerpt: 'Analyse de l\'impact des présentoirs en point de vente dans une stratégie marketing globale entre physique et digital.',
    category: 'Stratégie',
    date: '3 février 2025',
    author: 'Julie Lefèvre',
    image: '/images/blog/post-6.jpg',
    readTime: '6 min',
  },
];

// Categories for filtering
const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'Tendances', label: 'Tendances' },
  { id: 'Innovation', label: 'Innovation' },
  { id: 'Éco-responsabilité', label: 'Éco-responsabilité' },
  { id: 'Digital', label: 'Digital' },
  { id: 'Stratégie', label: 'Stratégie' },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredPosts = activeCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

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
              Blog
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-10"
            >
              Actualités, tendances et conseils pour optimiser vos solutions PLV et packaging
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-navy text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="h-48 bg-gray-200 relative">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span>Image à venir</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-yellow-dark font-medium">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Par {post.author} • {post.readTime} de lecture</span>
                    <Link 
                      href={`/blog/${post.id}`}
                      className="text-navy font-medium inline-flex items-center hover:text-yellow transition-colors"
                    >
                      Lire plus
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="py-2 px-4 bg-white text-navy rounded-l-md border border-gray-200 hover:bg-gray-50"
              >
                Précédent
              </a>
              <a
                href="#"
                className="py-2 px-4 bg-navy text-white border border-navy"
              >
                1
              </a>
              <a
                href="#"
                className="py-2 px-4 bg-white text-navy border border-gray-200 hover:bg-gray-50"
              >
                2
              </a>
              <a
                href="#"
                className="py-2 px-4 bg-white text-navy border border-gray-200 hover:bg-gray-50"
              >
                3
              </a>
              <a
                href="#"
                className="py-2 px-4 bg-white text-navy rounded-r-md border border-gray-200 hover:bg-gray-50"
              >
                Suivant
              </a>
            </nav>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">Restez informé</h2>
            <p className="text-gray-600 mb-8">
              Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et actualités
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                required
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-navy text-white px-6 py-3 rounded-md font-medium hover:bg-navy-dark transition-colors"
              >
                S'inscrire
              </motion.button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              En vous inscrivant, vous acceptez notre <a href="/politique-confidentialite" className="text-navy hover:underline">politique de confidentialité</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
