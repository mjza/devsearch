import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';

export default function CookiePolicy() {
    return (
        <>
            <Head title="Cookie Policy">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen mx-35 flex-col justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-white">
                <SiteHeader />

                <main className="flex-1 px-4 sm:px-8 md:px-16 py-12 max-w-5xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center">Cookie Policy</h1>

                    <p className="text-lg mb-4">
                        At <strong>DevSearch</strong>, we use cookies to ensure our website functions properly, enhance your experience, and offer personalized features.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2 mt-6">🍪 What Are Cookies?</h2>
                    <p className="text-lg mb-4">
                        Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and provide functionality such as login and customization.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2 mt-6">⚙️ How We Use Cookies</h2>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>To allow you to log into your account securely</li>
                        <li>To remember your preferences and settings</li>
                        <li>To personalize your experience across sessions</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-2 mt-6">🔒 No Third-Party Tracking</h2>
                    <p className="text-lg mb-4">
                        We do <strong>not</strong> share your personal data or cookie information with third-party services or advertisers. Your privacy is important to us.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2 mt-6">🧭 Your Choices</h2>
                    <p className="text-lg mb-4">
                        You can manage or delete cookies through your browser settings. Please note that disabling cookies may affect some features, such as login or preference saving.
                    </p>
                    
                    <h2 className="text-2xl font-semibold mt-6 mb-2">📬 Contact</h2>
                    <p className="text-lg">
                        If you have questions or concerns about our cookie usage, feel free to <a href="/contact" className="text-blue-600 dark:text-blue-400 underline">contact us</a>.
                    </p>
                </main>

                <SiteFooter />
            </div>
        </>
    );
}
