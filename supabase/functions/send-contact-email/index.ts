import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.3';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  website_id: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message, website_id }: ContactEmailRequest = await req.json();

    console.log('Received contact form submission:', { name, email, subject });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Save contact submission to database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        website_id,
        name,
        email,
        subject: subject || 'Contact Form Submission',
        message: `Phone: ${phone || 'Not provided'}\n\nMessage: ${message}`
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save contact submission');
    }

    // Get website contact email
    const { data: website } = await supabase
      .from('websites')
      .select('contact_email')
      .eq('id', website_id)
      .single();

    const adminEmail = website?.contact_email || 'sagarpatel969@gmail.com';

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Veldor Website <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Contact Form Submission: ${subject || 'Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            New Contact Form Submission - Veldor
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject || 'Contact Form Submission'}</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #212529;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d;">
            <p>This email was sent from the Veldor website contact form.</p>
          </div>
        </div>
      `,
    });

    console.log("Admin email sent successfully:", adminEmailResponse);

    // Send confirmation email to customer
    const confirmationEmailResponse = await resend.emails.send({
      from: "Veldor <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Veldor",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            Thank you for contacting Veldor
          </h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to us. We have received your inquiry and will get back to you within 24 hours.</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Your Message:</h3>
            <p><strong>Subject:</strong> ${subject || 'Contact Form Submission'}</p>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>At Veldor, we specialize in professional ironwork and metal fabrication services. Our team of skilled craftsmen is ready to bring your vision to life with quality and precision.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d;">
            <p><strong>Veldor - Master Craftsmen in Ironwork</strong><br>
            Professional Metal Fabrication & Custom Ironwork</p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully:", confirmationEmailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Contact form submitted successfully" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);