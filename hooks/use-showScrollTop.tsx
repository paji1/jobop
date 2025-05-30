"use client";
import { useState, useEffect } from "react";

function useShowScrollTop() {
	const [show, setShow] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		const handleScroll = () => {
			const hero = document.getElementById("home");
			if (!hero) return;
			const heroBottom = hero.getBoundingClientRect().bottom;
			setShow(heroBottom < 0);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Run once on mount in case user already scrolled

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return { show, setShow, scrollToTop };
}

export default useShowScrollTop;
