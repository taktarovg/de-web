import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  ProblemSection,
  SolutionSection,
  ProgramSection,
  CasesSection,
  AuthorSection,
  CTASection
} from '@/components/home';

export const metadata = {
  title: 'Дизайн Эмоций | Персональное сопровождение для лидеров',
  description: 'Превратите эмоции из врагов в стратегический актив. Персональная программа для лидеров, принимающих решения с высокой ценой ошибки. Георгий Тактаров.'
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Problem */}
        <ProblemSection />

        {/* 3. Solution */}
        <SolutionSection />

        {/* 4. Program (3 тарифа) */}
        <ProgramSection />

        {/* 5. Cases (2 кейса) */}
        <CasesSection />

        {/* 6. Author */}
        <AuthorSection />

        {/* 7. CTA (форма заявки) */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
