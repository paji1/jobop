"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Star, Users, TrendingUp, Award } from "lucide-react";

interface TestimonialsData {
	quote: string;
	name: string;
	title: string;
	rating?: number;
	avatar?: string;
}

interface TestimonialsSectionProps {
	title?: string;
	subtitle?: string;
	badge?: string;
	testimonials: TestimonialsData[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	showStats?: boolean;
}

export function TestimonialsSection({
	title = "What Our Users Say",
	subtitle = "Don't just take our word for it. Here's what our community has to say about their experience.",
	badge = "Testimonials",
	testimonials,
	direction = "right",
	speed = "slow",
	showStats = true,
}: TestimonialsSectionProps) {
	const stats = [
		{
			icon: Star,
			value: "4.9/5",
			label: "Average Rating",
			color: "text-yellow-500",
		},
		{
			icon: Users,
			value: "50K+",
			label: "Happy Users",
			color: "text-blue-500",
		},
		{
			icon: TrendingUp,
			value: "98%",
			label: "Success Rate",
			color: "text-green-500",
		},
		{
			icon: Award,
			value: "500+",
			label: "5-Star Reviews",
			color: "text-purple-500",
		},
	];

	return (
		<section className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>

			{/* Floating Orbs */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
			<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-400/5 rounded-full blur-3xl"></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 dark:bg-pink-400/5 rounded-full blur-3xl"></div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center mb-16"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
					>
						<Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-6 py-2 mb-6 text-sm font-medium">
							✨ {badge}
						</Badge>
					</motion.div>

					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						viewport={{ once: true }}
						className="text-4xl md:text-5xl font-bold mb-6 dark:text-white bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
					>
						{title}
					</motion.h2>

					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						viewport={{ once: true }}
						className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
					>
						{subtitle}
					</motion.p>
				</motion.div>

				{/* Testimonials Cards */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					viewport={{ once: true }}
					className="relative"
				>
					<InfiniteMovingCards
						items={testimonials}
						direction={direction}
						speed={speed}
						className="py-8"
					/>
				</motion.div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					viewport={{ once: true }}
					className="text-center mt-16"
				>
					<p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
						Join thousands of satisfied users who trust our platform
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
							<Star className="h-4 w-4 text-yellow-500 fill-current" />
							<span>Trusted by 50,000+ professionals</span>
						</div>
						<div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
							<Award className="h-4 w-4 text-purple-500" />
							<span>Industry leading platform</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
