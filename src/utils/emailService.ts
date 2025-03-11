
/**
 * Email Service Utility
 * 
 * This is a placeholder for the actual email service implementation.
 * In a real-world scenario, you would integrate with a backend API
 * or email service provider like SendGrid, Mailchimp, etc.
 */

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export interface FormData {
  fullName: string;
  email: string;
  businessName?: string;
  websiteType: string;
  pages?: string;
  businessDescription: string;
  colorScheme?: string;
  referenceWebsites?: string;
  budget: string;
  timeframe: string;
}

/**
 * Sends an email to the specified recipient
 * 
 * @param emailData - The email data to send
 * @returns Promise<boolean> - Success status
 */
export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    console.log('Sending email:', emailData);
    
    // In a real implementation, you would make an API call to your backend
    // or directly to an email service provider.
    // 
    // Example:
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(emailData),
    // });
    // return response.ok;
    
    // Simulate a delay for the email sending process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success for demo purposes
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

/**
 * Sends notification email to admin with form data
 * 
 * @param formData - The form data submitted by the user
 * @returns Promise<boolean> - Success status
 */
export const sendAdminNotification = async (formData: FormData): Promise<boolean> => {
  const emailData: EmailData = {
    to: 'gornelasoares@gmail.com',
    subject: `New Website Request: ${formData.websiteType} from ${formData.fullName}`,
    body: `
      New Website Request Details:
      
      Full Name: ${formData.fullName}
      Email: ${formData.email}
      Business Name: ${formData.businessName || 'Not provided'}
      Website Type: ${formData.websiteType}
      Number of Pages: ${formData.pages || 'Not provided'}
      Business Description: ${formData.businessDescription}
      Preferred Color Scheme: ${formData.colorScheme || 'Not provided'}
      Reference Websites: ${formData.referenceWebsites || 'Not provided'}
      Budget: ${formData.budget}
      Delivery Timeframe: ${formData.timeframe}
    `
  };
  
  return sendEmail(emailData);
};

/**
 * Sends thank you email to client
 * 
 * @param email - The client's email address
 * @param name - The client's name
 * @returns Promise<boolean> - Success status
 */
export const sendThankYouEmail = async (email: string, name: string): Promise<boolean> => {
  const emailData: EmailData = {
    to: email,
    subject: 'Thank You for Your Website Request - Webify',
    body: `
      Dear ${name},
      
      Thank you for your request! Our team will review your details and contact you within 24 hours. 
      
      We appreciate your interest in Webify!
      
      Best regards,
      The Webify Team
    `
  };
  
  return sendEmail(emailData);
};
