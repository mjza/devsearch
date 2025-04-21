import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';

export default function FundersPage() {
    return (
        <>
            <Head title="Support & Fund DevSearch">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen mx-35 flex-col justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                <SiteHeader />

                <main className="flex-1 px-4 sm:px-8 md:px-16 py-12 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center">Partner With Us</h1>

                    <p className="text-lg mb-6 text-center">
                        DevSearch is looking for visionary funders and partners to accelerate the development of intelligent tools that empower software engineers around the world.
                    </p>

                    <div className="space-y-8 text-lg">
                        <section>
                            <h2 className="text-2xl font-semibold mb-2">💡 Why Invest in DevSearch?</h2>
                            <p>
                                We're building a powerful AI-powered platform to help developers find, evaluate, and compare software components quickly and accurately. Our technology is backed by academic research and already gaining traction in the software engineering community.
                            </p>
                            <p className="mt-2">
                                By supporting us, you're investing in the next generation of intelligent developer tools—tools that reduce friction, increase reuse, and speed up innovation across industries.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">🤝 What We’re Looking For</h2>
                            <p>
                                We're seeking seed-stage or early-stage funding to:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mt-2">
                                <li>Expand our research and development efforts</li>
                                <li>Build a full-time core technical team</li>
                                <li>Enhance our infrastructure and data analysis pipelines</li>
                                <li>Launch enterprise-ready features for developer productivity</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">🎓 Academic Collaboration</h2>
                            <p>
                                DevSearch is currently being developed under the academic supervision of <strong><a href="https://barcomb.org/" target='blank' className='text-blue-400'>Dr. Ann Barcomb</a></strong> at the University of Calgary. Funders have the opportunity to collaborate with Dr. Barcomb and the lab to support graduate students who work on applied AI, software reuse, and developer productivity research.
                            </p>
                            <p className="mt-2">
                                This partnership allows you to directly support innovation while creating real impact through research-backed development.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">📬 Get in Touch</h2>
                            <p>
                                If you’re interested in funding DevSearch or exploring collaboration, please reach out to us directly at{' '}
                                <a
                                    href="mailto:info@devsearch.com?subject=Funding%20DevSearch"
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    info@devsearch.com
                                </a>
                                .
                            </p>
                            <p className="mt-1">
                                We’d love to connect and share our roadmap, research plans, and impact strategy.
                            </p>
                        </section>
                    </div>
                </main>

                <SiteFooter />
            </div>
        </>
    );
}
