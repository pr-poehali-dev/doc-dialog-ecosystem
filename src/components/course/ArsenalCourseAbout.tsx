const ArsenalCourseAbout = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          О курсе
        </h2>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            «Арсенал массажиста» — это практический онлайн-курс для массажистов и телесных специалистов, 
            которые хотят работать глубже, безопаснее и результативнее, а не просто «прорабатывать мышцы».
          </p>
          
          <p className="text-lg text-gray-600 mb-8">
            Курс даёт системное понимание тела и готовые протоколы работы:
          </p>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-primary text-2xl">•</span>
              <span className="text-lg text-gray-700">при болях в спине и шее</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-2xl">•</span>
              <span className="text-lg text-gray-700">при стрессовых и психосоматических состояниях</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-2xl">•</span>
              <span className="text-lg text-gray-700">при нарушениях осанки</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary text-2xl">•</span>
              <span className="text-lg text-gray-700">при хроническом напряжении и функциональных блоках</span>
            </li>
          </ul>
          
          <p className="text-xl text-gray-800 font-medium bg-gradient-to-r from-primary/10 to-purple-50 p-6 rounded-lg">
            Это не набор разрозненных техник, а единая логика работы с телом, нервной системой и опорно-двигательным аппаратом.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArsenalCourseAbout;
