import { Footer } from "@/components/sections/footer";
import NavBar from "@/components/sections/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			
			<NavBar />
			{children}

			<Footer />
			<Toaster />
		</ThemeProvider>
	);
}
