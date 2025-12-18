'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen relative">
            {/* Background with college map overlay */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900"></div>
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: 'url(/college-map.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
            </div>

            {/* Header */}
            <nav className="relative z-10 px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="College Decision Matrix Logo"
                        width={50}
                        height={50}
                        className="rounded-lg"
                    />
                    <span className="text-xl font-bold text-accent-green">College Decision Matrix</span>
                </Link>
                <div className="flex gap-4">
                    <Link href="/login" className="px-6 py-2 rounded-lg border border-gray-600 hover:border-gray-500 transition-all">
                        Log In
                    </Link>
                    <Link href="/signup" className="px-6 py-2 rounded-lg bg-accent-green text-black font-semibold hover-glow-green transition-all">
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Make Your College Decision<br />
                    <span className="text-accent-green">With Confidence</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
                    Compare schools using weighted metrics, cost analysis, and data-driven insights. Make the smartest choice for your future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/signup"
                        className="px-8 py-4 rounded-lg bg-accent-green text-black text-lg font-semibold glow-green hover-glow-green transition-all"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        href="/login"
                        className="px-8 py-4 rounded-lg border border-gray-600 text-lg font-semibold hover:border-accent-green transition-all"
                    >
                        Log In
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Feature 1 */}
                    <div className="card-glow p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Weighted Decision Matrix</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Customize categories and assign weights based on what matters most to you. Get a clear, data-driven comparison.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="card-glow p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Cost Analysis</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Calculate your true net price with tuition, housing, scholarships, and more. See exactly what you'll pay.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="card-glow p-8 rounded-xl bg-gray-900/50 backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Organize Your Research</h3>
                        <p className="text-gray-400 leading-relaxed">
                            You do the research — we help you organize it. Input your own ratings from campus visits, school websites, and trusted sources into an unbiased framework that ranks schools based solely on your priorities.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 mt-20 py-6 border-t border-gray-800 text-center text-gray-400 text-sm">
                © 2025 College Decision Matrix • Built to help students make informed choices
            </footer>
        </div>
    );
}
