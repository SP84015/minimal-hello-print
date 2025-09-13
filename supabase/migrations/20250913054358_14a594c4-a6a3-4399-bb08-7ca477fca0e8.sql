-- Add translations for About page content
INSERT INTO website_translations (website_id, language_code, content_key, content_value) VALUES
-- About title - English
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'en', 'about.title', 'Master Craftsmen in Ironwork'),

-- About title - Hindi
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'hi', 'about.title', 'लोहे के काम के मास्टर कारीगर'),

-- About title - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'about.title', 'લોખંડના કામના માસ્ટર કારીગર'),

-- About description - English
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'en', 'about.description', 'At Veldor, we specialize in creating high-quality iron and metal products that combine traditional craftsmanship with modern design. From custom iron gates to decorative baskets, our skilled artisans deliver exceptional metalwork solutions for residential and commercial properties.'),

-- About description - Hindi
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'hi', 'about.description', 'वेल्डोर में, हम उच्च गुणवत्ता वाले लोहे और धातु के उत्पाद बनाने में विशेषज्ञ हैं जो पारंपरिक शिल्प कौशल को आधुनिक डिज़ाइन के साथ जोड़ते हैं। कस्टम आयरन गेट्स से लेकर सजावटी बास्केट तक, हमारे कुशल कारीगर आवासीय और वाणिज्यिक संपत्तियों के लिए असाधारण धातु कार्य समाधान प्रदान करते हैं।'),

-- About description - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'about.description', 'વેલ્ડોરમાં, અમે ઉચ્ચ ગુણવત્તાવાળા લોખંડ અને ધાતુના ઉત્પાદનો બનાવવામાં નિષ્ણાત છીએ જે પરંપરાગત કારીગરીને આધુનિક ડિઝાઇન સાથે જોડે છે. કસ્ટમ આયર્ન ગેટ્સથી લઈને સજાવટી બાસ્કેટ સુધી, અમારા કુશળ કારીગરો રહેણાંક અને વાણિજ્યિક મિલકતો માટે અસાધારણ ધાતુના કામના સોલ્યુશન્સ પ્રદાન કરે છે.')

ON CONFLICT (website_id, language_code, content_key) DO UPDATE SET
content_value = EXCLUDED.content_value,
updated_at = now();