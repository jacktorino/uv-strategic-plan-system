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
            title: 'KRA 4 : SUSTAINED SOCIAL RESPONSIBILITY, COMMUNITY INVOLVEMENT AND INDUSTRY LINKAGES (Mission #3 and QO #1)',
            href: '/kra/community',
        },
    ],
};
