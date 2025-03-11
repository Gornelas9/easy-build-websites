
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Loader2 } from 'lucide-react';
import { sendAdminNotification, sendThankYouEmail } from '@/utils/emailService';

// Define the form schema with Zod
const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  businessName: z.string().optional(),
  websiteType: z.string(),
  pages: z.string().optional(),
  businessDescription: z.string().min(100, { message: "Description must be at least 100 characters." }),
  colorScheme: z.string().optional(),
  referenceWebsites: z.string().optional(),
  budget: z.string(),
  timeframe: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const RequestForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      businessName: "",
      websiteType: "Basic Website",
      pages: "",
      businessDescription: "",
      colorScheme: "",
      referenceWebsites: "",
      budget: "€200-400",
      timeframe: "Within 48 hours",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Form submitted:", values);
      
      // Send notification to admin
      const adminEmailSent = await sendAdminNotification(values);
      
      // Send thank you email to client
      const thankYouEmailSent = await sendThankYouEmail(values.email, values.fullName);
      
      if (adminEmailSent && thankYouEmailSent) {
        setIsSuccess(true);
        toast({
          title: "Request Submitted Successfully",
          description: "We will review your details and get back to you within 24 hours.",
        });
      } else {
        throw new Error("Failed to send emails");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error Submitting Request",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="request-form" className="section-padding bg-webify-lightGray/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-webify-blue/10 text-webify-blue text-sm font-medium rounded-full mb-4">
              Get Started
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tell Us About Your Project
            </h2>
            <p className="text-webify-gray/80">
              Fill out the form below to request your website. We'll review your details and contact you within 24 hours.
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 md:p-8">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-webify-gray/80 mb-6">
                  Your request has been submitted successfully. We will review your details and get back to you within 24 hours.
                </p>
                <Button 
                  onClick={() => setIsSuccess(false)}
                  className="bg-webify-blue hover:bg-webify-blue/90 text-white"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-webify-gray">Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="form-input-focus"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-webify-gray">Email *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your@email.com" 
                              type="email" 
                              {...field} 
                              className="form-input-focus"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Business Name */}
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-webify-gray">Business Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your Business Name" 
                              {...field} 
                              className="form-input-focus"
                            />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Website Type */}
                    <FormField
                      control={form.control}
                      name="websiteType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-webify-gray">Website Type *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="form-input-focus">
                                <SelectValue placeholder="Select website type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Basic Website">Basic Website</SelectItem>
                              <SelectItem value="Advanced Website">Advanced Website</SelectItem>
                              <SelectItem value="Custom Request">Custom Request</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Number of Pages */}
                    <FormField
                      control={form.control}
                      name="pages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-webify-gray">Number of Pages</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., 3" 
                              {...field} 
                              className="form-input-focus"
                            />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Color Scheme */}
                    <FormField
                      control={form.control}
                      name="colorScheme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-webify-gray">Preferred Color Scheme</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Blue and white" 
                              {...field} 
                              className="form-input-focus"
                            />
                          </FormControl>
                          <FormDescription>Optional</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Budget */}
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-webify-gray">Budget *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="form-input-focus">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Less than €200">Less than €200</SelectItem>
                              <SelectItem value="€200-400">€200-400</SelectItem>
                              <SelectItem value="€400-600">€400-600</SelectItem>
                              <SelectItem value="More than €600">More than €600</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Timeframe */}
                    <FormField
                      control={form.control}
                      name="timeframe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-webify-gray">Delivery Timeframe *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="form-input-focus">
                                <SelectValue placeholder="Select timeframe" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Within 48 hours">Within 48 hours</SelectItem>
                              <SelectItem value="3-5 days">3-5 days</SelectItem>
                              <SelectItem value="Flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Reference Websites */}
                  <FormField
                    control={form.control}
                    name="referenceWebsites"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-webify-gray">Reference Websites</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="https://example.com, https://anotherexample.com" 
                            {...field} 
                            className="form-input-focus"
                          />
                        </FormControl>
                        <FormDescription>
                          Websites you like or that have a similar style to what you want (Optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Business Description */}
                  <FormField
                    control={form.control}
                    name="businessDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-webify-gray">Business Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe your business and what you'd like your website to accomplish..." 
                            {...field} 
                            className="min-h-32 form-input-focus"
                          />
                        </FormControl>
                        <FormDescription>
                          Please provide at least 100 characters
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-webify-blue hover:bg-webify-blue/90 text-white py-6 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Your Request"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestForm;
