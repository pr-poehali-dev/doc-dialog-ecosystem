const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
              💎 Премиум-инструмент для профессионалов
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Расшифровка заключения врача
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-6 font-light">
              Инструмент для массажистов и телесных специалистов
            </p>
            <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed">
              Поймите запрос клиента спокойно, понятно и безопасно — без догадок и медицинских рисков.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                Попробовать бесплатно
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg border-2 border-slate-200 hover:border-slate-300 transition-all">
                Узнать больше
              </button>
            </div>
          </div>
          
          {/* Right column - Hero image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/73e2d44e-d132-4acd-a468-5e243464d633.jpg" 
                alt="Профессиональный массажист" 
                className="w-full h-auto object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
            </div>
            {/* Floating badges */}
            <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border-2 border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Безопасно</p>
                  <p className="text-sm text-slate-600">Без рисков</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 border-2 border-purple-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Быстро</p>
                  <p className="text-sm text-slate-600">За 2 минуты</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;