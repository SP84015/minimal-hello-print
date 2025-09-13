import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { useWebsiteContact } from "@/hooks/useWebsiteContact";

interface Website {
  id?: string;
  name: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_linkedin?: string;
}

export const Footer = ({ website }: { website?: Website }) => {
  const { t } = useTranslation();
  const { contactInfo } = useWebsiteContact(website?.id);

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{website?.name || "Ironwork Studio"}</h3>
            <p className="text-gray-300 text-sm">
              Crafting exceptional ironwork with passion and precision. Every piece tells a story of artistry and dedication.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.quickLinks", "Quick Links")}</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">{t("nav.home", "Home")}</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">{t("nav.about", "About")}</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">{t("nav.services", "Services")}</a></li>
              <li><a href="#gallery" className="text-gray-300 hover:text-white transition-colors">{t("nav.gallery", "Gallery")}</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">{t("nav.contact", "Contact")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.services.title", "Our Services")}</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">{t("footer.services.gates", "Custom Gates & Fencing")}</li>
              <li className="text-gray-300">{t("footer.services.railings", "Decorative Railings")}</li>
              <li className="text-gray-300">{t("footer.services.restoration", "Restoration Services")}</li>
              <li className="text-gray-300">{t("footer.services.metalwork", "Custom Metalwork")}</li>
              <li className="text-gray-300">{t("footer.services.sculptures", "Artistic Sculptures")}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.contact.title", "Contact Info")}</h3>
            <div className="space-y-3">
              {contactInfo?.contact_email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-300" />
                  <span className="text-gray-300">{contactInfo.contact_email}</span>
                </div>
              )}
              {contactInfo?.contact_phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-300" />
                  <span className="text-gray-300">{contactInfo.contact_phone}</span>
                </div>
              )}
              {contactInfo?.contact_address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-300" />
                  <span className="text-gray-300">{contactInfo.contact_address}</span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3">{t("footer.social.title", "Follow Us")}</h4>
              <div className="flex space-x-3">
                {website?.social_facebook && (
                  <a href={website.social_facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {website?.social_instagram && (
                  <a href={website.social_instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {website?.social_twitter && (
                  <a href={website.social_twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {website?.social_linkedin && (
                  <a href={website.social_linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {website?.name || "Ironwork Studio"}. {t("footer.copyright", "All rights reserved.")}</p>
        </div>
      </div>
    </footer>
  );
};