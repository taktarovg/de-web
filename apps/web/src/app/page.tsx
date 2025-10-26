import Link from 'next/link'
import { Heart, Brain, Sparkles, BookOpen, Users, Target, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { prisma } from '@designemotion/database'

async function getStats() {
  const [totalUsers, totalAnalyses] = await Promise.all([
    prisma.user.count(),
    prisma.analysis.count(),
  ])
  return { totalUsers, totalAnalyses, totalEmotions: 108 }
}

export default async function HomePage() {
  const stats = await getStats()

  return (
    <div className="min-h-screen bg-cloud">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-calm-500" />
            <span className="font-bold text-xl text-ocean-500">Дизайн Эмоций</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#method" className="text-ocean-400 hover:text-ocean-600">О методе</a>
            <a href="#course" className="text-ocean-400 hover:text-ocean-600">Курс</a>
            <Link href="/bot" className="text-ocean-400 hover:text-ocean-600">Telegram-бот</Link>
            <a href="#contacts" className="text-ocean-400 hover:text-ocean-600">Контакты</a>
          </div>
          <Link href="/dream">
            <Button variant="outline" className="border-calm-500 text-calm-600 hover:bg-calm-50">Вход</Button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-calm-500 via-sage-500 to-ocean-500 bg-clip-text text-transparent">
            Не понимай эмоции. Проектируй их.
          </h1>
          <p className="text-xl text-ocean-400 mb-8">
            Развивайте эмоциональный интеллект через 8-шаговый метод Седона, 
            шкалу Хокинса и 108 эмоций
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/bot">
              <Button size="lg" className="w-full sm:w-auto bg-calm-500 hover:bg-calm-600 text-white">
                Попробовать бота <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#method">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-sage-500 text-sage-600 hover:bg-sage-50">
                Узнать больше
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-calm-500">{stats.totalUsers}</div>
              <div className="text-sm text-ocean-400">Пользователей</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-sage-500">{stats.totalAnalyses}</div>
              <div className="text-sm text-ocean-400">Анализов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ocean-500">{stats.totalEmotions}</div>
              <div className="text-sm text-ocean-400">Эмоций</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="method" className="bg-cloud py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-ocean-500 mb-4">Три кита эмоционального интеллекта</h2>
            <p className="text-ocean-400">
              Проверенная система для осознанной работы с эмоциями
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-rose-50 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-500 mb-3">108 эмоций</h3>
              <p className="text-ocean-400">
                Детальный каталог эмоциональных состояний для точной идентификации того, что вы чувствуете
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-calm-50 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-calm-500" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-500 mb-3">Шкала Хокинса</h3>
              <p className="text-ocean-400">
                Уровни сознания от 20 до 1000 для отслеживания вашего эмоционального роста
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-sage-50 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-sage-500" />
              </div>
              <h3 className="text-xl font-semibold text-ocean-500 mb-3">8 шагов Седона</h3>
              <p className="text-ocean-400">
                Проверенный метод трансформации эмоций через осознанность и принятие
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course */}
      <section id="course" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-ocean-500 mb-4">Курс "Дневник Эмоций"</h2>
              <p className="text-ocean-400">
                30 дней практики для трансформации вашего эмоционального опыта
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-xl border border-rose-200">
                <BookOpen className="h-8 w-8 text-rose-500 mb-3" />
                <h3 className="font-semibold text-ocean-500 mb-2">9 категорий эмоций</h3>
                <p className="text-sm text-ocean-400">
                  От апатии до умиротворения - пройдите весь спектр эмоциональных состояний
                </p>
              </div>

              <div className="bg-gradient-to-br from-calm-50 to-calm-100 p-6 rounded-xl border border-calm-200">
                <Brain className="h-8 w-8 text-calm-500 mb-3" />
                <h3 className="font-semibold text-ocean-500 mb-2">24/7 Telegram-бот</h3>
                <p className="text-sm text-ocean-400">
                  Ваш персональный помощник всегда под рукой
                </p>
              </div>

              <div className="bg-gradient-to-br from-sage-50 to-sage-100 p-6 rounded-xl border border-sage-200">
                <Users className="h-8 w-8 text-sage-500 mb-3" />
                <h3 className="font-semibold text-ocean-500 mb-2">Сообщество практиков</h3>
                <p className="text-sm text-ocean-400">
                  Делитесь опытом и поддерживайте друг друга
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border border-amber-200">
                <Target className="h-8 w-8 text-amber-500 mb-3" />
                <h3 className="font-semibold text-ocean-500 mb-2">Lifetime доступ</h3>
                <p className="text-sm text-ocean-400">
                  Возвращайтесь к курсу когда угодно
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-calm-500 via-calm-600 to-sage-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы начать трансформацию?
          </h2>
          <p className="text-calm-50 mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к сотням людей, которые уже изменили свою жизнь 
            через осознанную работу с эмоциями
          </p>
          <Link href="/bot">
            <Button size="lg" className="bg-white text-calm-600 hover:bg-cloud">
              Открыть Telegram-бот <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacts" className="border-t border-slate-200 py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-calm-500" />
                <span className="font-bold text-ocean-500">Дизайн Эмоций</span>
              </div>
              <p className="text-sm text-ocean-400">
                Платформа для развития эмоционального интеллекта
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-ocean-500 mb-4">Навигация</h3>
              <div className="space-y-2 text-sm">
                <div><a href="#method" className="text-ocean-400 hover:text-ocean-600">О методе</a></div>
                <div><a href="#course" className="text-ocean-400 hover:text-ocean-600">Курс</a></div>
                <div><Link href="/bot" className="text-ocean-400 hover:text-ocean-600">Telegram-бот</Link></div>
                <div><Link href="/dream" className="text-ocean-400 hover:text-ocean-600">Админка</Link></div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-ocean-500 mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-ocean-400">
                <div>Email: hello@designemotion.ru</div>
                <div>Telegram: @Emotiondesignbot</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-ocean-400">
            © 2025 Дизайн Эмоций. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  )
}
