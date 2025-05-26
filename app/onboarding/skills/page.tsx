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
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";

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
					description: "Welcome to JobOP. Your profile is now live!",
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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
			<div className="absolute top-4 right-4">
				<ThemeToggle />
			</div>

			<div className="container mx-auto px-4 max-w-4xl">
				{/* Header */}
				<div className="text-center mb-8">
					<div className="flex items-center justify-center space-x-2 mb-4">
						<Briefcase className="h-8 w-8 text-blue-600 dark:text-blue-400" />
						<span className="text-2xl font-bold dark:text-white">
							JobOP
						</span>
					</div>
					<h1 className="text-3xl font-bold mb-2 dark:text-white">
						Complete Your Profile
					</h1>
					<p className="text-gray-600 dark:text-gray-300">
						Help companies find you by showcasing your skills and
						experience
					</p>
				</div>

				{/* Progress */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-2">
						<span className="text-sm font-medium dark:text-gray-200">
							Step {currentStep} of 3
						</span>
						<span className="text-sm text-gray-500 dark:text-gray-400">
							{Math.round((currentStep / 3) * 100)}% complete
						</span>
					</div>
					<Progress value={(currentStep / 3) * 100} className="h-2" />
				</div>

				{/* Step 1: Skills and Bio */}
				{currentStep === 1 && (
					<div className="space-y-6">
						<Card className="dark:bg-gray-800 dark:border-gray-700">
							<CardHeader>
								<CardTitle className="flex items-center dark:text-white">
									<User className="h-5 w-5 mr-2" />
									Skills & Profile
								</CardTitle>
								<CardDescription className="dark:text-gray-300">
									Tell us about your skills and what makes you
									unique
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Skills Selection */}
								<div className="space-y-4">
									<Label className="text-base font-medium dark:text-gray-200">
										Your Skills *
									</Label>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Select at least 3 skills that best
										describe your expertise
									</p>

									{/* Selected Skills */}
									{selectedSkills.length > 0 && (
										<div className="flex flex-wrap gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
											{selectedSkills.map((skill) => (
												<Badge
													key={skill}
													variant="default"
													className="text-sm"
												>
													{skill}
													<Button
														variant="ghost"
														size="sm"
														className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
														onClick={() =>
															removeSkill(skill)
														}
													>
														<X className="h-3 w-3" />
													</Button>
												</Badge>
											))}
										</div>
									)}

									{/* Popular Skills */}
									<div>
										<Label className="text-sm font-medium mb-2 block dark:text-gray-200">
											Popular Skills
										</Label>
										<div className="flex flex-wrap gap-2">
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
														className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 dark:border-gray-600 dark:text-gray-300"
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
									<div className="flex space-x-2">
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
											className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
										/>
										<Button
											onClick={addCustomSkill}
											disabled={!customSkill.trim()}
										>
											<Plus className="h-4 w-4" />
										</Button>
									</div>
								</div>

								{/* Bio */}
								<div className="space-y-2">
									<Label
										htmlFor="bio"
										className="text-base font-medium dark:text-gray-200"
									>
										Professional Bio *
									</Label>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Write a compelling description of your
										experience and expertise (minimum 50
										characters)
									</p>
									<Textarea
										id="bio"
										placeholder="I'm a passionate developer with expertise in..."
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										rows={4}
										className="resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
									/>
									<div className="text-right text-sm text-gray-500 dark:text-gray-400">
										{bio.length}/50 minimum
									</div>
								</div>

								{/* Experience Level */}
								<div className="space-y-2">
									<Label className="text-base font-medium dark:text-gray-200">
										Experience Level
									</Label>
									<Select
										value={experienceLevel}
										onValueChange={setExperienceLevel}
									>
										<SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
											<SelectValue placeholder="Select your experience level" />
										</SelectTrigger>
										<SelectContent>
											{experienceLevels.map((level) => (
												<SelectItem
													key={level.value}
													value={level.value}
												>
													{level.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Hourly Rate */}
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label
											htmlFor="rate"
											className="text-base font-medium dark:text-gray-200"
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
											className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
										/>
									</div>
									<div className="space-y-2">
										<Label
											htmlFor="portfolio"
											className="text-base font-medium dark:text-gray-200"
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
											className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
										/>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Step 2: Work Experience */}
				{currentStep === 2 && (
					<div className="space-y-6">
						<Card className="dark:bg-gray-800 dark:border-gray-700">
							<CardHeader>
								<CardTitle className="flex items-center dark:text-white">
									<Briefcase className="h-5 w-5 mr-2" />
									Work Experience
								</CardTitle>
								<CardDescription className="dark:text-gray-300">
									Add your work experience to showcase your
									background (at least 1 required)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Existing Experiences */}
								{experiences.length > 0 && (
									<div className="space-y-4">
										<Label className="text-base font-medium dark:text-gray-200">
											Your Experience
										</Label>
										{experiences.map((exp) => (
											<div
												key={exp.id}
												className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
											>
												<div className="flex justify-between items-start mb-2">
													<div>
														<h4 className="font-semibold dark:text-white">
															{exp.position}
														</h4>
														<p className="text-gray-600 dark:text-gray-400">
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
													<p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
														{exp.description}
													</p>
												)}
												{exp.skills.length > 0 && (
													<div className="flex flex-wrap gap-1">
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
								<div className="space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
									<Label className="text-base font-medium dark:text-gray-200">
										Add Work Experience
									</Label>

									<div className="grid grid-cols-2 gap-4">
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
												className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
												className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
											className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
											className="resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
										className="w-full"
									>
										<Plus className="h-4 w-4 mr-2" />
										Add Experience
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Step 3: Certifications */}
				{currentStep === 3 && (
					<div className="space-y-6">
						<Card className="dark:bg-gray-800 dark:border-gray-700">
							<CardHeader>
								<CardTitle className="flex items-center dark:text-white">
									<Award className="h-5 w-5 mr-2" />
									Certifications & Education
								</CardTitle>
								<CardDescription className="dark:text-gray-300">
									Add your certifications and educational
									achievements (optional)
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Existing Certifications */}
								{certifications.length > 0 && (
									<div className="space-y-4">
										<Label className="text-base font-medium dark:text-gray-200">
											Your Certifications
										</Label>
										{certifications.map((cert) => (
											<div
												key={cert.id}
												className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
											>
												<div className="flex justify-between items-start">
													<div>
														<h4 className="font-semibold dark:text-white">
															{cert.name}
														</h4>
														<p className="text-gray-600 dark:text-gray-400">
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
								<div className="space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600">
									<Label className="text-base font-medium dark:text-gray-200">
										Add Certification
									</Label>

									<div className="grid grid-cols-2 gap-4">
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
												className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
												className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
											/>
										</div>
									</div>

									<div className="grid grid-cols-2 gap-4">
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
												className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
												className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
											/>
										</div>
									</div>

									<Button
										onClick={addCertification}
										disabled={
											!currentCertification.name ||
											!currentCertification.issuer
										}
										className="w-full"
									>
										<Plus className="h-4 w-4 mr-2" />
										Add Certification
									</Button>
								</div>

								{/* Profile Summary */}
								<div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
									<h4 className="font-semibold mb-2 dark:text-white">
										Profile Summary
									</h4>
									<div className="grid grid-cols-2 gap-4 text-sm dark:text-gray-300">
										<div>
											<span className="text-gray-600 dark:text-gray-400">
												Skills:
											</span>{" "}
											{selectedSkills.length}
										</div>
										<div>
											<span className="text-gray-600 dark:text-gray-400">
												Experience:
											</span>{" "}
											{experiences.length} positions
										</div>
										<div>
											<span className="text-gray-600 dark:text-gray-400">
												Certifications:
											</span>{" "}
											{certifications.length}
										</div>
										<div>
											<span className="text-gray-600 dark:text-gray-400">
												Hourly Rate:
											</span>{" "}
											{hourlyRate
												? `$${hourlyRate}`
												: "Not set"}
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				)}

				{/* Navigation */}
				<div className="flex justify-between">
					<Button
						variant="outline"
						onClick={prevStep}
						disabled={currentStep === 1}
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
						>
							Next
							<ArrowRight className="h-4 w-4 ml-2" />
						</Button>
					) : (
						<Button
							onClick={handleComplete}
							disabled={!canComplete || loading}
							className="min-w-[120px]"
						>
							{loading ? "Completing..." : "Complete Profile"}
						</Button>
					)}
				</div>

				{/* Requirements Notice */}
				{currentStep === 1 && !canProceedFromStep1 && (
					<div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
						Please select at least 3 skills and write a bio with
						minimum 50 characters to continue
					</div>
				)}
				{currentStep === 2 && !canProceedFromStep2 && (
					<div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
						Please add at least one work experience to continue
					</div>
				)}
				{currentStep === 3 && (
					<div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
						You can complete your profile now.
					</div>
				)}
			</div>
		</div>
	);
}
