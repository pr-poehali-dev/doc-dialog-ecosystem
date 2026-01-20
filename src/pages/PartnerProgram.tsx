import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import SchoolsFooter from "@/components/schools/SchoolsFooter";

export default function PartnerProgram() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden pt-[100px]">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center pb-16 sm:pb-24">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Партнерская программа
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
                Превратите вашу аудиторию и профессиональное влияние в стабильный доход
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                Присоединяйтесь к партнерской программе школы <span className="font-semibold text-primary">«Док Диалог»</span> и получайте высокое вознаграждение, рекомендуя лучшие образовательные продукты для массажистов и специалистов по здоровью. Мы ценим наших партнеров и создали максимально прозрачную и выгодную систему сотрудничества.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <a href="https://school.brossok.ru/aff/reg" target="_blank" rel="noopener noreferrer">
                    <Icon name="Handshake" className="mr-2" size={20} />
                    Стать партнером
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <a href="https://school.brossok.ru/login" target="_blank" rel="noopener noreferrer">
                    <Icon name="LogIn" className="mr-2" size={20} />
                    Войти в личный кабинет
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur-2xl" />
              <img 
                src="https://cdn.poehali.dev/files/f22d16f2-3ade-422b-ab72-960f10198776.jpg" 
                alt="Партнерство" 
                className="relative rounded-2xl shadow-2xl w-full h-[400px] sm:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Easy to Sell */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              Почему курсы «Док Диалог» легко рекомендовать и они продаются сами?
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Уникальное предложение на рынке, которое ценят ваши подписчики
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-6 border-primary/20">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Автор-практик с 17-летним опытом</h3>
                    <p className="text-muted-foreground">
                      Все курсы созданы Сергеем Водопьяновым — действующим врачом-остеопатом и мануальным терапевтом. Он не теоретик, а практик, который ежедневно применяет и оттачивает эти методики. Это — наше главное отличие и гарантия качества, которое чувствуют ваши клиенты.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Lock" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Контент, которого нет в открытом доступе</h3>
                    <p className="text-muted-foreground">
                      Мы не выкладываем наши ключевые методики бесплатно. Ваша аудитория знает: чтобы получить эти знания, нужно пройти обучение. Это создает высокую ценность и снижает возражения «найду в интернете бесплатно».
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="BookOpen" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Полный цикл обучения</h3>
                    <p className="text-muted-foreground">
                      Мы предлагаем и онлайн-курсы для удобства и доступности из любого региона, и офлайн-интенсивы для глубокой практики. Это позволяет вам охватить всю аудиторию.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">Результаты, которые говорят сами за себя</h3>
                    <p className="text-muted-foreground">
                      Наши выпускники получают реальные инструменты, которые сразу применяют в работе, повышая свой доход и экспертность. Их истории успеха — лучшая социальная реклама.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/a1776ecc-cc53-4714-8201-7ececc37dad1.jpg" 
                alt="Обучение практике" 
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              Как это работает?
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Всего 3 простых шага
            </p>

            <div className="space-y-8">
              <Card className="p-8 border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Регистрируйтесь</h3>
                    <p className="text-muted-foreground text-lg">
                      Подайте заявку и получите доступ к личному кабинету с вашими персональными промокодами и партнерскими ссылками.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Рекомендуйте</h3>
                    <p className="text-muted-foreground text-lg">
                      Делитесь ссылками и промокодами со своей аудиторией: в соцсетях, блоге, на сайте, в чатах или лично клиентам.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-primary/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Зарабатывайте</h3>
                    <p className="text-muted-foreground text-lg">
                      Получайте деньги за каждую успешную покупку и привлекайте других партнеров, увеличивая свой доход по двухуровневой системе.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              Выгодные условия, которые вас приятно удивят
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Наша программа разработана, чтобы ваше партнерство с нами было максимально прибыльным и долгосрочным
            </p>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <Card className="p-8 bg-gradient-to-br from-primary/10 to-background border-primary/30">
                  <h3 className="text-2xl font-bold mb-6">Двухуровневая система вознаграждений</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="px-3 py-1 bg-primary text-white rounded-full text-sm font-bold">
                          Уровень 1
                        </div>
                        <h4 className="text-xl font-bold">До 20% и более</h4>
                      </div>
                      <p className="text-muted-foreground ml-2">
                        Вы получаете 20% от стоимости любого курса, купленного по вашей ссылке или промокоду. Для крупных и постоянных партнеров мы готовы обсудить повышенный процент.
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="px-3 py-1 bg-primary/70 text-white rounded-full text-sm font-bold">
                          Уровень 2
                        </div>
                        <h4 className="text-xl font-bold">2% с продаж команды</h4>
                      </div>
                      <p className="text-muted-foreground ml-2">
                        Приводите в программу других участников (например, коллег-массажистов или блогеров) и получайте 2% от всех их продаж. Вы зарабатываете, даже когда ваша команда растет без вашего прямого участия.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/28ad23c0-e599-4177-9427-555b910b668e.jpg" 
                  alt="Заработок" 
                  className="rounded-2xl shadow-xl w-full h-[450px] object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-primary/20">
                <Icon name="Infinity" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-3">Пожизненное закрепление клиента</h3>
                <p className="text-muted-foreground">
                  Клиент, который совершил покупку по вашей ссылке, навсегда закрепляется за вами. Если он вернется и купит еще любой курс, даже через год, вы снова получите вознаграждение.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <Icon name="BarChart3" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-3">Честная и прозрачная аналитика</h3>
                <p className="text-muted-foreground">
                  В вашем личном кабинете в реальном времени отображается: количество переходов, статистика промокодов, все покупки и ваше вознаграждение, история выплат.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <Icon name="Calendar" className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold mb-3">Регулярные выплаты</h3>
                <p className="text-muted-foreground">
                  Выплаты происходят каждый месяц, 1-го числа. Чтобы получить вознаграждение за покупку, должно пройти минимум 30 дней с даты платежа.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Example Earnings */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Пример вашего заработка
            </h2>

            <Card className="p-8 lg:p-12 border-primary/30 bg-gradient-to-br from-background to-primary/5">
              <p className="text-lg text-muted-foreground mb-8">
                Давайте рассмотрим на реальном примере, как можно зарабатывать с нашей программой.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg mb-8">
                <p className="text-xl font-bold text-center">
                  Стоимость курса «ПРОДВИНУТЫЙ ЛЕЧЕБНЫЙ МАССАЖ» = 35 750 рублей
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="User" className="text-primary" size={24} />
                    Ваш личный доход (Уровень 1):
                  </h3>
                  <div className="ml-8 space-y-2">
                    <p className="text-muted-foreground">Вы лично привлекли 3 клиентов на этот курс.</p>
                    <p className="text-lg font-semibold">
                      Ваш заработок: 3 продажи × 35 750 руб. × 20% = <span className="text-primary text-2xl">21 450 рублей</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Icon name="Users" className="text-primary" size={24} />
                    Доход от вашей команды (Уровень 2):
                  </h3>
                  <div className="ml-8 space-y-2">
                    <p className="text-muted-foreground">
                      Вы привлекли в партнерскую программу 3 человек. Каждый из них тоже продал по 3 курса «ПРОДВИНУТЫЙ ЛЕЧЕБНЫЙ МАССАЖ».
                    </p>
                    <p className="text-muted-foreground">
                      Объем продаж вашей команды: 3 партнера × 3 продажи × 35 750 руб. = 321 750 рублей.
                    </p>
                    <p className="text-lg font-semibold">
                      Ваш заработок с команды: 321 750 руб. × 2% = <span className="text-primary text-2xl">6 435 рублей</span>
                    </p>
                  </div>
                </div>

                <div className="bg-primary text-white p-6 rounded-lg">
                  <h3 className="text-2xl font-bold mb-2">Ваш общий доход в этом месяце:</h3>
                  <p className="text-3xl font-bold">
                    21 450 руб. + 6 435 руб. = 27 885 рублей
                  </p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mt-8 text-center font-medium">
                И это всего с одного курса! А в нашем каталоге их больше + есть закрытые курсы, которые доступны только партнерам, и ваши клиенты могут покупать их снова и снова.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Дополнительные преимущества для наших партнеров
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6 border-primary/20">
                <Icon name="Image" className="text-primary mb-3" size={28} />
                <h3 className="text-lg font-bold mb-2">Готовые рекламные материалы</h3>
                <p className="text-muted-foreground">
                  Мы предоставляем баннеры, посты, сторис и другие материалы, чтобы вам было проще продвигать.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <Icon name="Headphones" className="text-primary mb-3" size={28} />
                <h3 className="text-lg font-bold mb-2">Поддержка персонального менеджера</h3>
                <p className="text-muted-foreground">
                  Помогаем с запуском и отвечаем на ваши вопросы.
                </p>
              </Card>

              <Card className="p-6 border-primary/20 sm:col-span-2">
                <Icon name="Zap" className="text-primary mb-3" size={28} />
                <h3 className="text-lg font-bold mb-2">Свобода в методах продвижения</h3>
                <p className="text-muted-foreground">
                  Вы сами выбираете, как и где рекламировать наши курсы — через соцсети, рассылки, мессенджеры или личные рекомендации.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Для кого эта программа?
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-4">
                  <Icon name="Megaphone" className="text-primary flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-bold mb-2">Блогеры и эксперты</h3>
                    <p className="text-muted-foreground text-sm">
                      В сфере здоровья, красоты, саморазвития и медицины.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-4">
                  <Icon name="Hand" className="text-primary flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-bold mb-2">Практикующие специалисты</h3>
                    <p className="text-muted-foreground text-sm">
                      Массажисты и мануальные терапевты с собственной клиентской базой.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-4">
                  <Icon name="School" className="text-primary flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-bold mb-2">Школы и академии</h3>
                    <p className="text-muted-foreground text-sm">
                      Желающие расширить портфель дополнительных образовательных продуктов.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-primary/20">
                <div className="flex items-start gap-4">
                  <Icon name="Store" className="text-primary flex-shrink-0" size={28} />
                  <div>
                    <h3 className="font-bold mb-2">Салоны и студии</h3>
                    <p className="text-muted-foreground text-sm">
                      Которые хотят рекомендовать своим сотрудникам и клиентам качественное обучение.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Часто задаваемые вопросы (FAQ)
            </h2>

            <div className="space-y-6">
              <Card className="p-6 border-primary/20">
                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                  <Icon name="HelpCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                  Сколько стоит регистрация в партнерской программе?
                </h3>
                <p className="text-muted-foreground ml-7">
                  Регистрация и участие — абсолютно бесплатны.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                  <Icon name="HelpCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                  Как и когда я получу свои деньги?
                </h3>
                <p className="text-muted-foreground ml-7">
                  Мы выплачиваем вознаграждение на банковскую карту (по реквизитам) или расчетный счет для ИП/ООО. Выплаты осуществляются 1-го числа каждого месяца за все покупки, совершенные более 30 дней назад.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                  <Icon name="HelpCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                  Почему действует правило 30 дней перед выплатой?
                </h3>
                <p className="text-muted-foreground ml-7">
                  Это защитный период для всех сторон. Он гарантирует, что платеж от покупателя прошел успешно, не был оспорен или отменен, и курс был им получен. Это стандартная мера в партнерском маркетинге, обеспечивающая честность расчетов.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                  <Icon name="HelpCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                  Действительно ли клиент закрепляется за мной навсегда?
                </h3>
                <p className="text-muted-foreground ml-7">
                  Да, это так. Если человек купил курс по вашей ссылке, он навсегда становится «вашим» в системе. Все его последующие покупки также принесут вам вознаграждение.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                  <Icon name="HelpCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                  Как я могу отслеживать свои результаты?
                </h3>
                <p className="text-muted-foreground ml-7">
                  После регистрации вам откроется личный кабинет с детальной статистикой: переходы, конверсии, ожидающие и одобренные к выплате средства.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                  <Icon name="HelpCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                  Есть ли ограничение по сумме, которую я могу заработать?
                </h3>
                <p className="text-muted-foreground ml-7">
                  Нет, потолка нет. Чем больше и активнее вы рекомендуете, тем больше зарабатываете.
                </p>
              </Card>

              <Card className="p-6 border-primary/20">
                <h3 className="text-lg font-bold mb-2 flex items-start gap-2">
                  <Icon name="HelpCircle" className="text-primary flex-shrink-0 mt-1" size={20} />
                  Моя аудитория — не только массажисты. Что я могу им предложить?
                </h3>
                <p className="text-muted-foreground ml-7">
                  В нашем каталоге есть курсы по основам анатомии, самомассажу, здоровью спины, которые будут интересны широкой аудитории, ведущей ЗОЖ.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Готовы начать зарабатывать с «Док Диалог»?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Присоединяйтесь к сообществу успешных партнеров сегодня. Регистрация займет менее 1 минуты.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <a href="https://school.brossok.ru/aff/reg" target="_blank" rel="noopener noreferrer">
                <Icon name="Handshake" className="mr-2" size={20} />
                Стать партнером
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary" asChild>
              <a href="https://school.brossok.ru/aff" target="_blank" rel="noopener noreferrer">
                <Icon name="LogIn" className="mr-2" size={20} />
                Войти в личный кабинет
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SchoolsFooter />
    </div>
  );
}