import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';


export default function Result() {

    return (
        <>
            <Head title="Result">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen mx-35 flex-col items-center justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <SiteHeader />

                <div className='flex m-10'></div>

                {/* Footer */}
                <SiteFooter />
            </div>
        </>
    );
}
