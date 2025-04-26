'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Team members data
const teamMembers = [
  {
    name: 'Sophie Martin',
    role: 'Directrice Générale',
    bio: 'Plus de 15 ans d\'expérience dans le secteur de la PLV cosmétique et pharmaceutique.',
    image: '/images/team/team-1.jpg',
  },
  {
    name: 'Thomas Dubois',
    role: 'Directeur Création',
    bio: 'Expert en design et conception de solutions d\'affichage innovantes.',
    image: '/images/team/team-2.jpg',
  },
  {
    name: 'Julie Lefèvre',
    role: 'Responsable Commerciale',
    bio: 'Spécialiste de l\'accompagnement client et du développement commercial.',
    image: '/images/team/team-3.jpg',
  },
  {
    name: 'Antoine Bernard',
    role: 'Responsable Technique',
    bio: 'Ingénieur en matériaux avec une expertise en développement durable.',
    image: '/images/team/team-4.jpg',
  },
];

// Company values
const values = [
  {
    title: 'Innovation',
    description: 'Nous repoussons constamment les limites de la créativité et de la technologie pour créer des solutions d\'affichage uniques et impactantes.',
    icon: '💡',
  },
  {
    title: 'Excellence',
    description: 'Nous nous engageons à fournir un travail de la plus haute qualité, du concept initial à la production finale.',
    icon: '✨',
  },
  {
    title: 'Éco-responsabilité',
    description: 'Nous concevons des solutions qui minimisent l\'impact environnemental tout en maximisant l\'efficacité commerciale.',
    icon: '🌱',
  },
  {
    title: 'Collaboration',
    description: 'Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins et créer des solutions personnalisées.',
    icon: '🤝',
  },
];

// Client logos
const clients = [
  { name: 'Client 1', logo: '/images/clients/client-1.png' },
  { name: 'Client 2', logo: '/images/clients/client-2.png' },
  { name: 'Client 3', logo: '/images/clients/client-3.png' },
  { name: 'Client 4', logo: '/images/clients/client-4.png' },
  { name: 'Client 5', logo: '/images/clients/client-5.png' },
  { name: 'Client 6', logo: '/images/clients/client-6.png' },
];

// Certifications
const certifications = [
  { name: 'ISO 9001', logo: '/images/certifications/iso-9001.png' },
  { name: 'ISO 14001', logo: '/images/certifications/iso-14001.png' },
  { name: 'FSC', logo: '/images/certifications/fsc.png' },
  { name: 'PEFC', logo: '/images/certifications/pefc.png' },
];

export default function APropos() {
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
              À propos de Multi-Pôles
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-10"
            >
              Spécialiste de la PLV pour cosmétiques et pharmacie depuis plus de 15 ans
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy mb-6">Notre histoire</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Fondée en 2005, Multi-Pôles est née de la vision de créer des solutions d'affichage 
                  innovantes et sur-mesure pour les marques de cosmétiques et de produits pharmaceutiques.
                </p>
                <p>
                  Au fil des années, nous avons développé une expertise unique dans la conception et la 
                  fabrication de PLV qui allient esthétique, fonctionnalité et durabilité.
                </p>
                <p>
                  Aujourd'hui, avec plus de 500 projets réalisés chaque année et une équipe de 30 professionnels 
                  passionnés, nous sommes devenus un partenaire privilégié des plus grandes marques du secteur.
                </p>
                <p>
                  Notre engagement constant pour l'innovation nous pousse à explorer de nouvelles technologies 
                  et matériaux pour créer des expériences d'affichage toujours plus impactantes et respectueuses 
                  de l'environnement.
                </p>
              </div>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-lg">
              {/* Placeholder for company photo */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span>Image à venir</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Nos valeurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ces principes guident chacune de nos actions et décisions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 shadow-md text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-navy mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Notre équipe</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés à votre service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-60 bg-gray-200 relative">
                  {/* Placeholder for team member photo */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <span>Photo à venir</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-1">{member.name}</h3>
                  <p className="text-yellow font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Clients & Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous collaborons avec les plus grandes marques du secteur cosmétique et pharmaceutique
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg p-4 flex items-center justify-center h-24 shadow-sm"
              >
                {/* Placeholder for client logo */}
                <div className="text-gray-400">
                  <span>Logo {client.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mb-10 mt-16">
            <h2 className="text-3xl font-bold text-navy mb-4">Nos certifications</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nous sommes engagés dans une démarche qualité et environnementale
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {certifications.map((certification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 flex items-center justify-center h-24 w-40 shadow-sm"
              >
                {/* Placeholder for certification logo */}
                <div className="text-gray-400">
                  <span>{certification.name}</span>
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
            <h2 className="text-4xl font-bold mb-6">Prêt à collaborer ?</h2>
            <p className="text-xl mb-10">
              Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à valoriser votre marque.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact"
                  className="bg-yellow text-navy px-8 py-3 rounded-md font-semibold hover:bg-yellow-dark transition-colors shadow-lg"
                >
                  Contactez-nous
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
