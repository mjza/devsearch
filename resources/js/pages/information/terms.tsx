import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen mx-0 xl:mx-35 flex-col justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                <SiteHeader />

                <main className="flex-1 px-4 sm:px-8 md:px-16 py-12 max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>

                    <p className="text-lg mb-4">
                        By using <strong>DevSearch</strong>, you agree to the following terms and conditions. Please read them carefully before continuing to use our services.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">⚠️ Use at Your Own Risk</h2>
                    <p className="text-lg mb-4">
                        The information, comparisons, and recommendations provided by DevSearch are generated using AI and scientific algorithms. While we strive for accuracy and relevance, the results are <strong>not deterministic</strong> and may vary over time.
                    </p>
                    <p className="text-lg mb-4">
                        You acknowledge that the use of DevSearch is at your own risk. We do not guarantee the correctness, completeness, or fitness of any recommendation for your specific use case. Always validate critical decisions with your own judgment or expert advice.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🔐 Accounts and Access</h2>
                    <p className="text-lg mb-4">
                        You may create an account using your email address. You are responsible for keeping your API key secure. We recommend using a unique and strong password that is not reused across services.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🔄 Modifications and Availability</h2>
                    <p className="text-lg mb-4">
                        We reserve the right to modify or discontinue the service at any time without prior notice. We are not liable for any loss resulting from service interruption, data loss, or changes to the platform.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🧠 Intellectual Property</h2>
                    <p className="text-lg mb-4">
                        All content, branding, and underlying technology of DevSearch remain the property of the DevSearch team. You may not reproduce or redistribute any part of the service without our written consent.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">📬 Contact</h2>
                    <p className="text-lg">
                        If you have questions about these terms, please <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">contact us</a>.
                    </p>
                </main>

                <SiteFooter />
            </div>
        </>
    );
}
