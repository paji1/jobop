"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Footer } from "@/components/sections/footer";
import {
	FileText,
	Scale,
	AlertTriangle,
	Users,
	CreditCard,
	Shield,
	Mail,
	Calendar,
	Briefcase,
	CheckCircle,
} from "lucide-react";
import Link from "next/link";

const sections = [
	{
		id: "acceptance",
		title: "Acceptance of Terms",
		icon: CheckCircle,
		content:
			"By accessing and using JobOP, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
	},
	{
		id: "description",
		title: "Service Description",
		icon: Users,
		content:
			"JobOP is a digital platform that connects job seekers with employers. We provide tools for profile creation, job matching, application management, and communication between parties. We do not guarantee employment or hiring outcomes.",
	},
	{
		id: "user-accounts",
		title: "User Accounts",
		icon: Shield,
		content:
			"You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account and keep it updated.",
	},
	{
		id: "acceptable-use",
		title: "Acceptable Use Policy",
		icon: Scale,
		content:
			"You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service. This includes but is not limited to: posting false information, harassment, spam, or attempting to gain unauthorized access to other accounts.",
	},
	{
		id: "payment-terms",
		title: "Payment Terms",
		icon: CreditCard,
		content:
			"Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days notice to existing subscribers.",
	},
	{
		id: "intellectual-property",
		title: "Intellectual Property",
		icon: FileText,
		content:
			"The service and its original content, features, and functionality are owned by JobOP and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
	},
	{
		id: "limitation-liability",
		title: "Limitation of Liability",
		icon: AlertTriangle,
		content:
			"In no event shall JobOP be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
	},
];

export default function TermsPage() {
	return (
		<main className="min-h-screen bg-white dark:bg-black">
			{/* Header */}

			{/* Hero Section */}
			<section className="relative pt-32 pb-20 overflow-hidden">
				<Spotlight
					className="absolute -top-40 left-0 md:left-60 md:-top-20"
					fill="orange"
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
							className="mb-6 px-4 py-2 text-sm font-medium border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400"
						>
							Legal Agreement
						</Badge>
						<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-800 bg-clip-text text-transparent">
							Terms of Service
						</h1>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
							Please read these terms carefully before using our
							platform. By using JobOP, you agree to be bound by
							these terms and conditions.
						</p>
						<div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								Last updated: January 15, 2024
							</div>
							<div className="flex items-center gap-1">
								<FileText className="w-4 h-4" />
								Version 2.1
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Key Points */}
			<section className="py-16 bg-gray-50 dark:bg-gray-900/50">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="max-w-4xl mx-auto"
					>
						<h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
							Key Terms Summary
						</h2>
						<div className="grid md:grid-cols-3 gap-6">
							<Card className="text-center">
								<CardContent className="p-6">
									<Scale className="w-12 h-12 text-blue-600 mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
										Fair Usage
									</h3>
									<p className="text-gray-600 dark:text-gray-300 text-sm">
										Use our platform responsibly and in
										accordance with our guidelines
									</p>
								</CardContent>
							</Card>
							<Card className="text-center">
								<CardContent className="p-6">
									<Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
										Account Security
									</h3>
									<p className="text-gray-600 dark:text-gray-300 text-sm">
										You're responsible for keeping your
										account secure and confidential
									</p>
								</CardContent>
							</Card>
							<Card className="text-center">
								<CardContent className="p-6">
									<CreditCard className="w-12 h-12 text-purple-600 mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
										Payment Terms
									</h3>
									<p className="text-gray-600 dark:text-gray-300 text-sm">
										Clear pricing with no hidden fees and
										flexible cancellation
									</p>
								</CardContent>
							</Card>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Detailed Terms */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto space-y-12">
						{sections.map((section, index) => (
							<motion.div
								key={section.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									delay: index * 0.1,
								}}
								id={section.id}
								className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
							>
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
										<section.icon className="w-6 h-6 text-white" />
									</div>
									<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
										{section.title}
									</h2>
								</div>

								<div className="pl-16">
									<p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
										{section.content}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Additional Terms */}
			<section className="py-20 bg-gray-50 dark:bg-gray-900/50">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="mb-12"
						>
							<h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
								Additional Important Terms
							</h2>
						</motion.div>

						<div className="grid md:grid-cols-2 gap-8">
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
							>
								<Card>
									<CardContent className="p-6">
										<h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
											Termination
										</h3>
										<p className="text-gray-600 dark:text-gray-300 mb-4">
											We may terminate or suspend your
											account immediately, without prior
											notice or liability, for any reason
											whatsoever, including without
											limitation if you breach the Terms.
										</p>
										<p className="text-gray-600 dark:text-gray-300">
											Upon termination, your right to use
											the service will cease immediately.
										</p>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
							>
								<Card>
									<CardContent className="p-6">
										<h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
											Changes to Terms
										</h3>
										<p className="text-gray-600 dark:text-gray-300 mb-4">
											We reserve the right, at our sole
											discretion, to modify or replace
											these Terms at any time. If a
											revision is material, we will try to
											provide at least 30 days notice.
										</p>
										<p className="text-gray-600 dark:text-gray-300">
											Your continued use of the service
											after any such changes constitutes
											acceptance.
										</p>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								<Card>
									<CardContent className="p-6">
										<h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
											Governing Law
										</h3>
										<p className="text-gray-600 dark:text-gray-300">
											These Terms shall be interpreted and
											governed by the laws of the State of
											California, without regard to
											conflict of law provisions. Any
											disputes will be resolved in the
											courts of San Francisco County,
											California.
										</p>
									</CardContent>
								</Card>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								<Card>
									<CardContent className="p-6">
										<h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
											Contact Information
										</h3>
										<p className="text-gray-600 dark:text-gray-300 mb-4">
											If you have any questions about
											these Terms of Service, please
											contact us at:
										</p>
										<div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
											<p>
												Email: legal@staffmatchpro.com
											</p>
											<p>
												Address: 123 Business St, San
												Francisco, CA 94105
											</p>
											<p>Phone: (555) 123-4567</p>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-3xl mx-auto"
					>
						<h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
							Questions About These Terms?
						</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
							If you have any questions about these Terms of
							Service or need clarification on any points, our
							legal team is here to help.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3"
							>
								<Mail className="w-5 h-5 mr-2" />
								Contact Legal Team
							</Button>
							<Button
								variant="outline"
								size="lg"
								className="px-8 py-3"
							>
								<FileText className="w-5 h-5 mr-2" />
								Download PDF
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</main>
	);
}
