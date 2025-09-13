import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "@/contexts/TranslationContext";
import { getGalleryImageUrl } from "@/assets/gallery-images";
import galleryFallback from "@/assets/gallery-fallback.jpg";
interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  order_index: number;
}

export const Gallery = () => {
  const { t } = useTranslation();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data: website } = await supabase
          .from("websites_public")
          .select("id")
          .eq("is_active", true)
          .maybeSingle();

        if (website) {
          const { data: galleryData } = await supabase
            .from("website_gallery")
            .select("*")
            .eq("website_id", website.id)
            .order("order_index");

          setImages(galleryData || []);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
    }
  };

  if (loading) {
    return (
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p>{t("gallery.loading", "Loading gallery...")}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("gallery.title", "Our Gallery")}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t("gallery.description", "Explore our portfolio of exceptional ironwork projects. Each piece tells a story of craftsmanship, creativity, and attention to detail.")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div
                  className="relative cursor-pointer group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={getGalleryImageUrl(image.image_url)}
                    alt={image.alt_text || "Ironwork gallery image"}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = galleryFallback; }}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl w-full p-0 border-0">
                {selectedImageIndex !== null && (
                  <div className="relative">
                    <img
                      src={getGalleryImageUrl(images[selectedImageIndex]?.image_url || "")}
                      alt={images[selectedImageIndex]?.alt_text || "Ironwork gallery image"}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = galleryFallback; }}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
                      {selectedImageIndex + 1} {t("gallery.of", "of")} {images.length}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};