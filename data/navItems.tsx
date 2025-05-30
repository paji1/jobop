import {
	Star,
	Users,
	Home,
	Building2,
} from "lucide-react";
export const navItems = [
	{
		name: "Home",
		link: "#home",
		icon: <Home className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Features",
		link: "#features",
		icon: <Star className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "Team",
		link: "#team",
		icon: <Users className="h-4 w-4 text-neutral-500 dark:text-white" />,
	},
	{
		name: "About",
		link: "#about",
		icon: (
			<Building2 className="h-4 w-4 text-neutral-500 dark:text-white" />
		),
	},
];