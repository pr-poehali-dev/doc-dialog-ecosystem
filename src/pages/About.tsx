import { Navigation } from '@/components/Navigation';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            О проекте Док диалог
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Философия проекта</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                «Док диалог» — это не просто платформа, это экосистема для массажистов, школ и салонов. 
                Мы создаём пространство, где профессионалы могут развиваться, учиться и находить лучшие возможности 
                для своей карьеры.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Зачем создан проект</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Мы увидели, что в индустрии массажа не хватает единого центра, где можно получить качественное 
                образование, найти работу и общаться с коллегами. Док диалог объединяет всё это в одном месте.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Принципы и ценности</h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li>✨ <strong>Качество образования</strong> — только проверенные методики и эксперты</li>
                <li>🤝 <strong>Сообщество</strong> — поддержка и обмен опытом между профессионалами</li>
                <li>🚀 <strong>Развитие</strong> — постоянное совершенствование навыков</li>
                <li>💼 <strong>Возможности</strong> — доступ к вакансиям и клиентам</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Как устроена экосистема</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3">Для массажистов</h3>
                  <p className="text-gray-600">Обучение, инструменты, поиск работы и профессиональное развитие</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3">Для школ</h3>
                  <p className="text-gray-600">Платформа для размещения курсов и привлечения студентов</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3">Для салонов</h3>
                  <p className="text-gray-600">Доступ к базе квалифицированных специалистов</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
