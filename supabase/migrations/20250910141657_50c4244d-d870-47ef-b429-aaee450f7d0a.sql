-- Create translations table for multi-language support
CREATE TABLE IF NOT EXISTS public.website_translations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES public.websites(id) ON DELETE CASCADE,
  language_code TEXT NOT NULL CHECK (language_code IN ('en', 'gu', 'hi')),
  content_key TEXT NOT NULL,
  content_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(website_id, language_code, content_key)
);

-- Enable RLS
ALTER TABLE public.website_translations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can manage website translations" 
ON public.website_translations 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Website translations are viewable by everyone" 
ON public.website_translations 
FOR SELECT 
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_website_translations_updated_at
BEFORE UPDATE ON public.website_translations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default English translations
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'hero.title' as content_key,
  'Master Craftsmen in Ironwork & Metal Fabrication' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'hero.description' as content_key,
  'From custom iron gates to decorative baskets, we create exceptional metalwork solutions. Quality craftsmanship meets modern design for residential and commercial properties.' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'nav.home' as content_key,
  'Home' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'nav.about' as content_key,
  'About' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'nav.services' as content_key,
  'Services' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'nav.gallery' as content_key,
  'Gallery' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'nav.contact' as content_key,
  'Contact' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;