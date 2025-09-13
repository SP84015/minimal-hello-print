-- Update gallery image URLs to use proper asset paths
UPDATE website_gallery 
SET 
  image_url = CASE 
    WHEN order_index = 1 THEN 'gallery-iron-gate'
    WHEN order_index = 2 THEN 'gallery-railings' 
    WHEN order_index = 3 THEN 'gallery-planters'
    WHEN order_index = 4 THEN 'gallery-wall-art'
    WHEN order_index = 5 THEN 'gallery-fabrication'
    WHEN order_index = 6 THEN 'gallery-restoration'
  END
WHERE order_index IN (1, 2, 3, 4, 5, 6);