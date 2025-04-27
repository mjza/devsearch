import SiteHeader from '@/components/site-header';
import SearchBox from '@/components/site-search-box';
import SiteNewsSection from '@/components/site-news-section';
import SitePopularComparisonsSection from '@/components/site-popular-comparisons-section';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';


export default function Welcome() {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen mx-0 xl:mx-35 flex-col items-center justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <SiteHeader />

                {/* Title */}
                <div className="text-center font-bold text-[36px] leading-[1.11111] max-w-[550px] font-sans mt-6 mb-4 text-black dark:text-white">
                    Leverage AI to Find and Compare Software Components
                </div>

                {/* Sub Title */}
                <div className="text-center text-[16px] leading-[1.5] font-sans font-semibold text-gray-700 mb-6 dark:text-gray-400">
                    Search across 10 million package registries and compare features, popularity, and maintenance
                </div>

                {/* Search box */}
                <SearchBox/>

                {/* News Section */} 
                <SiteNewsSection />

                {/* Hot comparisons */}
                <SitePopularComparisonsSection />

                {/* Footer */}
                <SiteFooter />
            </div>
        </>
    );
}
