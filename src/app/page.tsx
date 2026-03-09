import { Hero } from "@/components/sections/Hero";
import { AboutStats } from "@/components/sections/AboutStats";
import { Services } from "@/components/sections/Services";
import { PremiumStats } from "@/components/sections/PremiumStats";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Team } from "@/components/sections/Team";
import { QuoteForm } from "@/components/sections/QuoteForm";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutStats />
      <Services />
      <PremiumStats />
      <ProjectEstimator />
      <FeaturedProjects />
      <Team />
      <section id="contact" className="py-24 bg-background/50 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
