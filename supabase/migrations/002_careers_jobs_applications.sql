-- Job postings, applications, and private resume storage.
-- Depends on public.admin_users from 001.

create table if not exists public.job_postings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  team text not null default '',
  location text not null default '',
  slug text not null,
  description text not null default '',
  published boolean not null default true,
  constraint job_postings_slug_unique unique (slug)
);

create index if not exists job_postings_published_idx on public.job_postings (published) where published = true;
create index if not exists job_postings_slug_idx on public.job_postings (slug);

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  job_id uuid not null references public.job_postings (id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null default '',
  cover_letter text not null default '',
  resume_storage_path text not null
);

create index if not exists job_applications_job_id_idx on public.job_applications (job_id);
create index if not exists job_applications_created_at_idx on public.job_applications (created_at desc);

create or replace function public.set_job_postings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists tr_job_postings_updated_at on public.job_postings;
create trigger tr_job_postings_updated_at
  before update on public.job_postings
  for each row
  execute procedure public.set_job_postings_updated_at();

alter table public.job_postings enable row level security;
alter table public.job_applications enable row level security;

-- Public: read published jobs only.
drop policy if exists "Anon can select published job postings" on public.job_postings;
create policy "Anon can select published job postings"
  on public.job_postings
  for select
  to anon
  using (published = true);

-- Admins: full access to job postings.
drop policy if exists "Admins select all job postings" on public.job_postings;
create policy "Admins select all job postings"
  on public.job_postings
  for select
  to authenticated
  using (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid()
    )
  );

drop policy if exists "Admins insert job postings" on public.job_postings;
create policy "Admins insert job postings"
  on public.job_postings
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid()
    )
  );

drop policy if exists "Admins update job postings" on public.job_postings;
create policy "Admins update job postings"
  on public.job_postings
  for update
  to authenticated
  using (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid()
    )
  );

drop policy if exists "Admins delete job postings" on public.job_postings;
create policy "Admins delete job postings"
  on public.job_postings
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid()
    )
  );

-- Applications: admins read only (inserts from web use service role).
drop policy if exists "Admins select job applications" on public.job_applications;
create policy "Admins select job applications"
  on public.job_applications
  for select
  to authenticated
  using (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid()
    )
  );

-- Private bucket for resumes (uploads use service role; reads use admin JWT + policy below).
insert into storage.buckets (id, name, public)
values ('job-resumes', 'job-resumes', false)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Admins read job resume objects" on storage.objects;
create policy "Admins read job resume objects"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'job-resumes'
    and exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid()
    )
  );
