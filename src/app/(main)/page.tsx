import {Logo} from "@/components/logo";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, BarChart3, Target, Zap, TrendingUp, Calendar } from "lucide-react"

export default function LandingPage() {
	return (
		<div className="min-h-screen">
			{/* Header */}
			<header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Logo/>
					</div>
					<nav className="hidden md:flex items-center gap-6">
						<Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
							Features
						</Link>
						<Link href="#stats" className="text-sm font-medium hover:text-primary transition-colors">
							Why Trackly
						</Link>
						<Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
							Dashboard
						</Link>
					</nav>
					<div className="flex items-center gap-3">
						<Button variant={"ghost"} asChild>
							<Link href="/auth">Get Started</Link>
						</Button>
					</div>
				</div>
			</header>
			
			{/* Hero Section */}
			<section className="container mx-auto px-4 py-20 md:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
						✨ Build Better Habits, One Day at a Time
					</div>
					<h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
						Transform Your Life Through <span className="text-primary">Consistent Habits</span>
					</h1>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
						Track, analyze, and master your daily habits with our intuitive platform. Turn your goals into reality with
						data-driven insights and streak tracking.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Button size="lg" className="text-lg px-8" asChild>
							<Link href="/auth">Get Started Free</Link>
						</Button>
						<Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
							<Link href="#features">Learn More</Link>
						</Button>
					</div>
					<p className="text-sm text-muted-foreground mt-4">No credit card required • Free forever</p>
				</div>
			</section>
			
			{/* Stats Section */}
			<section id="stats" className="bg-muted/50 py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
						<Card className="border-2">
							<CardHeader className="text-center">
								<div className="mx-auto mb-2 size-12 rounded-full bg-primary/10 flex items-center justify-center">
									<TrendingUp className="size-6 text-primary" />
								</div>
								<CardTitle className="text-4xl font-bold">94%</CardTitle>
								<CardDescription>Success Rate</CardDescription>
							</CardHeader>
							<CardContent className="text-center text-sm text-muted-foreground">
								Users who track daily see significant improvement
							</CardContent>
						</Card>
						
						<Card className="border-2">
							<CardHeader className="text-center">
								<div className="mx-auto mb-2 size-12 rounded-full bg-accent/10 flex items-center justify-center">
									<Target className="size-6 text-accent" />
								</div>
								<CardTitle className="text-4xl font-bold">21</CardTitle>
								<CardDescription>Day Average</CardDescription>
							</CardHeader>
							<CardContent className="text-center text-sm text-muted-foreground">
								Time to form a new habit with consistent tracking
							</CardContent>
						</Card>
						
						<Card className="border-2">
							<CardHeader className="text-center">
								<div className="mx-auto mb-2 size-12 rounded-full bg-chart-3/10 flex items-center justify-center">
									<Zap className="size-6 text-chart-3" />
								</div>
								<CardTitle className="text-4xl font-bold">50K+</CardTitle>
								<CardDescription>Active Users</CardDescription>
							</CardHeader>
							<CardContent className="text-center text-sm text-muted-foreground">
								Join thousands building better habits daily
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
			
			{/* Features Section */}
			<section id="features" className="container mx-auto px-4 py-20">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
						<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
							Powerful features designed to help you build and maintain lasting habits
						</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<Card className="border-2 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
									<CheckCircle2 className="size-6 text-primary" />
								</div>
								<CardTitle>Visual Habit Tracking</CardTitle>
								<CardDescription>
									See your progress at a glance with our intuitive calendar view. Track 20 days of history and 10 days
									ahead.
								</CardDescription>
							</CardHeader>
						</Card>
						
						<Card className="border-2 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="size-12 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
									<BarChart3 className="size-6 text-accent" />
								</div>
								<CardTitle>Advanced Analytics</CardTitle>
								<CardDescription>
									Dive deep into your habit data with charts, trends, and completion rates to understand your progress.
								</CardDescription>
							</CardHeader>
						</Card>
						
						<Card className="border-2 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="size-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-3">
									<Target className="size-6 text-chart-3" />
								</div>
								<CardTitle>Streak Tracking</CardTitle>
								<CardDescription>
									Build momentum with streak counters that motivate you to maintain consistency day after day.
								</CardDescription>
							</CardHeader>
						</Card>
						
						<Card className="border-2 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="size-12 rounded-lg bg-chart-4/10 flex items-center justify-center mb-3">
									<Calendar className="size-6 text-chart-4" />
								</div>
								<CardTitle>Daily View Mode</CardTitle>
								<CardDescription>
									Toggle to daily view to focus on today's habits. Perfect for your morning routine planning.
								</CardDescription>
							</CardHeader>
						</Card>
						
						<Card className="border-2 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="size-12 rounded-lg bg-chart-5/10 flex items-center justify-center mb-3">
									<Zap className="size-6 text-chart-5" />
								</div>
								<CardTitle>Custom Categories</CardTitle>
								<CardDescription>
									Organize habits by Health, Productivity, Learning, and more. Color-code for instant recognition.
								</CardDescription>
							</CardHeader>
						</Card>
						
						<Card className="border-2 hover:shadow-lg transition-shadow">
							<CardHeader>
								<div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
									<TrendingUp className="size-6 text-primary" />
								</div>
								<CardTitle>Progress Insights</CardTitle>
								<CardDescription>
									Get personalized insights and celebrate milestones as you build life-changing habits.
								</CardDescription>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>
			
			{/* CTA Section */}
			<section className="bg-primary text-primary-foreground py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold mb-4">Ready to Transform Your Habits?</h2>
					<p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
						Join thousands of users who are building better habits and achieving their goals
					</p>
					<Button size="lg" variant="secondary" className="text-lg px-8" asChild>
						<Link href="/habits">Start Tracking Today</Link>
					</Button>
				</div>
			</section>
			
			{/* Footer */}
			<footer className="border-t py-8 bg-card/50">
				<div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
					<p>&copy; 2025 Trackly. All rights reserved. Built with Next.js and Tailwind CSS.</p>
				</div>
			</footer>
		</div>
	)
}
