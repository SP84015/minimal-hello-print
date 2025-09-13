import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ContactInfo {
  contact_email?: string;
  contact_phone?: string;
  contact_address?: string;
}

export const useWebsiteContact = (websiteId?: string) => {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      if (!websiteId) return;
      
      setLoading(true);
      try {
        // For public users, we'll use a different approach
        // This will only work for admin users due to the security function
        const { data } = await supabase
          .rpc('get_website_contact_info', { website_id: websiteId });
        
        if (data && data.length > 0) {
          setContactInfo(data[0]);
        }
      } catch (error) {
        // If user is not admin, contact info won't be available
        // This is intentional for security
        console.log("Contact info restricted to admin users");
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, [websiteId]);

  return { contactInfo, loading };
};