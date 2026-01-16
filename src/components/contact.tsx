'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  company: z.string().optional(),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      description: 'Get a response within 24 hours',
      value: 'nitindeep65@gmail.com',
      href: 'mailto:nitindeep65@gmail.com'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      title: 'GitHub',
      description: 'Check out my open source work',
      value: 'github.com/Nitindeep65',
      href: 'https://github.com/Nitindeep65'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      title: 'Twitter / X',
      description: 'Follow for tech updates',
      value: '@_NitindeepSingh',
      href: 'https://x.com/_NitindeepSingh'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      title: 'LinkedIn',
      description: 'Connect professionally',
      value: 'linkedin.com/in/singhdeep1',
      href: 'https://www.linkedin.com/in/singhdeep1/'
    }
  ];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          subject: values.company || 'Contact Form Submission',
          message: values.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Ready to start your next project? Our team is here to help you succeed. Reach out and let's discuss how we can bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Contact Methods - Left Side */}
          <div className="space-y-1">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                className="flex items-start gap-3 p-6 rounded-xl border border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-all duration-200 group"
              >
                <div className="flex-shrink-0 text-gray-600 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {method.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-zinc-500 mt-0.5">
                    {method.description}
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium mt-2">
                    {method.value}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form - Right Side */}
          <div>
            <div className="mb-6 gap-6">
              <h3 className="text-xl gap-2 font-semibold text-gray-900 dark:text-white mb-2">
                Send us a message
              </h3>
              <p className="text-gray-600 gap-4 dark:text-zinc-400 text-sm">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                          First Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John"
                            {...field}
                            className="h-11 bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                          Last Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Doe"
                            {...field}
                            className="h-11 bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                        Email Address <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@company.com"
                          {...field}
                          className="h-11 bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Company */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                        Company
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your Company"
                          {...field}
                          className="h-11 bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                        Message <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Tell us about your project, goals, or how we can help..."
                          {...field}
                          className="resize-none bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-lg font-semibold focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="font-medium">Message sent successfully!</span>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <span className="font-medium">Failed to send message. Please try again.</span>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
