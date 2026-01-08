import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

export default function MasseursCommunity() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://cdn.poehali.dev/projects/3e596a93-af99-49a5-ab3f-15835165eb7b/files/cb94208c-0e85-4837-bc48-8283536d0020.jpg"
                alt="Сообщество профессионалов"
                className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary/20">
                <Icon name="Users" className="text-primary" size={16} />
                <span className="text-sm font-semibold text-primary">Сильное комьюнити</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Растите вместе с профессионалами
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Док диалог — это не просто платформа. Это живое сообщество специалистов, которые помогают друг другу расти.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: "MessageSquare",
                    title: "Обмен опытом",
                    desc: "Обсуждайте сложные случаи, делитесь находками, учитесь у коллег"
                  },
                  {
                    icon: "Users",
                    title: "Нетворкинг",
                    desc: "Знакомьтесь с другими специалистами, находите партнёров для совместных проектов"
                  },
                  {
                    icon: "Lightbulb",
                    title: "Инсайты от экспертов",
                    desc: "Доступ к закрытым материалам, вебинарам и мастер-классам от топов индустрии"
                  },
                  {
                    icon: "Handshake",
                    title: "Взаимная поддержка",
                    desc: "Сообщество, где ценят профессионализм и помогают развиваться"
                  },
                ].map((item, index) => (
                  <Card key={index} className="animate-scale-in hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${index * 60}ms` }}>
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Icon name={item.icon} className="text-primary" size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold mb-1 text-base">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
