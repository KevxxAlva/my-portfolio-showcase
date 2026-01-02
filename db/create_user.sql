-- ACTIVA LA EXTENSIÓN PARA ENCRIPTAR CONTRASEÑAS
create extension if not exists pgcrypto;

-- INSERTA EL USUARIO (Cambia los valores aquí)
insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'kevinja1406@gmail.com',  -- TU CORREO
  crypt('Kevin1516$', gen_salt('bf')), -- TU CONTRASEÑA
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);
