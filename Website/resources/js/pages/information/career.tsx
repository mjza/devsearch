import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';

export default function CareerPage() {
    return (
        <>
            <Head title="Careers">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen mx-0 xl:mx-35 flex-col justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                <SiteHeader />

                <main className="flex-1 px-4 sm:px-8 md:px-16 py-12 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center">Careers at DevSearch</h1>

                    <p className="text-lg mb-6 text-center">
                        We’re excited about building the future of AI-powered software search and recommendations.
                    </p>

                    <div className="space-y-6 text-lg">
                        <section>
                            <h2 className="text-2xl font-semibold mb-2">🎓 Collaborate with Us</h2>
                            <p>
                            Due to certain regulatory limitations, at this stage of our journey, we are only accepting collaborations from students, researchers, or faculty members affiliated with the <strong>University of Calgary</strong>. If you’re part of the UCalgary community and passionate about AI, software engineering, or developer tooling, we’d love to hear from you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-2">🚀 Opportunities Coming Soon</h2>
                            <p>
                                As we continue to grow and secure funding, we plan to expand our team. Full-time roles, internships, and contract positions will be posted here.
                            </p>
                            <p className="mt-2">
                                Stay tuned! In the meantime, feel free to follow us on{' '}
                                <a
                                    href="https://www.linkedin.com/in/mjbza"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    LinkedIn
                                </a>{' '}
                                or reach out to{' '}
                                <a
                                    href="mailto:info@devsearch.com?subject=Career%20Interest"
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    info@devsearch.com
                                </a>{' '}
                                if you’re interested in early collaboration.
                            </p>
                        </section>
                    </div>
                </main>

                <SiteFooter />
            </div>
        </>
    );
}
