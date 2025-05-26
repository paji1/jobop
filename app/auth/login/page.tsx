"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/lib/store";
import {
	Briefcase,
	Eye,
	EyeOff,
	ArrowRight,
	Shield,
	Zap,
	Users,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Meteors } from "@/components/ui/meteors";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const router = useRouter();
	const setUser = useStore((state) => state.setUser);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// Simulate login - in real app, this would be an API call
		setTimeout(() => {
			const mockUser = {
				id: "1",
				email,
				name: email.split("@")[0],
				role: email.includes("company")
					? "company"
					: ("staff" as "company" | "staff"),
				rating: 4.8,
				experience: 5,
				skills: ["React", "TypeScript", "Node.js"],
				location: "New York, NY",
			};

			setUser(mockUser);
			toast({
				title: "Welcome back!",
				description: "You've successfully logged in to JobOP",
			});

			router.push(
				mockUser.role === "company"
					? "/dashboard/company"
					: "/dashboard/staff"
			);
			setLoading(false);
		}, 1000);
	};

	return (
		<div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
			<Spotlight
				className="absolute -top-40 left-0 md:left-60 md:-top-20"
				fill="blue"
			/>
			<GridPattern className="absolute inset-0 opacity-20" />
			<Meteors number={20} />

			{/* Header */}
			<motion.header
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="relative z-50 p-4"
			>
				<div className="flex items-center justify-between max-w-6xl mx-auto">
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
				<div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto w-full">
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
								<Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-4 py-2 text-sm font-medium">
									🔐 Secure Login
								</Badge>
							</motion.div>

							<motion.h1
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6 }}
								className="text-4xl lg:text-5xl font-bold leading-tight"
							>
								Welcome Back to{" "}
								<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
									JobOP
								</span>
							</motion.h1>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.8 }}
								className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
							>
								Continue your journey to connect with top talent
								or find your next opportunity. Your dashboard is
								waiting.
							</motion.p>
						</div>

						{/* Trust Indicators */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1 }}
							className="grid grid-cols-1 sm:grid-cols-3 gap-4"
						>
							{[
								{
									icon: Shield,
									label: "Bank-level Security",
									color: "text-green-500",
								},
								{
									icon: Zap,
									label: "Instant Access",
									color: "text-yellow-500",
								},
								{
									icon: Users,
									label: "50K+ Active Users",
									color: "text-blue-500",
								},
							].map((item, index) => (
								<div
									key={index}
									className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
								>
									<item.icon
										className={`h-5 w-5 ${item.color}`}
									/>
									<span className="text-sm font-medium dark:text-white">
										{item.label}
									</span>
								</div>
							))}
						</motion.div>

						{/* Demo Credentials */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.2 }}
							className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
						>
							<h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
								Demo Credentials
							</h4>
							<div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
								<p>
									<strong>Company:</strong> company@demo.com
								</p>
								<p>
									<strong>Staff:</strong> staff@demo.com
								</p>
								<p>
									<strong>Password:</strong> Any password
								</p>
							</div>
						</motion.div>
					</motion.div>

					{/* Right Content - Login Form */}
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
						className="relative"
					>
						<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-2xl">
							<CardHeader className="text-center space-y-4">
								<CardTitle className="text-2xl font-bold dark:text-white">
									Sign In
								</CardTitle>
								<CardDescription className="text-gray-600 dark:text-gray-300">
									Enter your credentials to access your
									account
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<form
									onSubmit={handleLogin}
									className="space-y-4"
								>
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
											placeholder="Enter your email"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											required
											className="h-12 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
										/>
									</div>

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
												placeholder="Enter your password"
												value={password}
												onChange={(e) =>
													setPassword(e.target.value)
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

									<div className="flex items-center justify-between">
										<label className="flex items-center space-x-2 text-sm">
											<input
												type="checkbox"
												className="rounded border-gray-300"
											/>
											<span className="text-gray-600 dark:text-gray-400">
												Remember me
											</span>
										</label>
										<Link
											href="/auth/forgot-password"
											className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
										>
											Forgot password?
										</Link>
									</div>

									<Button
										type="submit"
										className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold group"
										disabled={loading}
									>
										{loading ? (
											"Signing in..."
										) : (
											<>
												Sign In
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
											Or continue with
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
										Don't have an account?{" "}
										<Link
											href="/auth/register"
											className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
										>
											Sign up for free
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
