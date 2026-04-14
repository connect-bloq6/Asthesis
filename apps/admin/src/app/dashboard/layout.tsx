import { DashboardHeader } from './DashboardHeader'

/** Session lives in cookies; never cache this shell or the header can show the wrong user. */
export const dynamic = 'force-dynamic'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  )
}
