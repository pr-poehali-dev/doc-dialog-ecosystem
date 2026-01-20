import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function PartnerBenefits() {
  return (
    <>
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
                src="https://cdn.poehali.dev/files/d1e24142-7677-4823-ae55-9b6fd7dc3016.jpg" 
                alt="Обучение практике" 
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}
