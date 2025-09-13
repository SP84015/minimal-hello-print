import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/contexts/TranslationContext";
import { useWebsiteContact } from "@/hooks/useWebsiteContact";

interface Website {
  id?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_linkedin?: string;
}

export const Contact = ({ website }: { website?: Website }) => {
  const { t } = useTranslation();
  const { contactInfo } = useWebsiteContact(website?.id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: websiteData } = await supabase
        .from("websites")
        .select("id")
        .eq("is_active", true)
        .single();

      if (!websiteData) {
        throw new Error("Website not found");
      }

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          website_id: websiteData.id
        }
      });

      if (error) throw error;
      
      toast.success(t("contact.success", "Message sent successfully!"));
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(t("contact.error", "Failed to send message. Please try again."));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("contact.title", "Get in Touch")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("contact.description", "Ready to bring your ironwork vision to life? Contact us today for a consultation and let's create something extraordinary together.")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{t("contact.form.title", "Send us a Message")}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("contact.form.name", "Name")} *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("contact.form.email", "Email")} *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">{t("contact.form.phone", "Phone")}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">{t("contact.form.subject", "Subject")}</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">{t("contact.form.message", "Message")} *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1"
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  {t("contact.form.send", "Send Message")}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("contact.info.title", "Contact Information")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo?.contact_email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>{contactInfo.contact_email}</span>
                </div>
              )}
              
              {contactInfo?.contact_phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>{contactInfo.contact_phone}</span>
                </div>
              )}
              
              {contactInfo?.contact_address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{contactInfo.contact_address}</span>
                </div>
              )}
              
              <div className="pt-4">
                <h4 className="font-semibold mb-3">{t("contact.social.title", "Follow Us")}</h4>
                <div className="flex space-x-3">
                  {website?.social_facebook && (
                    <a href={website.social_facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                      <Facebook className="h-5 w-5" />
                    </a>
                  )}
                  {website?.social_instagram && (
                    <a href={website.social_instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {website?.social_twitter && (
                    <a href={website.social_twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {website?.social_linkedin && (
                    <a href={website.social_linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};