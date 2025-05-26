"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Footer } from "@/components/sections/footer";
import {
	ChevronDown,
	Search,
	Briefcase,
	Users,
	CreditCard,
	Shield,
	HelpCircle,
	MessageCircle,
	Mail,
	Phone,
} from "lucide-react";
import Link from "next/link";

const faqCategories = [
	{ id: "general", name: "General", icon: HelpCircle },
	{ id: "staff", name: "For Staff", icon: Users },
	{ id: "companies", name: "For Companies", icon: Briefcase },
	{ id: "billing", name: "Billing & Pricing", icon: CreditCard },
	{ id: "security", name: "Security & Privacy", icon: Shield },
];

const faqs = [
	// General
	{
		id: 1,
		category: "general",
		question: "What is JobOp?",
		answer: "JobOp is a comprehensive staffing platform that connects talented professionals with companies looking for skilled workers. We use advanced matching algorithms to ensure the best fit for both parties.",
	},
	{
		id: 2,
		category: "general",
		question: "How does the matching process work?",
		answer: "Our AI-powered matching system analyzes skills, experience, location preferences, and company culture to create optimal matches. We consider both technical requirements and soft skills to ensure long-term success.",
	},
	{
		id: 3,
		category: "general",
		question: "Is JobOp free to use?",
		answer: "For job seekers, creating a profile and applying to positions is completely free. Companies pay subscription fees based on their hiring needs and the level of service required.",
	},

	// For Staff
	{
		id: 4,
		category: "staff",
		question: "How do I create a compelling profile?",
		answer: "Include detailed information about your skills, experience, and career goals. Upload a professional photo, add portfolio samples, and keep your profile updated. Our profile strength indicator helps you optimize your visibility.",
	},
	{
		id: 5,
		category: "staff",
		question: "Can I work with multiple companies?",
		answer: "Yes! Many of our professionals work with multiple clients simultaneously. You can set your availability preferences and manage multiple contracts through our platform.",
	},
	{
		id: 6,
		category: "staff",
		question: "How do I get paid?",
		answer: "Payments are processed weekly through our secure payment system. You can choose from direct deposit, PayPal, or other payment methods. All payments are tracked and documented for tax purposes.",
	},
	{
		id: 7,
		category: "staff",
		question: "What if I have issues with a client?",
		answer: "Our support team is available 24/7 to help resolve any issues. We have established protocols for dispute resolution and will work to ensure fair outcomes for all parties.",
	},

	// For Companies
	{
		id: 8,
		category: "companies",
		question: "How quickly can I find qualified staff?",
		answer: "Most companies receive qualified candidates within 24-48 hours of posting a position. Our extensive talent pool and smart matching ensure rapid results.",
	},
	{
		id: 9,
		category: "companies",
		question: "Can I hire staff for long-term positions?",
		answer: "We support both short-term projects and long-term employment. You can convert temporary staff to permanent employees through our conversion program.",
	},
	{
		id: 10,
		category: "companies",
		question: "What vetting process do you use?",
		answer: "All professionals undergo background checks, skill assessments, and reference verification. We also use AI to analyze work history and performance patterns to ensure quality matches.",
	},
	{
		id: 11,
		category: "companies",
		question: "Do you offer replacement guarantees?",
		answer: "Yes, we offer a 30-day replacement guarantee. If a placement doesn't work out within the first 30 days, we'll provide a replacement at no additional cost.",
	},

	// Billing & Pricing
	{
		id: 12,
		category: "billing",
		question: "What are your pricing plans?",
		answer: "We offer flexible pricing based on your hiring volume and needs. Plans start at $99/month for small businesses and scale up for enterprise clients. Contact us for custom pricing.",
	},
	{
		id: 13,
		category: "billing",
		question: "Are there any hidden fees?",
		answer: "No hidden fees! Our pricing is transparent and includes all platform features. The only additional costs might be for premium add-ons like priority support or advanced analytics.",
	},
	{
		id: 14,
		category: "billing",
		question: "Can I cancel my subscription anytime?",
		answer: "Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees. Your access continues until the end of your current billing period.",
	},

	// Security & Privacy
	{
		id: 15,
		category: "security",
		question: "How do you protect my data?",
		answer: "We use enterprise-grade security measures including SSL encryption, regular security audits, and compliance with GDPR and CCPA regulations. Your data is stored securely and never shared without permission.",
	},
	{
		id: 16,
		category: "security",
		question: "Who can see my profile information?",
		answer: "You control your privacy settings. You can choose to make your profile visible to all companies, only to companies you apply to, or keep it private until you're ready to job search.",
	},
	{
		id: 17,
		category: "security",
		question: "Do you perform background checks?",
		answer: "Yes, we conduct comprehensive background checks including criminal history, employment verification, and education verification. The level of screening can be customized based on position requirements.",
	},
];

