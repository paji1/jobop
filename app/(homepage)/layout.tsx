import { Footer } from "@/components/sections/footer";
import NavBar from "@/components/sections/navbar";
import HomeSidebar from "@/components/sidebar/home-sidebar";
import { SidebarHome, SidebarHomeProvider } from "@/components/sidebar/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<SidebarHomeProvider>
					<NavBar />
					
					{children}

					<Footer />
					<Toaster />
				</SidebarHomeProvider>
			</ThemeProvider>
		</main>
	);
}
