-- Contact form storage + admin-only reads via admin_users allowlist.
-- Run in Supabase SQL editor or via supabase db push.
-- admin_users must exist before any policy references it.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  organisation text not null default '',
  country_iso text not null default '',
  phone text not null default '',
  discuss_topic text not null default '',
  message text not null default ''
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.contact_submissions enable row level security;
alter table public.admin_users enable row level security;

-- Public site: anon may insert submissions only (no select policy for anon).
drop policy if exists "Allow anon insert contact submissions" on public.contact_submissions;
create policy "Allow anon insert contact submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Admins (allowlisted in admin_users) may read submissions.
drop policy if exists "Admins can select contact submissions" on public.contact_submissions;
create policy "Admins can select contact submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (
    exists (
      select 1 from public.admin_users au
      where au.user_id = auth.uid()
    )
  );

drop policy if exists "Users can read own admin row" on public.admin_users;
create policy "Users can read own admin row"
  on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid());

-- After creating an Auth user in the dashboard, grant access:
-- insert into public.admin_users (user_id) values ('<auth.users.id>');
