
import { FloatingNav } from "@/components/ui/floating-navbar";
import { CTASection } from "@/components/sections/cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import TeamSection from "@/components/sections/team-section";
import FeaturesSection from "@/components/sections/features-section";
import HeroSection from "@/components/sections/hero";
import { testimonials } from "@/data/testimonials";
import { navItems } from "@/data/navItems";
import useShowScrollTop from "@/hooks/use-showScrollTop";
import ScrollTopIcon from "@/components/scroll-top-icon";

// Testimonials data


// Navigation items for floating nav


// Custom hook to show scroll-to-top button only when not in hero section


export default function HomePage() {
	// Scroll to top handler
	
	

	return (
		<main className="min-h-screen max-md:px-1 bg-white w-full dark:bg-black relative">
			<div className="hidden md:block">
				<FloatingNav navItems={navItems} />
			</div>

			{/* Hero Section */}
			<HeroSection /> 

			{/* Features */}
			<FeaturesSection />

			{/* Team Section */}
			<TeamSection />
			{/* Testimonials */}
			<TestimonialsSection testimonials={testimonials} />

			{/* CTA Section */}
			<CTASection />

			{/* Scroll to Top Button */}
			<ScrollTopIcon  />
		</main>
	);
}
