import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';

export default function ContactUs() {
    return (
        <>
            <Head title="Contact Us">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen mx-35 flex-col justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                <SiteHeader />

                <main className="flex-1 px-4 sm:px-8 md:px-16 py-12 max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

                    <p className="text-lg mb-8 text-center">
                        We’d love to hear from you! Whether you have a question, feedback, or a partnership inquiry, feel free to reach out using any of the options below.
                    </p>

                    <div className="space-y-6 text-lg">
                        <div>
                            <h2 className="text-xl font-semibold mb-1">📧 Email</h2>
                            <p>
                                <a
                                    href="https://mail.google.com/mail/?view=cm&fs=1&to=info@devsearch.com&su=Contact%20from%20website"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    Send us a message via Gmail
                                </a>
                                <span> or </span>
                                <a
                                    href="mailto:info@devsearch.com?subject=Contact%20from%20website"
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    open in your default mail app
                                </a>
                                .
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-1">💼 LinkedIn</h2>
                            <p>
                                Connect with Mahdi on LinkedIn:{' '}
                                <a
                                    href="https://www.linkedin.com/in/mjbza"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 underline"
                                >
                                    linkedin.com/in/mjbza
                                </a>
                            </p>
                        </div>
                    </div>
                </main>

                <SiteFooter />
            </div>
        </>
    );
}
