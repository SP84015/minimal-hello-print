-- Ensure the default new user trigger assigns admin to the designated email
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Create profile for the new user
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  
  -- Assign default user role if not already assigned
  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = new.id AND role = 'user'::app_role
  ) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'user');
  END IF;

  -- Assign admin role to the designated admin email
  IF new.email = 'sagarpatel969@gmail.com' THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles WHERE user_id = new.id AND role = 'admin'::app_role
    ) THEN
      INSERT INTO public.user_roles (user_id, role)
      VALUES (new.id, 'admin');
    END IF;
  END IF;
  
  RETURN new;
END;
$function$;

-- One-time backfill: grant admin role to the designated email if the user already exists
DO $$
DECLARE
  admin_user_id uuid;
BEGIN
  SELECT id INTO admin_user_id FROM auth.users WHERE email = 'sagarpatel969@gmail.com' LIMIT 1;
  IF admin_user_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM public.user_roles WHERE user_id = admin_user_id AND role = 'admin'::app_role
    ) THEN
      INSERT INTO public.user_roles (user_id, role) VALUES (admin_user_id, 'admin');
    END IF;
  END IF;
END $$;