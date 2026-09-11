-- Solicitudes enviadas desde el formulario público del sitio.
-- Los visitantes sólo pueden crear registros: no pueden consultar ni modificar datos de clientes.
create table public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  phone text not null check (char_length(trim(phone)) between 5 and 40),
  email text not null check (char_length(trim(email)) between 5 and 254),
  job_type text,
  details text check (char_length(details) <= 3000),
  source text not null default 'website',
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

revoke all on table public.quote_requests from anon, authenticated;
grant insert on table public.quote_requests to anon, authenticated;

create policy "Public visitors can submit quote requests"
  on public.quote_requests
  for insert
  to anon, authenticated
  with check (source = 'website');
