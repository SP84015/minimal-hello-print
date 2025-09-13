-- Add services section translations

-- English
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'services.description' as content_key,
  'From custom iron gates to decorative metalwork, we offer comprehensive ironwork services to bring your vision to life.' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- Gujarati  
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'services.description' as content_key,
  'કસ્ટમ આયર્ન ગેટ્સથી લઈને સજાવટી ધાતુકામ સુધી, અમે તમારી દ્રષ્ટિને જીવંત બનાવવા માટે વ્યાપક લોખંડની સેવાઓ પ્રદાન કરીએ છીએ.' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- Hindi
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'services.description' as content_key,
  'कस्टम लोहे के गेट से लेकर सजावटी धातु कार्य तक, हम आपकी दृष्टि को जीवंत करने के लिए व्यापक लोहे की सेवाएं प्रदान करते हैं।' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;