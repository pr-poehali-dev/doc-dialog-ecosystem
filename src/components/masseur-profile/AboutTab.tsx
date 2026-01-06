import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Masseur {
  id: number;
  full_name: string;
  city: string;
  experience_years: number;
  specializations: string[];
  avatar_url: string | null;
  rating: number;
  reviews_count: number;
  about: string;
  phone: string;
  certificates?: string[];
  portfolio_images?: string[];
  education?: string;
  languages?: string[];
  verification_badges?: string[];
  is_premium?: boolean;
}

interface AboutTabProps {
  masseur: Masseur;
}

export default function AboutTab({ masseur }: AboutTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>О специалисте</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">{masseur.about}</p>
        
        {masseur.education && (
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Icon name="GraduationCap" size={20} className="text-primary" />
              Образование
            </h3>
            <p className="text-muted-foreground">{masseur.education}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
