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
import zeeshanImage from '../assets/zeeshan.jpeg';

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
    <Card className="flex flex-col h-full overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
      <div className="relative h-64 overflow-hidden isolate flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h3 className="text-2xl font-serif font-bold text-white">{name}</h3>
          <p className="text-primary-200 font-medium">{role}</p>
        </div>
      </div>
      <CardContent className="!pt-6 relative z-0 bg-white flex flex-col flex-grow">
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

        <div className="flex gap-3 pt-4 border-t border-gray-100 mt-auto">
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
      image: "https://aisberg.unibg.it/rm/public/picture/img/it.cilea.ga.model.Person/63892fc3-14e5-4d34-ae0d-dc20ddcf7fd5.fragment",
      bio: "Postdoc Research Fellow and lecturer on English literature. He works at the intersection of literature, philosophy, economics and education in the context of the Environmental Humanities, focusing on human-nonhuman ethical relationality.",
      achievements: [
        "Principal investigator of the NEST Research Network"
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
      image: zeeshanImage,
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
      description: "Learning Community — Building a global community of creators, learners and educators"
    }
  ];

  const timeline = [
    { year: "2022", title: "Research Begins", description: "Initial research on the combination of air pollution data and literary texts." },
    { year: "2023", title: "Prototype Development", description: "Development of the first working prototypes of the AI Poetry Generator." },
    { year: "2024", title: "Conference Presentation", description: <span>Prototype presented at the <a href="https://beyondhumanism2024.wordpress.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">14th Beyond Humanism Conference</a> (2–5 July 2024, University of Lodz, Poland).</span> },
    { year: "2025", title: "Workshop Presentation and Trial", description: <div className="space-y-2"><span>New prototype presented at the OCEH – Oslo Center for the Environmental Humanities, University of Oslo, Norway, during the workshop <a href="https://www.hf.uio.no/ikos/english/research/projects/oslo-center-for-environmental-humanities/events/oceh-events/other-events/2025/pollution-generated-poetry-a-prototype-across-ai-l.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">“Pollution-Generated Poetry”</a> (8 October 2025).</span><br /><span className="text-gray-800 font-semibold mt-2 block">Seminar Presentation</span><span>New prototype presented at the seminar <a href="https://www.hiof.no/forskning/satsingsomrader/sprak-i-oppleringen/ella/arrangementer/literature-and-ai.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">“AI and Literature”</a> (25–26 November 2025), Østfold University College, Norway.</span></div> },
    { year: "2026", title: "Public Launch", description: "Release of the free trial version of the AI(R) Poetry Generator to the public." }
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
              An independent project bridging environmental science, literary studies, AI and education to create poetry from air pollution data.
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
                <p className="mt-6 text-gray-800 font-medium">
                  The journey toward the realization of the AI(R) Poetry Generator software followed a real trial-and-error approach, through many stages and attempts: from long reflections to early app prototypes, from effective and less effective tests to exchanges with experts from different parts of the world.
                </p>
                <p className="text-gray-800 font-medium">
                  Our project is therefore conceived as a space for reflection in which the world is the protagonist: as a planet we wish to improve, as well as a constellation of people with different experiences, cultures, and backgrounds who contributed to the development of the software.
                </p>
                <p className="text-gray-800 font-medium pb-4">
                  Through conferences, workshops, and multiple revisions, the project has reached its current version. Please enjoy the AI(R) Poetry Generator, an independent initiative driven by a strong desire to share and improve the planet we inhabit!
                </p>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 italic">
                  <h4 className="text-xl font-serif font-bold text-gray-800 mb-3 not-italic">A Starting Point, Not an End</h4>
                  The poems generated through our software are not intended to be an end in themselves. On the contrary, we hope they will serve as a starting point for developing further activities, debates, and reflections, as well as learning experiences. <br /><br />
                  Be creative with the contents you create: They are meant to spark curiosity, invite engagement with friends, colleagues, or your learning community. Reuse and reinterpret them in different ways and contexts to raise awareness of air pollution worldwide! <br /><br />
                  Some examples of what you can do with the poem you develop with our AI are to:
                  <ul className="list-disc pl-5 mt-2 space-y-2 not-italic text-sm">
                    <li>… support engagement with air quality conditions in your city or in other cities around the world;</li>
                    <li>… use it in educational activities with students, comparing AI-generated poetry with poems written by people on similar themes;</li>
                    <li>… explore the dynamics of AI-generated composition by changing parameters and letting environmental topics inspire new forms of expression;</li>
                    <li>… use it as the basis for parallel projects and programming ideas.</li>
                  </ul>
                </div>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-primary/20 rounded-xl p-6 border border-primary/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Globe className="w-24 h-24" />
              </div>
              <CalendarDays className="w-8 h-8 text-white mb-4 relative z-10" />
              <h4 className="font-semibold text-white mb-2 relative z-10">International Workshop</h4>
              <p className="text-primary-100 text-sm mb-1 relative z-10 italic">
                “Pollution-Generated Poetry?” (8 October 2025).
              </p>
              <p className="text-gray-300 text-sm mb-3 relative z-10">
                At the OCEH – Oslo Center for the Environmental Humanities, University of Oslo
              </p>
              <a
                href="https://www.hf.uio.no/ikos/english/research/projects/oslo-center-for-environmental-humanities/events/oceh-events/other-events/2025/pollution-generated-poetry-a-prototype-across-ai-l.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white font-medium text-sm mt-2 hover:underline relative z-10"
              >
                Learn more <ExternalLink className="w-3 h-3" />
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
              Transform air pollution data into poetry. Free to use, no registration required.
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
