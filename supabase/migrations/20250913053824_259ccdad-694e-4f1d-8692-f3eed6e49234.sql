-- Add Gujarati translations for website services
INSERT INTO website_translations (website_id, language_code, content_key, content_value) VALUES
-- Custom Iron Gates - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.custom-iron-gates.title', 'કસ્ટમ આયર્ન ગેટ્સ'),
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.custom-iron-gates.description', 'તમારી મિલકતમાં સુરક્ષા વધારવા અને ઉત્કૃષ્ટ આકર્ષણ ઉમેરવા માટે ડિઝાઇન કરેલા હસ્તનિર્મિત લોખંડના દરવાજા. વિવિધ શૈલીઓ અને ફિનિશમાં ઉપલબ્ધ.'),

-- Iron Baskets & Planters - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.iron-baskets-planters.title', 'આયર્ન બાસ્કેટ અને પ્લાન્ટર્સ'),
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.iron-baskets-planters.description', 'બગીચાઓ, આંગણા અને આંતરિક જગ્યાઓ માટે યોગ્ય સુંદર સજાવટી લોખંડની ટોપલીઓ અને પ્લાન્ટર્સ. ટકાઉ અને હવામાન પ્રતિરોધી ડિઝાઇન.'),

-- Railings & Balustrades - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.railings-balustrades.title', 'રેલિંગ અને બેલસ્ટ્રેડ'),
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.railings-balustrades.description', 'સીડીઓ, બાલ્કોની અને ટેરેસ માટે સુરક્ષા-કેન્દ્રિત લોખંડની રેલિંગ અને બેલસ્ટ્રેડ. કાર્યક્ષમતાને કલાત્મક ડિઝાઇન સાથે જોડવું.'),

-- Decorative Ironwork - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.decorative-ironwork.title', 'સજાવટી લોખંડનું કામ'),
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.decorative-ironwork.description', 'કોઈપણ જગ્યાને વધારવા માટે વોલ આર્ટ, શિલ્પો અને સ્થાપત્ય તત્વો સહિત કસ્ટમ સજાવટી લોખંડના ટુકડા.'),

-- Metal Fabrication - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.metal-fabrication.title', 'ધાતુ ઉત્પાદન'),
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.metal-fabrication.description', 'ઔદ્યોગિક અને વાણિજ્યિક ઉપયોગો માટે વ્યાવસાયિક ધાતુ ઉત્પાદન સેવાઓ. ચોક્કસ એન્જિનિયરિંગ અને ગુણવત્તાયુક્ત બાંધકામ.'),

-- Restoration Services - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.restoration-services.title', 'પુનઃસ્થાપન સેવાઓ'),
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'service.restoration-services.description', 'પુરાતન લોખંડના કામ અને ધાતુના ટુકડાઓનું નિષ્ણાત પુનઃસ્થાપન. ઐતિહાસિક ધાતુના કામને તેની મૂળ સુંદરતામાં પાછું લાવવું.')

ON CONFLICT (website_id, language_code, content_key) DO UPDATE SET
content_value = EXCLUDED.content_value,
updated_at = now();