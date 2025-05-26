"use client";

import type React from "react";

import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Briefcase,
	Home,
	Users,
	Star,
	CreditCard,
	Settings,
	LogOut,
	Bell,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = useStore((state) => state.user);
	const setUser = useStore((state) => state.setUser);
	const router = useRouter();

	const handleLogout = () => {
		setUser(null);
		router.push("/");
	};

	const navigation =
		user?.role === "company"
			? [
					{
						name: "Dashboard",
						href: "/dashboard/company",
						icon: Home,
					},
					{
						name: "Find Staff",
						href: "/dashboard/company/staff",
						icon: Users,
					},
					{
						name: "Projects",
						href: "/dashboard/company/projects",
						icon: Briefcase,
					},
					{
						name: "Reviews",
						href: "/dashboard/company/reviews",
						icon: Star,
					},
			  ]
			: [
					{ name: "Dashboard", href: "/dashboard/staff", icon: Home },
					{
						name: "Find Jobs",
						href: "/dashboard/staff/jobs",
						icon: Briefcase,
					},
					{
						name: "Loan Application",
						href: "/dashboard/staff/loan",
						icon: CreditCard,
					},
					{
						name: "My Profile",
						href: "/dashboard/staff/profile",
						icon: Users,
					},
			  ];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Header */}
			<header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
				<div className="px-6 py-4 flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<Link href="/" className="flex items-center space-x-2">
							<Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
							<span className="text-xl font-bold dark:text-white">
								JobOP
							</span>
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<ThemeToggle />
						<Button variant="ghost" size="icon">
							<Bell className="h-5 w-5" />
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="relative h-8 w-8 rounded-full"
								>
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={
												user?.avatar ||
												"/placeholder.svg"
											}
											alt={user?.name}
										/>
										<AvatarFallback>
											{user?.name
												?.split(" ")
												.map((n) => n[0])
												.join("") || "U"}
										</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-56"
								align="end"
								forceMount
							>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p className="text-sm font-medium leading-none">
											{user?.name}
										</p>
										<p className="text-xs leading-none text-muted-foreground">
											{user?.email}
										</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Settings className="mr-2 h-4 w-4" />
									<span>Settings</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleLogout}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>

			<div className="flex">
				{/* Sidebar */}
				<aside className="w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 min-h-screen">
					<nav className="p-6">
						<div className="space-y-2">
							{navigation.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
								>
									<item.icon className="h-5 w-5" />
									<span>{item.name}</span>
								</Link>
							))}
						</div>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 p-6">{children}</main>
			</div>
		</div>
	);
}
