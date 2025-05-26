"use client";

import type React from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import {
	Briefcase,
	Eye,
	EyeOff,
	ArrowRight,
	CheckCircle,
	Users,
	Building2,
	Star,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
	const searchParams = useSearchParams();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: searchParams.get("role") || "",
		company: "",
		skills: "",
		location: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const setUser = useStore((state) => state.setUser);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			toast({
				title: "Password mismatch",
				description: "Please make sure your passwords match",
				variant: "destructive",
			});
			return;
		}

		setLoading(true);

		// Simulate registration - in real app, this would be an API call
		setTimeout(() => {
			const newUser = {
				id: Date.now().toString(),
				email: formData.email,
				name: formData.name,
				role: formData.role as "company" | "staff",
				rating: 4.0,
				experience: 1,
				skills: formData.skills.split(",").map((s) => s.trim()),
				company: formData.company,
				location: formData.location,
			};

			setUser(newUser);
			toast({
				title: "Welcome to JobOP!",
				description: "Your account has been created successfully",
			});

			if (newUser.role === "staff") {
				router.push("/onboarding/skills");
			} else {
				router.push("/dashboard/company");
			}
			setLoading(false);
		}, 1000);
	};

	return (
		<div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
			<Spotlight
				className="absolute -top-40 right-0 md:right-60 md:-top-20"
				fill="purple"
			/>
			<GridPattern className="absolute inset-0 opacity-20" />
			<Meteors number={25} />

			{/* Header */}
			<motion.header
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative z-50 p-4"
			>
				<div className="flex items-center justify-between max-w-7xl mx-auto">
					<Link
						href="/"
						className="flex items-center space-x-2 group"
					>
						<motion.div
							whileHover={{ scale: 1.05 }}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 10,
							}}
							className="relative"
						>
							<Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
							<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
						</motion.div>
						<span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							JobOP
						</span>
					</Link>
					<ThemeToggle />
				</div>
			</motion.header>

			<div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4 relative z-10">
				<div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto w-full">
					{/* Left Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="space-y-8 lg:pr-8"
					>
						<div className="space-y-4">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.4 }}
							>
								<Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-4 py-2 text-sm font-medium">
									🚀 Join the Community
								</Badge>
							</motion.div>

							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								className="text-4xl lg:text-5xl font-bold leading-tight"
							>
								Start Your Journey with{" "}
								<span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
									JobOP
								</span>
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
							>
								Join thousands of professionals and companies
								who trust JobOP for their talent needs. Create
								your account in minutes.
							</motion.p>
						</div>

						{/* Benefits */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1 }}
							className="space-y-4"
						>
							<h3 className="text-lg font-semibold dark:text-white">
								What you'll get:
							</h3>
							<div className="space-y-3">
								{[
									{
										icon: CheckCircle,
										text: "AI-powered talent matching",
										color: "text-green-500",
									},
									{
										icon: Users,
										text: "Access to 50K+ verified professionals",
										color: "text-blue-500",
									},
									{
										icon: Star,
										text: "Rating-based quality assurance",
										color: "text-yellow-500",
									},
									{
										icon: Building2,
										text: "Professional dashboard & analytics",
										color: "text-purple-500",
									},
								].map((benefit, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											duration: 0.5,
											delay: 1.2 + index * 0.1,
										}}
										className="flex items-center space-x-3"
									>
										<benefit.icon
											className={`h-5 w-5 ${benefit.color}`}
										/>
										<span className="text-gray-700 dark:text-gray-300">
											{benefit.text}
										</span>
									</motion.div>
								))}
							</div>
						</motion.div>

						{/* Stats */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.4 }}
							className="grid grid-cols-3 gap-4 pt-4"
						>
							{[
								{ number: "50K+", label: "Users" },
								{ number: "98%", label: "Success Rate" },
								{ number: "4.9", label: "Rating" },
							].map((stat, index) => (
								<div
									key={index}
									className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
								>
									<div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
										{stat.number}
									</div>
									<div className="text-sm text-gray-600 dark:text-gray-400">
										{stat.label}
									</div>
								</div>
							))}
						</motion.div>
					</motion.div>

					{/* Right Content - Register Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="relative"
					>
						<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-2xl">
							<CardHeader className="text-center space-y-4">
								<CardTitle className="text-2xl font-bold dark:text-white">
									Create Account
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-gray-300">
									Join our professional network today
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<form
									onSubmit={handleRegister}
									className="space-y-4"
								>
									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="name"
												className="text-sm font-medium dark:text-gray-200"
											>
												Full Name
											</Label>
											<Input
												id="name"
												placeholder="John Doe"
												value={formData.name}
												onChange={(e) =>
													setFormData({
														...formData,
														name: e.target.value,
													})
												}
												required
												className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="email"
												className="text-sm font-medium dark:text-gray-200"
											>
												Email Address
											</Label>
											<Input
												id="email"
												type="email"
												placeholder="john@example.com"
												value={formData.email}
												onChange={(e) =>
													setFormData({
														...formData,
														email: e.target.value,
													})
												}
												required
												className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="role"
											className="text-sm font-medium dark:text-gray-200"
										>
											I am a
										</Label>
										<Select
											value={formData.role}
											onValueChange={(value) =>
												setFormData({
													...formData,
													role: value,
												})
											}
										>
											<SelectTrigger className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400">
												<SelectValue placeholder="Select your role" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="company">
													Company looking to hire
												</SelectItem>
												<SelectItem value="staff">
													Professional seeking work
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									{formData.role === "company" && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{
												opacity: 1,
												height: "auto",
											}}
											transition={{ duration: 0.3 }}
											className="space-y-2"
										>
											<Label
												htmlFor="company"
												className="text-sm font-medium dark:text-gray-200"
											>
												Company Name
											</Label>
											<Input
												id="company"
												placeholder="Acme Corporation"
												value={formData.company}
												onChange={(e) =>
													setFormData({
														...formData,
														company: e.target.value,
													})
												}
												className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
											/>
										</motion.div>
									)}

									{formData.role === "staff" && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{
												opacity: 1,
												height: "auto",
											}}
											transition={{ duration: 0.3 }}
											className="space-y-2"
										>
											<Label
												htmlFor="skills"
												className="text-sm font-medium dark:text-gray-200"
											>
												Skills (comma separated)
											</Label>
											<Input
												id="skills"
												placeholder="React, TypeScript, Node.js"
												value={formData.skills}
												onChange={(e) =>
													setFormData({
														...formData,
														skills: e.target.value,
													})
												}
												className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
											/>
										</motion.div>
									)}

									<div className="space-y-2">
										<Label
											htmlFor="location"
											className="text-sm font-medium dark:text-gray-200"
										>
											Location
										</Label>
										<Input
											id="location"
											placeholder="New York, NY"
											value={formData.location}
											onChange={(e) =>
												setFormData({
													...formData,
													location: e.target.value,
												})
											}
											className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
										/>
									</div>

									<div className="grid grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="password"
												className="text-sm font-medium dark:text-gray-200"
											>
												Password
											</Label>
											<div className="relative">
												<Input
													id="password"
													type={
														showPassword
															? "text"
															: "password"
													}
													placeholder="Create password"
													value={formData.password}
													onChange={(e) =>
														setFormData({
															...formData,
															password:
																e.target.value,
														})
													}
													required
													className="h-12 pr-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
												>
													{showPassword ? (
														<EyeOff className="h-4 w-4 text-gray-500" />
													) : (
														<Eye className="h-4 w-4 text-gray-500" />
													)}
												</Button>
											</div>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="confirmPassword"
												className="text-sm font-medium dark:text-gray-200"
											>
												Confirm Password
											</Label>
											<div className="relative">
												<Input
													id="confirmPassword"
													type={
														showConfirmPassword
															? "text"
															: "password"
													}
													placeholder="Confirm password"
													value={
														formData.confirmPassword
													}
													onChange={(e) =>
														setFormData({
															...formData,
															confirmPassword:
																e.target.value,
														})
													}
													required
													className="h-12 pr-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
													onClick={() =>
														setShowConfirmPassword(
															!showConfirmPassword
														)
													}
												>
													{showConfirmPassword ? (
														<EyeOff className="h-4 w-4 text-gray-500" />
													) : (
														<Eye className="h-4 w-4 text-gray-500" />
													)}
												</Button>
											</div>
										</div>
									</div>

									<div className="flex items-start space-x-2">
										<input
											type="checkbox"
											required
											className="mt-1 rounded border-gray-300"
										/>
										<span className="text-sm text-gray-600 dark:text-gray-400">
											I agree to the{" "}
											<Link
												href="/terms"
												className="text-blue-600 dark:text-blue-400 hover:underline"
											>
												Terms of Service
											</Link>{" "}
											and{" "}
											<Link
												href="/privacy"
												className="text-blue-600 dark:text-blue-400 hover:underline"
											>
												Privacy Policy
											</Link>
										</span>
									</div>

									<Button
										type="submit"
										className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold group"
										disabled={loading || !formData.role}
									>
										{loading ? (
											"Creating account..."
										) : (
											<>
												Create Account
												<ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
											</>
										)}
									</Button>
								</form>

								<div className="relative">
									<div className="absolute inset-0 flex items-center">
										<div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
									</div>
									<div className="relative flex justify-center text-sm">
										<span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
											Or sign up with
										</span>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<Button variant="outline" className="h-12">
										<svg
											className="w-5 h-5 mr-2"
											viewBox="0 0 24 24"
										>
											<path
												fill="currentColor"
												d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
											/>
											<path
												fill="currentColor"
												d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
											/>
											<path
												fill="currentColor"
												d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
											/>
											<path
												fill="currentColor"
												d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
											/>
										</svg>
										Google
									</Button>
									<Button variant="outline" className="h-12">
										<svg
											className="w-5 h-5 mr-2"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
										</svg>
										Facebook
									</Button>
								</div>

								<div className="text-center">
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Already have an account?{" "}
										<Link
											href="/auth/login"
											className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
										>
											Sign in here
										</Link>
									</p>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
