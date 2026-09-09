import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { Publications } from '@/components/sections/publications';
import { Thoughts, ResearchData } from '@/components/sections/thoughts';

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Publications />
        <ResearchData />
        <Thoughts />
      </main>
      <Footer />
    </div>
  );
}
