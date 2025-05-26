"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
	Briefcase,
	Send,
	MapPin,
	Phone,
	Mail,
	Clock,
	MessageCircle,
	HeadphonesIcon,
	ArrowRight,
	CheckCircle,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/sections/footer";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		company: "",
		subject: "",
		category: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Simulate form submission
		setTimeout(() => {
			toast({
				title: "Message sent successfully!",
				description: "We'll get back to you within 24 hours.",
			});
			setFormData({
				name: "",
				email: "",
				company: "",
				subject: "",
				category: "",
				message: "",
			});
			setLoading(false);
		}, 1000);
	};

	const contactMethods = [
		{
			icon: Mail,
			title: "Email Support",
			description: "Get help via email",
			contact: "support@staffmatchpro.com",
			availability: "24/7 Response",
			color: "text-blue-500",
			bgColor: "bg-blue-50 dark:bg-blue-900/20",
		},
		{
			icon: Phone,
			title: "Phone Support",
			description: "Speak with our team",
			contact: "+1 (555) 123-4567",
			availability: "Mon-Fri, 9AM-6PM EST",
			color: "text-green-500",
			bgColor: "bg-green-50 dark:bg-green-900/20",
		},
		{
			icon: MessageCircle,
			title: "Live Chat",
			description: "Chat with us instantly",
			contact: "Available on website",
			availability: "Mon-Fri, 9AM-6PM EST",
			color: "text-purple-500",
			bgColor: "bg-purple-50 dark:bg-purple-900/20",
		},
	];

	const officeLocations = [
		{
			city: "New York",
			address: "123 Business Ave, Suite 100",
			zipCode: "New York, NY 10001",
			phone: "+1 (555) 123-4567",
		},
		{
			city: "San Francisco",
			address: "456 Tech Street, Floor 15",
			zipCode: "San Francisco, CA 94105",
			phone: "+1 (555) 987-6543",
		},
		{
			city: "London",
			address: "789 Innovation Road",
			zipCode: "London, UK EC1A 1BB",
			phone: "+44 20 7123 4567",
		},
	];

	return (
		<div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
			<Spotlight
				className="absolute -top-40 left-1/2 transform -translate-x-1/2 md:-top-20"
				fill="blue"
			/>
			<GridPattern className="absolute inset-0 opacity-20" />
			<Meteors number={30} />

			<div className="relative z-10">
				{/* Hero Section */}
				<section className="py-20">
					<div className="container mx-auto px-4 text-center">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="max-w-4xl mx-auto space-y-6"
						>
							<Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-4 py-2 text-sm font-medium">
								💬 Get in Touch
							</Badge>

							<h1 className="text-5xl lg:text-6xl font-bold leading-tight">
								We're Here to{" "}
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									Help You
								</span>
							</h1>

							<p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
								Have questions about JobOP? Need support with
								your account? Our team is ready to assist you
								every step of the way.
							</p>

							<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
								<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>24/7 Support Available</span>
								</div>
								<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>Average Response: 2 hours</span>
								</div>
								<div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
									<CheckCircle className="h-4 w-4 text-green-500" />
									<span>Expert Team Ready</span>
								</div>
							</div>
						</motion.div>
					</div>
				</section>

				{/* Contact Methods */}
				<section className="py-16 bg-gray-50 dark:bg-gray-900">
					<div className="container mx-auto px-4">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="text-center mb-12"
						>
							<h2 className="text-3xl font-bold mb-4 dark:text-white">
								Choose Your Preferred Contact Method
							</h2>
							<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
								We offer multiple ways to get in touch. Pick the
								one that works best for you.
							</p>
						</motion.div>

						<div className="grid md:grid-cols-3 gap-8 mb-16">
							{contactMethods.map((method, index) => (
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
								>
									<Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 overflow-hidden group">
										<CardHeader className="relative">
											<div
												className={`absolute inset-0 ${method.bgColor} opacity-50`}
											></div>
											<div className="relative z-10 text-center">
												<div
													className={`w-16 h-16 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
												>
													<method.icon
														className={`h-8 w-8 ${method.color}`}
													/>
												</div>
												<CardTitle className="text-xl dark:text-white">
													{method.title}
												</CardTitle>
												<CardDescription className="dark:text-gray-300">
													{method.description}
												</CardDescription>
											</div>
										</CardHeader>
										<CardContent className="relative z-10 text-center">
											<div className="space-y-2">
												<p className="font-semibold text-lg dark:text-white">
													{method.contact}
												</p>
												<div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
													<Clock className="h-4 w-4" />
													<span>
														{method.availability}
													</span>
												</div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Contact Form & Info */}
				<section className="py-20">
					<div className="container mx-auto px-4">
						<div className="grid lg:grid-cols-2 gap-12 items-start">
							{/* Contact Form */}
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-2xl">
									<CardHeader>
										<CardTitle className="text-2xl font-bold dark:text-white flex items-center">
											<Send className="h-6 w-6 mr-2 text-blue-600" />
											Send us a Message
										</CardTitle>
										<CardDescription className="text-gray-600 dark:text-gray-300">
											Fill out the form below and we'll
											get back to you as soon as possible.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form
											onSubmit={handleSubmit}
											className="space-y-6"
										>
											<div className="grid grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label
														htmlFor="name"
														className="text-sm font-medium dark:text-gray-200"
													>
														Full Name *
													</Label>
													<Input
														id="name"
														placeholder="John Doe"
														value={formData.name}
														onChange={(e) =>
															setFormData({
																...formData,
																name: e.target
																	.value,
															})
														}
														required
														className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
													/>
												</div>
												<div className="space-y-2">
													<Label
														htmlFor="email"
														className="text-sm font-medium dark:text-gray-200"
													>
														Email Address *
													</Label>
													<Input
														id="email"
														type="email"
														placeholder="john@example.com"
														value={formData.email}
														onChange={(e) =>
															setFormData({
																...formData,
																email: e.target
																	.value,
															})
														}
														required
														className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
													/>
												</div>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="company"
													className="text-sm font-medium dark:text-gray-200"
												>
													Company (Optional)
												</Label>
												<Input
													id="company"
													placeholder="Your Company"
													value={formData.company}
													onChange={(e) =>
														setFormData({
															...formData,
															company:
																e.target.value,
														})
													}
													className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="category"
													className="text-sm font-medium dark:text-gray-200"
												>
													Category *
												</Label>
												<Select
													value={formData.category}
													onValueChange={(value) =>
														setFormData({
															...formData,
															category: value,
														})
													}
												>
													<SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
														<SelectValue placeholder="Select a category" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="general">
															General Inquiry
														</SelectItem>
														<SelectItem value="support">
															Technical Support
														</SelectItem>
														<SelectItem value="billing">
															Billing & Payments
														</SelectItem>
														<SelectItem value="partnership">
															Partnership
														</SelectItem>
														<SelectItem value="feedback">
															Feedback
														</SelectItem>
														<SelectItem value="other">
															Other
														</SelectItem>
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="subject"
													className="text-sm font-medium dark:text-gray-200"
												>
													Subject *
												</Label>
												<Input
													id="subject"
													placeholder="Brief description of your inquiry"
													value={formData.subject}
													onChange={(e) =>
														setFormData({
															...formData,
															subject:
																e.target.value,
														})
													}
													required
													className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
												/>
											</div>

											<div className="space-y-2">
												<Label
													htmlFor="message"
													className="text-sm font-medium dark:text-gray-200"
												>
													Message *
												</Label>
												<Textarea
													id="message"
													placeholder="Please provide details about your inquiry..."
													value={formData.message}
													onChange={(e) =>
														setFormData({
															...formData,
															message:
																e.target.value,
														})
													}
													required
													rows={6}
													className="resize-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
												/>
											</div>

											<Button
												type="submit"
												className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold group"
												disabled={loading}
											>
												{loading ? (
													"Sending..."
												) : (
													<>
														Send Message
														<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
													</>
												)}
											</Button>
										</form>
									</CardContent>
								</Card>
							</motion.div>

							{/* Contact Info & Offices */}
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
								className="space-y-8"
							>
								{/* FAQ Section */}
								<Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
									<CardHeader>
										<CardTitle className="text-xl font-bold dark:text-white flex items-center">
											<HeadphonesIcon className="h-5 w-5 mr-2 text-blue-600" />
											Quick Help
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											<div>
												<h4 className="font-semibold dark:text-white mb-2">
													Frequently Asked Questions
												</h4>
												<ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
													<li>
														• How do I create an
														account?
													</li>
													<li>
														• What are the pricing
														plans?
													</li>
													<li>
														• How does the matching
														algorithm work?
													</li>
													<li>
														• Can I cancel my
														subscription anytime?
													</li>
												</ul>
											</div>
											<Button
												variant="outline"
												className="w-full"
											>
												View All FAQs
											</Button>
										</div>
									</CardContent>
								</Card>

								{/* Office Locations */}
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle className="text-xl font-bold dark:text-white flex items-center">
											<MapPin className="h-5 w-5 mr-2 text-green-600" />
											Our Offices
										</CardTitle>
										<CardDescription className="dark:text-gray-300">
											Visit us at one of our global
											locations
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-6">
											{officeLocations.map(
												(office, index) => (
													<motion.div
														key={index}
														initial={{
															opacity: 0,
															y: 20,
														}}
														whileInView={{
															opacity: 1,
															y: 0,
														}}
														transition={{
															duration: 0.5,
															delay: index * 0.1,
														}}
														viewport={{
															once: true,
														}}
														className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
													>
														<h4 className="font-semibold text-lg dark:text-white">
															{office.city}
														</h4>
														<div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
															<p>
																{office.address}
															</p>
															<p>
																{office.zipCode}
															</p>
															<p className="flex items-center">
																<Phone className="h-4 w-4 mr-1" />
																{office.phone}
															</p>
														</div>
													</motion.div>
												)
											)}
										</div>
									</CardContent>
								</Card>

								{/* Support Hours */}
								<Card className="border-0 shadow-lg">
									<CardHeader>
										<CardTitle className="text-xl font-bold dark:text-white flex items-center">
											<Clock className="h-5 w-5 mr-2 text-purple-600" />
											Support Hours
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3 text-sm">
											<div className="flex justify-between">
												<span className="text-gray-600 dark:text-gray-400">
													Monday - Friday
												</span>
												<span className="font-medium dark:text-white">
													9:00 AM - 6:00 PM EST
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600 dark:text-gray-400">
													Saturday
												</span>
												<span className="font-medium dark:text-white">
													10:00 AM - 4:00 PM EST
												</span>
											</div>
											<div className="flex justify-between">
												<span className="text-gray-600 dark:text-gray-400">
													Sunday
												</span>
												<span className="font-medium dark:text-white">
													Closed
												</span>
											</div>
											<div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
												<p className="text-sm text-green-700 dark:text-green-300 flex items-center">
													<CheckCircle className="h-4 w-4 mr-2" />
													Emergency support available
													24/7 for critical issues
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Footer */}
				{/* CTA Section */}
				<CTASection />
			</div>
		</div>
	);
}
