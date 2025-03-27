import SiteHeader from '@/components/site-header';
import SearchBox from '@/components/site-search-box';
import { Head } from '@inertiajs/react';


export default function Welcome() {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen mx-35 flex-col items-center bg-[#F9FAFB] text-[#1b1b18] lg:justify-start dark:bg-[#0a0a0a]">
                <SiteHeader />

                {/* Title */}
                <div className="text-center font-bold text-[36px] leading-[1.11111] max-w-[550px] font-sans mt-6 mb-4 text-black dark:text-white">
                    Find and Compare Software Components
                </div>

                {/* Sub Title */}
                <div className="text-center text-[16px] leading-[1.5] font-sans font-semibold text-gray-700 mb-6 dark:text-gray-400">
                    Search across 10 million package registries and compare features, popularity, and maintenance
                </div>

                {/* Search box */}
                <SearchBox/>
                 
                
                
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
