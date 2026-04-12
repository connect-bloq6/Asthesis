-- Keep job_applications when a job posting is deleted (was ON DELETE CASCADE).

alter table public.job_applications
  drop constraint if exists job_applications_job_id_fkey;

alter table public.job_applications
  alter column job_id drop not null;

alter table public.job_applications
  add constraint job_applications_job_id_fkey
  foreign key (job_id) references public.job_postings (id) on delete set null;
