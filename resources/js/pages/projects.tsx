import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import SearchBox from '@/components/site-search-box';
import SearchResultsTable from '@/components/site-projects-view';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { useState } from "react";



export default function Results() {
    const { url } = usePage();
    const query = new URLSearchParams(url.split('?')[1] || '').get('query');

    // --- selection lives 100 % in the parent --------------------------
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const handleToggle = (name: string, checked: boolean) => {
        setSelected(prev => {
            const next = new Set(prev);
            checked ? next.add(name) : next.delete(name);
            return next;
        });
    };

    // the generated string ↓
    const searchString =
        [...selected].join(" or ");

    // --- handlers for the two buttons ---------------------------------
    const handleSearch = () => {
        // TODO: replace with whatever you need
        console.log("Search called with:", searchString);
        window.location.href = `/result?query=${encodeURIComponent(searchString)}`;
    };

    const handleClear = () => setSelected(new Set());  // also empties the box
    // ------------------------------------------------------------------


    return (
        <>
            <Head title="Result">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen mx-0 xl:mx-35 flex-col items-center justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <SiteHeader />

                {/* Main body */}
                <div className="flex-1 flex flex-col min-w-full items-center justify-start px-6 py-4">
                    <SearchBox title="Find Components" query={query ?? undefined} destination='projects' />
                    {/* Comparison box + buttons */}
                    <div className='flex flex-row w-full justify-center gap-6 px-6 py-2'>
                        <h3 className="font-semibold mb-2 hidden">Comparison:&nbsp;</h3>

                        <input
                            type="text"
                            value={searchString}
                            readOnly
                            className="w-full resize-none border rounded p-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hidden"
                            placeholder="Nothing selected yet"
                        />

                        <div className="mt-2 flex gap-4">
                            <button
                                onClick={handleSearch}
                                disabled={selected.size < 2}
                                className={`px-4 py-2 text-sm font-medium rounded-md border border-[color:var(--brand-primary-light)] bg-[color:var(--brand-primary-light)] text-white hover:bg-[color:var(--brand-accent)] dark:border-[color:var(--brand-accent)] dark:bg-[color:var(--brand-accent)] dark:hover:brightness-110 transition disabled:opacity-50 
                                    ${selected.size > 1 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            >
                                Compare
                            </button>

                            <button
                                onClick={handleClear}
                                disabled={selected.size < 2}
                                className={`px-4 py-2 text-sm font-medium rounded-md border border-[color:var(--brand-primary-light)] bg-[color:var(--brand-secondary)] text-white hover:bg-[color:var(--brand-highlight)] dark:border-[color:var(--brand-accent)] dark:bg-[color:var(--brand-highlight)] dark:hover:brightness-110 transition disabled:opacity-50
                                    ${selected.size > 1 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            >
                                Deselect All
                            </button>
                        </div>
                    </div>

                    {/* Search results list */}
                    <SearchResultsTable
                        query={query ?? ''}
                        page={1}
                        selectedNames={selected}
                        onToggle={handleToggle}
                    />
                </div>

                {/* Footer */}
                <SiteFooter />
            </div>
        </>
    );
}
