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
    </>
  );
}
