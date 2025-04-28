import React from 'react';
import { motion } from 'framer-motion';
import { Book, Award, GraduationCap, MapPin, CalendarDays } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Page Header */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">About Us</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              The AI(R) Poetry Generator is a pioneering project that bridges the gap between 
              environmental science, literary studies, and artificial intelligence. Our team 
              combines expertise across multiple disciplines to create a unique platform for 
              exploring air pollution through the lens of poetry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-800 mb-12">Meet the Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Team Member: Stefano */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <Book className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Stefano Rozzoni</h3>
                      <p className="text-primary">Postdoc Research Fellow and Lecturer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Postdoc Research Fellow and lecturer on English literature. He works at the intersection of
                      literature, philosophy, economics and education in the context of the Environmental Humanities,
                      focusing on human-nonhuman ethical relationality.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span>
                          <a 
                            href="https://unibg.unifind.cineca.it/individual?uri=http://irises.unibg.it/resource/person/45662"
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            University of Bergamo
                          </a>
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Bergamo, Italy</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Recent Publications</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <CalendarDays className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          <span>Rozzoni, Stefano, "Beyond the Icon, Beyond the Human: An Ecocritical Reading of Francis of Assisi
                          across Irish and British Poetry (1960s-2010s)". In InScriptum: A Journal of Language and Literary
                          Studies, 5, 2024, ISSN 2719-4418, pp. 53-85.</span>
                        </li>
                        <li className="flex items-start">
                          <Award className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          <span>
                            Presenter at the 14th Beyond Humanism Conference:
                            <a 
                              href="https://beyondhumanism2024.wordpress.com"
                              className="text-primary hover:underline ml-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Technologies–Ecologies and the Networks of Posthuman Care
                            </a>
                            (2–5 July 2024, University of Łódź)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Award className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          <span>
                            Principal investigator of the 
                            <a 
                              href="https://www.nestresearchnetwork.org"
                              className="text-primary hover:underline ml-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              NEST Research Network
                            </a>
                            – Narratives for Ecological and Sustainable Transition(s)
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Team Member: Zeeshan */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full overflow-hidden border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 18h.01"></path>
                        <path d="M19 9l-7 7-7-7"></path>
                        <path d="M21 15v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"></path>
                        <rect x="7" y="3" width="10" height="4" rx="1"></rect>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Zeeshan Ali</h3>
                      <p className="text-primary">AI Engineer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700">
                      Specialized in natural language processing and generative AI models, with expertise in developing 
                      systems that combine environmental data with creative text generation.
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        <span>Birla Institute of Technology and Science</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Bangalore, India</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4 mt-4">
                      <h4 className="font-medium text-gray-800 mb-2">Recent Projects</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <CalendarDays className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          <span>"Fine-tuning Large Language Models for Environmental Applications" (2023)</span>
                        </li>
                        <li className="flex items-start">
                          <Award className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                          <span>Contributor to the Open Source Climate Data Initiative (2022-Present)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Project Background */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-8">Project Origins</h2>
            
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100"
              >
                <h3 className="text-xl font-medium text-gray-800 mb-4">Research Context</h3>
                <p className="text-gray-700 leading-relaxed">
                  The project stems from Stefano Rozzoni's research on narrative as a model for human–nonhuman
                  ethical relations, with a focus on literature and air pollution in Northern Italy.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  By integrating historical environmental data with literary analysis, it reveals how writers have
                  responded to changing air quality over time within an Environmental Digital Humanities
                  framework.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100"
              >
                <h3 className="text-xl font-medium text-gray-800 mb-4">Conference Presentations</h3>
                <p className="text-gray-700 leading-relaxed">
                  We presented a preliminary version of this project at the 14th Beyond Humanism Conference:
                  <a 
                    href="https://beyondhumanism2024.wordpress.com"
                    className="text-primary hover:underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Technologies–Ecologies and the Networks of Posthuman Care
                  </a>
                  (2–5 July 2024, University of Łódź), with a paper titled
                  'Sustain-AI-bility' Poetics: Blending Technology and Ecology in e-Literary (Posthumanist) Practices.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100"
              >
                <h3 className="text-xl font-medium text-gray-800 mb-4">Future Directions</h3>
                <p className="text-gray-700 leading-relaxed">
                  As we continue to develop the AI(R) Poetry Generator, we plan to:
                </p>
                <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
                  <li>Expand our database of pollution measurements to include more cities worldwide</li>
                  <li>Incorporate additional literary sources from diverse cultural traditions</li>
                  <li>Develop educational resources for classrooms and community workshops</li>
                  <li>Establish partnerships with environmental organizations and climate initiatives</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
