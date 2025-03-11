
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, CreditCard, AlertTriangle, Landmark, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define the checkout form schema
const checkoutSchema = z.object({
  paymentMethod: z.enum(["card", "paypal", "bank"], {
    required_error: "Please select a payment method.",
  }),
  websitePackage: z.string({
    required_error: "Please select a website package.",
  }),
  cardholderName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Initialize the form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card",
      websitePackage: "Basic Website - €200",
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  // Watch payment method to conditionally render fields
  const watchPaymentMethod = form.watch("paymentMethod");
  
  // Get the amount from the selected package
  const selectedPackage = form.watch("websitePackage");
  const amount = selectedPackage?.split(" - ")[1] || "€200";

  const onSubmit = async (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Payment submitted:", values);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase! Our team will start working on your website.",
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      toast({
        title: "Payment Failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-3 py-1 bg-webify-blue/10 text-webify-blue text-sm font-medium rounded-full mb-4">
                Checkout
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Complete Your Purchase
              </h1>
              <p className="text-webify-gray/80 max-w-2xl mx-auto">
                Choose your preferred payment method and complete your order to get started with your new website.
              </p>
            </div>

            {isSuccess ? (
              <div className="glass-card rounded-xl p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-webify-gray/80 mb-6 max-w-lg mx-auto">
                  Thank you for your purchase! Our team will start working on your website and contact you shortly 
                  with the next steps.
                </p>
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="bg-webify-blue hover:bg-webify-blue/90 text-white"
                >
                  Return to Home
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Order Summary Card */}
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                      <CardDescription>Review your order details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-webify-gray/80">Package:</span>
                          <span className="font-medium">{selectedPackage?.split(" - ")[0]}</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold text-webify-blue">{amount}</span>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg flex items-start space-x-3 mt-4">
                        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">
                          For demonstration purposes only. This checkout does not process actual payments.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Checkout Form */}
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                      <CardDescription>Complete your purchase securely</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          {/* Website Package Selection */}
                          <FormField
                            control={form.control}
                            name="websitePackage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Package</FormLabel>
                                <Select 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="form-input-focus">
                                      <SelectValue placeholder="Select a package" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Basic Website - €200">Basic Website - €200</SelectItem>
                                    <SelectItem value="Advanced Website - €400">Advanced Website - €400</SelectItem>
                                    <SelectItem value="Monthly Maintenance - €50">Monthly Maintenance - €50</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Payment Method Selection */}
                          <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Payment Method</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-3 gap-4"
                                  >
                                    <FormItem>
                                      <FormControl>
                                        <RadioGroupItem 
                                          value="card" 
                                          id="card" 
                                          className="peer sr-only" 
                                        />
                                      </FormControl>
                                      <FormLabel
                                        htmlFor="card"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-webify-blue [&:has([data-state=checked])]:border-webify-blue cursor-pointer"
                                      >
                                        <CreditCard className="mb-2 h-6 w-6" />
                                        <span className="text-sm font-medium">Credit Card</span>
                                      </FormLabel>
                                    </FormItem>
                                    
                                    <FormItem>
                                      <FormControl>
                                        <RadioGroupItem 
                                          value="paypal" 
                                          id="paypal" 
                                          className="peer sr-only" 
                                        />
                                      </FormControl>
                                      <FormLabel
                                        htmlFor="paypal"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-webify-blue [&:has([data-state=checked])]:border-webify-blue cursor-pointer"
                                      >
                                        <svg className="mb-2 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M19.5 8.25H4.5C3.67157 8.25 3 8.92157 3 9.75V18.75C3 19.5784 3.67157 20.25 4.5 20.25H19.5C20.3284 20.25 21 19.5784 21 18.75V9.75C21 8.92157 20.3284 8.25 19.5 8.25Z" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M6.75 12.75C6.75 12.75 7.5 14.25 9.75 14.25C12 14.25 12.75 12.75 12.75 12.75" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M13.5 12.75C13.5 12.75 14.25 14.25 16.5 14.25C18.75 14.25 19.5 12.75 19.5 12.75" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                          <path d="M3 8.25L5.25 3.75H18.75L21 8.25" stroke="#0070BA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span className="text-sm font-medium">PayPal</span>
                                      </FormLabel>
                                    </FormItem>
                                    
                                    <FormItem>
                                      <FormControl>
                                        <RadioGroupItem 
                                          value="bank" 
                                          id="bank" 
                                          className="peer sr-only" 
                                        />
                                      </FormControl>
                                      <FormLabel
                                        htmlFor="bank"
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-200 peer-data-[state=checked]:border-webify-blue [&:has([data-state=checked])]:border-webify-blue cursor-pointer"
                                      >
                                        <Landmark className="mb-2 h-6 w-6" />
                                        <span className="text-sm font-medium">Bank Transfer</span>
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Conditional Form Fields Based on Payment Method */}
                          {watchPaymentMethod === "card" && (
                            <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name="cardholderName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Cardholder Name</FormLabel>
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
                              
                              <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="4242 4242 4242 4242" 
                                        {...field} 
                                        className="form-input-focus"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="expiryDate"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Expiry Date</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="MM/YY" 
                                          {...field} 
                                          className="form-input-focus"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={form.control}
                                  name="cvv"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>CVV</FormLabel>
                                      <FormControl>
                                        <Input 
                                          placeholder="123" 
                                          type="password" 
                                          {...field} 
                                          className="form-input-focus"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          )}

                          {watchPaymentMethod === "paypal" && (
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <p className="text-blue-800 text-sm">
                                You will be redirected to PayPal to complete your payment securely.
                              </p>
                            </div>
                          )}

                          {watchPaymentMethod === "bank" && (
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                              <p className="text-gray-700 text-sm font-medium">
                                Please use the following information for your bank transfer:
                              </p>
                              <div className="space-y-2 text-sm">
                                <div className="grid grid-cols-2">
                                  <span className="text-gray-500">Bank:</span>
                                  <span>Example Bank</span>
                                </div>
                                <div className="grid grid-cols-2">
                                  <span className="text-gray-500">Account Name:</span>
                                  <span>Webify Ltd</span>
                                </div>
                                <div className="grid grid-cols-2">
                                  <span className="text-gray-500">IBAN:</span>
                                  <span>DE89 3704 0044 0532 0130 00</span>
                                </div>
                                <div className="grid grid-cols-2">
                                  <span className="text-gray-500">BIC/SWIFT:</span>
                                  <span>EXAMPLEXXX</span>
                                </div>
                                <div className="grid grid-cols-2">
                                  <span className="text-gray-500">Reference:</span>
                                  <span>Your full name</span>
                                </div>
                              </div>
                              <p className="text-amber-600 text-xs">
                                Please include your full name as reference so we can identify your payment.
                              </p>
                            </div>
                          )}

                          <div className="pt-4">
                            <div className="flex items-center mb-4 space-x-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-webify-blue"
                              >
                                <rect width="20" height="12" x="2" y="6" rx="2" />
                                <circle cx="12" cy="12" r="2" />
                                <path d="M6 12h.01M18 12h.01" />
                              </svg>
                              <p className="text-webify-gray/80 text-sm">
                                Your payment is secure and encrypted. We do not store your payment information.
                              </p>
                            </div>

                            <Button 
                              type="submit" 
                              className="w-full bg-webify-blue hover:bg-webify-blue/90 text-white py-6 text-lg"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                "Complete Your Purchase"
                              )}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
