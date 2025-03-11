
import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  delay: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ quote, name, title, delay }) => {
  return (
    <div 
      className="glass-card p-6 rounded-xl relative hover-lift opacity-0"
      style={{animationName: 'fade-in', animationDuration: '0.6s', animationDelay: delay, animationFillMode: 'forwards'}}
    >
      <Quote className="h-10 w-10 text-webify-blue/20 absolute -top-4 -left-1" />
      <div className="pt-4">
        <p className="text-webify-gray/80 mb-6 italic">"{quote}"</p>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-webify-blue/20 flex items-center justify-center text-webify-blue mr-3">
            {name.charAt(0)}
          </div>
          <div>
            <h4 className="font-medium text-webify-gray">{name}</h4>
            <p className="text-sm text-webify-gray/60">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3 py-1 bg-webify-blue/10 text-webify-blue text-sm font-medium rounded-full mb-4">
            Client Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-webify-gray/80">
            Don't just take our word for it — see what our clients have to say about their experience working with Webify.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Webify delivered my business website in just 48 hours, and the quality exceeded my expectations. The process was straightforward and hassle-free."
            name="Sarah Johnson"
            title="Boutique Owner"
            delay="0.1s"
          />
          <TestimonialCard
            quote="As a small business owner with limited tech knowledge, I was nervous about getting a website. Webify made it incredibly simple and the result is professional and effective."
            name="Michael Torres"
            title="Restaurant Manager"
            delay="0.2s"
          />
          <TestimonialCard
            quote="The value for money is exceptional. I received a beautiful, functional website that perfectly represents my brand at a fraction of what other agencies quoted."
            name="Emma Phillips"
            title="Fitness Instructor"
            delay="0.3s"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
