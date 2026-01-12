import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function MasseurWelcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-slate-900">
            Док Диалог
          </h1>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Пространство профессионального диалога<br />для специалистов по телу
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-16">
          {/* Section 1 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-slate-900">
              Ты хорошо работаешь с телом.
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed">
              Но, скорее всего, сталкиваешься с этим:
            </p>
            <ul className="space-y-4 text-slate-700">
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>клиент приходит с болью, а уходит с вопросами</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>тело реагирует, но причина как будто глубже</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>ты чувствуешь, что «что-то ещё есть», но этому негде быть</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>ты устал объяснять, что ты не просто «массажист»</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>и устал быть с этим один</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700 italic pt-4">
              Если ты узнаёшь себя — это место для тебя.
            </p>
          </section>

          <div className="border-t border-slate-200"></div>

          {/* Section 2 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-slate-900">
              Что такое «Док Диалог»
            </h2>
            <div className="space-y-4 text-lg text-slate-700">
              <p>Это не школа.<br />Не курс.<br />И не очередной «метод».</p>
              <p className="font-medium text-slate-900">
                Док Диалог — это пространство профессионального диалога,<br />где специалисты по телу:
              </p>
              <ul className="space-y-3 pl-6">
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>разбирают реальные запросы клиентов</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>учатся видеть связь тела, психики и контекста жизни</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>перестают тащить всё на себе</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>и начинают работать <strong>яснее, глубже и спокойнее</strong></span>
                </li>
              </ul>
              <p className="pt-4">
                Здесь не учат «правильным техникам».<br />
                Здесь учат <strong>понимать, что происходит</strong>.
              </p>
            </div>
          </section>

          <div className="border-t border-slate-200"></div>

          {/* Section 3 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-slate-900">
              Для кого это пространство
            </h2>
            <p className="text-lg text-slate-700">Для тебя, если ты:</p>
            <ul className="space-y-3 text-slate-700 pl-6">
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>массажист / телесный терапевт / остеопат / реабилитолог</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>чувствуешь границу своего метода, но не хочешь в эзотерику</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>уважаешь тело, а не «чинку симптомов»</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>хочешь профессионального роста, а не мотивационных речей</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>готов думать, задавать вопросы и слышать ответы</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700 pt-4">
              Это <strong>не для всех</strong>.<br />
              И это нормально.
            </p>
          </section>

          <div className="border-t border-slate-200"></div>

          {/* Section 4 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-slate-900">
              Формат входа — Диалог первичной ясности
            </h2>
            <div className="space-y-4 text-lg text-slate-700">
              <p>
                Мы не начинаем с обучения.<br />
                Мы начинаем с <strong>разговора</strong>.
              </p>
              <p className="font-medium text-slate-900">
                Диалог первичной ясности — это:
              </p>
              <ul className="space-y-3 pl-6">
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>небольшая группа специалистов</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>живой разбор реальных ситуаций из практики</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>вопросы, которые редко задают вслух</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>прояснение: где тело, где психика, где ожидания клиента</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>понимание, куда идти дальше — или не идти</span>
                </li>
              </ul>
              <p className="pt-4">
                Без оценки.<br />
                Без «ты неправильно работаешь».<br />
                Без давления.
              </p>
            </div>
          </section>

          <div className="border-t border-slate-200"></div>

          {/* Section 5 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-slate-900">
              Что ты получаешь после диалога
            </h2>
            <p className="text-lg text-slate-700">Обычно люди выходят с ощущением:</p>
            <ul className="space-y-3 text-slate-700 pl-6">
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>«я не один в этом»</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>«я лучше понимаю, что происходит с моими клиентами»</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>«я вижу, где мои границы — и это нормально»</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>«мне стало спокойнее работать»</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>«появилось направление роста»</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700 pt-4">
              Иногда — с решением войти дальше.<br />
              Иногда — просто с ясностью.<br />
              Оба варианта — честные.
            </p>
          </section>

          <div className="border-t border-slate-200"></div>

          {/* Section 6 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-slate-900">
              А что дальше?
            </h2>
            <div className="space-y-4 text-lg text-slate-700">
              <p>
                Если тебе откликается формат и подход,<br />
                внутри <strong>Док Диалога</strong> есть:
              </p>
              <ul className="space-y-3 pl-6">
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>регулярные профессиональные диалоги</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>углублённая работа с кейсами</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>формирование собственного стиля работы</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>участие в экосистеме специалистов</span>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="Circle" size={8} className="mt-2 fill-current" />
                  <span>и постепенный выход из одиночной практики</span>
                </li>
              </ul>
              <p className="pt-4">
                Но это <strong>следующий шаг</strong>.<br />
                Сначала — диалог.
              </p>
            </div>
          </section>

          <div className="border-t border-slate-200"></div>

          {/* Section 7 */}
          <section className="space-y-6">
            <h2 className="text-3xl font-light text-slate-900">
              Важное
            </h2>
            <p className="text-lg text-slate-700">Мы:</p>
            <ul className="space-y-3 text-slate-700 pl-6">
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>не лечим вместо врачей</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>не обещаем чудес</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>не ломаем твою идентичность</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="Circle" size={8} className="mt-2 fill-current" />
                <span>не продаём быстрые результаты</span>
              </li>
            </ul>
            <p className="text-lg text-slate-900 font-medium pt-4">
              Мы создаём <strong>пространство мышления и профессиональной опоры</strong>.
            </p>
          </section>

          <div className="border-t border-slate-200"></div>

          {/* CTA Section */}
          <section className="space-y-8 py-8">
            <h2 className="text-3xl font-light text-slate-900 text-center">
              Если ты чувствуешь отклик
            </h2>
            <div className="space-y-6 text-center max-w-2xl mx-auto">
              <p className="text-lg text-slate-700">
                Ты можешь войти в <strong>Диалог первичной ясности</strong><br />
                и посмотреть, что это для тебя.
              </p>
              <p className="text-slate-600">
                Без обязательств.<br />
                Без давления.<br />
                С уважением к тебе и твоей практике.
              </p>
              <Button
                size="lg"
                onClick={() => navigate('/register/masseur')}
                className="text-lg px-8 py-6 mt-8"
              >
                Зарегистрироваться как специалист
              </Button>
              <p className="text-xl text-slate-700 italic pt-6 leading-relaxed">
                <strong>Иногда одного разговора достаточно,<br />
                чтобы работа с телом перестала быть одиночной.</strong>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
