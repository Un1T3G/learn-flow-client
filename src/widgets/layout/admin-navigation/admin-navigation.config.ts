import { Book, Clock, GraduationCap, User, Users } from 'lucide-react'

export const adminNavigationConfig = [
  {
    icon: Clock,
    title: 'navigation.manageSchedule',
    path: '/manage',
  },
  {
    icon: Users,
    title: 'navigation.manageGroups',
    path: '/manage/groups',
  },
  {
    icon: Book,
    title: 'navigation.manageSubjects',
    path: '/manage/subjects',
  },
  {
    icon: GraduationCap,
    title: 'navigation.manageTeachers',
    path: '/manage/teachers',
  },

  {
    icon: User,
    title: 'navigation.manageStudents',
    path: '/manage/students',
  },
]
