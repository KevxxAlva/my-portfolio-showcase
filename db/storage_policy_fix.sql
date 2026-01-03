-- INTENTA EJECUTAR ESTO EN LUGAR DEL ANTERIOR
-- Esto evita modificar la tabla 'objects' directamente si no eres superadmin

-- 1. Asegurar que el bucket existe
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- 2. Políticas más específicas que no requieren ser dueño de la tabla 'objects'
-- (Supabase a veces restringe 'alter table storage.objects' en el editor SQL)

-- Política de LECTURA (Pública)
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'project-images' );

-- Política de ESCRITURA (Autenticados)
create policy "Authenticated Upload"
on storage.objects for insert
with check (
  bucket_id = 'project-images' 
  and auth.role() = 'authenticated'
);

-- Política de ACTUALIZACION
create policy "Authenticated Update"
on storage.objects for update
using ( bucket_id = 'project-images' and auth.role() = 'authenticated' );

-- Política de BORRADO
create policy "Authenticated Delete"
on storage.objects for delete
using ( bucket_id = 'project-images' and auth.role() = 'authenticated' );
