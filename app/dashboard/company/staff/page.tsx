"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import DashboardLayout from "@/components/dashboard-layout";
import StaffFilters from "@/components/staff/staff-filters";
import StaffGrid from "@/components/staff/staff-grid";
import StaffList from "@/components/staff/staff-list";
import StaffSearch from "@/components/staff/staff-search";
import ViewToggle from "@/components/staff/view-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Filter } from "lucide-react";

export interface Staff {
	id: string;
	name: string;
	rating: number;
	experience: number;
	skills: string[];
	location: string;
	hourlyRate: number;
	availability: "Available" | "Busy" | "Unavailable";
	completedProjects: number;
	avatar?: string;
	bio?: string;
	languages?: string[];
	timezone?: string;
	responseTime?: string;
	successRate?: number;
}

const mockStaffData: Staff[] = [
	{
		id: "1",
		name: "Sarah Johnson",
		rating: 4.9,
		experience: 8,
		skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
		location: "Morocco, CA",
		hourlyRate: 85,
		availability: "Available",
		completedProjects: 127,
		bio: "Senior full-stack developer with expertise in modern web technologies and cloud architecture.",
		languages: ["English", "Spanish"],
		timezone: "PST",
		responseTime: "< 1 hour",
		successRate: 98,
	},
	{
		id: "2",
		name: "Michael Chen",
		rating: 4.8,
		experience: 6,
		skills: ["Python", "Django", "PostgreSQL", "Docker", "Kubernetes"],
		location: "New York, NY",
		hourlyRate: 75,
		availability: "Available",
		completedProjects: 89,
		bio: "Backend specialist focused on scalable systems and database optimization.",
		languages: ["English", "Mandarin"],
		timezone: "EST",
		responseTime: "< 2 hours",
		successRate: 96,
	},
	{
		id: "3",
		name: "Emily Rodriguez",
		rating: 4.7,
		experience: 5,
		skills: [
			"UI/UX Design",
			"Figma",
			"React",
			"CSS",
			"Adobe Creative Suite",
		],
		location: "Austin, TX",
		hourlyRate: 70,
		availability: "Busy",
		completedProjects: 156,
		bio: "Creative designer with a passion for user-centered design and modern interfaces.",
		languages: ["English", "Spanish"],
		timezone: "CST",
		responseTime: "< 4 hours",
		successRate: 94,
	},
	{
		id: "4",
		name: "David Kim",
		rating: 4.9,
		experience: 10,
		skills: ["Java", "Spring Boot", "Microservices", "AWS", "MongoDB"],
		location: "Seattle, WA",
		hourlyRate: 95,
		availability: "Available",
		completedProjects: 203,
		bio: "Enterprise architect with extensive experience in large-scale distributed systems.",
		languages: ["English", "Korean"],
		timezone: "PST",
		responseTime: "< 1 hour",
		successRate: 99,
	},
	{
		id: "5",
		name: "Lisa Thompson",
		rating: 4.6,
		experience: 4,
		skills: ["Flutter", "Dart", "iOS", "Android", "Firebase"],
		location: "Miami, FL",
		hourlyRate: 65,
		availability: "Available",
		completedProjects: 78,
		bio: "Mobile app developer specializing in cross-platform solutions and native performance.",
		languages: ["English", "Portuguese"],
		timezone: "EST",
		responseTime: "< 3 hours",
		successRate: 92,
	},
	{
		id: "6",
		name: "Alex Petrov",
		rating: 4.8,
		experience: 7,
		skills: ["DevOps", "Terraform", "Jenkins", "Docker", "Azure"],
		location: "Chicago, IL",
		hourlyRate: 80,
		availability: "Available",
		completedProjects: 134,
		bio: "DevOps engineer focused on automation, CI/CD, and cloud infrastructure.",
		languages: ["English", "Russian"],
		timezone: "CST",
		responseTime: "< 2 hours",
		successRate: 97,
	},
];

export interface FilterState {
	skills: string[];
	location: string;
	minRating: number;
	maxRate: number;
	minExperience: number;
	availability: string[];
	sortBy: string;
}

