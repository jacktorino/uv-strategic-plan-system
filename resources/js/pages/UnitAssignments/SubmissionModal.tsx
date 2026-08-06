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
            forceFormData: !!data.attachment,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Submit Accomplishment
                    </DialogTitle>
                </DialogHeader>

                {/* Assignment Information */}
                <div className="space-y-4 rounded-lg border bg-muted/40 p-4">
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Key Result Area
                        </p>
                        <p className="text-sm font-medium">
                            {assignment?.action_plan?.kpi?.kra
                                ? `${assignment.action_plan.kpi.kra.code ?? ''} ${assignment.action_plan.kpi.kra.name}`
                                : 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Key Performance Indicator
                        </p>
                        <p className="text-sm">
                            {assignment?.action_plan?.kpi
                                ? `${assignment.action_plan.kpi.code ?? ''} ${assignment.action_plan.kpi.name}`
                                : 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Innovative Action Plan
                        </p>
                        <p className="text-sm leading-6">
                            {assignment?.action_plan?.description ?? 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Responsible Unit
                        </p>
                        <p className="text-sm">
                            {assignment?.responsible_unit
                                ? `${assignment.responsible_unit.code ?? ''} - ${assignment.responsible_unit.name}`
                                : 'N/A'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="rounded-md border p-3">
                        This submission will automatically mark this action plan
                        as <strong>100% Completed</strong>.
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="submission_remarks">
                            Remarks / Accomplishment Summary
                        </Label>

                        <Textarea
                            id="submission_remarks"
                            rows={5}
                            placeholder="Describe the accomplishments, outputs, activities conducted, and any relevant information..."
                            value={data.submission_remarks}
                            onChange={(e) =>
                                setData('submission_remarks', e.target.value)
                            }
                        />

                        {errors.submission_remarks && (
                            <p className="text-sm text-destructive">
                                {errors.submission_remarks}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="attachment">
                            Supporting Document (Optional)
                        </Label>

                        <Input
                            id="attachment"
                            type="file"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.png,.jpg,.jpeg"
                            onChange={(e) =>
                                setData(
                                    'attachment',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                        />

                        {errors.attachment && (
                            <p className="text-sm text-destructive">
                                {errors.attachment}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            className="cursor-pointer"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="cursor-pointer"
                            disabled={processing}
                        >
                            {processing ? 'Submitting...' : 'Submit'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
