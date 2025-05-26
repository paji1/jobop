"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
	Plus,
	X,
	Briefcase,
	Award,
	User,
	ArrowRight,
	ArrowLeft,
	CheckCircle,
	Star,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { Spotlight } from "@/components/ui/spotlight";
import { GridPattern } from "@/components/ui/grid-pattern";

interface Experience {
	id: string;
	company: string;
	position: string;
	duration: string;
	description: string;
	skills: string[];
}

interface Certification {
	id: string;
	name: string;
	issuer: string;
	year: string;
	credentialId?: string;
}

const popularSkills = [
	"React",
	"TypeScript",
	"JavaScript",
	"Node.js",
	"Python",
	"Java",
	"AWS",
	"Docker",
	"Kubernetes",
	"GraphQL",
	"PostgreSQL",
	"MongoDB",
	"Django",
	"Spring Boot",
	"Flutter",
	"React Native",
	"iOS",
	"Android",
	"UI/UX Design",
	"Figma",
	"Adobe Creative Suite",
	"DevOps",
	"Terraform",
	"Jenkins",
	"Git",
	"Agile",
	"Scrum",
	"Machine Learning",
	"Data Science",
	"Angular",
	"Vue.js",
	"PHP",
];

const experienceLevels = [
	{ value: "entry", label: "Entry Level (0-2 years)" },
	{ value: "mid", label: "Mid Level (3-5 years)" },
	{ value: "senior", label: "Senior Level (6-8 years)" },
	{ value: "lead", label: "Lead/Principal (9+ years)" },
];

