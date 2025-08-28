import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, MessageCircle, Instagram, Send } from "lucide-react";
import { insertContactSchema, type InsertContact } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      reason: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contact", data),
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4" data-testid="heading-contact">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-contact-subtitle">
            Have a recipe suggestion? Need cooking help? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-card p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="heading-contact-form">
              Send us a message
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            data-testid="input-name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Contact</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-reason">
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Recipe Suggestion">Recipe Suggestion</SelectItem>
                          <SelectItem value="Cooking Help">Cooking Help</SelectItem>
                          <SelectItem value="Website Feedback">Website Feedback</SelectItem>
                          <SelectItem value="Partnership">Partnership</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us how we can help you..."
                          rows={4}
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-green-700 transition-colors btn-scale py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                  disabled={contactMutation.isPending}
                  data-testid="button-send-message"
                >
                  <span>{contactMutation.isPending ? "Sending..." : "Send Message"}</span>
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-8">
            {/* Other ways to reach us */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6" data-testid="heading-other-ways">
                Other ways to reach us
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3" data-testid="contact-email">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Email Us</h4>
                    <p className="text-muted-foreground">hello@sathikorecipe.com</p>
                    <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" data-testid="contact-discord">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Join Our Community</h4>
                    <p className="text-muted-foreground">Discord Server</p>
                    <p className="text-sm text-muted-foreground">Chat with other students and share recipes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3" data-testid="contact-instagram">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Follow Us</h4>
                    <p className="text-muted-foreground">@sathikorecipe</p>
                    <p className="text-sm text-muted-foreground">Daily recipe inspiration and cooking tips</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQ */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6" data-testid="heading-faq">
                Quick FAQ
              </h3>
              <div className="space-y-4" data-testid="faq-section">
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Can I submit my own recipes?</h4>
                  <p className="text-muted-foreground text-sm">Absolutely! We love featuring student-created recipes.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Do you offer cooking classes?</h4>
                  <p className="text-muted-foreground text-sm">We're planning virtual cooking classes. Stay tuned!</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Is the app free to use?</h4>
                  <p className="text-muted-foreground text-sm">Yes! All our basic features are completely free.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
