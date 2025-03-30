import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import SearchBox from '@/components/site-search-box';
import SearchResultsTable from '@/components/site-result-view';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';




export default function Results() {
    const { url } = usePage();
    const query = new URLSearchParams(url.split('?')[1] || '').get('query');

    return (
        <>
            <Head title="Result">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen mx-35 flex-col items-center justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <SiteHeader />

                <SearchBox title="Find and Compare Components" query={query ?? undefined}/>
                
                <SearchResultsTable query={query ?? ''} />
                
                {/* Footer */}
                <SiteFooter />
            </div>
        </>
    );
}
