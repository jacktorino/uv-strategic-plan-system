import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';

export default function Index() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4"></div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'KRA 3 : INNOVATIVE AND EXCELLENT TEACHING AND LEARNING (Mission #2 and QO #2)',
            href: '/kra/teaching',
        },
    ],
};
