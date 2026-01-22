const ArsenalCourseAbout = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          О курсе
        </h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 md:mb-6">
            «Арсенал массажиста» — это практический онлайн-курс для массажистов и телесных специалистов, 
            которые хотят работать глубже, безопаснее и результативнее, а не просто «прорабатывать мышцы».
          </p>
          
          <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-6 md:mb-8">
            Курс даёт системное понимание тела и готовые протоколы работы:
          </p>
          
          <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-primary text-xl md:text-2xl">•</span>
              <span className="text-sm md:text-base lg:text-lg text-gray-700">при болях в спине и шее</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-primary text-xl md:text-2xl">•</span>
              <span className="text-sm md:text-base lg:text-lg text-gray-700">при стрессовых и психосоматических состояниях</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-primary text-xl md:text-2xl">•</span>
              <span className="text-sm md:text-base lg:text-lg text-gray-700">при нарушениях осанки</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <span className="text-primary text-xl md:text-2xl">•</span>
              <span className="text-sm md:text-base lg:text-lg text-gray-700">при хроническом напряжении и функциональных блоках</span>
            </li>
          </ul>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-800 font-medium bg-gradient-to-r from-primary/10 via-purple-50 to-indigo-50 p-4 md:p-6 rounded-lg md:rounded-xl border border-primary/10 shadow-md">
            Это не набор разрозненных техник, а единая логика работы с телом, нервной системой и опорно-двигательным аппаратом.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseAbout;