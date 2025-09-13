import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit, Save, X } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name: string;
}

const iconOptions = [
  { value: "Calendar", label: "Calendar" },
  { value: "MapPin", label: "Map Pin" },
  { value: "Flower", label: "Flower" },
  { value: "Camera", label: "Camera" },
  { value: "ChefHat", label: "Chef Hat" },
  { value: "Sprout", label: "Sprout" },
];

export const ServicesManager = ({ websiteId }: { websiteId: string }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon_name: "Calendar",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, [websiteId]);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("website_services")
        .select("*")
        .eq("website_id", websiteId)
        .order("created_at");

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to fetch services.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addService = async () => {
    try {
      const { data, error } = await supabase
        .from("website_services")
        .insert({
          website_id: websiteId,
          ...newService,
        })
        .select()
        .single();

      if (error) throw error;

      setServices([...services, data]);
      setNewService({ title: "", description: "", icon_name: "Calendar" });
      setShowAddForm(false);
      toast({
        title: "Success",
        description: "Service added successfully.",
      });
    } catch (error) {
      console.error("Error adding service:", error);
      toast({
        title: "Error",
        description: "Failed to add service.",
        variant: "destructive",
      });
    }
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    try {
      const { error } = await supabase
        .from("website_services")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      setServices(services.map(s => s.id === id ? { ...s, ...updates } : s));
      setEditingId(null);
      toast({
        title: "Success",
        description: "Service updated successfully.",
      });
    } catch (error) {
      console.error("Error updating service:", error);
      toast({
        title: "Error",
        description: "Failed to update service.",
        variant: "destructive",
      });
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from("website_services")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setServices(services.filter(s => s.id !== id));
      toast({
        title: "Success",
        description: "Service deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error",
        description: "Failed to delete service.",
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
        <h3 className="text-lg font-semibold">Manage Services</h3>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="new-title">Service Title</Label>
              <Input
                id="new-title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                placeholder="Enter service title"
              />
            </div>
            <div>
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Enter service description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="new-icon">Icon</Label>
              <Select value={newService.icon_name} onValueChange={(value) => setNewService({ ...newService, icon_name: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={addService} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Service
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="p-4">
              {editingId === service.id ? (
                <EditServiceForm
                  service={service}
                  onSave={(updates) => updateService(service.id, updates)}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{service.title}</h4>
                    <p className="text-muted-foreground mt-1">{service.description}</p>
                    <p className="text-sm text-muted-foreground mt-2">Icon: {service.icon_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingId(service.id)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteService(service.id)}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const EditServiceForm = ({
  service,
  onSave,
  onCancel,
}: {
  service: Service;
  onSave: (updates: Partial<Service>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: service.title,
    description: service.description,
    icon_name: service.icon_name,
  });

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="edit-title">Service Title</Label>
        <Input
          id="edit-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="edit-description">Description</Label>
        <Textarea
          id="edit-description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="edit-icon">Icon</Label>
        <Select value={formData.icon_name} onValueChange={(value) => setFormData({ ...formData, icon_name: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((icon) => (
              <SelectItem key={icon.value} value={icon.value}>
                {icon.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSave(formData)} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
        <Button variant="outline" onClick={onCancel} className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
};