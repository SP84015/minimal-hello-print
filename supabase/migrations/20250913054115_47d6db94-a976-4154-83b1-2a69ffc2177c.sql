-- Add translations for Services section title
INSERT INTO website_translations (website_id, language_code, content_key, content_value) VALUES
-- Services title - English
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'en', 'services.title', 'Services'),

-- Services title - Hindi  
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'hi', 'services.title', 'सेवाएं'),

-- Services title - Gujarati
('413bb01c-0dfd-4c2c-8864-514e34e76b5e', 'gu', 'services.title', 'સેવાઓ')

ON CONFLICT (website_id, language_code, content_key) DO UPDATE SET
content_value = EXCLUDED.content_value,
updated_at = now();