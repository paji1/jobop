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
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "framer-motion";
import Link from "next/link";

// Team data - easily expandable
const teamMembers = [
	{
		id: 1,
		name: "Sarah Johnson",
		designation: "CEO & Founder",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 2,
		name: "Michael Chen",
		designation: "CTO",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 3,
		name: "Emily Rodriguez",
		designation: "Head of Design",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 4,
		name: "David Kim",
		designation: "Lead Developer",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 5,
		name: "Lisa Thompson",
		designation: "Head of Marketing",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 6,
		name: "Alex Petrov",
		designation: "DevOps Engineer",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 7,
		name: "Maria Garcia",
		designation: "Product Manager",
		image: "/placeholder.svg?height=100&width=100",
	},
	{
		id: 8,
		name: "James Wilson",
		designation: "Data Scientist",
		image: "/placeholder.svg?height=100&width=100",
	},
];

// Testimonials data
const testimonials = [
	{
		quote: "JobOP transformed how we hire talent. The quality of matches is incredible and saved us months of recruitment time.",
		name: "Jennifer Adams",
		title: "HR Director at TechCorp",
	},
	{
		quote: "As a freelancer, this platform connected me with amazing opportunities. The loan feature helped me invest in new skills.",
		name: "Marcus Johnson",
		title: "Full Stack Developer",
	},
	{
		quote: "The AI-powered matching is spot on. We found our perfect team members within days, not weeks.",
		name: "Rachel Kim",
		title: "Startup Founder",
	},
	{
		quote: "Professional, efficient, and results-driven. JobOP is the future of talent acquisition.",
		name: "David Chen",
		title: "CTO at InnovateLab",
	},
	{
		quote: "The platform's rating system ensures we only work with top-quality professionals. Highly recommended!",
		name: "Sophie Martinez",
		title: "Project Manager",
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

export default function HomePage() {
	return (
		<div className="min-h-screen bg-white dark:bg-black">
			<FloatingNav navItems={navItems} />

			{/* Header */}
			<motion.header
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative border-b bg-white/80 backdrop-blur-sm dark:bg-black/80 dark:border-gray-800 z-50"
				id="home"
			>
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<motion.div
						className="flex items-center space-x-2"
						whileHover={{ scale: 1.05 }}
						transition={{
							type: "spring",
							stiffness: 400,
							damping: 10,
						}}
					>
						<div className="relative">
							<Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
							<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
						</div>
						<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							JobOP
						</span>
					</motion.div>
					<div className="flex items-center space-x-4">
						<ThemeToggle />
						<Link href="/auth/login">
							<Button
								variant="ghost"
								className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
							>
								Login
							</Button>
						</Link>
						<Link href="/auth/register">
							<Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
								Get Started
							</Button>
						</Link>
					</div>
				</div>
			</motion.header>

			{/* Hero Section */}
			<HeroHighlight containerClassName="relative overflow-hidden h-full flex items-center">
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
									className="text-base md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
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
									className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-20"
								>
									<div className="flex items-center space-x-2">
										<TrendingUp className="h-5 w-5 text-green-500" />
										<div>
											<div className="text-lg font-bold dark:text-white">
												98%
											</div>
											<div className="text-xs text-gray-500 dark:text-gray-400">
												Success Rate
											</div>
										</div>
									</div>
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
			<section
				className="py-20 bg-gray-50 dark:bg-gray-900"
				id="features"
			>
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-4 py-2 mb-4">
							Features
						</Badge>
						<h2 className="text-4xl font-bold mb-4 dark:text-white">
							Why Choose JobOP?
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Discover the powerful features that make talent
							matching effortless and effective.
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								icon: Star,
								title: "AI-Powered Matching",
								description:
									"Our advanced algorithm matches based on verified ratings, skills, and performance history",
								features: [
									"Smart skill assessment",
									"Performance analytics",
									"Verified reviews",
								],
								color: "from-yellow-400 to-orange-500",
								bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
							},
							{
								icon: Users,
								title: "Real-Time Dashboards",
								description:
									"Comprehensive analytics and live activity tracking for better decision making",
								features: [
									"Live activity feeds",
									"Performance metrics",
									"Project insights",
								],
								color: "from-blue-400 to-cyan-500",
								bgColor: "bg-blue-50 dark:bg-blue-900/20",
							},
							{
								icon: TrendingUp,
								title: "Financial Support",
								description:
									"Loan services and financial tools to help professionals grow their careers",
								features: [
									"Quick loan approval",
									"Competitive rates",
									"Flexible terms",
								],
								color: "from-green-400 to-emerald-500",
								bgColor: "bg-green-50 dark:bg-green-900/20",
							},
						].map((feature, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 50 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.6,
									delay: index * 0.2,
								}}
								viewport={{ once: true }}
								whileHover={{ y: -10 }}
								className="group"
							>
								<Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden">
									<CardHeader className="relative">
										<div
											className={`absolute inset-0 ${feature.bgColor} opacity-50`}
										></div>
										<div className="relative z-10">
											<div
												className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
											>
												<feature.icon className="h-6 w-6 text-white" />
											</div>
											<CardTitle className="text-xl dark:text-white">
												{feature.title}
											</CardTitle>
											<CardDescription className="dark:text-gray-300 text-base">
												{feature.description}
											</CardDescription>
										</div>
									</CardHeader>
									<CardContent className="relative z-10">
										<ul className="space-y-3">
											{feature.features.map(
												(item, idx) => (
													<motion.li
														key={idx}
														initial={{
															opacity: 0,
															x: -20,
														}}
														whileInView={{
															opacity: 1,
															x: 0,
														}}
														transition={{
															duration: 0.4,
															delay:
																index * 0.2 +
																idx * 0.1,
														}}
														viewport={{
															once: true,
														}}
														className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
													>
														<CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
														<span>{item}</span>
													</motion.li>
												)
											)}
										</ul>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="py-20 bg-white dark:bg-black" id="team">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-2 mb-4">
							Our Team
						</Badge>
						<h2 className="text-4xl font-bold mb-4 dark:text-white">
							Meet the Innovators
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Our diverse team of experts is passionate about
							connecting talent with opportunity. Get to know the
							people behind JobOP.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="flex flex-row items-center justify-center mb-12 w-full"
					>
						<AnimatedTooltip items={teamMembers} />
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						viewport={{ once: true }}
						className="text-center"
					>
						<p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
							Want to join our amazing team?
						</p>
						<Button
							variant="outline"
							size="lg"
							className="group border-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
						>
							View Open Positions
							<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 bg-gray-50 dark:bg-gray-900">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-4 py-2 mb-4">
							Testimonials
						</Badge>
						<h2 className="text-4xl font-bold mb-4 dark:text-white">
							What Our Users Say
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
							Don't just take our word for it. Here's what our
							community has to say about their experience.
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						<InfiniteMovingCards
							items={testimonials}
							direction="right"
							speed="slow"
						/>
					</motion.div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"></div>
				<GridPattern className="absolute inset-0 opacity-20" />
				<Meteors number={20} />

				<div className="container mx-auto px-4 text-center relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="max-w-4xl mx-auto"
					>
						<h2 className="text-5xl font-bold text-white mb-6">
							Ready to Transform Your Career?
						</h2>
						<p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
							Join thousands of professionals who have found their
							perfect match on JobOP. Start your journey today.
						</p>
						<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
							<Link href="/auth/register?role=staff">
								<Button
									size="lg"
									className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
								>
									Get Started Free
								</Button>
							</Link>
							<Link href="/auth/login">
								<Button
									size="lg"
									variant="outline"
									className="px-8 py-4 text-lg font-semibold text-white border-white hover:bg-white/10"
								>
									Learn More
								</Button>
							</Link>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 dark:bg-black text-white py-12">
				<div className="container mx-auto px-4 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<div className="flex items-center justify-center space-x-2 mb-4">
							<Briefcase className="h-6 w-6" />
							<span className="text-xl font-bold">JobOP</span>
						</div>
						<p className="text-gray-400">
							© 2024 JobOP. All rights reserved.
						</p>
					</motion.div>
				</div>
			</footer>
		</div>
	);
}
