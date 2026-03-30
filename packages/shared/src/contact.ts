export type ContactSubmissionInsert = {
  full_name: string
  email: string
  organisation: string
  country_iso: string
  phone: string
  discuss_topic: string
  message: string
}

export type ContactSubmissionRow = ContactSubmissionInsert & {
  id: string
  created_at: string
}
