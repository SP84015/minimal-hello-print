-- Add Gujarati translations
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'nav.home' as content_key,
  'ઘર' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'nav.about' as content_key,
  'વિશે' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'nav.services' as content_key,
  'સેવાઓ' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'nav.gallery' as content_key,
  'ગેલેરી' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'nav.contact' as content_key,
  'સંપર્ક' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'hero.title' as content_key,
  'લોખંડની કામગીરી અને ધાતુની બનાવટમાં માસ્ટર કારીગરો' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'hero.description' as content_key,
  'કસ્ટમ આયર્ન ગેટ્સથી લઈને સજાવટી બાસ્કેટ્સ સુધી, અમે અસાધારણ ધાતુકામના ઉકેલો બનાવીએ છીએ. રહેણાંક અને વ્યાવસાયિક મિલકતો માટે ગુણવત્તાયુક્ત કારીગરી આધુનિક ડિઝાઇનને મળે છે.' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'hero.cta.contact' as content_key,
  'સંપર્કમાં રહો' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- Add Hindi translations
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'nav.home' as content_key,
  'होम' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'nav.about' as content_key,
  'हमारे बारे में' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'nav.services' as content_key,
  'सेवाएं' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'nav.gallery' as content_key,
  'गैलरी' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'nav.contact' as content_key,
  'संपर्क' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'hero.title' as content_key,
  'लोहे की कारीगरी और धातु निर्माण में मास्टर शिल्पकार' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'hero.description' as content_key,
  'कस्टम आयरन गेट से लेकर सजावटी बास्केट तक, हम असाधारण धातुकर्म समाधान बनाते हैं। गुणवत्तापूर्ण शिल्प कौशल आधुनिक डिज़ाइन से मिलकर आवासीय और वाणिज्यिक संपत्तियों के लिए काम करता है।' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'hero.cta.contact' as content_key,
  'संपर्क में रहें' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;