// Gallery image imports for ironwork portfolio
import galleryIronGate from "./gallery-iron-gate.jpg";
import galleryRailings from "./gallery-railings.jpg"; 
import galleryPlanters from "./gallery-planters.jpg";
import galleryWallArt from "./gallery-wall-art.jpg";
import galleryFabrication from "./gallery-fabrication.jpg";
import galleryRestoration from "./gallery-restoration.jpg";

export const getGalleryImageUrl = (imageKey: string): string => {
  // If it's just a key, try to match with imported images
  const imageMap: { [key: string]: string } = {
    'gallery-iron-gate': galleryIronGate,
    'gallery-railings': galleryRailings, 
    'gallery-planters': galleryPlanters,
    'gallery-wall-art': galleryWallArt,
    'gallery-fabrication': galleryFabrication,
    'gallery-restoration': galleryRestoration,
  };
  
  // Return mapped image or fallback to original key if it's a URL
  return imageMap[imageKey] || (imageKey.startsWith('http') ? imageKey : imageKey);
};

export {
  galleryIronGate,
  galleryRailings,
  galleryPlanters,
  galleryWallArt,
  galleryFabrication,
  galleryRestoration,
};