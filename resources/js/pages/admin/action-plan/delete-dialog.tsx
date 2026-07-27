// resources/js/pages/admin/action-plan/delete-dialog.tsx
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

import { ActionPlan } from './columns';

interface DeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan: ActionPlan | null;
}

export function DeleteDialog({ open, onOpenChange, plan }: DeleteDialogProps) {
    const { delete: destroy, processing } = useForm();

    function handleDelete() {
        if (!plan) return;

        destroy(`/action-plans/${plan.id}`, {
            onSuccess: () => {
                toast.success('Action plan deleted.');
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
                    <AlertDialogTitle>Delete Action Plan</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this action plan? All
                        related unit assignments and submitted proofs will also
                        be removed. This action cannot be undone.
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
