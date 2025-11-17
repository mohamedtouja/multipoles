'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Lightbulb, Package, Printer, Smartphone, ChevronDown, Play } from 'lucide-react';
import { useCarousel, useSolutions, useRealisations } from '@/hooks/use-api';
import { CarouselSlide, Solution, Realisation } from '@/types/api';
import { RealisationCard } from '@/components/RealisationCard';

// Fallback carousel data
const fallbackCarouselItems: CarouselSlide[] = [
  {
    id: '1',
    title: "Solutions PLV innovantes",
    subtitle: "Valorisez votre marque avec nos créations sur-mesure",
    imageUrl: "/image/003ab1236756873.68f226d5e8204.webp",
    videoUrl: undefined,
    ctaText: "Découvrir nos solutions",
    ctaLink: "/solutions",
    order: 1,
    isActive: true,
    locale: 'fr',
  },
  {
    id: '2',
    title: "Expérience 3D interactive",
    subtitle: "Visualisez votre projet avant sa réalisation",
    imageUrl: "/image/2a5c5c211072581.671be4b87df2e.webp",
    videoUrl: undefined,
    ctaText: "Essayer le simulateur",
    ctaLink: "/simulateur",
    order: 2,
    isActive: true,
    locale: 'fr',
  },
  {
    id: '3',
    title: "Expertise cosmétique & pharmacie",
    subtitle: "Des solutions adaptées à votre secteur",
    imageUrl: "/image/950e4c236909363.68f623758ca51%20copy.webp",
    videoUrl: undefined,
    ctaText: "Voir nos réalisations",
    ctaLink: "/realisations",
    order: 3,
    isActive: true,
    locale: 'fr',
  }
];

const fallbackRealisations: Realisation[] = [
  {
    id: 'fallback-1',
    title: 'Corner Beauté Premium',
    description: 'Installation PLV complète pour le lancement d’une nouvelle gamme de soins visage.',
    client: 'LuxeSkin',
    category: 'PLV',
    images: ['/image/realisations/realisations-01.webp'],
    featuredImage: '/image/realisations/realisations-01.webp',
    year: 2024,
    tags: ['Retail', 'Animation', 'Skincare'],
    locale: 'fr',
    isPublished: true,
    createdAt: '2024-08-18T00:00:00Z',
  },
  {
    id: 'fallback-2',
    title: 'Présentoir parfumerie halo',
    description: 'Structure autoportante avec éclairage intégré pour maximiser la visibilité en boutique.',
    client: 'Elysée Parfums',
    category: 'Packaging',
    images: ['/image/realisations/realisations-02.webp'],
    featuredImage: '/image/realisations/realisations-02.webp',
    year: 2023,
    tags: ['Lumière', 'Corner', 'Premium'],
    locale: 'fr',
    isPublished: true,
    createdAt: '2023-11-04T00:00:00Z',
  },
  {
    id: 'fallback-3',
    title: 'Totems pharmacie modulaires',
    description: 'Série de totems personnalisables pour les points de vente santé & bien-être.',
    client: 'PharmaPlus',
    category: 'Print',
    images: ['/image/realisations/realisations-03.webp'],
    featuredImage: '/image/realisations/realisations-03.webp',
    year: 2024,
    tags: ['Pharmacie', 'Module', 'Point de vente'],
    locale: 'fr',
    isPublished: true,
    createdAt: '2024-05-22T00:00:00Z',
  },
  {
    id: 'fallback-4',
    title: 'Experience bar make-up',
    description: 'Espace immersif multi-écrans pour présenter une collection de maquillage.',
    client: 'GlowLab',
    category: 'Digital',
    images: ['/image/realisations/realisations-04.webp'],
    featuredImage: '/image/realisations/realisations-04.webp',
    year: 2022,
    tags: ['Digital', 'Immersif', 'Event'],
    locale: 'fr',
    isPublished: true,
    createdAt: '2022-09-10T00:00:00Z',
  },
];

