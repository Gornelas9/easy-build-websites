
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('request-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -right-16 w-72 h-72 bg-webify-blue/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-webify-accent/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
          {/* Hero Content */}
          <div className="space-y-8 opacity-0 animate-slide-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-webify-blue/10 text-webify-blue text-sm font-medium rounded-full">
                Professional Web Solutions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-webify-gray">
                Websites and Apps for <span className="text-gradient">Small Businesses</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-webify-gray/80 max-w-xl">
                Get your business online with a custom website delivered in 48 hours. Professional design, clear pricing, and zero hassle.
              </h2>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={scrollToForm}
                className="bg-webify-blue hover:bg-webify-blue/90 text-white px-6 py-6 rounded-lg text-lg button-glow"
              >
                Request Your Website Now 
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a 
                href="#services" 
                className="inline-flex items-center px-6 py-3 rounded-lg border border-webify-blue/20 text-webify-blue hover:bg-webify-blue/5 transition-colors"
              >
                View Services
              </a>
            </div>

            <div className="flex flex-wrap gap-8 text-webify-gray/70 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-webify-blue"></div>
                <span>Fast Delivery (48h)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-webify-blue"></div>
                <span>Professional Design</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-webify-blue"></div>
                <span>Clear Pricing</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative hidden lg:block opacity-0 animate-blur-in" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
            <div className="glass-card rounded-2xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-webify-blue to-webify-accent"></div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="h-4 w-1/3 bg-gray-200 rounded-full"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-8 bg-webify-blue/10 w-2/3 rounded-md"></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-32 bg-gray-100 rounded-md"></div>
                    <div className="h-32 bg-gray-100 rounded-md"></div>
                  </div>
                  <div className="h-5 bg-gray-200 w-full rounded-md"></div>
                  <div className="h-5 bg-gray-200 w-5/6 rounded-md"></div>
                  <div className="h-10 bg-webify-blue/80 w-1/3 rounded-md"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 -z-10 w-72 h-72 bg-webify-blue/5 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
