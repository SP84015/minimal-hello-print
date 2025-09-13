import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Settings, Upload, Trash2, Plus } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { GalleryManager } from "@/components/admin/GalleryManager";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [website, setWebsite] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user || user.email !== "sagarpatel969@gmail.com") {
        navigate("/admin/login");
        return;
      }
      
      setUser(user);
      
      // Fetch website data
      const { data: websiteData } = await supabase
        .from("websites")
        .select("*")
        .eq("is_active", true)
        .single();
      
      setWebsite(websiteData);
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const updateWebsite = async (updates: any) => {
    try {
      const { error } = await supabase
        .from("websites")
        .update(updates)
        .eq("id", website.id);

      if (error) throw error;

      setWebsite({ ...website, ...updates });
      toast({
        title: "Updated Successfully",
        description: "Website content has been updated.",
      });
    } catch (error) {
      console.error("Error updating website:", error);
      toast({
        title: "Error",
        description: "Failed to update website content.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Veldor Admin Panel</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.email}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Update basic website information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Website Name</Label>
                    <Input
                      id="name"
                      value={website?.name || ""}
                      onChange={(e) => setWebsite({ ...website, name: e.target.value })}
                      onBlur={(e) => updateWebsite({ name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={website?.contact_email || ""}
                      onChange={(e) => setWebsite({ ...website, contact_email: e.target.value })}
                      onBlur={(e) => updateWebsite({ contact_email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      id="contact_phone"
                      value={website?.contact_phone || ""}
                      onChange={(e) => setWebsite({ ...website, contact_phone: e.target.value })}
                      onBlur={(e) => updateWebsite({ contact_phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_address">Address</Label>
                    <Input
                      id="contact_address"
                      value={website?.contact_address || ""}
                      onChange={(e) => setWebsite({ ...website, contact_address: e.target.value })}
                      onBlur={(e) => updateWebsite({ contact_address: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>
                  Update the about section content and images.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about_title">About Title</Label>
                  <Input
                    id="about_title"
                    value={website?.about_title || ""}
                    onChange={(e) => setWebsite({ ...website, about_title: e.target.value })}
                    onBlur={(e) => updateWebsite({ about_title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="about_content">About Content</Label>
                  <Textarea
                    id="about_content"
                    rows={6}
                    value={website?.about_content || ""}
                    onChange={(e) => setWebsite({ ...website, about_content: e.target.value })}
                    onBlur={(e) => updateWebsite({ about_content: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services Management</CardTitle>
                  <CardDescription>
                    Add, edit, or remove services offered by your business.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {website && <ServicesManager websiteId={website.id} />}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gallery Management</CardTitle>
                  <CardDescription>
                    Upload and manage your portfolio images.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {website && <GalleryManager websiteId={website.id} />}
                </CardContent>
              </Card>
            </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>
                  Configure SEO metadata for better search engine visibility.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seo_title">SEO Title</Label>
                  <Input
                    id="seo_title"
                    value={website?.seo_title || ""}
                    onChange={(e) => setWebsite({ ...website, seo_title: e.target.value })}
                    onBlur={(e) => updateWebsite({ seo_title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="seo_description">SEO Description</Label>
                  <Textarea
                    id="seo_description"
                    rows={3}
                    value={website?.seo_description || ""}
                    onChange={(e) => setWebsite({ ...website, seo_description: e.target.value })}
                    onBlur={(e) => updateWebsite({ seo_description: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="seo_keywords">SEO Keywords</Label>
                  <Input
                    id="seo_keywords"
                    value={website?.seo_keywords || ""}
                    onChange={(e) => setWebsite({ ...website, seo_keywords: e.target.value })}
                    onBlur={(e) => updateWebsite({ seo_keywords: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>
                  Update your social media profile links.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="social_facebook">Facebook</Label>
                    <Input
                      id="social_facebook"
                      value={website?.social_facebook || ""}
                      onChange={(e) => setWebsite({ ...website, social_facebook: e.target.value })}
                      onBlur={(e) => updateWebsite({ social_facebook: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="social_instagram">Instagram</Label>
                    <Input
                      id="social_instagram"
                      value={website?.social_instagram || ""}
                      onChange={(e) => setWebsite({ ...website, social_instagram: e.target.value })}
                      onBlur={(e) => updateWebsite({ social_instagram: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="social_twitter">Twitter</Label>
                    <Input
                      id="social_twitter"
                      value={website?.social_twitter || ""}
                      onChange={(e) => setWebsite({ ...website, social_twitter: e.target.value })}
                      onBlur={(e) => updateWebsite({ social_twitter: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="social_linkedin">LinkedIn</Label>
                    <Input
                      id="social_linkedin"
                      value={website?.social_linkedin || ""}
                      onChange={(e) => setWebsite({ ...website, social_linkedin: e.target.value })}
                      onBlur={(e) => updateWebsite({ social_linkedin: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;