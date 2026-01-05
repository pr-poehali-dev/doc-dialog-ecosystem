import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MainContent from "@/components/MainContent";
import RegistrationDialog from "@/components/RegistrationDialog";

type UserType = 'masseur' | 'school' | 'salon' | null;

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userType, setUserType] = useState<UserType>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openDialog = (type: UserType) => {
    setUserType(type);
    setIsDialogOpen(true);
  };

  const getDialogContent = () => {
    switch (userType) {
      case 'masseur':
        return {
          title: 'Регистрация специалиста',
          description: 'Присоединяйтесь к профессиональному сообществу специалистов по телу',
          icon: 'Users'
        };
      case 'school':
        return {
          title: 'Регистрация школы',
          description: 'Разместите свои курсы и найдите учеников',
          icon: 'GraduationCap'
        };
      case 'salon':
        return {
          title: 'Регистрация салона',
          description: 'Найдите квалифицированных специалистов для вашего бизнеса',
          icon: 'Building2'
        };
      default:
        return {
          title: '',
          description: '',
          icon: 'Users'
        };
    }
  };

  const dialogContent = getDialogContent();

  return (
    <div className="min-h-screen bg-background">
      <Navigation scrollToSection={scrollToSection} />
      <HeroSection openDialog={openDialog} />
      <MainContent openDialog={openDialog} />
      <RegistrationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        userType={userType}
        dialogContent={dialogContent}
      />
    </div>
  );
};

export default Index;