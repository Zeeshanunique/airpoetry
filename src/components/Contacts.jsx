import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, ExternalLink, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

const Contacts = () => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSending(true);
    setFormStatus({ type: '', message: '' });
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('consent', consent ? 'Yes' : 'No');
    
    // Replace with your actual web3forms API key
    formData.append('access_key', '41df86bc-2a63-4cca-9c0f-514628ac59b4');
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus({
          type: 'success',
          message: 'Thank you for your message! We will get back to you soon.'
        });
        setMessage('');
        setEmail('');
        setName('');
        setSubject('');
        setConsent(false);
      } else {
        setFormStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setSending(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 py-16 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-serif font-bold text-gray-800 mb-6">Get in Touch</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have questions about the AI(R) Poetry Generator? Interested in collaboration opportunities?
            We'd love to hear from you. Reach out using the form below or contact us directly.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="overflow-hidden border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Mail className="h-6 w-6 text-primary" />
                    <span>Contact Information</span>
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-primary font-medium mb-2">For Research & Academic Inquiries</h3>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a 
                          href="mailto:stefano.rozzoni@unibg.it" 
                          className="hover:text-primary transition-colors"
                        >
                          stefano.rozzoni@unibg.it
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-primary font-medium mb-2">For Technical Support & Partnerships</h3>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a 
                          href="mailto:ai.poetry@gmail.com" 
                          className="hover:text-primary transition-colors"
                        >
                         contact@airpoetrygenerator.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-primary font-medium mb-2">Our Research Locations</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2 text-gray-700">
                          <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium">University of Bergamo</p>
                            <p className="text-sm text-gray-600">Department of Literature and Philosophy</p>
                            <p className="text-sm text-gray-600">Bergamo, Italy</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 text-gray-700">
                          <MapPin className="h-4 w-4 text-gray-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Digital Humanities Lab</p>
                            <p className="text-sm text-gray-600">Bangalore, India</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-primary font-medium mb-3">Follow Our Work</h3>
                      <div className="flex items-center gap-3">
                        <a 
                          href="https://github.com/Zeeshanunique" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                          <span>GitHub</span>
                        </a>
                        
                        <a 
                          href="https://www.researchgate.net/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>ResearchGate</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="overflow-hidden border-gray-200 shadow-md">
              <CardContent className="p-6">
                <h2 className="text-2xl font-serif font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <span>Send a Message</span>
                </h2>
                
                {formStatus.message && (
                  <div className={`p-3 rounded-md mb-4 ${formStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Name</Label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                    <input
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-700">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full mt-1 p-2 min-h-[120px] focus:ring-2 focus:ring-primary/50"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="consent" 
                      checked={consent}
                      onCheckedChange={setConsent}
                      className="mt-1"
                    />
                    <Label 
                      htmlFor="consent" 
                      className="text-sm text-gray-600 font-normal"
                    >
                      By filling out this feedback form, you agree to have your feedback published on the website. (Optional)
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={sending}
                    className="w-full py-2.5"
                  >
                    {sending ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message <Send className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
