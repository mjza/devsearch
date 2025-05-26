import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';

export default function AboutUs() {
    return (
        <>
            <Head title="About Us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen mx-0 xl:mx-35 flex-col justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                <SiteHeader />

                <main className="flex-1 px-4 sm:px-8 md:px-16 py-12 max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-center">
                    About DevSearch
                    </h1>
                    <p className="text-xl text-center font-medium mb-10 text-gray-800 dark:text-gray-300">
                        Empowering Developers to Build Better, Faster, Smarter.
                    </p>

                    <section className="mb-10">
                        <p className="text-lg mb-4">
                            At <strong>DevSearch</strong>, we’re building an intelligent platform that helps software teams find the most relevant components, tools, and technical insights—tailored to their exact needs. Whether you're searching for open-source libraries, best-practice architectures, or AI-powered recommendations, DevSearch brings the answers to you.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">🎯 Our Mission</h2>
                        <p className="text-lg">
                            To streamline the way developers discover, evaluate, and select the best tools and components for building modern software—saving time, reducing complexity, and accelerating innovation.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">🛠️ What We Do</h2>
                        <p className="text-lg mb-4">
                            DevSearch is an AI-powered search and recommendation engine for developers. We analyze vast amounts of technical content—including Stack Overflow discussions, documentation, and GitHub repositories—to help developers:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Find reusable components aligned with their project requirements</li>
                            <li>Get intelligent suggestions based on quality attributes and design constraints</li>
                            <li>Understand trade-offs and compatibility with existing tech stacks</li>
                        </ul>
                        <p className="text-lg mt-4">
                            Whether you're a junior developer searching for the right SDK or a software architect comparing database technologies, DevSearch bridges the gap between what you need and what’s out there.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">🔍 Why DevSearch?</h2>
                        <p className="text-lg">
                            Traditional search engines surface <em>links</em>. DevSearch delivers <em>answers</em>. Our technology leverages Natural Language Processing, semantic search, and clustering algorithms to return precise, contextual results—ranked by relevance, reliability, and real-world developer feedback.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-2">👥 Who We Are</h2>
                        <p className="text-lg">
                            DevSearch was founded by a team of engineers, researchers, and product thinkers passionate about making software development smarter and more accessible.
                        </p>
                        <p className="text-lg mt-2">
                            Our CEO and co-founder, <strong>Mahdi</strong>, brings a vision rooted in academic research and real-world software engineering, combining deep technical understanding with user-centered design.
                        </p>
                    </section>

                    <section className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2">📚 Backed by Research</h2>
                        <p className="text-lg">
                            DevSearch is built on solid academic foundations. Our work has been accepted to leading software engineering conferences like <strong>EASE 2025</strong>, where we shared insights into what developers truly need when selecting software components. Our system continuously evolves using real developer behavior and feedback to improve precision and relevance.
                        </p>
                    </section>
                </main>

                <SiteFooter />
            </div>
        </>
    );
}
