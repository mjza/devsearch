import { useEffect, useState } from 'react';
import AppLogoIcon from './app-logo-icon';
const appName = import.meta.env.VITE_APP_NAME || 'DevSearch';

export default function AppLogo() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check if <html> has the 'dark' class
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains('dark'));
        });

        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        setIsDark(document.documentElement.classList.contains('dark'));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon fill={isDark ? 'var(--brand-text-contrast)' : 'var(--brand-primary-light)'} className="size-5 fill-current text-white" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-2xl">
                <span className="mb-0.5 truncate leading-none font-extrabold text-[color:var(--brand-primary-light)] dark:text-[color:var(--brand-text-contrast)]">
                    {appName}
                </span>
            </div>
        </>
    );
}
