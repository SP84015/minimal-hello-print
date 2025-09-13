-- Add comprehensive translations for all sections

-- About section translations
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'about.title' as content_key,
  'About Our Ironwork Mastery' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'about.title' as content_key,
  'અમારા લોખંડકામની કુશળતા વિશે' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'about.title' as content_key,
  'हमारी लोहे की कारीगरी के बारे में' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- About description
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'en' as language_code,
  'about.description' as content_key,
  'With decades of experience in traditional and modern ironwork, we craft pieces that blend artistry with functionality. Our skilled artisans bring passion and precision to every project.' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'gu' as language_code,
  'about.description' as content_key,
  'પરંપરાગત અને આધુનિક લોખંડકામમાં દાયકાઓના અનુભવ સાથે, અમે કલા અને કાર્યક્ષમતાને મિશ્રિત કરતા ટુકડાઓ બનાવીએ છીએ. અમારા કુશળ કારીગરો દરેક પ્રોજેક્ટમાં ઉત્સાહ અને ચોકસાઈ લાવે છે.' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

INSERT INTO public.website_translations (website_id, language_code, content_key, content_value)
SELECT 
  id as website_id,
  'hi' as language_code,
  'about.description' as content_key,
  'पारंपरिक और आधुनिक लोहे के काम में दशकों के अनुभव के साथ, हम ऐसे टुकड़े बनाते हैं जो कलात्मकता और कार्यक्षमता को मिलाते हैं। हमारे कुशल कारीगर हर परियोजना में जुनून और सटीकता लाते हैं।' as content_value
FROM public.websites
WHERE is_active = true
ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- About stats
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value) VALUES
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.stats.projects', 'Projects Completed'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.stats.projects', 'પ્રોજેક્ટ્સ પૂર્ણ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.stats.projects', 'परियोजनाएं पूर्ण'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.stats.rating', 'Rating'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.stats.rating', 'રેટિંગ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.stats.rating', 'रेटिंग'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.stats.experience', 'Years Experience'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.stats.experience', 'વર્ષોનો અનુભવ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.stats.experience', 'वर्षों का अनुभव'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.stats.satisfaction', 'Satisfaction'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.stats.satisfaction', 'સંતુષ્ટિ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.stats.satisfaction', 'संतुष्टि')

ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- Mission, Vision, Values
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value) VALUES
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.mission.title', 'Our Mission'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.mission.title', 'અમારું લક્ષ્ય'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.mission.title', 'हमारा मिशन'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.mission.description', 'To create exceptional ironwork that enhances spaces and exceeds expectations through innovative design and superior craftsmanship.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.mission.description', 'નવીન ડિઝાઇન અને શ્રેષ્ઠ કારીગરી દ્વારા જગ્યાઓને વધારે છે અને અપેક્ષાઓને વટાવે છે તેવા અસાધારણ લોખંડકામ બનાવવાનું.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.mission.description', 'नवाचारी डिज़ाइन और बेहतर शिल्प कौशल के माध्यम से असाधारण लोहे का काम बनाना जो स्थानों को बढ़ाता है और अपेक्षाओं से अधिक है।'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.vision.title', 'Our Vision'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.vision.title', 'અમારી દ્રષ્ટિ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.vision.title', 'हमारी दृष्टि'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.vision.description', 'To be the premier ironwork specialists, known for transforming metal into masterpieces that stand the test of time.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.vision.description', 'પ્રીમિયર લોખંડકામ નિષ્ણાતો બનવાનું, જે ધાતુને માસ્ટરપીસમાં પરિવર્તિત કરવા માટે જાણીતા છે જે સમયની કસોટીને ટકી રહે છે.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.vision.description', 'प्रमुख लोहे के काम के विशेषज्ञ बनना, जो धातु को कालजयी कृतियों में बदलने के लिए जाना जाता है।'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.values.title', 'Our Values'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.values.title', 'અમારા મૂલ્યો'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.values.title', 'हमारे मूल्य'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'about.values.description', 'Quality, integrity, and customer satisfaction drive everything we do. We believe in honest communication and delivering on our promises.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'about.values.description', 'ગુણવત્તા, અખંડિતતા અને ગ્રાહક સંતુષ્ટિ અમે જે કંઈ કરીએ છીએ તેને ચલાવે છે. અમે પ્રામાણિક સંદેશાવ્યવહાર અને અમારા વચનો પૂરા કરવામાં માનીએ છીએ.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'about.values.description', 'गुणवत्ता, ईमानदारी और ग्राहक संतुष्टि हमारे हर काम को संचालित करती है। हम ईमानदार संवाद और अपने वादों को पूरा करने में विश्वास करते हैं।')

ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- Gallery section
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value) VALUES
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'gallery.title', 'Our Gallery'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'gallery.title', 'અમારી ગેલેરી'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'gallery.title', 'हमारी गैलरी'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'gallery.description', 'Explore our portfolio of exceptional ironwork projects. Each piece tells a story of craftsmanship, creativity, and attention to detail.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'gallery.description', 'અસાધારણ લોખંડકામ પ્રોજેક્ટ્સના અમારા પોર્ટફોલિયોનું અન્વેષણ કરો. દરેક ટુકડો કારીગરી, સર્જનાત્મકતા અને વિગતોના ધ્યાનની વાર્તા કહે છે.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'gallery.description', 'असाधारण लोहे के काम की परियोजनाओं के हमारे पोर्टफोलियो का अन्वेषण करें। हर टुकड़ा शिल्प कौशल, रचनात्मकता और विस्तार पर ध्यान की कहानी कहता है।'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'gallery.loading', 'Loading gallery...'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'gallery.loading', 'ગેલેરી લોડ થઈ રહી છે...'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'gallery.loading', 'गैलरी लोड हो रही है...'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'gallery.of', 'of'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'gallery.of', 'માંથી'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'gallery.of', 'का')

ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- Contact section
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value) VALUES
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.title', 'Get in Touch'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.title', 'સંપર્કમાં રહો'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.title', 'संपर्क में रहें'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.description', 'Ready to bring your ironwork vision to life? Contact us today for a consultation and let''s create something extraordinary together.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.description', 'તમારી લોખંડકામની દ્રષ્ટિને જીવંત બનાવવા તૈયાર છો? પરામર્શ માટે આજે અમારો સંપર્ક કરો અને ચાલો સાથે મળીને કંઈક અસાધારણ બનાવીએ.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.description', 'अपनी लोहे के काम की दृष्टि को जीवंत करने के लिए तैयार हैं? परामर्श के लिए आज ही हमसे संपर्क करें और आइए मिलकर कुछ असाधारण बनाएं।'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.form.title', 'Send us a Message'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.form.title', 'અમને સંદેશ મોકલો'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.form.title', 'हमें संदेश भेजें'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.form.name', 'Name'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.form.name', 'નામ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.form.name', 'नाम'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.form.email', 'Email'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.form.email', 'ઇમેઇલ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.form.email', 'ईमेल'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.form.phone', 'Phone'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.form.phone', 'ફોન'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.form.phone', 'फ़ोन'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.form.subject', 'Subject'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.form.subject', 'વિષય'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.form.subject', 'विषय'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.form.message', 'Message'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.form.message', 'સંદેશ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.form.message', 'संदेश'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.form.send', 'Send Message'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.form.send', 'સંદેશ મોકલો'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.form.send', 'संदेश भेजें'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.success', 'Message sent successfully!'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.success', 'સંદેશ સફળતાપૂર્વક મોકલાયો!'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.success', 'संदेश सफलतापूर्वक भेजा गया!'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.error', 'Failed to send message. Please try again.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.error', 'સંદેશ મોકલવામાં નિષ્ફળ. કૃપા કરીને ફરી પ્રયાસ કરો.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.error', 'संदेश भेजने में असफल। कृपया पुनः प्रयास करें।'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.info.title', 'Contact Information'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.info.title', 'સંપર્ક માહિતી'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.info.title', 'संपर्क जानकारी'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'contact.social.title', 'Follow Us'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'contact.social.title', 'અમને ફોલો કરો'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'contact.social.title', 'हमें फॉलो करें')

