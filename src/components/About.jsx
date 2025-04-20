import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">About Our AI Poetry Generator</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
            <CardDescription>Bringing poetry to everyone through AI innovation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We are passionate about making poetry accessible to everyone. Our AI-powered poetry generator 
              combines cutting-edge machine learning techniques with a deep appreciation for poetic traditions 
              to create a unique tool for poetry enthusiasts, writers, educators, and anyone interested in 
              exploring the beauty of language.
            </p>
            <p className="text-gray-700">
              Our goal is to inspire creativity, foster appreciation for poetry, and demonstrate how AI can be 
              used to enhance artistic expression rather than replace it.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Our Technology</CardTitle>
            <CardDescription>The science behind the art</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Our poetry generator uses state-of-the-art natural language processing models 
              that have been fine-tuned on diverse collections of poetry spanning different eras, styles, and cultures.
            </p>
            <p className="text-gray-700 mb-4">
              We've developed specialized algorithms that can understand the nuances of poetic language, 
              including rhythm, rhyme, meter, and figurative language. The system continuously learns and 
              improves from user interactions, allowing it to generate increasingly sophisticated and 
              meaningful poetry over time.
            </p>
            <p className="text-gray-700">
              While AI does the heavy lifting, human oversight ensures that the final output meets our 
              high standards for quality and originality.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Our Team</CardTitle>
            <CardDescription>The minds behind the machine</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Our diverse team brings together experts in artificial intelligence, computational linguistics, 
              literature, and education. We are united by our love of poetry and our belief in technology's 
              potential to enhance creative expression.
            </p>
            <p className="text-gray-700">
              Have questions or want to learn more about our work? Visit our Contact page to get in touch!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
