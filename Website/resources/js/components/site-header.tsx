import { useState } from 'react';
import { useEffect } from 'react';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import AppLogo from './app-logo';
import { Menu, X } from 'lucide-react';

export default function SiteHeader() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 1024) { // 1024px is the lg breakpoint in Tailwind
            setIsMenuOpen(false);
          }
        };
      
        window.addEventListener('resize', handleResize);
      
        // Clean up listener when component unmounts
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    return (
        <>
            <header className="w-full bg-white shadow px-4 xl:px-15 py-3 flex items-center justify-between dark:bg-secondary">
                <div className="flex items-center space-x-6">
                    <Link href="/" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-10 text-gray-700">
                        <a href={route('projects')} className="text-base font-medium hover:text-blue-500 dark:text-[#EDEDEC] dark:hover:text-blue-500">Components</a>
                        <a href={route('about')} className="text-base font-medium hover:text-blue-500 dark:text-[#EDEDEC] dark:hover:text-blue-500">About Us</a>
                    </nav>
                </div>

                <div className="flex items-center space-x-3">
                    <div>
                        <AppearanceToggleDropdown />
                    </div>
                    <div className="hidden md:flex">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                role="button"
                                className="px-4 py-2 text-sm font-medium rounded-md border border-[color:var(--brand-primary-light)] bg-[color:var(--brand-primary-light)] text-white hover:bg-[color:var(--brand-accent)] dark:border-[color:var(--brand-accent)] dark:bg-[color:var(--brand-accent)] transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div>
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 mr-1 text-sm font-medium rounded-md border border-transparent text-[color:var(--brand-primary-light)] hover:border-[color:var(--brand-primary)] dark:text-[color:var(--brand-accent)] dark:hover:bg-[color:var(--brand-accent)/0.1] transition"
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
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="relative">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 dark:text-[#EDEDEC] dark:hover:bg-gray-700"
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Dropdown menu */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-200 dark:border-transparent dark:bg-secondary">
                                <div className="flex md:hidden">
                                    {auth.user ? (
                                        <a href={route('dashboard')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-[#EDEDEC] dark:hover:bg-gray-700">Dashboard</a>
                                    ) : (
                                        <div className='w-full'>
                                            <a href={route('login')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-[#EDEDEC] dark:hover:bg-gray-700">Log in</a>
                                            <a href={route('register')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-[#EDEDEC] dark:hover:bg-gray-700">Register</a>
                                        </div>
                                    )}
                                </div>
                                <a href={route('projects')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-[#EDEDEC] dark:hover:bg-gray-700">Components</a>
                                <a href={route('about')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-[#EDEDEC] dark:hover:bg-gray-700">About Us</a>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
}