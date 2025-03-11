
import React from 'react';
import { CheckCircle, Globe, LayoutGrid, Clock, Code, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ServiceCard: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  delay: string;
}> = ({ title, price, description, features, icon, popular = false, delay }) => {
  const scrollToForm = () => {
    const formElement = document.getElementById('request-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover-lift opacity-0 ${
        popular 
          ? 'border-webify-blue/30 shadow-lg relative' 
          : 'border-gray-200'
      }`}
      style={{animationName: 'fade-in', animationDuration: '0.6s', animationDelay: delay, animationFillMode: 'forwards'}}
    >
      {popular && (
        <div className="absolute top-0 left-0 right-0 bg-webify-blue text-white text-xs font-medium py-1 text-center">
          Most Popular
        </div>
      )}
      <CardHeader className={`${popular ? 'pt-8' : 'pt-6'}`}>
        <div className="w-12 h-12 rounded-lg bg-webify-blue/10 flex items-center justify-center text-webify-blue mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-webify-gray">
          {price}
          <span className="text-base font-normal text-webify-gray/60 ml-1">
            {title !== "Monthly Maintenance" ? "one-time" : "/month"}
          </span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-webify-blue shrink-0 mr-2" />
              <span className="text-sm text-webify-gray/80">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={scrollToForm}
          className={`w-full ${
            popular 
              ? 'bg-webify-blue hover:bg-webify-blue/90 text-white' 
              : 'bg-white hover:bg-webify-blue/5 text-webify-blue border border-webify-blue/30'
          }`}
        >
          Get Started
        </Button>
      </CardFooter>
    </Card>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="section-padding bg-webify-lightGray/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-webify-blue/10 text-webify-blue text-sm font-medium rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Clear Pricing, Exceptional Value
          </h2>
          <p className="text-webify-gray/80">
            We provide professional web solutions tailored for small businesses with transparent pricing and quick turnaround times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Basic Website"
            price="€200"
            description="Perfect for small businesses looking to establish an online presence quickly."
            features={[
              "1-3 pages custom design",
              "Mobile responsive layout",
              "Contact form integration",
              "Delivered within 24 hours",
              "Basic SEO optimization"
            ]}
            icon={<Globe className="h-6 w-6" />}
            delay="0.1s"
          />

          <ServiceCard
            title="Advanced Website"
            price="€400"
            description="Comprehensive solution for businesses requiring more features and pages."
            features={[
              "Up to 5 pages custom design",
              "Mobile responsive layout",
              "Contact form integration",
              "Delivered within 48 hours",
              "Advanced SEO optimization",
              "Social media integration",
              "Basic animations and effects"
            ]}
            icon={<LayoutGrid className="h-6 w-6" />}
            popular={true}
            delay="0.2s"
          />

          <ServiceCard
            title="Monthly Maintenance"
            price="€50"
            description="Keep your website updated and running smoothly with our maintenance service."
            features={[
              "Regular content updates",
              "Technical support",
              "Security monitoring",
              "Performance optimization",
              "Monthly analytics report"
            ]}
            icon={<Clock className="h-6 w-6" />}
            delay="0.3s"
          />
        </div>

        <div className="mt-24 mb-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 bg-webify-blue/10 text-webify-blue text-sm font-medium rounded-full mb-4">
              Why Choose Webify
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefits That Make Us Stand Out
            </h2>
            <p className="text-webify-gray/80">
              We combine speed, quality, and affordability to deliver exceptional web solutions for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl hover-lift opacity-0 animate-stagger-1">
              <div className="w-12 h-12 rounded-lg bg-webify-blue/10 flex items-center justify-center text-webify-blue mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rapid Delivery</h3>
              <p className="text-webify-gray/80">
                Get your website up and running in as little as 48 hours, without sacrificing quality or attention to detail.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover-lift opacity-0 animate-stagger-2">
              <div className="w-12 h-12 rounded-lg bg-webify-blue/10 flex items-center justify-center text-webify-blue mb-4">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Professional Design</h3>
              <p className="text-webify-gray/80">
                Custom-tailored websites that look great on all devices and truly represent your brand and business values.
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover-lift opacity-0 animate-stagger-3">
              <div className="w-12 h-12 rounded-lg bg-webify-blue/10 flex items-center justify-center text-webify-blue mb-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Competitive Pricing</h3>
              <p className="text-webify-gray/80">
                Transparent pricing with no hidden fees, making professional web design accessible for small businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
