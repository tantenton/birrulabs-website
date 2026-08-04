import { FC, ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { inter } from '@/lib/fonts';
import '@/styles/globals.css';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={`min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200 ${inter.variable} font-sans`}>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
