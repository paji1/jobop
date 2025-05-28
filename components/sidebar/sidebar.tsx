"use client";
import { cn } from "@/lib/utils";
import type React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon as Menu2, X } from "lucide-react";

interface Links {
	label: string;
	href: string;
	icon: React.JSX.Element | React.ReactNode;
}

interface SidebarHomeContextProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	animate: boolean;
}

const SidebarHomeContext = createContext<SidebarHomeContextProps | undefined>(
	undefined
);

export const useSidebarHome = () => {
	const context = useContext(SidebarHomeContext);
	if (!context) {
		throw new Error(
			"useSidebarHome must be used within a SidebarHomeProvider"
		);
	}
	return context;
};

export const SidebarHomeProvider = ({
	children,
	open: openProp,
	setOpen: setOpenProp,
	animate = true,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	animate?: boolean;
}) => {
	const [openState, setOpenState] = useState(false);

	const open = openProp !== undefined ? openProp : openState;
	const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

	return (
		<SidebarHomeContext.Provider
			value={{ open, setOpen, animate: animate }}
		>
			{children}
		</SidebarHomeContext.Provider>
	);
};

export const SidebarHome = ({
	children,
	open,
	setOpen,
	animate,
}: {
	children: React.ReactNode;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	animate?: boolean;
}) => {
	return (
		<SidebarHomeProvider open={open} setOpen={setOpen} animate={animate}>
			{children}
		</SidebarHomeProvider>
	);
};

export const SidebarHomeBody = (
	props: React.ComponentProps<typeof motion.div>
) => {
	return (
		<>
			<DesktopSidebarHome {...props} />
			<MobileSidebarHome {...(props as React.ComponentProps<"div">)} />
		</>
	);
};

export const DesktopSidebarHome = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof motion.div>) => {
	const { open, setOpen, animate } = useSidebarHome();
	return (
		<>
			<motion.div
				className={cn(
					"h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0",
					className
				)}
				animate={{
					width: animate ? (open ? "300px" : "60px") : "300px",
				}}
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				{...props}
			>
				{children}
			</motion.div>
		</>
	);
};

export const MobileSidebarHome = ({
	className,
	children,
	...props
}: React.ComponentProps<"div">) => {
	const { open, setOpen } = useSidebarHome();
		useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<>
			<div
				className={cn(
					"h-10 px-4 py-4  flex flex-row md:hidden items-center justify-between bg-transparent w-full"
				)}
				{...props}
			>
				<div className="flex justify-end z-20 w-full">
					<Menu2
						className="text-neutral-800 dark:text-neutral-200 cursor-pointer"
						onClick={() => setOpen(!open)}
					/>
				</div>
				<AnimatePresence>
					{open && (
						<motion.div
							initial={{ x: "-100%", opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: "-100%", opacity: 0 }}
							transition={{
								duration: 0.3,
								ease: "easeInOut",
							}}
							className={cn(
								"sticky  w-full inset-0 bg-white dark:bg-neutral-900 pl-10 py-10 z-[100] flex flex-col justify-between",
								className
							)}
						>
							<div
								className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200 cursor-pointer"
								onClick={() => setOpen(!open)}
							>
								<X />
							</div>
							{children}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</>
	);
};

export const SidebarHomeLink = ({
	link,
	className,
	...props
}: {
	link: Links;
	className?: string;
}) => {
	const { open, animate } = useSidebarHome();
	return (
		<a
			href={link.href}
			className={cn(
				"flex items-center justify-start gap-2 group/sidebarHome py-2",
				className
			)}
			{...props}
		>
			{link.icon}

			<motion.span
				animate={{
					display: animate
						? open
							? "inline-block"
							: "none"
						: "inline-block",
					opacity: animate ? (open ? 1 : 0) : 1,
				}}
				className="text-neutral-700  dark:text-neutral-200 text-sm group-hover/sidebarHome:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
			>
				{link.label}
			</motion.span>
		</a>
	);
};
