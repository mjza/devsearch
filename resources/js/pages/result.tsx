import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

type SearchResult = {
    name: string;
    description: string;
    // add more fields if needed
};


export default function Results() {
    const { url } = usePage();
    const query = new URLSearchParams(url.split('?')[1] || '').get('query');

    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query) return;

        setLoading(true);

        fetch(`/search?q=${encodeURIComponent(query)}`)
            .then((res) => res.json())
            .then((data) => setResults(data.results))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <>
            <Head title="Result">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen mx-35 flex-col items-center justify-between bg-[#F9FAFB] text-[#1b1b18] dark:bg-[#0a0a0a]">
                <SiteHeader />

                {loading ? (
                    <p>Loading...</p>
                ) : results.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <ul className="space-y-4">
                        {results.map((item, idx) => (
                            <li key={idx} className="p-4 bg-white shadow rounded">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Footer */}
                <SiteFooter />
            </div>
        </>
    );
}
