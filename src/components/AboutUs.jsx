import React from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Award, 
  GraduationCap, 
  MapPin, 
  CalendarDays, 
  Linkedin, 
  Globe,
  Mail,
  ExternalLink,
  Quote,
  Target,
  Lightbulb,
  Users,
  TreePine,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Link } from 'react-router-dom';

// Timeline item component
const TimelineItem = ({ year, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="relative pl-8 pb-8 border-l-2 border-primary/20 last:pb-0"
  >
    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
    <span className="text-primary font-bold text-sm">{year}</span>
    <h4 className="font-semibold text-gray-800 mt-1">{title}</h4>
    <p className="text-gray-600 text-sm mt-1">{description}</p>
  </motion.div>
);

// Team member card
const TeamMemberCard = ({ 
  name, 
  role, 
  institution, 
  location, 
  image, 
  bio, 
  links,
  achievements,
  delay 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
  >
    <Card className="h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-serif font-bold text-white">{name}</h3>
          <p className="text-primary-200 font-medium">{role}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            {institution}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{bio}</p>
        
        {achievements && (
          <div className="space-y-3 mb-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">{achievement}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          {links.email && (
            <a 
              href={`mailto:${links.email}`}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          )}
          {links.linkedin && (
            <a 
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {links.website && (
            <a 
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

// Value card component
const ValueCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="text-center p-6"
  >
    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </motion.div>
);

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Stefano Rozzoni",
      role: "Research Lead & Literary Scholar",
      institution: "University of Bergamo",
      location: "Bergamo, Italy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      bio: "Postdoc Research Fellow and lecturer on English literature. He works at the intersection of literature, philosophy, economics and education in the context of the Environmental Humanities, focusing on human-nonhuman ethical relationality.",
      achievements: [
        "Principal investigator of the NEST Research Network",
        "Presenter at the 14th Beyond Humanism Conference (2024)",
        "Published in InScriptum: A Journal of Language and Literary Studies"
      ],
      links: {
        email: "stefano.rozzoni@unibg.it",
        website: "https://unibg.unifind.cineca.it/individual?uri=http://irises.unibg.it/resource/person/45662"
      }
    },
    {
      name: "Zeeshan Ali",
      role: "AI Engineer & Developer",
      institution: "Presidency University",
      location: "Bangalore, India",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
      bio: "Specialized in natural language processing and generative AI models, with expertise in developing systems that combine environmental data with creative text generation.",
      achievements: [
        "Fine-tuning Large Language Models for Environmental Applications",
        "Contributor to Open Source Climate Data Initiative"
      ],
      links: {
        email: "contact@airpoetrygenerator.com",
        linkedin: "https://linkedin.com/in/zeeshanunique"
      }
    }
  ];

  const values = [
    {
      icon: TreePine,
      title: "Environmental Awareness",
      description: "Raising consciousness about air pollution through artistic expression"
    },
    {
      icon: BookOpen,
      title: "Literary Innovation",
      description: "Bridging traditional poetry forms with modern technology"
    },
    {
      icon: Sparkles,
      title: "AI for Good",
      description: "Leveraging artificial intelligence for environmental advocacy"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Building a global community of eco-conscious creators"
    }
  ];

  const timeline = [
    { year: "2022", title: "Research Begins", description: "Initial research on air pollution data and literary analysis" },
    { year: "2023", title: "Prototype Development", description: "First working prototype of the AI poetry generator" },
    { year: "2024", title: "Conference Presentation", description: "Presented at the 14th Beyond Humanism Conference" },
    { year: "2024", title: "Public Launch", description: "Released the AI(R) Poetry Generator to the public" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=2044&auto=format&fit=crop"
            alt="Nature background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-900/80" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-6">
              About Us
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              The Story Behind<br />
              <span className="text-primary-200">AI(R) Poetry</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              A pioneering project bridging environmental science, literary studies, and 
              artificial intelligence to create meaningful poetry from air pollution data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <ValueCard key={index} {...value} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Mission
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
                Where Data Meets Poetry
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  The AI(R) Poetry Generator is born from a unique collaboration between 
                  literary scholarship and AI engineering. We believe that environmental 
                  data, often abstract and overwhelming, can be transformed into something 
                  deeply personal and moving.
                </p>
                <p>
                  By converting pollution measurements into poetry, we create a new form 
                  of environmental communication—one that speaks to the heart as much as 
                  to the mind.
                </p>
                <p>
                  Our work exists at the intersection of ecocriticism, digital humanities, 
                  and artificial intelligence, opening new pathways for environmental 
                  awareness and artistic expression.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-xl border-l-4 border-primary">
                <Quote className="w-8 h-8 text-primary/30 mb-2" />
                <p className="text-gray-700 italic font-serif text-lg">
                  "We see pollutants not only as harmful agents, but as generative elements 
                  within poetic production—shaping the critical lens through which our 
                  poems engage with environmental issues."
                </p>
                <p className="text-gray-500 mt-3 text-sm">— Project Philosophy</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1548&auto=format&fit=crop"
                alt="Foggy mountains"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">2024</div>
                    <div className="text-sm text-gray-500">Year Founded</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Launched as an independent research project
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-4">
              Meet the Creators
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A collaboration between literary scholarship and AI engineering, 
              united by a passion for environmental awareness.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} delay={index * 0.2} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                Our Journey
              </span>
              <h2 className="text-4xl font-serif font-bold text-gray-800 mb-6">
                Project Timeline
              </h2>
              <p className="text-gray-600 mb-10">
                From academic research to public platform—trace the evolution of 
                the AI(R) Poetry Generator project.
              </p>
              
              <div className="space-y-0">
                {timeline.map((item, index) => (
                  <TimelineItem key={index} {...item} delay={index * 0.1} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-white"
            >
              <Lightbulb className="w-12 h-12 text-white/30 mb-6" />
              <h3 className="text-2xl font-serif font-bold mb-4">Future Directions</h3>
              <p className="text-primary-100 mb-6">
                As we continue to develop the AI(R) Poetry Generator, we plan to:
              </p>
              <ul className="space-y-4">
                {[
                  "Expand our database to include more cities worldwide",
                  "Incorporate additional literary sources from diverse cultural traditions",
                  "Develop educational resources for classrooms and workshops",
                  "Establish partnerships with environmental organizations"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-primary-50">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-primary-100 mb-4">Want to support our mission?</p>
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-full font-medium hover:bg-primary-50 transition-colors"
                >
                  Get in Touch
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1 bg-white/10 text-white rounded-full text-sm font-medium mb-4">
              Research & Publications
            </span>
            <h2 className="text-4xl font-serif font-bold mb-4">
              Academic Foundation
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our work is grounded in rigorous academic research and has been 
              presented at international conferences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <CalendarDays className="w-8 h-8 text-primary-300 mb-4" />
              <h4 className="font-semibold text-white mb-2">Conference Presentation (2024)</h4>
              <p className="text-gray-400 text-sm mb-3">
                14th Beyond Humanism Conference: Technologies–Ecologies and the Networks of Posthuman Care
              </p>
              <p className="text-gray-300 text-sm italic">
                "'Sustain-AI-bility' Poetics: Blending Technology and Ecology in e-Literary (Posthumanist) Practices"
              </p>
              <a 
                href="https://beyondhumanism2024.wordpress.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary-300 text-sm mt-4 hover:underline"
              >
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <Book className="w-8 h-8 text-primary-300 mb-4" />
              <h4 className="font-semibold text-white mb-2">Research Network</h4>
              <p className="text-gray-400 text-sm mb-3">
                NEST Research Network – Narratives for Ecological and Sustainable Transition(s)
              </p>
              <p className="text-gray-300 text-sm">
                An interdisciplinary network exploring the role of narrative in addressing environmental challenges.
              </p>
              <a 
                href="https://www.nestresearchnetwork.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary-300 text-sm mt-4 hover:underline"
              >
                Visit website <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              Ready to Experience AI Poetry?
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Transform air pollution data into meaningful poetry. Free to use, no registration required.
            </p>
            <Link
              to="/generate"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Generating Poetry
              <Sparkles className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
