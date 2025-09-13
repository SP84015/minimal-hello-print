import { useEffect, useState } from "react";
import { Header } from "@/components/website/Header";
import { Hero } from "@/components/website/Hero";
import { About } from "@/components/website/About";
import { Services } from "@/components/website/Services";
import { Gallery } from "@/components/website/Gallery";
import { Contact } from "@/components/website/Contact";
import { Footer } from "@/components/website/Footer";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { supabase } from "@/integrations/supabase/client";

interface Website {
  id: string;
  name: string;
  slug: string;
  about_title?: string;
  about_content?: string;
  logo_url?: string;
  banner_url?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_linkedin?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  theme_primary_color?: string;
  theme_secondary_color?: string;
  theme_accent_color?: string;
  theme_font_family?: string;
}

const Index = () => {
  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const { data } = await supabase
          .from("websites_public")
          .select("*")
          .eq("is_active", true)
          .single();
        
        setWebsite(data);
        
        // Update document metadata
        if (data) {
          document.title = data.seo_title || `${data.name} - Wedding Services`;
          
          // Update meta description
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', data.seo_description || '');
          } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = data.seo_description || '';
            document.head.appendChild(meta);
          }
          
          // Update meta keywords
          const metaKeywords = document.querySelector('meta[name="keywords"]');
          if (metaKeywords) {
            metaKeywords.setAttribute('content', data.seo_keywords || '');
          } else {
            const meta = document.createElement('meta');
            meta.name = 'keywords';
            meta.content = data.seo_keywords || '';
            document.head.appendChild(meta);
          }
        }
      } catch (error) {
        console.error("Error fetching website data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <TranslationProvider websiteId={website?.id}>
      <div className="min-h-screen">
        <Header website={website} />
        <main>
          <Hero website={website} />
          <About website={website} />
          <Services />
          <Gallery />
          <Contact website={website} />
        </main>
        <Footer website={website} />
      </div>
    </TranslationProvider>
  );
};

export default Index;
