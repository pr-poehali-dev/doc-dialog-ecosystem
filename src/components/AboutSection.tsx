const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Что такое Док диалог
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Док диалог — это не просто курсы и не просто боты.
          </p>
          <p className="text-xl mb-8">
            Это экосистема, которая объединяет обучение, практические инструменты, профессиональное сообщество и рынок работы в сфере телесных практик.
          </p>
          <p className="text-lg text-muted-foreground">
            Мы создаём среду, где специалист по телу развивается системно — от первых шагов до уверенной практики и карьеры.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
