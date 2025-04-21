import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen mx-35 flex-col justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                <SiteHeader />

                <main className="flex-1 px-4 sm:px-8 md:px-16 py-12 max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

                    <p className="text-lg mb-4">
                        At <strong>DevSearch</strong>, your privacy is important to us. This page explains what data we collect, how we use it, and what your rights are.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">📉 Minimal Data Collection</h2>
                    <p className="text-lg mb-4">
                        We do not collect personal data beyond what is absolutely necessary for you to use the platform.
                    </p>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li>To create an account, you only need to provide an email address.</li>
                        <li>You may choose any name or username—including a fake full name.</li>
                        <li>To use our API, you need an account and an API key.</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🛡️ Security and Passwords</h2>
                    <p className="text-lg mb-4">
                        We recommend you use a strong, unique password that you don’t use for other services. We hash and store passwords securely and never see or store your actual password.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🌐 IP Address and Server Logs</h2>
                    <p className="text-lg mb-4">
                        Our hosting provider (IONOS) and application framework (Laravel) may log your IP address for technical and security purposes. We do not use IP addresses to track individual users or link them to personal identities.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🚫 No Third-Party Data Sharing</h2>
                    <p className="text-lg mb-4">
                        We do not sell, rent, or share your data with any third parties. Your account information is used solely for authentication and API access.
                    </p>

                    <h2 className="text-2xl font-semibold mt-6 mb-2">🗝️ Your Rights</h2>
                    <p className="text-lg mb-4">
                        You may delete your account at any time. 
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
