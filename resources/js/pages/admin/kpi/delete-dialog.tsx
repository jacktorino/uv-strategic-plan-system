// resources/js/pages/admin/kpi/delete-dialog.tsx
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog';

import { Kpi } from './columns';

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    kpi: Kpi | null;
}

export function DeleteDialog({ open, onOpenChange, kpi }: DeleteDialogProps) {
    const { delete: destroy, processing } = useForm();

    function handleDelete() {
        if (!kpi) return;

        destroy(`/kpis/${kpi.id}`, {
            onSuccess: () => {
                toast.success('KPI deleted.');
                onOpenChange(false);
            },
            onError: () =>
                toast.error('Something went wrong. Please try again.'),
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete KPI</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="font-medium">{kpi?.name}</span>? Any
                        linked Action Plans will also be affected. This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>
                        Cancel
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={processing}
                    >
                        {processing ? 'Deleting...' : 'Delete'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
