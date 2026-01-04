create table public.articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text not null,
  content text, 
  image_url text,
  external_link text,
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar seguridad (RLS)
alter table public.articles enable row level security;

-- Política de lectura (pública)
create policy "Articles are viewable by everyone" 
  on public.articles for select 
  using (true);

-- Política de escritura (solo autenticados/admin)
create policy "Articles are insertable by authenticated users only" 
  on public.articles for insert 
  with check (auth.role() = 'authenticated');

create policy "Articles are updateable by authenticated users only" 
  on public.articles for update
  using (auth.role() = 'authenticated');

create policy "Articles are deletable by authenticated users only" 
  on public.articles for delete 
  using (auth.role() = 'authenticated');