export default function FAQsPage() {
	const [selectedCategory, setSelectedCategory] = useState("general");
	const [searchQuery, setSearchQuery] = useState("");
	const [openItems, setOpenItems] = useState<number[]>([]);

	const toggleItem = (id: number) => {
		setOpenItems((prev) =>
			prev.includes(id)
				? prev.filter((item) => item !== id)
				: [...prev, id]
		);
	};

	const filteredFAQs = faqs.filter((faq) => {
		const matchesCategory =
			selectedCategory === "all" || faq.category === selectedCategory;
		const matchesSearch =
			faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="min-h-screen bg-white dark:bg-black">
			{/* Header */}

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 overflow-hidden">
				<Spotlight
					className="absolute -top-40 left-0 md:left-60 md:-top-20"
					fill="purple"
				/>
				<GridPattern className="absolute inset-0 opacity-20" />

				<div className="container mx-auto px-4 relative z-10">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto"
					>
						<Badge
							variant="outline"
							className="mb-6 px-4 py-2 text-sm font-medium border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400"
						>
							Help Center
						</Badge>
						<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent">
							Frequently Asked Questions
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
							Find answers to common questions about our platform,
							services, and policies. Can't find what you're
							looking for? Contact our support team.
						</p>

						{/* Search Bar */}
						<div className="relative max-w-2xl mx-auto">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<Input
								type="text"
								placeholder="Search FAQs..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 dark:focus:border-purple-400"
							/>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Categories */}
			<section className="py-8 bg-gray-50 dark:bg-gray-900/50">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center gap-4">
						<Button
							variant={
								selectedCategory === "general"
									? "default"
									: "outline"
							}
							onClick={() => setSelectedCategory("general")}
							className="flex items-center gap-2"
						>
							<HelpCircle className="w-4 h-4" />
							All Questions
						</Button>
						{faqCategories.slice(1).map((category) => (
							<Button
								key={category.id}
								variant={
									selectedCategory === category.id
										? "default"
										: "outline"
								}
								onClick={() => setSelectedCategory(category.id)}
								className="flex items-center gap-2"
							>
								<category.icon className="w-4 h-4" />
								{category.name}
							</Button>
						))}
					</div>
				</div>
			</section>

			{/* FAQ Items */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						{filteredFAQs.length === 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-center py-12"
							>
								<HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
									No FAQs found
								</h3>
								<p className="text-gray-600 dark:text-gray-300">
									Try adjusting your search or browse
									different categories.
								</p>
							</motion.div>
						) : (
							<div className="space-y-4">
								{filteredFAQs.map((faq, index) => (
									<motion.div
										key={faq.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.5,
											delay: index * 0.1,
										}}
									>
										<Card className="overflow-hidden">
											<CardContent className="p-0">
												<button
													onClick={() =>
														toggleItem(faq.id)
													}
													className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
												>
													<div className="flex items-center justify-between">
														<h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
															{faq.question}
														</h3>
														<ChevronDown
															className={`w-5 h-5 text-gray-500 transition-transform ${
																openItems.includes(
																	faq.id
																)
																	? "rotate-180"
																	: ""
															}`}
														/>
													</div>
												</button>

												<AnimatePresence>
													{openItems.includes(
														faq.id
													) && (
														<motion.div
															initial={{
																height: 0,
																opacity: 0,
															}}
															animate={{
																height: "auto",
																opacity: 1,
															}}
															exit={{
																height: 0,
																opacity: 0,
															}}
															transition={{
																duration: 0.3,
															}}
															className="overflow-hidden"
														>
															<div className="px-6 pb-6 pt-0">
																<div className="border-t border-gray-200 dark:border-gray-700 pt-4">
																	<p className="text-gray-600 dark:text-gray-300 leading-relaxed">
																		{
																			faq.answer
																		}
																	</p>
																</div>
															</div>
														</motion.div>
													)}
												</AnimatePresence>
											</CardContent>
										</Card>
									</motion.div>
								))}
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Contact Support */}
			<section className="py-20 bg-gray-50 dark:bg-gray-900/50">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-3xl mx-auto"
					>
						<h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
							Still Need Help?
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
							Our support team is here to help you with any
							questions or issues you might have.
						</p>

						<div className="grid md:grid-cols-3 gap-6">
							<Card className="hover:shadow-lg transition-shadow">
								<CardContent className="p-6 text-center">
									<MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
										Live Chat
									</h3>
									<p className="text-gray-600 dark:text-gray-300 mb-4">
										Get instant help from our support team
									</p>
									<Button className="w-full">
										Start Chat
									</Button>
								</CardContent>
							</Card>

							<Card className="hover:shadow-lg transition-shadow">
								<CardContent className="p-6 text-center">
									<Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
										Email Support
									</h3>
									<p className="text-gray-600 dark:text-gray-300 mb-4">
										Send us a detailed message
									</p>
									<Button
										variant="outline"
										className="w-full"
									>
										Send Email
									</Button>
								</CardContent>
							</Card>

							<Card className="hover:shadow-lg transition-shadow">
								<CardContent className="p-6 text-center">
									<Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
										Phone Support
									</h3>
									<p className="text-gray-600 dark:text-gray-300 mb-4">
										Speak directly with our team
									</p>
									<Button
										variant="outline"
										className="w-full"
									>
										Call Now
									</Button>
								</CardContent>
							</Card>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
