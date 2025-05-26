import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, TrendingUp, CheckCircle } from "lucide-react";

import { motion } from "framer-motion";

const FeaturesSection = () => {
	return (
		<section className="py-20 bg-gray-50 dark:bg-gray-900" id="features">
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
						Discover the powerful features that make talent matching
						effortless and effective.
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
										{feature.features.map((item, idx) => (
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
														index * 0.2 + idx * 0.1,
												}}
												viewport={{
													once: true,
												}}
												className="flex items-center space-x-3 text-gray-600 dark:text-gray-300"
											>
												<CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
												<span>{item}</span>
											</motion.li>
										))}
									</ul>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturesSection;
