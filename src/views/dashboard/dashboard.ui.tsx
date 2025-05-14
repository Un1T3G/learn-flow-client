'use client'

import { useStudentAllReviewsQuery } from 'entities/reviews'
import { AuthLogoutButton } from 'features/auth'
import { LanguageSelect } from 'features/i18n'
import { ThemeToggleButton } from 'features/theme'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { ScheduleWeekResponse } from 'shared/api/schedule'
import { useBreakpoint } from 'shared/lib'
import { Button, Container } from 'shared/ui'
import { Footer, MobileSheet } from 'widgets/layout'
import { ReviewCreateModal } from 'widgets/reviews'
import { ScheduleGrid } from 'widgets/schedule'
import { UserCard } from 'widgets/users'

interface IProps {
  schedule: ScheduleWeekResponse
}

export const DashboardPage = ({ schedule }: IProps) => {
  const isMobile = useBreakpoint('sm')
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const { data: reviews, isLoading } = useStudentAllReviewsQuery()

  console.log(reviews)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-16 border-b border-border flex items-center">
        <Container className="flex items-center justify-between">
          {isMobile ? (
            <>
              <UserCard />
              <Button variant="outline" size="icon" onClick={handleOpen}>
                <Menu />
              </Button>
            </>
          ) : (
            <>
              <UserCard />
              <div className="flex space-x-2">
                <ThemeToggleButton />
                <LanguageSelect />
                <AuthLogoutButton />
              </div>
            </>
          )}
        </Container>
      </header>
      <div className="flex-1 py-4">
        <Container>
          <ScheduleGrid
            schedule={schedule}
            renderScheduleItemAction={(item) => (
              <div className="flex items-center min-h-full pr-2 py-2">
                <ReviewCreateModal
                  subjectId={item.id}
                  disabled={
                    reviews?.some((r) => r.scheduleId === item.id) || false
                  }
                  loading={isLoading}
                />
              </div>
            )}
          />
        </Container>
      </div>
      <Footer />
      <MobileSheet open={open} onOpenChange={setOpen}>
        <div className="flex space-x-2">
          <ThemeToggleButton />
          <LanguageSelect />
        </div>
        <AuthLogoutButton />
      </MobileSheet>
    </div>
  )
}
