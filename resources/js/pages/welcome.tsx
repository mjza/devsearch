import SiteHeader from '@/components/site-header';
import { Head } from '@inertiajs/react';


export default function Welcome() {

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen mx-35 flex-col items-center bg-[#FDFDFC] text-[#1b1b18] lg:justify-center dark:bg-[#0a0a0a]">
                <SiteHeader />

                {/* Title */}
                <div className="text-center font-bold text-[36px] leading-[1.11111] max-w-[550px] font-sans mt-6 mb-4 text-black dark:text-white">
                    Find and Compare Software Components
                </div>

                {/* Sub Title */}
                <div className="text-center text-[16px] leading-[1.5] font-sans font-semibold text-gray-700 mb-6 dark:text-gray-400">
                    Search across 10 million package registries and compare features, popularity, and maintenance
                </div>



                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">


                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-20 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">


                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
