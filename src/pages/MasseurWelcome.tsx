import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Navigation } from '@/components/Navigation';

export default function MasseurWelcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5"></div>
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url('https://cdn.poehali.dev/files/17976.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="container mx-auto px-6 pt-32 pb-24 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <div className="flex items-center gap-3 bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
                <Icon name="Sparkles" size={20} className="text-primary animate-pulse" />
                <span className="text-sm font-medium">Пространство профессионального диалога</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Док Диалог
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Для специалистов по телу, которые устали быть одни<br />
              со сложными запросами клиентов
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                onClick={() => navigate('/register/masseur')}
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Icon name="UserPlus" size={20} className="mr-2" />
                Начать бесплатно
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-6 border-2 hover:bg-secondary/50"
              >
                <Icon name="ArrowDown" size={20} className="mr-2" />
                Узнать больше
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Problem Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ты хорошо работаешь с телом
              </h2>
              <p className="text-xl text-muted-foreground">
                Но, скорее всего, сталкиваешься с этим:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: 'MessageCircleQuestion', text: 'Клиент приходит с болью, а уходит с вопросами' },
                { icon: 'Search', text: 'Тело реагирует, но причина как будто глубже' },
                { icon: 'HelpCircle', text: 'Ты чувствуешь, что «что-то ещё есть», но этому негде быть' },
                { icon: 'MessageSquareOff', text: 'Ты устал объяснять, что ты не просто «массажист»' },
                { icon: 'UserX', text: 'И устал быть с этим один' },
                { icon: 'BookX', text: 'Нигде нет ответов на твои профессиональные вопросы' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group p-6 bg-card border-2 border-border rounded-2xl hover:border-primary/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={item.icon as any} size={24} className="text-primary" />
                  </div>
                  <p className="text-lg leading-relaxed">{item.text}</p>
                </div>
              ))}
              
              <div className="md:col-span-2 lg:col-span-3 p-8 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl border-2 border-primary/20 text-center">
                <p className="text-2xl font-semibold">
                  Если ты узнаёшь себя — это место для тебя
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Dok Dialog */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Что такое «Док Диалог»
              </h2>
              <div className="space-y-4 text-xl text-muted-foreground">
                <p>Это не школа. Не курс. И не очередной «метод».</p>
              </div>
            </div>

            <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <p className="text-2xl font-semibold mb-8 text-center">
                Док Диалог — это пространство профессионального диалога,<br className="hidden md:block" />
                где специалисты по телу:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: 'Users', title: 'Разбирают реальные запросы', desc: 'клиентов' },
                  { icon: 'Brain', title: 'Учатся видеть связь', desc: 'тела, психики и контекста жизни' },
                  { icon: 'Heart', title: 'Перестают тащить всё', desc: 'на себе' },
                  { icon: 'Target', title: 'Начинают работать', desc: 'яснее, глубже и спокойнее' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg mb-1">{item.title}</p>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-6 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-2xl border border-primary/10 text-center">
                <p className="text-lg">
                  Здесь не учат «правильным техникам».<br />
                  Здесь учат <strong className="text-primary">понимать, что происходит</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Whom */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Для кого это пространство
              </h2>
              <p className="text-xl text-muted-foreground">Для тебя, если ты:</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                'Массажист / телесный терапевт / остеопат / реабилитолог',
                'Чувствуешь границу своего метода, но не хочешь в эзотерику',
                'Уважаешь тело, а не «чинку симптомов»',
                'Хочешь профессионального роста, а не мотивационных речей',
                'Готов думать, задавать вопросы и слышать ответы'
              ].map((text, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-5 bg-card border-2 border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Check" size={18} className="text-primary" />
                  </div>
                  <p className="text-lg">{text}</p>
                </div>
              ))}
            </div>

            <div className="text-center p-6 bg-secondary/50 rounded-2xl border-2 border-border">
              <p className="text-xl">
                Это <strong>не для всех</strong>. И это нормально.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Entry Format */}
      <section className="py-24 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <div className="flex items-center gap-2 bg-primary/10 px-5 py-2 rounded-full">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                  <span className="font-semibold">Формат входа</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Диалог первичной ясности
              </h2>
              <p className="text-xl text-muted-foreground">
                Мы не начинаем с обучения. Мы начинаем с <strong>разговора</strong>.
              </p>
            </div>

            <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 md:p-12 shadow-2xl mb-8">
              <p className="text-2xl font-semibold mb-8 text-center">
                Диалог первичной ясности — это:
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: 'Users', text: 'Небольшая группа специалистов' },
                  { icon: 'MessageSquare', text: 'Живой разбор реальных ситуаций из практики' },
                  { icon: 'HelpCircle', text: 'Вопросы, которые редко задают вслух' },
                  { icon: 'Lightbulb', text: 'Прояснение: где тело, где психика, где ожидания клиента' },
                  { icon: 'MapPin', text: 'Понимание, куда идти дальше — или не идти' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={24} className="text-primary" />
                    </div>
                    <p className="text-lg">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-secondary/50 rounded-2xl text-center space-y-2">
                <p className="text-lg">Без оценки.</p>
                <p className="text-lg">Без «ты неправильно работаешь».</p>
                <p className="text-lg">Без давления.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Что ты получаешь после диалога
              </h2>
              <p className="text-xl text-muted-foreground">Обычно люди выходят с ощущением:</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                { icon: 'Users', quote: 'я не один в этом', color: 'from-blue-500/10 to-blue-500/5' },
                { icon: 'Eye', quote: 'я лучше понимаю, что происходит с моими клиентами', color: 'from-purple-500/10 to-purple-500/5' },
                { icon: 'Shield', quote: 'я вижу, где мои границы — и это нормально', color: 'from-green-500/10 to-green-500/5' },
                { icon: 'Heart', quote: 'мне стало спокойнее работать', color: 'from-pink-500/10 to-pink-500/5' },
                { icon: 'TrendingUp', quote: 'появилось направление роста', color: 'from-orange-500/10 to-orange-500/5' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`p-6 bg-gradient-to-br ${item.color} border-2 border-border rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1`}
                >
                  <Icon name={item.icon as any} size={32} className="text-primary mb-4" />
                  <p className="text-xl font-medium">«{item.quote}»</p>
                </div>
              ))}
            </div>

            <div className="text-center p-8 bg-secondary/50 rounded-2xl border-2 border-border">
              <p className="text-lg leading-relaxed">
                Иногда — с решением войти дальше.<br />
                Иногда — просто с ясностью.<br />
                <strong>Оба варианта — честные.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                А что дальше?
              </h2>
            </div>

            <div className="bg-card border-2 border-border rounded-3xl p-8 md:p-12 shadow-xl">
              <p className="text-xl mb-8 text-center">
                Если тебе откликается формат и подход,<br className="hidden md:block" />
                внутри <strong className="text-primary">Док Диалога</strong> есть:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: 'Calendar', text: 'Регулярные профессиональные диалоги' },
                  { icon: 'Briefcase', text: 'Углублённая работа с кейсами' },
                  { icon: 'Sparkles', text: 'Формирование собственного стиля работы' },
                  { icon: 'Users', text: 'Участие в экосистеме специалистов' },
                  { icon: 'TrendingUp', text: 'Постепенный выход из одиночной практики' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as any} size={20} className="text-primary" />
                    </div>
                    <p className="text-lg">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-primary/5 rounded-2xl text-center">
                <p className="text-lg">
                  Но это <strong>следующий шаг</strong>.<br />
                  Сначала — диалог.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Важное
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { icon: 'ShieldOff', text: 'Не лечим вместо врачей' },
                { icon: 'Ban', text: 'Не обещаем чудес' },
                { icon: 'UserX', text: 'Не ломаем твою идентичность' },
                { icon: 'TrendingDown', text: 'Не продаём быстрые результаты' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-5 bg-secondary/50 rounded-xl border-2 border-border"
                >
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as any} size={20} className="text-muted-foreground" />
                  </div>
                  <p className="text-lg">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="p-8 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl border-2 border-primary/20 text-center">
              <p className="text-2xl font-semibold">
                Мы создаём <span className="text-primary">пространство мышления<br className="hidden md:block" /> и профессиональной опоры</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Если ты чувствуешь отклик
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-xl md:text-2xl leading-relaxed">
                Ты можешь войти в <strong>Диалог первичной ясности</strong><br className="hidden md:block" />
                и посмотреть, что это для тебя
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 text-lg text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Без обязательств</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>Без давления</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={20} className="text-primary" />
                  <span>С уважением</span>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => navigate('/register/masseur')}
              className="text-xl px-12 py-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              <Icon name="Sparkles" size={24} className="mr-3" />
              Зарегистрироваться как специалист
              <Icon name="ArrowRight" size={24} className="ml-3" />
            </Button>

            <div className="mt-16 p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-3xl shadow-xl">
              <p className="text-2xl md:text-3xl font-semibold leading-relaxed italic">
                <Icon name="Quote" size={32} className="inline-block text-primary/30 -mt-2" />
                <br />
                Иногда одного разговора достаточно,<br className="hidden md:block" />
                чтобы работа с телом перестала быть одиночной
                <br />
                <Icon name="Quote" size={32} className="inline-block text-primary/30 rotate-180 -mb-2" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacing */}
      <div className="h-20"></div>
    </div>
  );
}