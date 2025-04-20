import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight, Book, Cloud, Cpu, Wind, Leaf, Database, Zap, AlertTriangle } from 'lucide-react';
import PageTransition from './ui/PageTransition';

const LandingPage = () => {
  const [particleCount, setParticleCount] = useState(0);
  const controls = useAnimation();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Floating elements for subtle design
  const floatingElements = [
    { id: 1, icon: <Leaf />, delay: 0, duration: 15, size: 'w-12 h-12', position: 'top-20 left-10', color: 'text-primary/10' },
    { id: 2, icon: <Cloud />, delay: 2, duration: 18, size: 'w-16 h-16', position: 'bottom-40 right-20', color: 'text-gray-400/10' },
    { id: 3, icon: <Wind />, delay: 1, duration: 12, size: 'w-14 h-14', position: 'top-40 right-10', color: 'text-primary/10' },
    { id: 4, icon: <Leaf />, delay: 3, duration: 20, size: 'w-8 h-8', position: 'bottom-20 left-20', color: 'text-primary/10' },
    { id: 5, icon: <Cpu />, delay: 2, duration: 16, size: 'w-10 h-10', position: 'top-60 right-40', color: 'text-primary/10' },
    { id: 6, icon: <Database />, delay: 4, duration: 14, size: 'w-12 h-12', position: 'bottom-60 left-40', color: 'text-primary/10' },
    { id: 7, icon: <AlertTriangle />, delay: 1.5, duration: 17, size: 'w-14 h-14', position: 'top-1/3 left-1/4', color: 'text-primary/10' },
    { id: 8, icon: <Zap />, delay: 3.5, duration: 13, size: 'w-10 h-10', position: 'bottom-1/3 right-1/4', color: 'text-primary/10' },
  ];

  // Subtle background particles
  useEffect(() => {
    // Determine particle count based on screen size
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setParticleCount(10);
      } else if (width < 1024) {
        setParticleCount(15);
      } else {
        setParticleCount(20);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Start particle animation
    controls.start({
      opacity: [0.3, 0.5, 0.3],
      scale: [1, 1.1, 1],
      transition: { duration: 3, repeat: Infinity }
    });
    
    return () => window.removeEventListener('resize', handleResize);
  }, [controls]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Subtle animated particles */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5 pointer-events-none"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              custom={i}
              animate={controls}
            />
          ))}
        </div>

        {/* Floating elements - very subtle */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {floatingElements.map((element) => (
            <motion.div
              key={element.id}
              className={`absolute ${element.position} ${element.size} ${element.color} pointer-events-none`}
              initial={{ opacity: 0.3, y: 0, rotate: 0 }}
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
                y: [0, -20, 0],
                rotate: [0, element.id % 2 === 0 ? 10 : -10, 0]
              }}
              transition={{ 
                duration: element.duration, 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: element.delay 
              }}
            >
              {element.icon}
            </motion.div>
          ))}
        </div>

        {/* Subtle gradient blobs */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
            style={{ top: '-10%', right: '-10%' }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
            style={{ bottom: '-15%', left: '-15%' }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -20, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "mirror",
              delay: 2,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Hero Section - Google-like minimal design */}
          <section className="py-16 md:py-24 lg:py-28 flex items-center justify-center">
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto"
              >
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-800 mb-5 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <motion.span 
                    className="text-primary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    AI
                  </motion.span>
                  <motion.span 
                    className="relative mx-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    (R)
                    <motion.div 
                      className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.span> Poetry Generator
                </motion.h1>
                <motion.h2 
                  className="text-2xl md:text-3xl font-serif text-gray-700 mb-4 tracking-tight"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  From Pollution to Poetry
                </motion.h2>
                <motion.p 
                  className="text-md md:text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  An independent project at the intersection of literature, AI engineering, and ecology
                </motion.p>
                  
                {/* Search bar style button - Google-inspired */}
                <motion.div 
                  className="max-w-xl mx-auto mb-10 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Link 
                    to="/generate" 
                    className="flex items-center justify-center w-full px-8 py-4 text-gray-700 bg-white border border-gray-300 rounded-full hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 group"
                  >
                    <span className="text-base md:text-lg font-medium">Transform air pollution data into poetry</span>
                    <motion.div
                      className="ml-2 text-primary"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Link>
                  <motion.div 
                    className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                  
                {/* Action buttons - Google-inspired */}
                <motion.div 
                  className="flex flex-wrap justify-center gap-4 md:gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Link 
                    to="/generate" 
                    className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-md text-sm font-medium transition-colors hover:shadow-sm"
                  >
                    Generate Poetry
                  </Link>
                  <Link 
                    to="/about" 
                    className="px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-md text-sm font-medium transition-colors hover:shadow-sm"
                  >
                    About the Project
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Main Content Section - Google-inspired clean design */}
          <section className="py-16 bg-gray-50 relative overflow-hidden">
            {/* Animated background element */}
            <motion.div 
              className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/5 opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
              <div className="max-w-3xl mx-auto">
                {/* Rising Air Pollution Section */}
                <motion.div 
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-6 tracking-tight">Rising Air Pollution? Rising Awareness Needed.</h2>
                  <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                    Air pollution is one of the leading causes of serious health issues in many parts of the world, particularly in areas marked by high industrial activity and population density.<sup className="text-primary">[1]</sup> Often invisible to the human eye, air pollution can be easily ignored, despite its evident harmful effects on both human health and the environment.
                  </p>
                  <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                    How can awareness of this issue be raised in ways that foster new individual and collective behaviors, helping to reshape development patterns toward a more sustainable future?
                  </p>
                  
                  {/* Animated pollution indicator */}
                  <motion.div className="my-10 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary/40 to-primary/60"
                      initial={{ width: '10%' }}
                      animate={{ width: ['30%', '70%', '40%'] }}
                      transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </motion.div>
                </motion.div>
                
                {/* Literature as a Way Section */}
                <motion.div 
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-6 tracking-tight">(AI) Literature as a Way</h2>
                  <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                    Literature has long been acknowledged as a powerful tool for fostering affective engagement with a wide range of topics and existential concerns. In recent decades, its potential to address the challenges of climate change has been increasingly explored, particularly through the rise of ecocriticism. Poetry, in particular, offers a distinctive means of encouraging reflection, critical thinking, and a sense of human-nonhuman attunement. In this context, ecopoetics becomes essential in supporting the transformative social processes required to confront the profound ethical challenges posed by sustainable development.
                  </p>
                  <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                    Air pollution has a persistent presence in literary history, especially since the Industrial Revolution, which introduced imagery of toxic air, black smoke, and environmental degradation in multiple works. While these images continue permeating contemporary poetry, in an era of global transformation and systemic crisis, new narratives are needed—not only to inform about ever-new challenges related to poor air quality, but to inspire ever-new change in our relationship with both the human and the more-than-human world.
                  </p>
                  <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                    We believe that AI plays a key role in this effort—both by making pollution a subject of poetry, and also by embedding it into the creative process itself. As AI text generation evolves, we see pollutants not only as harmful agents affecting human and ecological health, but also as generative elements within poetic production—shaping the critical lens through which our poems engage with the issue of air pollution.
                  </p>
                  
                  {/* Animated text lines */}
                  <div className="my-10 space-y-2">
                    {[1, 2, 3].map((line) => (
                      <motion.div 
                        key={line}
                        className="h-1.5 bg-gray-100 rounded-full"
                        initial={{ width: `${70 + Math.random() * 30}%` }}
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2 + line, repeat: Infinity, repeatType: "reverse" }}
                      />
                    ))}
                  </div>
                </motion.div>
                
                {/* Project Vision Section */}
                <motion.div 
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-6 tracking-tight">A Project. A Vision. A Mission… in Progress.</h2>
                  <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                    This project is our creative, affirmative, and proactive response to data that might otherwise leave us feeling discouraged and overwhelmed by the scale of climate change, its causes, and its consequences. Through this participatory and collective project of poetry generation that keeps the root causes of air pollution at its core, we aim to inspire active engagement for change—to think, feel, and rewrite the future of our communities and cities.
                  </p>
                  <p className="text-gray-600 mb-5 leading-relaxed text-lg">
                    Our project is both in progress and ongoing. We have already presented our work at conferences and are currently developing further research, while exploring new implementation strategies to expand and strengthen our impact.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    Would you like to support the initiative? Contact us to collaborate or join the team.
                  </p>
                  
                  {/* Animated AI network */}
                  <div className="my-10 relative h-10">
                    {[1, 2, 3, 4, 5].map((node) => (
                      <motion.div 
                        key={node}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        style={{ 
                          left: `${node * 20}%`, 
                          top: node % 2 === 0 ? '20%' : '60%' 
                        }}
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity,
                          delay: node * 0.2
                        }}
                      />
                    ))}
                    {[1, 2, 3, 4].map((line) => (
                      <motion.div 
                        key={`line-${line}`}
                        className="absolute h-0.5 bg-primary/30"
                        style={{ 
                          left: `${line * 20 + 1}%`,
                          top: line % 2 === 0 ? '22%' : '62%',
                          width: '18%',
                          transformOrigin: 'left center'
                        }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: line * 0.2
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
                
                {/* Reference */}
                <motion.div 
                  className="text-sm text-gray-500 mt-12 border-t border-gray-200 pt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p>
                    [1] See World Health Organization, <a href="https://www.who.int/health-topics/air-pollution#tab=tab_1" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://www.who.int/health-topics/air-pollution#tab=tab_1</a>
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA Section - Clean and minimal with subtle animations */}
          <section className="py-20 bg-white border-t border-gray-100 relative overflow-hidden">
            {/* Subtle animated background */}
            <motion.div 
              className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full bg-primary/5 opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                x: [0, 30, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
            
            {/* Subtle particles */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary/10"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -50 - 20, 0],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
            
            <div className="container px-4 sm:px-6 lg:px-8 mx-auto text-center relative z-10">
              <motion.div
                className="max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="mb-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-block bg-primary/10 px-4 py-1 rounded-full mb-4">
                    <p className="text-primary font-medium text-sm">Free & No Registration Required</p>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4 tracking-tight">
                    Start Generating Poetry Now
                  </h2>
                  <p className="text-lg text-gray-600">
                    Our software transforms air quality data into meaningful poetry
                  </p>
                </motion.div>
                
                <motion.div
                  className="mb-10"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/generate" 
                    className="inline-flex items-center justify-center px-8 py-4 font-medium text-white bg-primary rounded-md hover:bg-primary-600 transition-colors shadow-md"
                  >
                    <motion.span
                      className="text-lg"
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                    >
                      CLICK HERE to start AI generating poetry
                    </motion.span> 
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Link>
                </motion.div>
                
                {/* Animated button glow effect */}
                <motion.div 
                  className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent bottom-0 left-0 right-0"
                  style={{ width: '100%', maxWidth: '384px', margin: '0 auto' }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />
                
                <motion.p 
                  className="text-sm text-gray-500 mt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Our software is free and does not require registration
                </motion.p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default LandingPage;