-- PRECAUCIÓN: ESTO BORRARÁ TODOS LOS PROYECTOS EXISTENTES
-- Ejecuta esto si tienes problemas de "column not found" o desincronización
-- para reiniciar la tabla limpia.

DROP TABLE IF EXISTS public.projects;

create table public.projects (
  id uuid default gen_random_uuid() primary key,
  titulo text not null,
  descripcion text not null,
  descripcion_completa text not null,
  tags text[] not null default '{}',
  imagen_url text not null,
  repo_link text,
  demo_link text,
  destacado boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reactivar seguridad
alter table public.projects enable row level security;

-- Políticas de acceso
create policy "Public projects are viewable by everyone"
  on public.projects for select
  using (true);

create policy "Authenticated users can manage projects"
  on public.projects for all
  using (auth.role() = 'authenticated');