ON CONFLICT (website_id, language_code, content_key) DO NOTHING;

-- Footer section
INSERT INTO public.website_translations (website_id, language_code, content_key, content_value) VALUES
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.quickLinks', 'Quick Links'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.quickLinks', 'ઝડપી લિંક્સ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.quickLinks', 'त्वरित लिंक'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.services.title', 'Our Services'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.services.title', 'અમારી સેવાઓ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.services.title', 'हमारी सेवाएं'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.services.gates', 'Custom Gates & Fencing'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.services.gates', 'કસ્ટમ ગેટ્સ અને ફેન્સિંગ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.services.gates', 'कस्टम गेट और बाड़'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.services.railings', 'Decorative Railings'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.services.railings', 'સજાવટી રેલિંગ્સ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.services.railings', 'सजावटी रेलिंग'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.services.restoration', 'Restoration Services'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.services.restoration', 'પુનઃસ્થાપન સેવાઓ'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.services.restoration', 'पुनर्स्थापना सेवाएं'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.services.metalwork', 'Custom Metalwork'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.services.metalwork', 'કસ્ટમ મેટલવર્ક'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.services.metalwork', 'कस्टम धातु का काम'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.services.sculptures', 'Artistic Sculptures'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.services.sculptures', 'કલાત્મક શિલ્પો'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.services.sculptures', 'कलात्मक मूर्तियां'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.contact.title', 'Contact Info'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.contact.title', 'સંપર્ક માહિતી'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.contact.title', 'संपर्क जानकारी'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.social.title', 'Follow Us'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.social.title', 'અમને ફોલો કરો'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.social.title', 'हमें फॉलो करें'),

((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'en', 'footer.copyright', 'All rights reserved.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'gu', 'footer.copyright', 'બધા અધિકારો સુરક્ષિત.'),
((SELECT id FROM public.websites WHERE is_active = true LIMIT 1), 'hi', 'footer.copyright', 'सभी अधिकार सुरक्षित।')

ON CONFLICT (website_id, language_code, content_key) DO NOTHING;