import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function SiteHeader() {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <header className="w-full bg-white shadow px-15 py-3 flex items-center justify-between dark:bg-secondary">
                <div className="flex items-center space-x-6">
                    <div className="relative h-6 w-6">
                        {/* Light mode logo */}
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="h-6 w-6 block dark:hidden"
                        />
                        {/* Dark mode logo */}
                        <img
                            src="/logo_dark.svg"
                            alt="Logo (Dark)"
                            className="h-6 w-6 hidden dark:block"
                        />
                        </div>

                    <nav className="flex items-center space-x-10 text-gray-700">
                        <a href="/">
                            <h1 className="text-2xl font-extrabold text-[color:var(--brand-primary-light)] dark:text-[color:var(--brand-accent)]">
                                DevSearch
                            </h1>
                        </a>
                        <a href="#" className="text-base font-medium hover:text-blue-500 dark:text-[#EDEDEC] dark:hover:text-blue-500">Components</a>
                        <a href="#" className="text-base font-medium hover:text-blue-500 dark:text-[#EDEDEC] dark:hover:text-blue-500">Packages</a>
                        <a href="#" className="text-base font-medium hover:text-blue-500 dark:text-[#EDEDEC] dark:hover:text-blue-500">Libraries</a>
                        <a href="#" className="text-base font-medium hover:text-blue-500 dark:text-[#EDEDEC] dark:hover:text-blue-500">News</a>
                    </nav>
                </div>
                <div className="flex items-center space-x-3">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            role="button"
                            className="px-4 py-2 text-sm font-medium rounded-md border border-blue-300 bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700 transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="px-4 py-2 text-sm font-medium rounded-md border border-transparent text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900 transition"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                role="button"
                                className="px-4 py-2 text-sm font-medium rounded-md border border-blue-600 text-white bg-blue-600 hover:bg-blue-700 dark:border-blue-700 dark:hover:bg-blue-800 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}