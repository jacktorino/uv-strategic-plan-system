import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function Index() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full w-full max-w-full flex-1 flex-col gap-4 overflow-hidden rounded-xl p-5">
                <Table className="w-full table-fixed border-collapse border border-border">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[12%] whitespace-normal">
                                Key Result Area
                            </TableHead>
                            <TableHead className="w-[20%] whitespace-normal">
                                Key Performance Indicator
                            </TableHead>
                            <TableHead className="w-[28%] whitespace-normal">
                                Innovative Action Plan
                            </TableHead>
                            <TableHead className="w-[12%] whitespace-normal">
                                Responsible Units
                            </TableHead>
                            <TableHead className="w-[10%] whitespace-normal">
                                Set / Due
                            </TableHead>
                            <TableHead className="w-[10%] whitespace-normal">
                                Status
                            </TableHead>
                            <TableHead className="w-[8%] text-right whitespace-normal">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="align-top font-medium whitespace-normal">
                                1.1 Governance
                            </TableCell>
                            <TableCell className="align-top whitespace-normal text-muted-foreground">
                                1.1.1 Deployment and dissemination of VMO,
                                Quality Management System in all units
                            </TableCell>
                            <TableCell className="align-top whitespace-normal text-muted-foreground">
                                Upload the VMO in the website, official social
                                media accounts, and post in the conspicuous
                                places/areas in the University Campuses.
                            </TableCell>
                            <TableCell className="align-top whitespace-normal text-muted-foreground">
                                <Button>Assign</Button>
                            </TableCell>
                            <TableCell className="align-top whitespace-normal text-muted-foreground">
                                ---
                            </TableCell>
                            <TableCell className="align-top whitespace-normal text-muted-foreground">
                                ---
                            </TableCell>
                            <TableCell className="text-right align-top whitespace-normal text-muted-foreground"></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'KRA 1 : EFFICIENT AND EFFECTIVE GOVERNANCE, MANAGEMENT AND LEADERSHIP (Mission #4 and QO #4)',
            href: '/kra/governance',
        },
    ],
};
