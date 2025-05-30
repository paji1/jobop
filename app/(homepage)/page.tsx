"use client";
import {
	Star,
	Users,
	ArrowRight,
	Home,
	Building2,
} from "lucide-react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { useState } from "react";
import TeamSection from "@/components/sections/team-section";
import FeaturesSection from "@/components/sections/features-section";
import Image from "next/image";
import HeroSection from "@/components/sections/hero";

// Testimonials data
const testimonials = [
	{
		quote: "JobOP transformed how we hire talent. The quality of matches is incredible and saved us months of recruitment time. The AI-powered system really understands what we're looking for.",
		name: "Jennifer Adams",
		title: "HR Director at TechCorp",
		rating: 5,
	},
	{
		quote: "As a freelancer, this platform connected me with amazing opportunities. The loan feature helped me invest in new skills and grow my career exponentially.",
		name: "Marcus Johnson",
		title: "Full Stack Developer",
		rating: 5,
	},
	{
		quote: "The AI-powered matching is spot on. We found our perfect team members within days, not weeks. The quality of candidates is consistently high.",
		name: "Rachel Kim",
		title: "Startup Founder",
		rating: 5,
	},
	{
		quote: "Professional, efficient, and results-driven. JobOP is the future of talent acquisition. The platform's interface is intuitive and powerful.",
		name: "David Chen",
		title: "CTO at InnovateLab",
		rating: 5,
	},
	{
		quote: "The platform's rating system ensures we only work with top-quality professionals. Highly recommended for any serious business looking for talent!",
		name: "Sophie Martinez",
		title: "Project Manager",
		rating: 5,
	},
	{
		quote: "Outstanding support and seamless experience. The team behind JobOP really cares about connecting the right people with the right opportunities.",
		name: "Alex Thompson",
		title: "Design Director",
		rating: 5,
	},
];

// Navigation items for floating nav
const navItems = [
	{
		name: "Home",
		link: "#home",
		icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Features",
		link: "#features",
		icon: <Star className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Team",
		link: "#team",
		icon: <Users className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "About",
		link: "#about",
		icon: (
			<Building2 className="h-4 w-4 text-neutral-500 dark:text-white" />
		),
	},
];

// Custom hook to show scroll-to-top button only when not in hero section
function useShowScrollTop() {
	const [show, setShow] = useState(false);

	if (typeof window !== "undefined") {
		// Attach scroll event directly (no useEffect)
		window.onscroll = () => {
			const hero = document.getElementById("home");
			if (!hero) return;
			const heroBottom = hero.getBoundingClientRect().bottom;
			setShow(heroBottom < 0);
		};
	}

	return show;
}

export default function HomePage() {
	// Scroll to top handler
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const showScrollTop = useShowScrollTop();

	return (
		<div className="min-h-screen max-md:px-1 bg-white w-full dark:bg-black relative">
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

			{/* Footer */}

			{/* Scroll to Top Button */}
			{showScrollTop && (
				<button
					onClick={scrollToTop}
					aria-label="Scroll to top"
					className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg p-3 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400"
					style={{
						boxShadow: "0 4px 24px 0 rgba(80, 63, 205, 0.15)",
					}}
				>
					<ArrowRight className="rotate-[-90deg] h-6 w-6" />
				</button>
			)}
		</div>
	);
}
