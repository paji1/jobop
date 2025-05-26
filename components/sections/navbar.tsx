"use client";
import { Button } from "@/components/ui/button";

import { Briefcase } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function NavBar() {
	const router = useRouter();
	const pathname = usePathname();

	const scrollToSection = (sectionId: string) => {
		if (pathname !== "/") {
			router.push(`/#${sectionId}`);
			return;
		}
		const element = document.getElementById(sectionId);
		if (element) {
			const headerOffset = sectionId === "home" ? 10 : -80; // Account for fixed header
			const elementPosition = element.offsetTop;
			const offsetPosition = elementPosition - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	};

	return (
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
				<nav className="hidden md:flex items-center space-x-8">
					<button
						onClick={() => scrollToSection("home")}
						className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
					>
						Home
					</button>
					<button
						onClick={() => scrollToSection("features")}
						className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
					>
						Features
					</button>
					<button
						onClick={() => scrollToSection("team")}
						className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
					>
						Team
					</button>
					<Link href="/contact">
						<span className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium cursor-pointer">
							Contact
						</span>
					</Link>
				</nav>
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
	);
}

export default NavBar;