export default function FindStaffPage() {
	const user = useStore((state : any) => state.user);
	const router = useRouter();
	const [staffData, setStaffData] = useState<Staff[]>(mockStaffData);
	const [filteredStaff, setFilteredStaff] = useState<Staff[]>(mockStaffData);
	const [searchQuery, setSearchQuery] = useState("");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [showFilters, setShowFilters] = useState(false);
	const [filters, setFilters] = useState<FilterState>({
		skills: [],
		location: "",
		minRating: 0,
		maxRate: 200,
		minExperience: 0,
		availability: [],
		sortBy: "rating",
	});

	useEffect(() => {
		if (!user || user.role !== "company") {
			router.push("/auth/login");
		}
	}, [user, router]);

	useEffect(() => {
		let filtered = staffData;

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(staff) =>
					staff.name
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					staff.skills.some((skill) =>
						skill.toLowerCase().includes(searchQuery.toLowerCase())
					) ||
					staff.location
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			);
		}

		// Apply filters
		if (filters.skills.length > 0) {
			filtered = filtered.filter((staff) =>
				filters.skills.some((skill) => staff.skills.includes(skill))
			);
		}

		if (filters.location) {
			filtered = filtered.filter((staff) =>
				staff.location
					.toLowerCase()
					.includes(filters.location.toLowerCase())
			);
		}

		if (filters.minRating > 0) {
			filtered = filtered.filter(
				(staff) => staff.rating >= filters.minRating
			);
		}

		if (filters.maxRate < 200) {
			filtered = filtered.filter(
				(staff) => staff.hourlyRate <= filters.maxRate
			);
		}

		if (filters.minExperience > 0) {
			filtered = filtered.filter(
				(staff) => staff.experience >= filters.minExperience
			);
		}

		if (filters.availability.length > 0) {
			filtered = filtered.filter((staff) =>
				filters.availability.includes(staff.availability)
			);
		}

		// Apply sorting
		switch (filters.sortBy) {
			case "rating":
				filtered.sort((a, b) => b.rating - a.rating);
				break;
			case "experience":
				filtered.sort((a, b) => b.experience - a.experience);
				break;
			case "rate-low":
				filtered.sort((a, b) => a.hourlyRate - b.hourlyRate);
				break;
			case "rate-high":
				filtered.sort((a, b) => b.hourlyRate - a.hourlyRate);
				break;
			case "projects":
				filtered.sort(
					(a, b) => b.completedProjects - a.completedProjects
				);
				break;
			default:
				break;
		}

		setFilteredStaff(filtered);
	}, [searchQuery, filters, staffData]);

	const handleFilterChange = (newFilters: Partial<FilterState>) => {
		setFilters((prev) => ({ ...prev, ...newFilters }));
	};

	const clearFilters = () => {
		setFilters({
			skills: [],
			location: "",
			minRating: 0,
			maxRate: 200,
			minExperience: 0,
			availability: [],
			sortBy: "rating",
		});
		setSearchQuery("");
	};

	const activeFiltersCount =
		filters.skills.length +
		(filters.location ? 1 : 0) +
		(filters.minRating > 0 ? 1 : 0) +
		(filters.maxRate < 200 ? 1 : 0) +
		(filters.minExperience > 0 ? 1 : 0) +
		filters.availability.length;

	if (!user) return null;

	return (
		<DashboardLayout>
			<div className="space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">Find Staff</h1>
						<p className="text-gray-600">
							Discover talented professionals for your projects
						</p>
					</div>
					<div className="flex items-center space-x-4">
						<Badge variant="outline" className="text-sm">
							{filteredStaff.length} of {staffData.length} staff
						</Badge>
						<ViewToggle
							viewMode={viewMode}
							onViewModeChange={setViewMode}
						/>
					</div>
				</div>

				{/* Search and Filter Bar */}
				<Card>
					<CardContent className="p-6">
						<div className="flex flex-col lg:flex-row gap-4">
							<div className="flex-1">
								<StaffSearch
									searchQuery={searchQuery}
									onSearchChange={setSearchQuery}
									placeholder="Search by name, skills, or location..."
								/>
							</div>
							<div className="flex items-center space-x-2">
								<Button
									variant={
										showFilters ? "default" : "outline"
									}
									onClick={() => setShowFilters(!showFilters)}
									className="relative"
								>
									<Filter className="h-4 w-4 mr-2" />
									Filters
									{activeFiltersCount > 0 && (
										<Badge className="ml-2 h-5 w-5 p-0 text-xs">
											{activeFiltersCount}
										</Badge>
									)}
								</Button>
								{activeFiltersCount > 0 && (
									<Button
										variant="ghost"
										onClick={clearFilters}
									>
										Clear All
									</Button>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid lg:grid-cols-4 gap-6">
					{/* Filters Sidebar */}
					{showFilters && (
						<div className="lg:col-span-1">
							<StaffFilters
								filters={filters}
								onFilterChange={handleFilterChange}
								staffData={staffData}
							/>
						</div>
					)}

					{/* Staff Results */}
					<div
						className={
							showFilters ? "lg:col-span-3" : "lg:col-span-4"
						}
					>
						{filteredStaff.length === 0 ? (
							<Card>
								<CardContent className="p-12 text-center">
									<Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
									<h3 className="text-lg font-semibold mb-2">
										No staff found
									</h3>
									<p className="text-gray-600 mb-4">
										Try adjusting your search criteria or
										filters
									</p>
									<Button onClick={clearFilters}>
										Clear Filters
									</Button>
								</CardContent>
							</Card>
						) : viewMode === "grid" ? (
							<StaffGrid staff={filteredStaff} />
						) : (
							<StaffList staff={filteredStaff} />
						)}
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
