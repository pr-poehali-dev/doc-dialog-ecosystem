import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function PartnerDetails() {
  return (
    <>
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
    </>
  );
}
