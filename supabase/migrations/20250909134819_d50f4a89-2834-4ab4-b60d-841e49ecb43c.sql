-- Insert initial website data for Veldor
INSERT INTO public.websites (
  name,
  slug,
  is_active,
  about_title,
  about_content,
  contact_email,
  contact_phone,
  contact_address,
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
) VALUES (
  'Veldor Wedding Services',
  'veldor',
  true,
  'Creating Magical Wedding Moments',
  'At Veldor, we specialize in creating unforgettable wedding experiences and providing innovative big seed solutions. With years of expertise in the wedding industry, we understand that your special day deserves nothing but perfection. Our dedicated team works closely with couples to bring their dream wedding to life, handling every detail with care and precision. From intimate ceremonies to grand celebrations, we ensure that your wedding day is as unique and beautiful as your love story.',
  'info@veldor.com',
  '+1 (555) 123-4567',
  '123 Wedding Lane, Celebration City, WC 12345',
  'Veldor - Premium Wedding Services & Big Seed Solutions',
  'Transform your special day with Veldor''s premium wedding services and innovative big seed solutions. Expert planning, elegant designs, and unforgettable experiences.',
  'wedding services, wedding planning, big seed solutions, wedding venues, bridal services, wedding photography, event planning, wedding flowers, wedding catering',
  'hsl(340, 75%, 55%)',
  'hsl(340, 15%, 95%)',
  'hsl(45, 95%, 85%)',
  'Inter',
  'https://facebook.com/veldor',
  'https://instagram.com/veldor',
  'https://twitter.com/veldor',
  'https://linkedin.com/company/veldor'
);

-- Insert initial wedding services
INSERT INTO public.website_services (website_id, title, description, icon_name) VALUES
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'Wedding Planning', 'Complete wedding planning services from concept to execution. We handle every detail to make your special day perfect.', 'Calendar'),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'Venue Selection', 'Expert guidance in selecting the perfect venue that matches your vision and budget for your dream wedding.', 'MapPin'),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'Floral Design', 'Stunning floral arrangements and decorations that bring beauty and elegance to your wedding celebration.', 'Flower'),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'Photography & Videography', 'Professional wedding photography and videography to capture every precious moment of your special day.', 'Camera'),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'Catering Services', 'Exquisite catering options with customizable menus to delight your guests with unforgettable flavors.', 'ChefHat'),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'Big Seed Solutions', 'Innovative agricultural solutions and premium seeds for sustainable farming and gardening projects.', 'Sprout');

-- Insert initial gallery images (placeholder URLs)
INSERT INTO public.website_gallery (website_id, image_url, alt_text, order_index) VALUES
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop', 'Beautiful wedding ceremony setup', 1),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop', 'Elegant wedding reception', 2),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop', 'Wedding floral arrangements', 3),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop', 'Bridal bouquet details', 4),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop', 'Wedding cake and desserts', 5),
((SELECT id FROM public.websites WHERE slug = 'veldor' LIMIT 1), 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&h=600&fit=crop', 'Outdoor wedding venue', 6);