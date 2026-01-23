const BrandCourseAbout = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          О курсе
        </h2>
        
        <div className="max-w-none">
          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6">
            «Массажист 2.0» — это практический онлайн-курс для массажистов и телесных специалистов, 
            которые хотят перестать зависеть от сарафанного радио и создать устойчивый поток клиентов 
            через личный бренд и системный маркетинг.
          </p>
          
          <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-6 lg:p-8 rounded-2xl mb-6 md:mb-8 border border-indigo-200 shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">Курс переводит специалиста:</h3>
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <div className="flex-1 text-center">
                <p className="text-sm md:text-base lg:text-lg text-gray-700">от «хорошего мастера»</p>
              </div>
              <div className="text-2xl md:text-3xl text-primary font-bold">→</div>
              <div className="flex-1 text-center">
                <p className="text-sm md:text-base lg:text-lg font-semibold text-primary">к эксперту с понятным позиционированием, маркетингом и прогнозируемым доходом</p>
              </div>
            </div>
          </div>
          
          <p className="text-base md:text-lg text-gray-700">
            Вы учитесь мыслить как предприниматель, выстраивать путь клиента, запускать рекламу, 
            создавать контент и принимать маркетинговые решения на основе цифр, а не интуиции.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandCourseAbout;