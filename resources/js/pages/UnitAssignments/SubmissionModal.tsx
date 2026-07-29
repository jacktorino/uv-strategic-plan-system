import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
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
        useForm<{
            _method: string;
            progress_percentage: number;
            submission_remarks: string;
            attachment: File | null;
        }>({
            _method: 'PUT',
            progress_percentage: 0,
            submission_remarks: '',
            attachment: null,
        });

    useEffect(() => {
        if (assignment && isOpen) {
            setData({
                _method: 'PUT',
                progress_percentage: assignment.progress_percentage ?? 0,
                submission_remarks: assignment.submission_remarks ?? '',
                attachment: null,
            });
            clearErrors();
        }
    }, [assignment, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!assignment) return;

        // Post request with method spoofing for multipart/form-data upload
        post(`/action-plan-assignments/${assignment.id}`, {
            preserveScroll: true,
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
                    <DialogTitle>Update Progress & Submission</DialogTitle>
                    <DialogDescription>
                        {assignment?.action_plan?.title
                            ? assignment.action_plan.title
                            : 'Update action plan progress, remarks, or attach proof of accomplishment.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                    {/* Progress Percentage */}
                    <div className="space-y-2">
                        <Label htmlFor="progress_percentage">
                            Progress Percentage (%)
                        </Label>
                        <Input
                            id="progress_percentage"
                            type="number"
                            min={0}
                            max={100}
                            value={data.progress_percentage}
                            onChange={(e) =>
                                setData(
                                    'progress_percentage',
                                    Number(e.target.value),
                                )
                            }
                            required
                        />
                        {errors.progress_percentage && (
                            <p className="text-xs text-destructive">
                                {errors.progress_percentage}
                            </p>
                        )}
                    </div>

                    {/* Remarks / Accomplishment Details */}
                    <div className="space-y-2">
                        <Label htmlFor="submission_remarks">
                            Remarks / Accomplishment Summary
                        </Label>
                        <Textarea
                            id="submission_remarks"
                            rows={4}
                            placeholder="Provide details about the activities conducted or reasons for progress..."
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

                    {/* File Attachment */}
                    <div className="space-y-2">
                        <Label htmlFor="attachment">
                            Attach Supporting Document (PDF, Doc, Image)
                        </Label>
                        <Input
                            id="attachment"
                            type="file"
                            accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg"
                            onChange={(e) =>
                                setData(
                                    'attachment',
                                    e.target.files ? e.target.files[0] : null,
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
                            {processing ? 'Saving...' : 'Submit Update'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
