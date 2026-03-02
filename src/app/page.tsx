import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PremiumStats } from "@/components/sections/PremiumStats";
import { ProjectEstimator } from "@/components/sections/ProjectEstimator";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <PremiumStats />
      <ProjectEstimator />
      <FeaturedProjects />
    </>
  );
}