const baseSolutionCategories = [
  {
    slug: 'plv',
    title: 'PLV',
    icon: Lightbulb,
    description:
      "Présentoirs, totems, vitrines et solutions d'affichage pour mettre en valeur vos produits.",
    link: '/solutions#plv',
  },
  {
    slug: 'packaging',
    title: 'Packaging',
    icon: Package,
    description:
      'Packaging et conditionnements sur-mesure pour valoriser votre marque.',
    link: '/solutions#packaging',
  },
  {
    slug: 'print',
    title: 'Print',
    icon: Printer,
    description:
      "Solutions d'impression haute qualité pour tous vos supports de communication.",
    link: '/solutions#print',
  },
  {
    slug: 'digital',
    title: 'Digital',
    icon: Smartphone,
    description: 'Solutions digitales intégrées pour une expérience client omnicanale.',
    link: '/solutions#digital',
  },
];

const faqItems = [
  {
    question: 'Quelle est votre expertise sectorielle ?',
    answer:
      'Nous accompagnons les marques de la cosmétique et de la pharmacie depuis plus de 15 ans avec des dispositifs PLV qui valorisent leurs produits sur le point de vente.',
  },
  {
    question: 'Proposez-vous des solutions sur-mesure ?',
    answer:
      'Chaque projet est co-construit avec vos équipes : design, matériaux, finitions et logistique sont adaptés à vos contraintes pour une expérience totalement personnalisée.',
  },
  {
    question: 'Comment l’innovation 3D intervient-elle dans vos projets ?',
    answer:
      'Grâce à notre studio 3D et à notre simulateur interactif, vous visualisez votre PLV avant la fabrication afin de valider chaque détail en toute sérénité.',
  },
  {
    question: 'Êtes-vous engagés dans une démarche éco-responsable ?',
    answer:
      'Nous privilégions des matériaux recyclables, des circuits courts et des process optimisés pour réduire l’empreinte environnementale de vos opérations marketing.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const presentationVideoUrl = process.env.NEXT_PUBLIC_PRESENTATION_VIDEO_URL;
  const presentationVideoPoster = process.env.NEXT_PUBLIC_PRESENTATION_VIDEO_POSTER;
  const presentationVideoType = process.env.NEXT_PUBLIC_PRESENTATION_VIDEO_TYPE ?? 'video/mp4';
  
  // Fetch data from API
  const { data: carouselData, loading: carouselLoading } = useCarousel('fr');
  const { data: solutionsData, loading: solutionsLoading } = useSolutions('fr');
  const { data: realisationsData, loading: realisationsLoading } = useRealisations('fr');

  const baseRealisations = Array.isArray(realisationsData) && realisationsData.length > 0
    ? realisationsData
    : fallbackRealisations;

  const showcaseRealisations = baseRealisations
    .filter((item) => item?.isPublished)
    .sort((a, b) => {
      const aTime = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, 8);
  
  // Use API data or fallback
  const carouselItems = Array.isArray(carouselData) && carouselData.length > 0
    ? carouselData
        .filter((item) => item?.isActive && item?.imageUrl)
        .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    : fallbackCarouselItems;

  const safeCarouselLength = carouselItems.length || fallbackCarouselItems.length;

  const displayedSolutions = baseSolutionCategories.map((base) => {
    const match = Array.isArray(solutionsData)
      ? solutionsData.find((solution) => {
          const slug = solution?.slug?.toLowerCase();
          const title = solution?.title?.toLowerCase();
          return (
            slug === base.slug ||
            title === base.title.toLowerCase()
          );
        })
      : undefined;

    return {
      id: match?.id ?? base.slug,
      title: match?.title ?? base.title,
      icon: match?.icon ?? base.icon,
      description: match?.description ?? base.description,
      link: base.link,
      order: match?.order ?? 0,
    };
  });
  
  // Auto-advance carousel
  useEffect(() => {
    if (safeCarouselLength === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % safeCarouselLength);
    }, 5000);
    return () => clearInterval(interval);
  }, [safeCarouselLength]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    if (safeCarouselLength === 0) return;
    setCurrentSlide((prev) => (prev + 1) % safeCarouselLength);
  };

  const prevSlide = () => {
    if (safeCarouselLength === 0) return;
    setCurrentSlide((prev) => (prev - 1 + safeCarouselLength) % safeCarouselLength);
  };

  return (
    <div className="flex flex-col min-h-screen -mt-44 md:-mt-56 bg-[#000B58]">
      {/* Hero Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        {carouselItems.map((item, index) => (
          <div
            key={item?.id ?? index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={item?.imageUrl ?? '/image/placeholder.jpg'}
                alt={item?.title ?? 'Slide'}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#000B58]/25 to-[#000B58]/45 backdrop-blur-[1.5px]" />
            </div>
            <div className="absolute inset-0 flex items-center z-20">
              <div className="container mx-auto px-4 sm:px-6 md:px-0 md:pl-12 md:pr-0 lg:pl-16 lg:pr-0 xl:pl-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full max-w-xl mx-auto md:ml-auto md:mr-0 mt-40 sm:mt-56 md:mt-96 px-4 md:px-0"
                >
                  <div
                    className={`flex flex-col items-center md:items-end gap-2 transform transition-all duration-300 ease-out ${
                      isScrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                    }`}
                  >
                    <div
                      className={`flex justify-center md:justify-end gap-2 transform transition-all duration-300 ease-out ${
                        isScrolled ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
                      }`}
                    >
                      <button
                        onClick={prevSlide}
                        className="rounded-lg bg-white p-2 sm:p-2.5 md:p-3 text-[#000B58] shadow-lg shadow-[#000B58]/20 transition-all"
                        aria-label="Previous slide"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#000B58">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="rounded-lg bg-white p-2 sm:p-2.5 md:p-3 text-[#000B58] shadow-lg shadow-[#000B58]/20 transition-all"
                        aria-label="Next slide"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#000B58">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                    <div className="rounded-lg border border-[#000B58]/12 bg-white px-6 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 text-[#000B58] shadow-lg shadow-[#000B58]/15">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#000B58]">{item.title}</h1>
                      <p className="text-base sm:text-lg md:text-xl mb-8 text-[#000B58]/75">{item.subtitle}</p>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="inline-flex rounded-lg border border-[#000B58] px-5 py-2.5 sm:px-6 sm:py-3 transition-colors hover:bg-[#000B58]/5">
                          <Link 
                            href={item?.ctaLink ?? '#'}
                            className="font-semibold text-sm sm:text-base text-[#000B58] hover:text-[#000B58]/75 transition-colors"
                          >
                            {item?.ctaText ?? 'En savoir plus'}
                          </Link>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <div
          className={`absolute bottom-8 left-0 right-0 z-30 flex justify-center space-x-4 transform transition-all duration-300 ease-out ${
            isScrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          {carouselItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-3 w-3 rounded-[4px] ${
                index === currentSlide ? 'bg-yellow' : 'bg-white/50'
              }`}
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              animate={{ scale: index === currentSlide ? 1.6 : 1 }}
              whileHover={{ scale: 1.25 }}
            />
          ))}
        </div>
      </section>
      {/* Reel of recent réalisations */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#000B58]/70">
                  Explorez nos réalisations
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#000B58]">
                  Un aperçu de nos derniers projets
                </h2>
                <p className="mt-3 max-w-2xl text-base text-[#000B58]/70">
                  Découvrez comment nous sublimons les marques cosmétique et pharma avec des dispositifs PLV impactants. Faites défiler pour vous inspirer.
                </p>
              </div>
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 self-start text-sm font-semibold text-[#000B58] transition-colors hover:text-[#000B58]/70"
              >
                Voir toutes nos réalisations
                <span aria-hidden="true" className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>

            <div className="h-px w-full bg-[#000B58]/10" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {realisationsLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-[24px] border border-[#000B58]/10 bg-white p-4 shadow-sm"
                  >
                    <div className="h-40 rounded-2xl bg-[#000B58]/5 animate-pulse" />
                    <div className="mt-4 h-4 w-3/4 rounded-full bg-[#000B58]/10 animate-pulse" />
                    <div className="mt-3 h-4 w-1/2 rounded-full bg-[#000B58]/10 animate-pulse" />
                  </div>
                ))
              ) : showcaseRealisations.length === 0 ? (
                <div className="w-full rounded-2xl border border-dashed border-[#000B58]/20 bg-[#000B58]/5 p-8 text-center text-[#000B58]/60">
                  Aucune réalisation disponible pour le moment. Revenez bientôt pour découvrir nos projets.
                </div>
              ) : (
                showcaseRealisations.map((realisation, index) => (
                  <RealisationCard key={realisation.id ?? index} realisation={realisation} index={index} />
                ))
              )}
            </div>

            <div className="flex justify-end text-sm text-[#000B58]/50">
              <Link href="/contact" className="font-semibold text-[#000B58] hover:text-[#000B58]/70 transition-colors inline-flex items-center gap-2">
                Discutons de votre projet
                <span aria-hidden="true" className="text-base leading-none transition-transform duration-200 hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#000B58]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: '#FFFFFF' }}
            >
              Nos services
            </h2>
            <p
              className="text-xl max-w-3xl mx-auto"
              style={{ color: '#FFFFFF' }}
            >
              Multi-Pôles vous accompagne dans tous vos projets de PLV, packaging et solutions d'affichage sur-mesure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutionsLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-8 border border-gray-100 animate-pulse">
                  <div className="h-12 w-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              displayedSolutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <motion.div
                    key={solution.id}
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ duration: 0.25 }}
                    className="group relative overflow-hidden rounded-2xl bg-white/95 p-8 shadow-lg shadow-black/10 border border-white/60 text-[#000B58] transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-yellow/70"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow/80 via-yellow/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="flex flex-col h-full">
                      <div className="mb-5 flex items-center justify-start">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow/20">
                          <Icon className="w-6 h-6 text-[#000B58]" />
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                      <p className="text-[#000B58]/70 mb-6 flex-1 leading-relaxed">{solution.description}</p>
                      <Link 
                        href={solution.link}
                        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#000B58] group-hover:text-yellow transition-colors"
                      >
                        En savoir plus
                        <span aria-hidden="true" className="text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Presentation Video */}
      <section className="bg-white py-20">
        <div className="container mx-auto flex flex-col gap-12 px-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-lg border border-[#000B58]/15 bg-[#000B58]/5 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#000B58]"
            >
              En vidéo
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-4xl font-bold text-[#000B58]"
            >
              Découvrez Multi-Pôles en images
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-lg leading-relaxed text-[#000B58]/70"
            >
              Plongez au cœur de notre expertise grâce à cette courte présentation. Découvrez comment nos équipes
              accompagnent vos projets PLV et packaging, de la conception à la mise en place sur vos points de vente.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border-2 border-[#000B58]/10 bg-[#000B58]/5 shadow-[0_30px_80px_-40px_rgba(0,11,88,0.35)]"
          >
            {presentationVideoUrl ? (
              <video
                controls
                preload="metadata"
                poster={presentationVideoPoster ?? undefined}
                className="aspect-video w-full bg-black object-cover"
              >
                <source src={presentationVideoUrl} type={presentationVideoType} />
                Votre navigateur ne prend pas en charge la lecture vidéo.
              </video>
            ) : (
              <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-[#000B58]/10 p-8 text-center text-[#000B58]/70">
                <span className="text-xl font-semibold">Vidéo en cours d'ajout</span>
                <p className="max-w-md text-sm">
                  Ajoutez l'URL de votre vidéo dans la variable d'environnement <code className="rounded bg-[#000B58]/10 px-2 py-1">NEXT_PUBLIC_PRESENTATION_VIDEO_URL</code> pour afficher ce contenu.
                </p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/30" />
          </motion.div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#000B58]/15 bg-[#000B58]/5 px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-[#000B58]">
              FAQ
            </span>
            <h2 className="mt-6 text-4xl font-bold text-[#000B58]">Pourquoi choisir Multi-Pôles&nbsp;?</h2>
            <p className="mt-3 text-lg text-[#000B58]/70">
              Découvrez en un clin d’œil les réponses aux questions que nos clients nous posent le plus souvent à propos de notre approche et de notre accompagnement.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = activeFaq === index;
              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-[#000B58]/10 bg-white shadow-[0_18px_45px_-30px_rgba(0,11,88,0.45)]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#000B58]/5"
                  >
                    <span className="text-lg font-semibold text-[#000B58]">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#000B58] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-base leading-relaxed text-[#000B58]/80">{item.answer}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA - Quote */}
      <section
        className="py-20 bg-navy text-white"
        style={{ backgroundColor: '#000B58' }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2
            className="text-4xl font-bold mb-6"
            style={{ color: '#FFFFFF' }}
          >
            Prêt à concrétiser votre projet ?
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: '#FFFFFF' }}
          >
            Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/devis"
                className="bg-white text-[#000B58] px-8 py-3 rounded-md font-semibold border border-white hover:bg-white/80 transition-colors"
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
