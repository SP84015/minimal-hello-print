import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Upload } from "lucide-react";
import fallbackImage from "@/assets/gallery-fallback.jpg";

interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  order_index: number;
}

export const GalleryManager = ({ websiteId }: { websiteId: string }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState({
    image_url: "",
    alt_text: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, [websiteId]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("website_gallery")
        .select("*")
        .eq("website_id", websiteId)
        .order("order_index");

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      toast({
        title: "Error",
        description: "Failed to fetch gallery images.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('website-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('website-assets')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const addImageFromUrl = async () => {
    try {
      if (!newImage.image_url || !newImage.alt_text) {
        toast({
          title: "Error",
          description: "Please provide both image URL and alt text.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("website_gallery")
        .insert({
          website_id: websiteId,
          image_url: newImage.image_url,
          alt_text: newImage.alt_text,
          order_index: images.length,
        })
        .select()
        .single();

      if (error) throw error;

      setImages([...images, data]);
      setNewImage({ image_url: "", alt_text: "" });
      toast({
        title: "Success",
        description: "Image added to gallery successfully.",
      });
    } catch (error) {
      console.error("Error adding image:", error);
      toast({
        title: "Error",
        description: "Failed to add image to gallery.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      const altText = file.name.split('.')[0].replace(/[-_]/g, ' ');
      
      const { data, error } = await supabase
        .from("website_gallery")
        .insert({
          website_id: websiteId,
          image_url: imageUrl,
          alt_text: altText,
          order_index: images.length,
        })
        .select()
        .single();

      if (error) throw error;

      setImages([...images, data]);
      toast({
        title: "Success",
        description: "Image uploaded and added to gallery successfully.",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload image.",
        variant: "destructive",
      });
    }
  };

  const deleteImage = async (id: string, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from("website_gallery")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Also delete from storage if it's a stored file
      if (imageUrl.includes('website-assets')) {
        const path = imageUrl.split('/').slice(-2).join('/');
        await supabase.storage
          .from('website-assets')
          .remove([path]);
      }

      setImages(images.filter(img => img.id !== id));
      toast({
        title: "Success",
        description: "Image deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      toast({
        title: "Error",
        description: "Failed to delete image.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gallery Management</h3>
      </div>

      {/* Add Image Section */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Image</CardTitle>
          <CardDescription>Upload images or add them by URL</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div>
            <Label htmlFor="file-upload">Upload Image File</Label>
            <div className="mt-2">
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              {uploading && <p className="text-sm text-muted-foreground mt-1">Uploading...</p>}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or add by URL</span>
            </div>
          </div>

          {/* URL Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                value={newImage.image_url}
                onChange={(e) => setNewImage({ ...newImage, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <Label htmlFor="alt-text">Alt Text</Label>
              <Input
                id="alt-text"
                value={newImage.alt_text}
                onChange={(e) => setNewImage({ ...newImage, alt_text: e.target.value })}
                placeholder="Describe the image for accessibility"
              />
            </div>
            <Button onClick={addImageFromUrl} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Image
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = fallbackImage;
                }}
              />
            </div>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">{image.alt_text}</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteImage(image.id, image.image_url)}
                className="w-full flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No images in gallery yet. Add some images to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};