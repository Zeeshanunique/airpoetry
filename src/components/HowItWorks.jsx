import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  BookOpen,
  Search,
  Cpu,
  Sparkles,
  ArrowRight,
  Wind,
  User,
  BarChart3,
  Globe,
  FileText,
  ChevronRight,
  Layers,
  SlidersHorizontal,
  Shield,
  Zap
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
            We collect both historical data and real-time air pollution data — especially the <a href="https://aqicn.org/contact/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Air Quality Index (AQI)</a> — from monitoring stations around the world through freely accessible, open-access data platforms that provide environmental information via public APIs. These sources make reliable pollution data openly available for consultation and reuse.
          </p>
          <p>
            Our software remains in constant dialogue with these data streams. As a result, depending on the selected day, time period, and city, each poem responds directly to the actual pollution levels measured in that specific location at that moment.
          </p>
          <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-3">
            <p className="font-semibold text-gray-700 text-sm">Technical Detail:</p>
            <p className="text-sm">
              The system supports two data modes: <strong>Historical</strong> (pre-loaded JSON datasets for cities like Bergamo and Treviglio covering 2022–2023) and <strong>Live</strong> (real-time data retrieved from the <a href="https://open-meteo.com/en/docs/air-quality-api" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open-Meteo Air Quality API</a>, which requires no API key and covers any location worldwide).
            </p>
            <p className="text-sm">
              For each query, the system computes an <strong>European Air Quality Index (EAQI)</strong> by applying standardized breakpoints for both PM2.5 and PM10 concentrations. The EAQI is calculated as the <em>maximum</em> of the individual pollutant sub-indices, producing a unified score on a 0–100+ scale classified as Good, Fair, Moderate, Poor, Very Poor, or Extremely Poor.
            </p>
          </div>
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
          <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-3">
            <p className="font-semibold text-gray-700 text-sm">Technical Detail — The Constraint Engine:</p>
            <p className="text-sm">
              At the heart of this mapping sits our <strong>Constraint Engine</strong>, which transforms raw pollution numbers into structured literary parameters <em>before</em> the AI generates any text. The engine works through a multi-step process:
            </p>
            <ol className="list-decimal pl-5 text-sm space-y-2">
              <li>
                <strong>Context-Aware Normalization</strong> — Rather than treating a PM2.5 reading of 30 µg/m³ identically in every city, the system calculates a <em>Contextual Severity Index</em> based on each city's baseline pollution level and sensitivity factor. A reading of 30 in a typically clean city is treated as more severe than the same reading in an industrial area.
              </li>
              <li>
                <strong>Severity Tier Classification</strong> — The contextual severity score is mapped to one of four tiers: <code className="text-sm bg-gray-100 px-1 rounded">LOW</code>, <code className="text-sm bg-gray-100 px-1 rounded">MODERATE</code>, <code className="text-sm bg-gray-100 px-1 rounded">HIGH</code>, or <code className="text-sm bg-gray-100 px-1 rounded">VERY_HIGH</code>.
              </li>
              <li>
                <strong>Semantic Tone Mapping</strong> — Each tier is mapped to a specific emotional/literary tone. For instance, <code className="text-sm bg-gray-100 px-1 rounded">LOW</code> produces <em>"pleasing and celebratory, highlighting the clarity of nature and the vitality of urban life"</em>, while <code className="text-sm bg-gray-100 px-1 rounded">VERY_HIGH</code> produces <em>"urgent and visceral, emphasizing the struggle for breath and the call for change."</em>
              </li>
              <li>
                <strong>Dynamic Vocabulary Constraints</strong> — The engine generates tier-specific word lists:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><strong>Forbidden words</strong> — Words that would contradict the tone (e.g., "beautiful" and "serene" are forbidden when pollution is Very High).</li>
                  <li><strong>Emphasized concepts</strong> — Thematic anchors the poem must weave in (e.g., "clarity", "renewal" for Low; "struggle", "urgency" for Very High).</li>
                  <li><strong>Imagery guidance</strong> — Suggested visual metaphors (e.g., "dawn, open sky, gentle breeze" for Low; "obscured sky, gasping, weight of silence" for Very High).</li>
                </ul>
              </li>
            </ol>
          </div>
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
          <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-3">
            <p className="font-semibold text-gray-700 text-sm">Technical Detail — Web Search Grounding:</p>
            <p className="text-sm">
              The system uses an <strong>AI language model with web search grounding</strong> enabled as a tool. During poem generation, the AI actively searches the web for:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Literary and poetic traditions associated with the selected city or its region</li>
              <li>Famous poets who wrote about the area or related environmental themes</li>
              <li>The environmental and air quality situation in that specific location</li>
              <li>UNESCO heritage sites, cultural landmarks, and symbolic features of the city</li>
            </ul>
            <p className="text-sm mt-2">
              All sources found through this process are returned as <strong>citations</strong> alongside the poem, categorized into literary influences and environmental research context. This ensures full transparency and traceability of the cultural references woven into each poem.
            </p>
          </div>
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
          <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-3">
            <p className="font-semibold text-gray-700 text-sm">Technical Detail — Generation Pipeline:</p>
            <p className="text-sm">
              The full generation pipeline operates as follows:
            </p>
            <ol className="list-decimal pl-5 text-sm space-y-2">
              <li>
                <strong>User inputs are captured</strong>: poetic form (Sonnet, Ode, or Free Verse), city, date range, and data source (Historical or Live).
              </li>
              <li>
                <strong>Pollution data is fetched</strong>: PM2.5 and PM10 concentrations are retrieved and converted to a unified European AQI score with category classification.
              </li>
              <li>
                <strong>The Constraint Engine processes the AQI</strong>: It computes contextual severity, determines the severity tier, maps it to a literary tone, selects a structural template (e.g., 14-line iambic pentameter for Sonnets, free rhythm for Free Verse), and generates dynamic vocabulary constraints.
              </li>
              <li>
                <strong>A structured prompt is assembled</strong>: This prompt embeds all constraints — tone, forbidden/emphasized vocabulary, imagery hints, structural rules, EAQI category mood mappings, and explicit research directives — into a single instruction for the AI language model.
              </li>
              <li>
                <strong>The AI language model generates the poem</strong> using the assembled prompt with web search grounding enabled, producing the poem text along with web citations.
              </li>
              <li>
                <strong>The response is parsed</strong>: The raw output is separated into the poem itself, literary influences, and environmental context. Grounding metadata (source URLs, search queries) is extracted and categorized.
              </li>
              <li>
                <strong>A provenance audit trail is generated</strong>: Each poem includes a checksum linking it to its specific input parameters, ensuring reproducibility and traceability.
              </li>
            </ol>
          </div>
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
          <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10 space-y-3">
            <p className="font-semibold text-gray-700 text-sm">What You Receive:</p>
            <p className="text-sm">
              Each generated poem is accompanied by:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li><strong>Literary Influences</strong> — The poets, traditions, and themes that informed the poem's creation.</li>
              <li><strong>Environmental Context</strong> — The actual AQI data, pollutant breakdown (PM2.5, PM10), and the EAQI category with its meaning.</li>
              <li><strong>Citations & References</strong> — Links to the web sources the AI consulted, fully transparent and verifiable.</li>
              <li><strong>Translation</strong> — Translate the poem into Spanish, French, German, or Italian.</li>
              <li><strong>Download & Share</strong> — Save the poem as a text file or share it directly from your device.</li>
            </ul>
            <p className="text-sm mt-2">
              Additionally, the system includes a <strong>Hybrid Resilience Architecture</strong>: if the primary AI service is unavailable (network issues, API limits), the software automatically switches to a local, template-based fallback engine that uses the same parameters to produce a poem, ensuring you always receive a result.
            </p>
          </div>
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
            Our software functions through the combination of data that we have integrated into the system, following an algorithm developed through the following steps.
          </p>
        </motion.div>

        {/* Process Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mb-20 rounded-3xl overflow-hidden shadow-xl relative bg-white border border-gray-200"
        >
          <div className="p-8 md:p-12">
            {/* Main flow */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
              {/* User Inputs */}
              <div className="flex flex-col items-center gap-3 min-w-[120px]">
                <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center shadow-sm">
                  <User className="w-9 h-9 text-blue-600" />
                </div>
                <span className="text-gray-800 font-semibold text-sm text-center">User Inputs</span>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">City</span>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">Dates</span>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">Form</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-300 to-primary/50"></div>
                <ChevronRight className="w-5 h-5 text-primary/60 -ml-1" />
              </div>
              <div className="md:hidden">
                <ArrowRight className="w-5 h-5 text-primary/40 rotate-90" />
              </div>

              {/* Processing Core */}
              <div className="flex flex-col gap-3 min-w-[250px]">
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200 shadow-sm">
                  <BarChart3 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <div>
                    <span className="text-gray-800 font-semibold text-sm block">Air Pollution Data</span>
                    <span className="text-emerald-600 text-[10px]">Open-Meteo API · EAQI Scale</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-purple-50 border border-purple-200 shadow-sm">
                  <BookOpen className="w-6 h-6 text-purple-600 flex-shrink-0" />
                  <div>
                    <span className="text-gray-800 font-semibold text-sm block">Literary Source Model</span>
                    <span className="text-purple-600 text-[10px]">Constraint Engine · Tone Mapping</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-orange-50 border border-orange-200 shadow-sm">
                  <Globe className="w-6 h-6 text-orange-600 flex-shrink-0" />
                  <div>
                    <span className="text-gray-800 font-semibold text-sm block">Cultural References</span>
                    <span className="text-orange-600 text-[10px]">Google Search Grounding</span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-primary/50 to-gray-400"></div>
                <ChevronRight className="w-5 h-5 text-gray-400 -ml-1" />
              </div>
              <div className="md:hidden">
                <ArrowRight className="w-5 h-5 text-primary/40 rotate-90" />
              </div>

              {/* AI Engine */}
              <div className="flex flex-col items-center gap-3 min-w-[100px]">
                <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center shadow-sm">
                  <Zap className="w-7 h-7 text-gray-600" />
                </div>
                <span className="text-gray-700 font-semibold text-xs text-center">AI Engine</span>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center">
                <div className="w-8 h-0.5 bg-gradient-to-r from-gray-400 to-rose-300"></div>
                <ChevronRight className="w-5 h-5 text-rose-400 -ml-1" />
              </div>
              <div className="md:hidden">
                <ArrowRight className="w-5 h-5 text-primary/40 rotate-90" />
              </div>

              {/* Generated Poem */}
              <div className="flex flex-col items-center gap-3 min-w-[130px]">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
                  <FileText className="w-9 h-9 text-white" />
                </div>
                <span className="text-gray-800 font-bold text-sm text-center">Generated Poem</span>
                <div className="flex flex-wrap justify-center gap-1 mt-1">
                  <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">Citations</span>
                  <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">Context</span>
                </div>
              </div>
            </div>

            {/* Resilience note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <Shield className="w-3.5 h-3.5" />
              <span className="italic">Hybrid Resilience: Automatic fallback to local template engine if AI service is unavailable</span>
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
