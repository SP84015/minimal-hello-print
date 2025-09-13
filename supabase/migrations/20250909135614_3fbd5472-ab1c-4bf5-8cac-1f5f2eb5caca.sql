-- Update existing website data to reflect ironwork business
UPDATE websites SET 
  about_title = 'Master Craftsmen in Ironwork',
  about_content = 'At Veldor, we specialize in creating high-quality iron and metal products that combine traditional craftsmanship with modern design. From custom iron gates to decorative baskets, our skilled artisans deliver exceptional metalwork solutions for residential and commercial properties.',
  seo_title = 'Veldor - Premium Ironwork & Metal Fabrication Services',
  seo_description = 'Professional ironwork services including custom iron gates, decorative baskets, railings, and metal fabrication. Quality craftsmanship for residential and commercial projects.',
  seo_keywords = 'ironwork, metal fabrication, iron gates, iron baskets, custom metalwork, iron railings, decorative iron'
WHERE is_active = true;

-- Clear existing wedding services
DELETE FROM website_services WHERE website_id IN (SELECT id FROM websites WHERE is_active = true);

-- Insert new ironwork services
INSERT INTO website_services (website_id, title, description, icon_name) VALUES
(
  (SELECT id FROM websites WHERE is_active = true LIMIT 1),
  'Custom Iron Gates',
  'Handcrafted iron gates designed to enhance security while adding elegant curb appeal to your property. Available in various styles and finishes.',
  'Calendar'
),
(
  (SELECT id FROM websites WHERE is_active = true LIMIT 1),
  'Iron Baskets & Planters',
  'Beautiful decorative iron baskets and planters perfect for gardens, patios, and interior spaces. Durable and weather-resistant designs.',
  'Flower'
),
(
  (SELECT id FROM websites WHERE is_active = true LIMIT 1),
  'Railings & Balustrades',
  'Safety-focused iron railings and balustrades for stairs, balconies, and terraces. Combining functionality with artistic design.',
  'MapPin'
),
(
  (SELECT id FROM websites WHERE is_active = true LIMIT 1),
  'Decorative Ironwork',
  'Custom decorative iron pieces including wall art, sculptures, and architectural elements to enhance any space.',
  'Camera'
),
(
  (SELECT id FROM websites WHERE is_active = true LIMIT 1),
  'Metal Fabrication',
  'Professional metal fabrication services for industrial and commercial applications. Precision engineering and quality construction.',
  'ChefHat'
),
(
  (SELECT id FROM websites WHERE is_active = true LIMIT 1),
  'Restoration Services',
  'Expert restoration of antique ironwork and metal pieces. Bringing historical metalwork back to its original beauty.',
  'Sprout'
);