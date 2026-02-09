const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Расшифровка заключения врача
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-4">
          Инструмент для массажистов и телесных специалистов
        </p>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
          Поймите запрос клиента спокойно, понятно и безопасно — без догадок и медицинских рисков.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
