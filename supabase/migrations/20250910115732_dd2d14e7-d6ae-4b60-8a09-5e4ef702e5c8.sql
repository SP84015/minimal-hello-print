-- Update gallery images with new ironwork images
UPDATE website_gallery 
SET 
  image_url = CASE 
    WHEN order_index = 1 THEN '/src/assets/gallery-iron-gate.jpg'
    WHEN order_index = 2 THEN '/src/assets/gallery-railings.jpg' 
    WHEN order_index = 3 THEN '/src/assets/gallery-planters.jpg'
    WHEN order_index = 4 THEN '/src/assets/gallery-wall-art.jpg'
    WHEN order_index = 5 THEN '/src/assets/gallery-fabrication.jpg'
    WHEN order_index = 6 THEN '/src/assets/gallery-restoration.jpg'
  END,
  alt_text = CASE
    WHEN order_index = 1 THEN 'Custom wrought iron gate with decorative scrollwork'
    WHEN order_index = 2 THEN 'Elegant iron railings with artistic metalwork'
    WHEN order_index = 3 THEN 'Decorative iron planters and garden baskets'
    WHEN order_index = 4 THEN 'Artistic iron wall sculpture and decorative metalwork'
    WHEN order_index = 5 THEN 'Professional metal fabrication and welding work'
    WHEN order_index = 6 THEN 'Restored antique ironwork and Victorian metalwork'
  END
WHERE order_index IN (1, 2, 3, 4, 5, 6);