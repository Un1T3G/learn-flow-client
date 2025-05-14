import { AuthRegisterForm } from 'features/auth'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, Container } from 'shared/ui'

export const AuthRegisterPage = () => {
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
        <CardHeader className="mb-4">
          <CardTitle className="text-2xl">{t('auth.register')}</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthRegisterForm />
        </CardContent>
      </Card>
    </Container>
  )
}
