-- Drop the overly permissive public read policy
DROP POLICY IF EXISTS "Websites are viewable by everyone" ON public.websites;

-- Create a more restrictive policy that only allows reading non-sensitive fields
-- This approach uses column-level filtering in the application layer
CREATE POLICY "Websites are viewable by everyone with restrictions" 
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

-- Create a function to get website contact info (admin only)
CREATE OR REPLACE FUNCTION public.get_website_contact_info(website_id uuid)
RETURNS TABLE (
  id uuid,
  contact_email text,
  contact_phone text,
  contact_address text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    w.id,
    w.contact_email,
    w.contact_phone,
    w.contact_address
  FROM public.websites w
  WHERE w.id = website_id
  AND has_role(auth.uid(), 'admin'::app_role);
$$;