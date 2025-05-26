"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";

export const InfiniteMovingCards = ({
	items,
	direction = "left",
	speed = "fast",
	pauseOnHover = true,
	className,
}: {
	items: {
		quote: string;
		name: string;
		title: string;
		rating?: number;
		avatar?: string;
	}[];
	direction?: "left" | "right";
	speed?: "fast" | "normal" | "slow";
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	useEffect(() => {
		addAnimation();
	}, []);
	const [start, setStart] = useState(false);
	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}
	const getDirection = () => {
		if (containerRef.current) {
			if (direction === "left") {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"forwards"
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-direction",
					"reverse"
				);
			}
		}
	};
	const getSpeed = () => {
		if (containerRef.current) {
			if (speed === "fast") {
				containerRef.current.style.setProperty(
					"--animation-duration",
					"20s"
				);
			} else if (speed === "normal") {
				containerRef.current.style.setProperty(
					"--animation-duration",
					"40s"
				);
			} else {
				containerRef.current.style.setProperty(
					"--animation-duration",
					"80s"
				);
			}
		}
	};
	return (
		<div
			ref={containerRef}
			className={cn(
				"scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					"flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
					start && "animate-scroll",
					pauseOnHover && "hover:[animation-play-state:paused]"
				)}
			>
				{items.map((item, idx) => (
					<li
						className="w-[380px] max-w-full relative rounded-3xl border-0 flex-shrink-0 px-8 py-8 md:w-[420px] group hover:scale-105 transition-all duration-300"
						style={{
							background:
								"linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
							backdropFilter: "blur(10px)",
							border: "1px solid rgba(255,255,255,0.1)",
							boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
						}}
						key={`${item.name}-${idx}`}
					>
						<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

						<blockquote className="relative z-10">
							{/* Quote Icon */}
							<div className="mb-4">
								<Quote className="h-8 w-8 text-blue-400 dark:text-blue-300 opacity-60" />
							</div>

							{/* Quote Text */}
							<p className="relative z-20 text-base leading-relaxed text-gray-800 dark:text-gray-100 font-medium mb-6 line-clamp-4">
								"{item.quote}"
							</p>

							{/* Rating */}
							{item.rating && (
								<div className="flex items-center mb-4">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className={`h-4 w-4 ${
												i < item.rating!
													? "text-yellow-400 fill-current"
													: "text-gray-300 dark:text-gray-600"
											}`}
										/>
									))}
									<span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
										{item.rating}.0
									</span>
								</div>
							)}

							{/* Author Info */}
							<div className="relative z-20 flex items-center">
								{/* Avatar */}
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg mr-4 shadow-lg">
									{item.avatar ? (
										<img
											src={
												item.avatar ||
												"/placeholder.svg"
											}
											alt={item.name}
											className="w-full h-full rounded-full object-cover"
										/>
									) : (
										item.name.charAt(0).toUpperCase()
									)}
								</div>

								{/* Name and Title */}
								<div className="flex flex-col">
									<span className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
										{item.name}
									</span>
									<span className="text-sm text-gray-600 dark:text-gray-400 leading-tight">
										{item.title}
									</span>
								</div>
							</div>

							{/* Decorative Elements */}
							<div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
							<div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
						</blockquote>
					</li>
				))}
			</ul>
		</div>
	);
};
