import { useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'shared/ui'

interface IProps {
  currentDate: string
  date: string
  setDate: (date: string) => void
}

const getWeekStartMonday = (dateStr: string): Date => {
  const date = new Date(dateStr)
  const day = date.getDay()
  const diff = (day + 6) % 7 // converts Sunday=0 to 6, Monday=1 to 0, etc.
  date.setDate(date.getDate() - diff)
  return date
}

export const ScheduleAvailableWeekSelect = ({
  currentDate,
  date,
  setDate,
}: IProps) => {
  const thisMonday = getWeekStartMonday(currentDate)
  const nextMonday = new Date(thisMonday)
  nextMonday.setDate(thisMonday.getDate() + 7)

  const mondayOptions = [thisMonday, nextMonday].map(
    (d) => d.toISOString().split('T')[0]
  )

  const t = useTranslations()

  return (
    <Select value={date} onValueChange={setDate}>
      <SelectTrigger>
        <SelectValue placeholder={t('form.weekLabel')} />
      </SelectTrigger>
      <SelectContent>
        {mondayOptions.map((monday) => (
          <SelectItem key={monday} value={monday}>
            {monday}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
