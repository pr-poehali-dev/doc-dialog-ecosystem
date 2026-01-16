const BrandCourseAbout = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          О курсе
        </h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            «Массажист 2.0» — это практический онлайн-курс для массажистов и телесных специалистов, 
            которые хотят перестать зависеть от сарафанного радио и создать устойчивый поток клиентов 
            через личный бренд и системный маркетинг.
          </p>
          
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Курс переводит специалиста:</h3>
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
              <div className="flex-1 text-center">
                <p className="text-lg text-gray-700">от «хорошего мастера»</p>
              </div>
              <div className="text-3xl text-primary">→</div>
              <div className="flex-1 text-center">
                <p className="text-lg font-semibold text-primary">к эксперту с понятным позиционированием, маркетингом и прогнозируемым доходом</p>
              </div>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 mb-6">
            Вы учитесь мыслить как предприниматель, выстраивать путь клиента, запускать рекламу, 
            создавать контент и принимать маркетинговые решения на основе цифр, а не интуиции.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseAbout;
