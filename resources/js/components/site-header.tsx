import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';

export default function SiteHeader() {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <header className="w-full bg-white shadow px-15 py-3 flex items-center justify-between dark:bg-secondary">
                <div className="flex items-center space-x-6">
                    <nav className="flex items-center space-x-10 text-gray-700">
                        <Link href="/" prefetch className="flex items-center space-x-2">
                            <AppLogo />
                        </Link>
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
                            className="px-4 py-2 text-sm font-medium rounded-md border border-[color:var(--brand-primary-light)] bg-[color:var(--brand-primary-light)] text-white hover:bg-[color:var(--brand-accent)] dark:border-[color:var(--brand-accent)] dark:bg-[color:var(--brand-accent)] transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="px-4 py-2 text-sm font-medium rounded-md border border-transparent text-[color:var(--brand-primary-light)] hover:border-[color:var(--brand-primary)] dark:text-[color:var(--brand-accent)] dark:hover:bg-[color:var(--brand-accent)/0.1] transition"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                role="button"
                                className="px-4 py-2 text-sm font-medium rounded-md border border-[color:var(--brand-primary-light)] bg-[color:var(--brand-primary-light)] text-white hover:bg-[color:var(--brand-accent)] dark:border-[color:var(--brand-accent)] dark:bg-[color:var(--brand-accent)] dark:hover:brightness-110 transition"
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