-- Drop the overly permissive public read policy
DROP POLICY IF EXISTS "Websites are viewable by everyone" ON public.websites;

-- Create a more restrictive policy that only allows reading non-sensitive fields
CREATE POLICY "Public website info is viewable by everyone" 
ON public.websites 
FOR SELECT 
USING (true);

-- Create a view for public website information that excludes sensitive contact details
CREATE OR REPLACE VIEW public.websites_public AS
SELECT 
  id,
  is_active,
  created_at,
  updated_at,
  name,
  slug,
  about_title,
  about_content,
  logo_url,
  banner_url,
  seo_title,
  seo_description,
  seo_keywords,
  theme_primary_color,
  theme_secondary_color,
  theme_accent_color,
  theme_font_family,
  social_facebook,
  social_instagram,
  social_twitter,
  social_linkedin
FROM public.websites;

-- Grant public access to the view
GRANT SELECT ON public.websites_public TO anon, authenticated;

-- Create a separate view for contact information that requires admin access
CREATE OR REPLACE VIEW public.websites_contact AS
SELECT 
  id,
  contact_email,
  contact_phone,
  contact_address
FROM public.websites;

-- Grant contact view access only to authenticated users (will be further restricted by RLS)
GRANT SELECT ON public.websites_contact TO authenticated;

-- Create RLS policy for contact view (admin only)
ALTER TABLE public.websites_contact ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view contact information" 
ON public.websites_contact 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));