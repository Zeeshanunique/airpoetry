import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  ArrowRight,
  Wind,
  Leaf,
  BookOpen,
  Sparkles,
  Globe2,
  Users,
  BarChart3,
  ChevronDown,
  Quote,
  Play,
  Feather,
  TreePine,
  CloudRain
} from 'lucide-react';
import PageTransition from './ui/PageTransition';

// Animated counter component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const isNumeric = typeof end === 'number' || (typeof end === 'string' && !isNaN(Number(end)) && end.trim() !== '');

  useEffect(() => {
    if (isInView && isNumeric) {
      let start = 0;
      const target = Number(end);
      const increment = target / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration, isNumeric]);

  return <span ref={ref}>{isNumeric ? count : end}{suffix}</span>;
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
    <div className="relative z-10">
      <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-serif font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Stat card component
const StatCard = ({ value, label, suffix = '', delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="text-center p-6"
  >
    <div className="text-4xl md:text-5xl font-bold text-white mb-2">
      <AnimatedCounter end={value} suffix={suffix} />
    </div>
    <div className="text-primary-100 text-sm uppercase tracking-wider">{label}</div>
  </motion.div>
);

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const features = [
    {
      icon: Wind,
      title: "Real Pollution Data",
      description: "Access comprehensive air quality measurements from monitoring stations across multiple cities, spanning years of environmental data."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Poetry",
      description: "Advanced Google Gemini AI transforms raw environmental data into evocative, poetry that captures the essence of our relationship with air."
    },
    {
      icon: BookOpen,
      title: "Multiple Poetry Forms",
      description: "Choose from classical forms like Sonnets and Odes, or explore free verse—each tailored to express environmental themes uniquely."
    },
    {
      icon: Globe2,
      title: "Multilingual Support",
      description: "Translate your generated poetry into multiple languages, spreading environmental awareness across cultural boundaries."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white overflow-hidden">

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <motion.div
              style={{ y: y1 }}
              className="absolute inset-0 bg-white"
            >
              
            </motion.div>
            <div className="absolute inset-0 bg-white/90" />
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Hero Content */}
          <motion.div
            style={{ opacity }}
            className="relative z-20 text-center px-4 max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-600 text-sm font-medium mb-8 border border-gray-200">
                <Leaf className="inline w-4 h-4 mr-2" />
                Where Environment Meets Literature
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 mb-6 leading-tight"
            >
              <span className="text-primary">AI</span>(R) Poetry
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl font-light">Generator</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Transform air pollution data into poetry through the intersection of
              <span className="text-primary font-medium"> technology</span>,
              <span className="text-primary font-medium"> literature</span>, and
              <span className="text-primary font-medium"> ecology</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/generate"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-full font-medium text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Feather className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Creating Poetry
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="inline-flex items-center justify-center px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-medium text-lg hover:bg-gray-200 transition-all duration-300 border border-gray-200">
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </section>

        

        {/* Mission Section with Image */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          <motion.div
            style={{ y: y2 }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1470&auto=format&fit=crop" alt="Abstract art"
                    className="w-full h-[500px] object-cover"
                  />
                  

                  
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/20 rounded-2xl -z-10" />
                <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-primary/20 rounded-2xl -z-10" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  Our Mission
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6 leading-tight">
                  From Pollution to Poetry
                </h2>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                  <p>
                    Air pollution affects millions worldwide, yet remains largely invisible to the naked eye.
                    We believe that <strong className="text-gray-800">poetry can make the invisible visible</strong>—transforming
                    raw environmental data into emotional experiences that inspire action.
                  </p>
                  <p>
                    Through the intersection of AI technology and literary tradition, we create
                    <strong className="text-gray-800"> ecopoetry</strong> that speaks to the heart while informing the mind.
                  </p>
                </div>

                </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                How It Works
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
                The Art of Environmental Poetry
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform combines cutting-edge AI with environmental data to create
                poetry that raises awareness about air quality.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} delay={index * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2051&auto=format&fit=crop"
              alt="Night sky"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
                  The Process
                </span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  Data Becomes Art
                </h2>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  Watch as environmental data transforms into evocative poetry through our
                  AI-powered creative process.
                </p>

                <div className="space-y-6">
                  {[
                    { step: "01", title: "Select Location & Time", desc: "Choose a city and date range from our pollution database" },
                    { step: "02", title: "AI Analysis", desc: "Our AI analyzes pollution patterns and environmental context" },
                    { step: "03", title: "Poetry Generation", desc: "Verses emerge from the data, reflecting environmental realities" },
                    { step: "04", title: "Share & Inspire", desc: "Download, translate, and share your poetry with the world" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                        <p className="text-gray-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="font-mono text-sm">
                    <div className="text-gray-500 mb-4">// Sample Generated Poetry</div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-primary-300 italic leading-relaxed"
                    >
                      <p className="mb-2">"Through Bergamo's ancient streets,</p>
                      <p className="mb-2">where morning mist and particles meet,</p>
                      <p className="mb-2">the air tells stories, soft and low,</p>
                      <p className="mb-2">of progress paid with skies of woe.</p>
                      <p className="mb-2">Yet hope rises with each dawn,</p>
                      <p>as nature's breath carries on..."</p>
                    </motion.div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary/30 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="inline-block mb-8"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Feather className="w-10 h-10 text-primary" />
                </div>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-800 mb-6">
                Ready to Create?
              </h2>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                Start transforming air pollution data into poetry.
                Free to use, no registration required.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/generate"
                  className="group inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-full font-medium text-xl hover:shadow-2xl transition-all duration-300 shadow-lg"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Start Generating Poetry
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>

              <p className="mt-6 text-gray-500 text-sm">
                Join thousands who have transformed data into art
              </p>
            </motion.div>
          </div>
        </section>

        {/* Reference Section */}
        <section className="py-8 bg-gray-100 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <p className="text-sm text-gray-500 text-center">
              Data sources: World Health Organization, Air Quality Index, European Environment Agency.
              <a href="https://www.who.int/health-topics/air-pollution" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">WHO</a>, <a href="https://aqicn.org" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">AQI</a>, <a href="https://www.eea.europa.eu/en" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">EEA</a>
            </p>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default LandingPage;
