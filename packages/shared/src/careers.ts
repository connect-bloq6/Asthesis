export type JobPostingRow = {
  id: string
  created_at: string
  updated_at: string
  title: string
  team: string
  location: string
  slug: string
  description: string
  published: boolean
}

export type JobPostingInsert = {
  title: string
  team: string
  location: string
  slug: string
  description: string
  published?: boolean
}

export type JobPostingUpdate = Partial<
  Omit<JobPostingRow, 'id' | 'created_at' | 'updated_at'>
> & {
  title?: string
  team?: string
  location?: string
  slug?: string
  description?: string
  published?: boolean
}

export type JobApplicationRow = {
  id: string
  created_at: string
  /** Null if the posting was deleted after the application was submitted. */
  job_id: string | null
  full_name: string
  email: string
  phone: string
  cover_letter: string
  resume_storage_path: string
}

export type JobApplicationInsert = {
  job_id: string
  full_name: string
  email: string
  phone?: string
  cover_letter: string
  resume_storage_path: string
}

/** Public job card / list item (published only). */
export type JobPostingPublic = Pick<JobPostingRow, 'id' | 'title' | 'team' | 'location' | 'slug' | 'created_at'>

export function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return base || 'position'
}
