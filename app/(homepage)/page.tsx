"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Star,
	Users,
	Briefcase,
	TrendingUp,
	ArrowRight,
	Home,
	Building2,
	Play,
	CheckCircle,
	Zap,
	Shield,
	Globe,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "framer-motion";
import Link from "next/link";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { useState } from "react";
import TeamSection from "@/components/sections/team-section";
import FeaturesSection from "@/components/sections/features-section";
import Image from "next/image";

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
			<HeroHighlight containerClassName="relative overflow-hidden h-full flex items-center w-full">
				<Spotlight
					className="absolute -top-40 left-0 md:left-60 md:-top-20"
					fill="blue"
				/>
				<GridPattern className="absolute inset-0 opacity-20" />
				<Meteors number={30} />

				<div className="container mx-auto px-4 relative z-20 py-5">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Content */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="space-y-8"
						>
							{/* Badge */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-4 py-2 text-sm font-medium">
									🚀 AI-Powered Talent Matching
								</Badge>
							</motion.div>

							{/* Main Headline */}
							<div className="space-y-4">
								<motion.h1
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.6 }}
									className="text-3xl md:text-4xl lg:text-7xl font-bold leading-tight"
								>
									Connect with{" "}
									<Highlight className="text-black dark:text-white">
										Top Talent
									</Highlight>{" "}
									Instantly
								</motion.h1>

								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.8 }}
									className="text-[14px] md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
								>
									Our AI-powered platform matches companies
									with verified professionals based on skills,
									ratings, and experience. Build your dream
									team in minutes, not months.
								</motion.p>
							</div>

							{/* CTA Buttons */}
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 1 }}
								className="flex flex-col sm:flex-row gap-4"
							>
								<Link href="/auth/register?role=company">
									<Button
										size="lg"
										className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg group"
									>
										Hire Top Talent
										<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
									</Button>
								</Link>
								<Link href="/auth/register?role=staff">
									<Button
										size="lg"
										variant="outline"
										className="px-8 py-4 text-lg border-2 hover:bg-gray-50 dark:hover:bg-gray-900"
									>
										<Play className="mr-2 h-5 w-5" />
										Find Work
									</Button>
								</Link>
							</motion.div>

							{/* Trust Indicators */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 1.2 }}
								className="flex items-center space-x-6 pt-4"
							>
								<div className="flex items-center space-x-2">
									<CheckCircle className="h-5 w-5 text-green-500" />
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Verified Professionals
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Shield className="h-5 w-5 text-blue-500" />
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Secure Payments
									</span>
								</div>
								<div className="flex items-center space-x-2">
									<Zap className="h-5 w-5 text-yellow-500" />
									<span className="text-sm text-gray-600 dark:text-gray-400">
										Instant Matching
									</span>
								</div>
							</motion.div>
						</motion.div>

						{/* Right Content - Visual Elements */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="relative"
						>
							{/* Main Dashboard Preview */}
							<div className="relative mx-3">
								<motion.div
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 1, delay: 0.8 }}
									className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 relative overflow-hidden"
								>
									<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"></div>

									{/* Mock Dashboard Content */}
									<div className="relative z-10 space-y-4">
										<div className="flex items-center justify-between">
											<h3 className="text-lg font-semibold dark:text-white">
												Top Matches
											</h3>
											<Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
												98% Match
											</Badge>
										</div>

										{/* Mock Profile Cards */}
										<div className="space-y-3">
											{[1, 2, 3].map((i) => (
												<motion.div
													key={i}
													initial={{
														opacity: 0,
														x: 20,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													transition={{
														duration: 0.5,
														delay: 1 + i * 0.1,
													}}
													className="flex items-center space-x-3 p-3 z-10 bg-gray-50 dark:bg-gray-800 rounded-lg"
												>
													<div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
														{String.fromCharCode(
															65 + i
														)}
													</div>
													<div className="flex-1">
														<div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-1"></div>
														<div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
													</div>
													<div className="flex items-center space-x-1">
														<Star className="h-4 w-4 text-yellow-500 fill-current" />
														<span className="text-sm font-medium dark:text-white">
															4.{9 - i}
														</span>
													</div>
												</motion.div>
											))}
										</div>
									</div>
								</motion.div>

								{/* Floating Stats Cards */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 1.2 }}
									className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4"
								>
									<div className="flex items-center space-x-2">
										<Globe className="h-5 w-5 text-blue-500" />
										<div>
											<div className="text-lg font-bold dark:text-white">
												50K+
											</div>
											<div className="text-xs text-gray-500 dark:text-gray-400">
												Active Users
											</div>
										</div>
									</div>
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 1.4 }}
									className=" absolute   -bottom-12 -left-12 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 z-20"
								>
									<Image
										src="/hero/worker-team.png"
										alt="Professional team of workers and management"
										width={200}
										height={100}
										style={{
											transform: "translate(-16px, 16px)",
										}}
										className="mx-auto "
										priority
									/>
									{/* Floating badge on the image */}
									<motion.div
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.8,
											delay: 1,
										}}
										className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2"
									>
										<div className="flex items-center space-x-1">
											<Users className="h-3 w-3 text-blue-500" />
											<div>
												<div className="text-xs font-bold text-gray-900 dark:text-white">
													50K+
												</div>
												<div className="text-xs text-gray-500 dark:text-gray-400">
													Users
												</div>
											</div>
										</div>
									</motion.div>

									{/* Floating badge on the left */}
									<motion.div
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.8,
											delay: 1.2,
										}}
										className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-1"
									>
										<div className="flex items-center space-x-1">
											<Building2 className="h-3 w-3 text-green-500" />
											<div>
												<div className="text-xs font-bold text-gray-900 dark:text-white">
													10K+
												</div>
												<div className="text-xs text-gray-500 dark:text-gray-400">
													Companies
												</div>
											</div>
										</div>
									</motion.div>
								</motion.div>
							</div>
						</motion.div>
					</div>

					{/* Bottom Stats */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.6 }}
						className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
					>
						{[
							{
								number: "10K+",
								label: "Companies",
								icon: Building2,
							},
							{
								number: "50K+",
								label: "Professionals",
								icon: Users,
							},
							{
								number: "98%",
								label: "Success Rate",
								icon: TrendingUp,
							},
							{
								number: "4.9",
								label: "Average Rating",
								icon: Star,
							},
						].map((stat, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 0.5 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									duration: 0.6,
									delay: 1.8 + index * 0.1,
								}}
								className="group"
							>
								<div className="flex flex-col items-center space-y-2">
									<stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
									<div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
										{stat.number}
									</div>
									<div className="text-gray-600 dark:text-gray-400 text-sm">
										{stat.label}
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</HeroHighlight>

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
