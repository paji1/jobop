"use client";
import useShowScrollTop from "@/hooks/use-showScrollTop";
import { ArrowRight } from "lucide-react";

function ScrollTopIcon() {
	const showScrollTop = useShowScrollTop();
	return showScrollTop.show ? (
		<button
			onClick={showScrollTop.scrollToTop}
			aria-label="Scroll to top"
			className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg p-3 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400"
			style={{
				boxShadow: "0 4px 24px 0 rgba(80, 63, 205, 0.15)",
			}}
		>
			<ArrowRight className="rotate-[-90deg] h-6 w-6" />
		</button>
	) : null;
}

export default ScrollTopIcon;
