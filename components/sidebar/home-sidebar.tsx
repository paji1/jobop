"use client";
import { useState } from "react";
import {
	SidebarHome,
	SidebarHomeBody,
	SidebarHomeLink,
} from "@/components/sidebar/sidebar";
import {
	ArrowLeft,
	Home,
	UserCircle,
	Briefcase,
	MessageSquare,
	HelpCircle,
	Building,
	FileText,
	Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export default function HomeSidebar() {
	const mainLinks = [
		{
			label: "Home",
			href: "#home",
			icon: (
				<Home className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Features",
			href: "#features",
			icon: (
				<Briefcase className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Team",
			href: "#team",
			icon: (
				<UserCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Contact",
			href: "/contact",
			icon: (
				<MessageSquare className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
	];

	const resourceLinks = [
		{
			label: "Careers",
			href: "/careers",
			icon: (
				<Building className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "FAQs",
			href: "/faqs",
			icon: (
				<HelpCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Privacy Policy",
			href: "/privacy",
			icon: (
				<Shield className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Terms",
			href: "/terms",
			icon: (
				<FileText className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
	];

	const accountLinks = [
		{
			label: "Login",
			href: "/auth/login",
			icon: (
				<UserCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
		{
			label: "Register",
			href: "/auth/register",
			icon: (
				<ArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
			),
		},
	];

	const [open, setOpen] = useState(false);

	return (
		<SidebarHome open={open} setOpen={setOpen}>
			<SidebarHomeBody className="fixed md:hidden inset-0 z-50 h-screen justify-between gap-10 ">
				<div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
					<div className="flex items-center justify-between pr-28 ">
						<Logo />
						<div className="justify-center items-center pb-1">
							<ThemeToggle />
						</div>
					</div>

					<div className="mt-8">
						<h3 className="mb-2 px-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
							Main Navigation
						</h3>
						<div className="flex flex-col gap-2">
							{mainLinks.map((link, idx) => (
								<SidebarHomeLink key={idx} link={link} />
							))}
						</div>
					</div>

					<div className="mt-8">
						<h3 className="mb-2 px-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
							Resources
						</h3>
						<div className="flex flex-col gap-2">
							{resourceLinks.map((link, idx) => (
								<SidebarHomeLink key={idx} link={link} />
							))}
						</div>
					</div>

					<div className="mt-8">
						<h3 className="mb-2 px-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
							Account
						</h3>
						<div className="flex flex-col gap-2">
							{accountLinks.map((link, idx) => (
								<SidebarHomeLink key={idx} link={link} />
							))}
						</div>
					</div>
				</div>

				<div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
					<p className="text-xs text-gray-500 dark:text-gray-400 px-2">
						&copy; {new Date().getFullYear()} JobOP. All rights
						reserved.
					</p>
				</div>
			</SidebarHomeBody>
		</SidebarHome>
	);
}

export const Logo = () => {
	return (
		<Link
			href="/"
			className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
		>
			<div className="relative">
				<Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
				<div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
			</div>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
			>
				JobOP
			</motion.span>
		</Link>
	);
};
