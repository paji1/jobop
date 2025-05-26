"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {
	Briefcase,
	Mail,
	Phone,
	MapPin,
	Twitter,
	Linkedin,
	Github,
	Instagram,
	ArrowRight,
	Heart,
} from "lucide-react";

export function Footer() {
	const footerLinks = {
		product: [
			{ name: "Features", href: "/#features" },
			{ name: "Pricing", href: "/pricing" },
			{ name: "API", href: "/api" },
			{ name: "Integrations", href: "/integrations" },
		],
		company: [
			{ name: "About", href: "/about" },
			{ name: "Team", href: "/#team" },
			{ name: "Careers", href: "/careers" },
			{ name: "Contact", href: "/contact" },
		],
		resources: [
			{ name: "Blog", href: "/blog" },
			{ name: "Help Center", href: "/help" },
			{ name: "Documentation", href: "/docs" },
			{ name: "Status", href: "/status" },
		],
		legal: [
			{ name: "Privacy Policy", href: "/privacy" },
			{ name: "Terms of Service", href: "/terms" },
			{ name: "Cookie Policy", href: "/cookies" },
			{ name: "GDPR", href: "/gdpr" },
		],
	};

	const socialLinks = [
		{ name: "Twitter", icon: Twitter, href: "https://twitter.com/JobOP" },
		{
			name: "LinkedIn",
			icon: Linkedin,
			href: "https://linkedin.com/company/JobOP",
		},
		{ name: "GitHub", icon: Github, href: "https://github.com/JobOP" },
		{
			name: "Instagram",
			icon: Instagram,
			href: "https://instagram.com/JobOP",
		},
	];

	return (
		<footer className="bg-gray-900 dark:bg-black text-white relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				/>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Main Footer Content */}
				<div className="py-16">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
						{/* Brand Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
							className="lg:col-span-4"
						>
							<div className="flex items-center space-x-3 mb-6">
								<div className="relative">
									<Briefcase className="h-10 w-10 text-blue-400" />
									<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
								</div>
								<span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
									JobOP
								</span>
							</div>

							<p className="text-gray-300 mb-6 leading-relaxed max-w-md">
								Connecting top talent with amazing opportunities
								through AI-powered matching. Build your dream
								team or find your perfect job today.
							</p>

							{/* Contact Info */}
							<div className="space-y-3 mb-6">
								<div className="flex items-center space-x-3 text-gray-300">
									<Mail className="h-5 w-5 text-blue-400" />
									<span>hello@JobOP.com</span>
								</div>
								<div className="flex items-center space-x-3 text-gray-300">
									<Phone className="h-5 w-5 text-blue-400" />
									<span>+1 (555) 123-4567</span>
								</div>
								<div className="flex items-center space-x-3 text-gray-300">
									<MapPin className="h-5 w-5 text-blue-400" />
									<span>Morocco, CA</span>
								</div>
							</div>

							{/* Social Links */}
							<div className="flex space-x-4">
								{socialLinks.map((social, index) => (
									<motion.a
										key={social.name}
										href={social.href}
										initial={{ opacity: 0, scale: 0.8 }}
										whileInView={{ opacity: 1, scale: 1 }}
										transition={{
											duration: 0.4,
											delay: index * 0.1,
										}}
										viewport={{ once: true }}
										whileHover={{ scale: 1.1 }}
										className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group"
									>
										<social.icon className="h-5 w-5 text-gray-300 group-hover:text-white" />
									</motion.a>
								))}
							</div>
						</motion.div>

						{/* Links Sections */}
						<div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
							{Object.entries(footerLinks).map(
								([category, links], categoryIndex) => (
									<motion.div
										key={category}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{
											duration: 0.6,
											delay: categoryIndex * 0.1,
										}}
										viewport={{ once: true }}
									>
										<h3 className="text-white font-semibold mb-4 capitalize">
											{category}
										</h3>
										<ul className="space-y-3">
											{links.map((link, linkIndex) => (
												<motion.li
													key={link.name}
													initial={{
														opacity: 0,
														x: -10,
													}}
													whileInView={{
														opacity: 1,
														x: 0,
													}}
													transition={{
														duration: 0.4,
														delay:
															categoryIndex *
																0.1 +
															linkIndex * 0.05,
													}}
													viewport={{ once: true }}
												>
													<Link
														href={link.href}
														className="text-gray-300 hover:text-blue-400 transition-colors duration-200 group flex items-center"
													>
														{link.name}
														<ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
													</Link>
												</motion.li>
											))}
										</ul>
									</motion.div>
								)
							)}
						</div>
					</div>
				</div>

				{/* Newsletter Section */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="py-8 border-t border-gray-800"
				>
					<div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
						<div>
							<h3 className="text-xl font-semibold mb-2">
								Stay Updated
							</h3>
							<p className="text-gray-300">
								Get the latest updates on new features and
								opportunities.
							</p>
						</div>
						<div className="flex space-x-3 w-full md:w-auto">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
							/>
							<Button className="bg-blue-600 hover:bg-blue-700 px-6">
								Subscribe
							</Button>
						</div>
					</div>
				</motion.div>

				{/* Bottom Bar */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
					className="py-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
				>
					<div className="flex items-center space-x-2 text-gray-400">
						<span>© 2024 JobOP. All rights reserved.</span>
						<span>•</span>
						<span className="flex items-center space-x-1">
							<span>Made with</span>
							<Heart className="h-4 w-4 text-red-500 fill-current" />
							<span>in Morocco</span>
						</span>
					</div>

					<div className="flex items-center space-x-6 text-sm text-gray-400">
						<Link
							href="/privacy"
							className="hover:text-blue-400 transition-colors"
						>
							Privacy
						</Link>
						<Link
							href="/terms"
							className="hover:text-blue-400 transition-colors"
						>
							Terms
						</Link>
						<Link
							href="/cookies"
							className="hover:text-blue-400 transition-colors"
						>
							Cookies
						</Link>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
