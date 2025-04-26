'use client';

import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Placeholder 3D model component
const DisplayStand = ({ color, material, height, ...props }) => {
  // In a real implementation, you would load an actual 3D model
  // const { nodes, materials } = useGLTF('/models/display_stand.glb');
  
  return (
    <group {...props} dispose={null}>
      <mesh 
        // geometry={nodes.Stand.geometry}
        // material={materials[material]}
        position={[0, height / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial color={color} roughness={material === 'glossy' ? 0.1 : 0.8} />
      </mesh>
      
      {/* Shelves */}
      {[0.25, 0.5, 0.75].map((h) => (
        <mesh 
          key={h} 
          position={[0, height * h, 0.3]} 
          castShadow 
          receiveShadow
        >
          <boxGeometry args={[0.8, 0.05, 0.5]} />
          <meshStandardMaterial color={color} roughness={material === 'glossy' ? 0.1 : 0.8} />
        </mesh>
      ))}
    </group>
  );
};

// Rotating platform
const Platform = ({ children }) => {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });
  
  return <group ref={ref}>{children}</group>;
};

// Controls panel component
const ControlsPanel = ({ color, setColor, material, setMaterial, height, setHeight }) => {
  const colorOptions = [
    { value: '#0A2472', label: 'Navy Blue' },
    { value: '#FFFFFF', label: 'White' },
    { value: '#FFD700', label: 'Yellow' },
    { value: '#000000', label: 'Black' },
    { value: '#FF4500', label: 'Red-Orange' },
  ];
  
  const materialOptions = [
    { value: 'matte', label: 'Matte' },
    { value: 'glossy', label: 'Glossy' },
    { value: 'textured', label: 'Textured' },
  ];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-navy mb-4">Personnalisez votre PLV</h2>
      
      <div className="space-y-6">
        {/* Color selection */}
        <div>
          <h3 className="text-lg font-medium text-navy mb-2">Couleur</h3>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setColor(option.value)}
                className={`w-10 h-10 rounded-full border-2 ${
                  color === option.value ? 'border-navy scale-110' : 'border-gray-200'
                } transition-transform`}
                style={{ backgroundColor: option.value }}
                title={option.label}
                aria-label={`Select ${option.label} color`}
              />
            ))}
          </div>
        </div>
        
        {/* Material selection */}
        <div>
          <h3 className="text-lg font-medium text-navy mb-2">Finition</h3>
          <div className="grid grid-cols-3 gap-2">
            {materialOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMaterial(option.value)}
                className={`py-2 px-3 rounded ${
                  material === option.value 
                    ? 'bg-navy text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition-colors`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Height slider */}
        <div>
          <h3 className="text-lg font-medium text-navy mb-2">Hauteur: {height}m</h3>
          <input
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(parseFloat(e.target.value))}
            className="w-full accent-navy"
          />
        </div>
        
        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-navy text-white py-3 rounded-md font-medium"
            onClick={() => {
              // This would trigger a download of the configuration
              alert('Votre configuration a été téléchargée!');
            }}
          >
            Télécharger
          </motion.button>
          <Link href="/devis" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-yellow text-navy py-3 rounded-md font-medium"
            >
              Demander un devis
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Simulateur() {
  // State for configurator
  const [color, setColor] = useState('#0A2472');
  const [material, setMaterial] = useState('matte');
  const [height, setHeight] = useState(1.5);
  
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
              Simulateur 3D
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-10"
            >
              Visualisez et personnalisez vos solutions PLV en temps réel grâce à notre outil 3D interactif
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* 3D Simulator Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* 3D Canvas - Takes up 3/5 of the space on large screens */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[500px] md:h-[600px]">
                <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <Suspense fallback={null}>
                    <Platform>
                      <DisplayStand color={color} material={material} height={height} />
                    </Platform>
                    <Environment preset="city" />
                    <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={1.5} far={5} />
                  </Suspense>
                  <OrbitControls enablePan={false} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2} />
                </Canvas>
              </div>
            </div>
            
            {/* Controls Panel - Takes up 2/5 of the space on large screens */}
            <div className="lg:col-span-2">
              <ControlsPanel 
                color={color} 
                setColor={setColor}
                material={material}
                setMaterial={setMaterial}
                height={height}
                setHeight={setHeight}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Comment ça marche</h2>
            <p className="text-xl text-gray-600">
              Notre simulateur 3D vous permet de visualiser vos projets PLV avant leur fabrication
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Personnalisez',
                description: 'Choisissez les dimensions, matériaux, couleurs et finitions de votre PLV selon vos besoins.',
                icon: '🎨'
              },
              {
                title: 'Visualisez',
                description: 'Explorez votre création en 3D sous tous les angles pour visualiser le résultat final.',
                icon: '👁️'
              },
              {
                title: 'Demandez un devis',
                description: 'Envoyez-nous votre configuration pour recevoir un devis précis et personnalisé.',
                icon: '📋'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-8 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-navy mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
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
            <h2 className="text-4xl font-bold mb-6">Prêt à concrétiser votre projet ?</h2>
            <p className="text-xl mb-10">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir l'accompagnement de nos experts.
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
