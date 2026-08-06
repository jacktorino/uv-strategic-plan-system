import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ActionPlanAssignment } from './Index';

interface Props {
    assignment: ActionPlanAssignment | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ActionPlanSubmissionModal({
    assignment,
    isOpen,
    onClose,
}: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            progress_percentage: 100,
            submission_remarks: '',
            attachment: null as File | null,
        });

    useEffect(() => {
        if (assignment && isOpen) {
            setData({
                progress_percentage: 100,
                submission_remarks: assignment.submission_remarks ?? '',
                attachment: null,
            });
            clearErrors();
        }
    }, [assignment, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!assignment) return;

        post(`/unit-assignments/${assignment.id}/update-progress`, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-3xl">
                        Submit Accomplishment
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* Auto-complete Notice */}
                    <div className="rounded-md border bg-muted p-3 text-sm">
                        This submission will automatically mark this action plan
                        as <strong>100% Completed</strong>.
                    </div>

                    {/* Remarks */}
                    <div className="space-y-2">
                        <Label htmlFor="submission_remarks">
                            Remarks / Accomplishment Summary
                        </Label>
                        <Textarea
                            id="submission_remarks"
                            rows={4}
                            placeholder="Provide details about the activities conducted or accomplishments..."
                            value={data.submission_remarks}
                            onChange={(e) =>
                                setData('submission_remarks', e.target.value)
                            }
                        />
                        {errors.submission_remarks && (
                            <p className="text-xs text-destructive">
                                {errors.submission_remarks}
                            </p>
                        )}
                    </div>

                    {/* Attachment */}
                    <div className="space-y-2">
                        <Label htmlFor="attachment">
                            Attach Supporting Document (Optional)
                        </Label>
                        <Input
                            id="attachment"
                            type="file"
                            accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                            onChange={(e) =>
                                setData(
                                    'attachment',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                        />
                        {errors.attachment && (
                            <p className="text-xs text-destructive">
                                {errors.attachment}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={processing}>
                            {processing ? 'Submitting...' : 'Submit'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
