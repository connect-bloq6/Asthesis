-- Published job listings must be readable with any Supabase API key JWT role.
-- The previous policy targeted only `anon`; publishable keys may use `authenticated`,
-- which matched no policy and returned an empty list (no error).

drop policy if exists "Anon can select published job postings" on public.job_postings;

-- Omit TO = applies to PUBLIC (all roles). OR with admin "select all" still yields full rows for admins.
create policy "Public can select published job postings"
  on public.job_postings
  for select
  using (published = true);

grant select on table public.job_postings to anon, authenticated;