export default function SkillsOnboardingPage() {
	const user = useStore((state) => state.user);
	const setUser = useStore((state) => state.setUser);
	const router = useRouter();
	const { toast } = useToast();

	const [currentStep, setCurrentStep] = useState(1);
	const [loading, setLoading] = useState(false);

	// Skills and Bio
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
	const [customSkill, setCustomSkill] = useState("");
	const [bio, setBio] = useState("");
	const [experienceLevel, setExperienceLevel] = useState("");
	const [hourlyRate, setHourlyRate] = useState("");
	const [portfolio, setPortfolio] = useState("");

	// Work Experience
	const [experiences, setExperiences] = useState<Experience[]>([]);
	const [currentExperience, setCurrentExperience] = useState<
		Omit<Experience, "id">
	>({
		company: "",
		position: "",
		duration: "",
		description: "",
		skills: [],
	});

	// Certifications
	const [certifications, setCertifications] = useState<Certification[]>([]);
	const [currentCertification, setCurrentCertification] = useState<
		Omit<Certification, "id">
	>({
		name: "",
		issuer: "",
		year: "",
		credentialId: "",
	});

	useEffect(() => {
		if (!user || user.role !== "staff") {
			router.push("/auth/login");
		}
	}, [user, router]);

	const addSkill = (skill: string) => {
		if (skill && !selectedSkills.includes(skill)) {
			setSelectedSkills([...selectedSkills, skill]);
		}
	};

	const removeSkill = (skill: string) => {
		setSelectedSkills(selectedSkills.filter((s) => s !== skill));
	};

	const addCustomSkill = () => {
		if (customSkill.trim()) {
			addSkill(customSkill.trim());
			setCustomSkill("");
		}
	};

	const addExperience = () => {
		if (currentExperience.company && currentExperience.position) {
			const newExperience: Experience = {
				...currentExperience,
				id: Date.now().toString(),
			};
			setExperiences([...experiences, newExperience]);
			setCurrentExperience({
				company: "",
				position: "",
				duration: "",
				description: "",
				skills: [],
			});
		}
	};

	const removeExperience = (id: string) => {
		setExperiences(experiences.filter((exp) => exp.id !== id));
	};

	const addCertification = () => {
		if (currentCertification.name && currentCertification.issuer) {
			const newCertification: Certification = {
				...currentCertification,
				id: Date.now().toString(),
			};
			setCertifications([...certifications, newCertification]);
			setCurrentCertification({
				name: "",
				issuer: "",
				year: "",
				credentialId: "",
			});
		}
	};

	const removeCertification = (id: string) => {
		setCertifications(certifications.filter((cert) => cert.id !== id));
	};

	const handleComplete = async () => {
		setLoading(true);

		// Simulate API call to save profile data
		setTimeout(() => {
			if (user) {
				const updatedUser = {
					...user,
					skills: selectedSkills,
					bio,
					experienceLevel,
					hourlyRate: hourlyRate
						? Number.parseInt(hourlyRate)
						: undefined,
					portfolio,
					workExperience: experiences,
					certifications,
					profileCompleted: true,
				};

				setUser(updatedUser);

				toast({
					title: "Profile completed!",
					description: "Welcome to JobOp. Your profile is now live!",
				});

				router.push("/dashboard/staff");
			}
			setLoading(false);
		}, 1500);
	};

	const nextStep = () => {
		if (currentStep < 3) {
			setCurrentStep(currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const canProceedFromStep1 = selectedSkills.length >= 3 && bio.length >= 50;
	const canProceedFromStep2 = experiences.length >= 1;
	const canComplete = canProceedFromStep1 && canProceedFromStep2;

	if (!user) return null;

	return (
		<div className="min-h-screen bg-white dark:bg-black relative overflow-hidden">
			{/* Background Elements */}
			<Spotlight
				className="top-40 left-0 md:left-60 md:-top-20"
				fill="blue"
			/>
			<GridPattern className="opacity-20" />

			{/* Floating Orbs */}
			<div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
			<div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
			<div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl"></div>

			{/* Theme Toggle */}
			<div className="absolute top-6 right-6 z-50">
				<ThemeToggle />
			</div>

			<div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="flex items-center justify-center space-x-3 mb-6">
						<div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
							<Briefcase className="h-8 w-8 text-white" />
						</div>
						<span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							JobOp
						</span>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
						Complete Your{" "}
						<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
							Professional Profile
						</span>
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Showcase your skills and experience to connect with top
						companies looking for talent like yours
					</p>
				</div>

				{/* Progress Section */}
				<div className="mb-12">
					<div className="max-w-2xl mx-auto">
						<div className="flex items-center justify-between mb-4">
							<span className="text-sm font-medium dark:text-gray-200">
								Step {currentStep} of 3
							</span>
							<span className="text-sm text-gray-500 dark:text-gray-400">
								{Math.round((currentStep / 3) * 100)}% complete
							</span>
						</div>
						<Progress
							value={(currentStep / 3) * 100}
							className="h-3 bg-gray-200 dark:bg-gray-700"
						/>

						{/* Step Indicators */}
						<div className="flex justify-between mt-6">
							{[
								{
									step: 1,
									title: "Skills & Profile",
									icon: User,
								},
								{
									step: 2,
									title: "Experience",
									icon: Briefcase,
								},
								{
									step: 3,
									title: "Certifications",
									icon: Award,
								},
							].map(({ step, title, icon: Icon }) => (
								<div
									key={step}
									className="flex flex-col items-center"
								>
									<div
										className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 ${
											currentStep >= step
												? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white"
												: "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
										}`}
									>
										{currentStep > step ? (
											<CheckCircle className="h-6 w-6" />
										) : (
											<Icon className="h-6 w-6" />
										)}
									</div>
									<span
										className={`text-sm font-medium ${
											currentStep >= step
												? "text-gray-900 dark:text-white"
												: "text-gray-500 dark:text-gray-400"
										}`}
									>
										{title}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Step Content */}
				<div className="max-w-4xl mx-auto">
					{/* Step 1: Skills and Bio */}
					{currentStep === 1 && (
						<Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
							<CardHeader className="text-center pb-8">
								<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<User className="h-8 w-8 text-white" />
								</div>
								<CardTitle className="text-2xl dark:text-white">
									Skills & Professional Profile
								</CardTitle>
								<CardDescription className="text-lg dark:text-gray-300">
									Tell us about your expertise and what makes
									you unique in your field
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-8">
								{/* Skills Selection */}
								<div className="space-y-6">
									<div>
										<Label className="text-lg font-semibold dark:text-gray-200 mb-3 block">
											Your Skills *
										</Label>
										<p className="text-gray-600 dark:text-gray-400 mb-4">
											Select at least 3 skills that best
											describe your expertise
										</p>
									</div>

									{/* Selected Skills */}
									{selectedSkills.length > 0 && (
										<div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
											<h4 className="font-semibold mb-3 dark:text-white">
												Selected Skills (
												{selectedSkills.length})
											</h4>
											<div className="flex flex-wrap gap-2">
												{selectedSkills.map((skill) => (
													<Badge
														key={skill}
														className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 text-sm"
													>
														{skill}
														<Button
															variant="ghost"
															size="sm"
															className="h-4 w-4 p-0 ml-2 hover:bg-white/20"
															onClick={() =>
																removeSkill(
																	skill
																)
															}
														>
															<X className="h-3 w-3" />
														</Button>
													</Badge>
												))}
											</div>
										</div>
									)}

									{/* Popular Skills */}
									<div>
										<Label className="text-base font-medium mb-3 block dark:text-gray-200">
											Popular Skills
										</Label>
										<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
											{popularSkills
												.filter(
													(skill) =>
														!selectedSkills.includes(
															skill
														)
												)
												.map((skill) => (
													<Badge
														key={skill}
														variant="outline"
														className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:border-gray-600 dark:text-gray-300 p-2 text-center justify-center transition-colors"
														onClick={() =>
															addSkill(skill)
														}
													>
														{skill}
													</Badge>
												))}
										</div>
									</div>

									{/* Custom Skill */}
									<div className="flex space-x-3">
										<Input
											placeholder="Add a custom skill"
											value={customSkill}
											onChange={(e) =>
												setCustomSkill(e.target.value)
											}
											onKeyPress={(e) =>
												e.key === "Enter" &&
												addCustomSkill()
											}
											className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
										/>
										<Button
											onClick={addCustomSkill}
											disabled={!customSkill.trim()}
											className="bg-gradient-to-r from-blue-600 to-purple-600"
										>
											<Plus className="h-4 w-4" />
										</Button>
									</div>
								</div>

								{/* Bio */}
								<div className="space-y-3">
									<Label
										htmlFor="bio"
										className="text-lg font-semibold dark:text-gray-200"
									>
										Professional Bio *
									</Label>
									<p className="text-gray-600 dark:text-gray-400">
										Write a compelling description of your
										experience and expertise (minimum 50
										characters)
									</p>
									<Textarea
										id="bio"
										placeholder="I'm a passionate developer with expertise in building scalable web applications..."
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										rows={5}
										className="resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
									/>
									<div className="text-right text-sm text-gray-500 dark:text-gray-400">
										{bio.length}/50 minimum
									</div>
								</div>

								{/* Experience Level and Rate */}
								<div className="grid md:grid-cols-2 gap-6">
									<div className="space-y-3">
										<Label className="text-lg font-semibold dark:text-gray-200">
											Experience Level
										</Label>
										<Select
											value={experienceLevel}
											onValueChange={setExperienceLevel}
										>
											<SelectTrigger className="dark:bg-gray-800 dark:border-gray-600 dark:text-white">
												<SelectValue placeholder="Select your experience level" />
											</SelectTrigger>
											<SelectContent>
												{experienceLevels.map(
													(level) => (
														<SelectItem
															key={level.value}
															value={level.value}
														>
															{level.label}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
									</div>

									<div className="space-y-3">
										<Label
											htmlFor="rate"
											className="text-lg font-semibold dark:text-gray-200"
										>
											Hourly Rate ($)
										</Label>
										<Input
											id="rate"
											type="number"
											placeholder="75"
											value={hourlyRate}
											onChange={(e) =>
												setHourlyRate(e.target.value)
											}
											className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
										/>
									</div>
								</div>

								{/* Portfolio */}
								<div className="space-y-3">
									<Label
										htmlFor="portfolio"
										className="text-lg font-semibold dark:text-gray-200"
									>
										Portfolio URL
									</Label>
									<Input
										id="portfolio"
										type="url"
										placeholder="https://yourportfolio.com"
										value={portfolio}
										onChange={(e) =>
											setPortfolio(e.target.value)
										}
										className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
									/>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Step 2: Work Experience */}
					{currentStep === 2 && (
						<Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
							<CardHeader className="text-center pb-8">
								<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<Briefcase className="h-8 w-8 text-white" />
								</div>
								<CardTitle className="text-2xl dark:text-white">
									Work Experience
								</CardTitle>
								<CardDescription className="text-lg dark:text-gray-300">
									Showcase your professional background and
									achievements (at least 1 required)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-8">
								{/* Existing Experiences */}
								{experiences.length > 0 && (
									<div className="space-y-4">
										<Label className="text-lg font-semibold dark:text-gray-200">
											Your Experience
										</Label>
										{experiences.map((exp) => (
											<div
												key={exp.id}
												className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50"
											>
												<div className="flex justify-between items-start mb-4">
													<div>
														<h4 className="text-lg font-semibold dark:text-white">
															{exp.position}
														</h4>
														<p className="text-gray-600 dark:text-gray-400 font-medium">
															{exp.company} •{" "}
															{exp.duration}
														</p>
													</div>
													<Button
														variant="ghost"
														size="sm"
														onClick={() =>
															removeExperience(
																exp.id
															)
														}
													>
														<X className="h-4 w-4" />
													</Button>
												</div>
												{exp.description && (
													<p className="text-gray-700 dark:text-gray-300 mb-4">
														{exp.description}
													</p>
												)}
												{exp.skills.length > 0 && (
													<div className="flex flex-wrap gap-2">
														{exp.skills.map(
															(skill) => (
																<Badge
																	key={skill}
																	variant="secondary"
																	className="text-xs"
																>
																	{skill}
																</Badge>
															)
														)}
													</div>
												)}
											</div>
										))}
									</div>
								)}

								{/* Add New Experience */}
								<div className="space-y-6 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
									<Label className="text-lg font-semibold dark:text-gray-200">
										Add Work Experience
									</Label>

									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="company"
												className="dark:text-gray-200"
											>
												Company *
											</Label>
											<Input
												id="company"
												placeholder="Company name"
												value={
													currentExperience.company
												}
												onChange={(e) =>
													setCurrentExperience({
														...currentExperience,
														company: e.target.value,
													})
												}
												className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="position"
												className="dark:text-gray-200"
											>
												Position *
											</Label>
											<Input
												id="position"
												placeholder="Job title"
												value={
													currentExperience.position
												}
												onChange={(e) =>
													setCurrentExperience({
														...currentExperience,
														position:
															e.target.value,
													})
												}
												className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="duration"
											className="dark:text-gray-200"
										>
											Duration
										</Label>
										<Input
											id="duration"
											placeholder="e.g., Jan 2020 - Dec 2022"
											value={currentExperience.duration}
											onChange={(e) =>
												setCurrentExperience({
													...currentExperience,
													duration: e.target.value,
												})
											}
											className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
										/>
									</div>

									<div className="space-y-2">
										<Label
											htmlFor="description"
											className="dark:text-gray-200"
										>
											Description
										</Label>
										<Textarea
											id="description"
											placeholder="Describe your role and achievements..."
											value={
												currentExperience.description
											}
											onChange={(e) =>
												setCurrentExperience({
													...currentExperience,
													description: e.target.value,
												})
											}
											rows={3}
											className="resize-none dark:bg-gray-800 dark:border-gray-600 dark:text-white"
										/>
									</div>

									<div className="space-y-2">
										<Label className="dark:text-gray-200">
											Skills Used
										</Label>
										<div className="flex flex-wrap gap-2">
											{selectedSkills.map((skill) => (
												<Badge
													key={skill}
													variant={
														currentExperience.skills.includes(
															skill
														)
															? "default"
															: "outline"
													}
													className="cursor-pointer dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
													onClick={() => {
														const skills =
															currentExperience.skills.includes(
																skill
															)
																? currentExperience.skills.filter(
																		(s) =>
																			s !==
																			skill
																  )
																: [
																		...currentExperience.skills,
																		skill,
																  ];
														setCurrentExperience({
															...currentExperience,
															skills,
														});
													}}
												>
													{skill}
												</Badge>
											))}
										</div>
									</div>

									<Button
										onClick={addExperience}
										disabled={
											!currentExperience.company ||
											!currentExperience.position
										}
										className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
									>
										<Plus className="h-4 w-4 mr-2" />
										Add Experience
									</Button>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Step 3: Certifications */}
					{currentStep === 3 && (
						<Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
							<CardHeader className="text-center pb-8">
								<div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<Award className="h-8 w-8 text-white" />
								</div>
								<CardTitle className="text-2xl dark:text-white">
									Certifications & Education
								</CardTitle>
								<CardDescription className="text-lg dark:text-gray-300">
									Add your certifications and educational
									achievements to stand out (optional)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-8">
								{/* Existing Certifications */}
								{certifications.length > 0 && (
									<div className="space-y-4">
										<Label className="text-lg font-semibold dark:text-gray-200">
											Your Certifications
										</Label>
										{certifications.map((cert) => (
											<div
												key={cert.id}
												className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50"
											>
												<div className="flex justify-between items-start">
													<div>
														<h4 className="text-lg font-semibold dark:text-white">
															{cert.name}
														</h4>
														<p className="text-gray-600 dark:text-gray-400 font-medium">
															{cert.issuer} •{" "}
															{cert.year}
														</p>
														{cert.credentialId && (
															<p className="text-sm text-gray-500 dark:text-gray-400">
																ID:{" "}
																{
																	cert.credentialId
																}
															</p>
														)}
													</div>
													<Button
														variant="ghost"
														size="sm"
														onClick={() =>
															removeCertification(
																cert.id
															)
														}
													>
														<X className="h-4 w-4" />
													</Button>
												</div>
											</div>
										))}
									</div>
								)}

								{/* Add New Certification */}
								<div className="space-y-6 p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
									<Label className="text-lg font-semibold dark:text-gray-200">
										Add Certification
									</Label>

									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="certName"
												className="dark:text-gray-200"
											>
												Certification Name
											</Label>
											<Input
												id="certName"
												placeholder="e.g., AWS Certified Developer"
												value={
													currentCertification.name
												}
												onChange={(e) =>
													setCurrentCertification({
														...currentCertification,
														name: e.target.value,
													})
												}
												className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="issuer"
												className="dark:text-gray-200"
											>
												Issuing Organization
											</Label>
											<Input
												id="issuer"
												placeholder="e.g., Amazon Web Services"
												value={
													currentCertification.issuer
												}
												onChange={(e) =>
													setCurrentCertification({
														...currentCertification,
														issuer: e.target.value,
													})
												}
												className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
											/>
										</div>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label
												htmlFor="year"
												className="dark:text-gray-200"
											>
												Year Obtained
											</Label>
											<Input
												id="year"
												placeholder="2023"
												value={
													currentCertification.year
												}
												onChange={(e) =>
													setCurrentCertification({
														...currentCertification,
														year: e.target.value,
													})
												}
												className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
											/>
										</div>
										<div className="space-y-2">
											<Label
												htmlFor="credentialId"
												className="dark:text-gray-200"
											>
												Credential ID (Optional)
											</Label>
											<Input
												id="credentialId"
												placeholder="Certificate ID"
												value={
													currentCertification.credentialId
												}
												onChange={(e) =>
													setCurrentCertification({
														...currentCertification,
														credentialId:
															e.target.value,
													})
												}
												className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
											/>
										</div>
									</div>

									<Button
										onClick={addCertification}
										disabled={
											!currentCertification.name ||
											!currentCertification.issuer
										}
										className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
									>
										<Plus className="h-4 w-4 mr-2" />
										Add Certification
									</Button>
								</div>

								{/* Profile Summary */}
								<div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
									<h4 className="text-lg font-semibold mb-4 dark:text-white flex items-center">
										<Star className="h-5 w-5 mr-2 text-yellow-500" />
										Profile Summary
									</h4>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
										<div className="text-center">
											<div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
												{selectedSkills.length}
											</div>
											<div className="text-gray-600 dark:text-gray-400">
												Skills
											</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
												{experiences.length}
											</div>
											<div className="text-gray-600 dark:text-gray-400">
												Experience
											</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-green-600 dark:text-green-400">
												{certifications.length}
											</div>
											<div className="text-gray-600 dark:text-gray-400">
												Certifications
											</div>
										</div>
										<div className="text-center">
											<div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
												{hourlyRate
													? `$${hourlyRate}`
													: "—"}
											</div>
											<div className="text-gray-600 dark:text-gray-400">
												Hourly Rate
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					)}
				</div>

				{/* Navigation */}
				<div className="flex justify-between mt-12 max-w-4xl mx-auto">
					<Button
						variant="outline"
						onClick={prevStep}
						disabled={currentStep === 1}
						className="px-8 py-3"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Previous
					</Button>

					{currentStep < 3 ? (
						<Button
							onClick={nextStep}
							disabled={
								(currentStep === 1 && !canProceedFromStep1) ||
								(currentStep === 2 && !canProceedFromStep2)
							}
							className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600"
						>
							Next
							<ArrowRight className="h-4 w-4 ml-2" />
						</Button>
					) : (
						<Button
							onClick={handleComplete}
							disabled={!canComplete || loading}
							className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 min-w-[160px]"
						>
							{loading ? "Completing..." : "Complete Profile"}
						</Button>
					)}
				</div>

				{/* Requirements Notice */}
				<div className="text-center mt-8 max-w-2xl mx-auto">
					{currentStep === 1 && !canProceedFromStep1 && (
						<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
							<p className="text-yellow-800 dark:text-yellow-200">
								Please select at least 3 skills and write a bio
								with minimum 50 characters to continue
							</p>
						</div>
					)}
					{currentStep === 2 && !canProceedFromStep2 && (
						<div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
							<p className="text-yellow-800 dark:text-yellow-200">
								Please add at least one work experience to
								continue
							</p>
						</div>
					)}
					{currentStep === 3 && (
						<div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
							<p className="text-green-800 dark:text-green-200">
								Great! You can complete your profile now.
								Certifications are optional but recommended.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
