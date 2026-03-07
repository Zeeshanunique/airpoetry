import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  BookOpen, 
  Search, 
  Cpu, 
  Sparkles,
  ArrowRight,
  Wind
} from 'lucide-react';

const StepCard = ({ icon: Icon, title, description, stepNumber, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    className="relative p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow group"
  >
    <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform">
      {stepNumber}
    </div>
    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
      <Icon className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-4 font-serif">{title}</h3>
    <div className="text-gray-600 space-y-3 leading-relaxed">
      {description}
    </div>
  </motion.div>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: Database,
      title: "Air Pollution Data Collection",
      description: (
        <>
          <p>
            We collect both historical data and real-time air pollution data - especially the <a href="https://aqicn.org/contact/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Air Quality Index (AQI)</a> - from monitoring stations around the world through freely accessible, open-access data platforms that provide environmental information via public APIs. These sources make reliable pollution data openly available for consultation and reuse.
          </p>
          <p>
            Our software remains in constant dialogue with these data streams. As a result, depending on the selected day, time period, and city, each poem responds directly to the actual pollution levels measured in that specific location at that moment.
          </p>
        </>
      )
    },
    {
      icon: BookOpen,
      title: "Literary Sources. Different Forms and Degrees of Criticism",
      description: (
        <>
          <p>
            To guide the poetic voice, we have trained the system using carefully selected literary models based on copyright free materials, including texts of different poetic genres.
          </p>
          <p>
            In addition to these models, we have manually curated a corpus of fiction and non-fiction texts organized by different degrees of criticism toward air pollution. Some texts express subtle concern or reflection. Others adopt a more urgent, radical, or openly critical tone.
          </p>
          <p>
            If you would like to learn more about this curated corpus, please <a href="/contacts" className="text-primary hover:underline">contact us</a>.
          </p>
          <p>
            Each degree of criticism is aligned with pollution thresholds defined by internationally recognized standards (based on the <a href="https://aqicn.org/scale/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Air Quality Index scale as defined by the US-EPA 2016 standard</a>).
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>When pollution levels are low, the system draws inspiration from texts with a softer, more contemplative critical tone.</li>
            <li>When pollution reaches hazardous levels, the system shifts toward literary sources with stronger, more confrontational criticism of environmental harm.</li>
          </ul>
        </>
      )
    },
    {
      icon: Search,
      title: "Web Search for Cultural Models",
      description: (
        <>
          <p>
            To ensure that each poem is not only environmentally responsive but also culturally grounded, the software performs a web search using freely accessible sources. This search focuses on cultural references, historical elements, and symbolic or widely recognized features of the selected city.
          </p>
          <p>
            These references are integrated into the poem so that the text resonates with the specific identity of the place, rather than remaining abstract or generic.
          </p>
        </>
      )
    },
    {
      icon: Cpu,
      title: "Our Algorithm",
      description: (
        <>
          <p>
            Once the user's inputs are defined, the system follows a structured algorithm that combines multiple layers of data and textual parameters, including:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>The air pollution level of the selected city and time period</li>
            <li>The corresponding degree of environmental risk associated with those pollution levels</li>
            <li>A matched level of pollution-related hazard derived from a literary corpus, which models different degrees of critical intensity in the target text</li>
            <li>The chosen poetic form or stylistic framework in which the poem is generated</li>
            <li>Cultural and contextual references associated with the selected city, which are integrated into the text</li>
          </ul>
          <p className="mt-3">
            Through this process, the software dynamically adjusts tone, imagery, and structure, translating environmental data and textual models into a coherent poetic expression.
          </p>
        </>
      )
    },
    {
      icon: Sparkles,
      title: "The Result",
      description: (
        <>
          <p>
            The outcome is an original poem, uniquely crafted for you. You actively contributed to its creation by setting the parameters.
          </p>
          <p>Each poem is:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>rooted in real environmental data;</li>
            <li>informed by literary and critical traditions;</li>
            <li>connected to the cultural identity of a specific place you have chosen.</li>
          </ul>
          <p className="mt-3 font-medium text-gray-800">
            In this way, the software does not simply generate poetry—it creates a dialogue between data, culture, critical imagination, and yourself.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Process & Methodology
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
            How Does It Work?
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our software functions through the combination of data that we have integrated into the system, following an algorithm developed through these fundamental steps.
          </p>
        </motion.div>

        {/* Conceptual Image / Diagram Container */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="max-w-5xl mx-auto mb-20 rounded-3xl overflow-hidden shadow-2xl relative bg-gray-900 border border-gray-100"
        >
            <div className="aspect-w-16 aspect-h-8 md:aspect-h-6 relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-8 min-h-[400px]">
                {/* Fallback abstract visual representation representing data flowing to poetry */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent"></div>
                </div>
                
                <div className="relative z-10 w-full max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Data Input */}
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <Database className="w-10 h-10 text-blue-400" />
                            </div>
                            <span className="text-blue-100 font-medium">Environmental Data</span>
                        </div>
                        
                        {/* Connecting Line */}
                        <div className="hidden md:flex flex-1 items-center justify-center relative h-1">
                            <div className="w-full h-0.5 bg-gradient-to-r from-blue-400/50 via-primary/50 to-purple-400/50"></div>
                            <ArrowRight className="absolute text-primary/50 w-6 h-6 animate-pulse" />
                        </div>

                         {/* Context Input */}
                         <div className="flex flex-col items-center gap-4 group">
                            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                <BookOpen className="w-10 h-10 text-primary-300" />
                            </div>
                            <span className="text-primary-100 font-medium">Literary Models</span>
                        </div>
                        
                        {/* Connecting Line */}
                        <div className="hidden md:flex flex-1 items-center justify-center relative h-1">
                            <div className="w-full h-0.5 bg-gradient-to-r from-primary/50 via-purple-400/50 to-pink-400/50"></div>
                            <ArrowRight className="absolute text-purple-400/50 w-6 h-6 animate-pulse" />
                        </div>

                        {/* Output */}
                        <div className="flex flex-col items-center gap-4 group">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center border border-white/30 shadow-[0_0_50px_rgba(147,51,234,0.3)] group-hover:scale-105 transition-all">
                                <Wind className="w-14 h-14 text-white" />
                            </div>
                            <span className="text-white font-bold text-lg">AI(R) Poetry</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Steps Grid */}
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <StepCard 
              key={index}
              {...step}
              stepNumber={index + 1}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
