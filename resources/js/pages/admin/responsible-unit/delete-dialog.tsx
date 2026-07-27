// delete-dialog.tsx
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

import { ResponsibleUnit } from './columns';

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    unit: ResponsibleUnit | null;
}

export function DeleteDialog({ open, onOpenChange, unit }: DeleteDialogProps) {
    const { delete: destroy, processing } = useForm();

    function handleDelete() {
        if (!unit) return;

        destroy(`/admin/responsible-units/${unit.id}`, {
            onSuccess: () => {
                toast.success('Responsible unit deleted.');
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Something went wrong. Please try again.');
            },
        });
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Responsible Unit</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete{' '}
                        <span className="font-medium">{unit?.name}</span>? This
                        action cannot be undone.
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
