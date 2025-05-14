import { PopoverTrigger } from '@radix-ui/react-popover'
import { AuthLoginForm } from 'features/auth'
import { EllipsisVertical, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Popover,
  PopoverContent,
} from 'shared/ui'

export const AuthLoginPage = () => {
  const t = useTranslations()

  return (
    <Container className="flex-1 flex flex-col justify-center py-4">
      <div className="text-center mb-6">
        <Image
          src="/images/gerb.png"
          width={256}
          height={256}
          alt="gerb"
          className="w-[96px] h-[96px] mx-auto mb-2"
        />
        <h1 className="text-2xl font-bold mb-1">{t('app.title')}</h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          {t('app.description')}
        </p>
      </div>
      <Card className="max-w-md mx-auto w-full">
        <CardHeader className="flex justify-between mb-4">
          <CardTitle className="text-2xl">{t('auth.login')}</CardTitle>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="outline">
                <EllipsisVertical />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px]">
              <Button className="w-full justify-start" asChild>
                <Link href="/auth/register">
                  <User />
                  {t('auth.register')}
                </Link>
              </Button>
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <AuthLoginForm />
        </CardContent>
      </Card>
    </Container>
  )
}
