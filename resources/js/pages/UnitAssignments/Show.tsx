// resources/js/pages/admin/UnitAssignments/Show.tsx
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, Download, FileText } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PeriodInfo {
    id: number;
    month: number;
    year: number;
    period_start?: string | null;
    period_end?: string | null;
    submission_start?: string | null;
    submission_deadline?: string | null;
    review_start?: string | null;
    review_end?: string | null;
    approval_date?: string | null;
    status: string;
}

interface AssignmentDetail {
    id: number;
    progress_percentage: number;
    submission_remarks?: string | null;
    status: string;
    attachment_url?: string | null;
    submitted_at?: string | null;
    period?: PeriodInfo | null;
    action_plan?: {
        id: number;
        title?: string;
        description: string;
        start_date?: string | null;
        end_date?: string | null;
        kpi?: {
            id: number;
            code?: string;
            name: string;
            overall_progress?: number;
            kra?: {
                id: number;
                code?: string;
                name: string;
            };
        };
    } | null;
    responsible_unit?: {
        id: number;
        code?: string;
        name: string;
        category?: string;
    } | null;
}

interface ShowProps {
    assignment: AssignmentDetail;
}

const formatDate = (date?: string | null) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMMM d, yyyy');
};

const formatDateTime = (date?: string | null) => {
    if (!date) return 'N/A';
    return format(new Date(date), 'MMMM d, yyyy • h:mm a');
};

export default function Show({ assignment }: ShowProps) {
    const plan = assignment.action_plan;
    const kpi = plan?.kpi;
    const kra = kpi?.kra;
    const unit = assignment.responsible_unit;
    const period = assignment.period;

    const progress = Number(assignment.progress_percentage) || 0;

    return (
        <>
            <Head title="Assignment Details" />

            <div className="mx-auto max-w-4xl space-y-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <Link
                            href="/unit-assignments"
                            className="mb-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Back to Assignments
                        </Link>
                        <h1 className="text-2xl font-semibold">
                            Assignment Details
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Progress and submission information for this action
                            plan assignment.
                        </p>
                    </div>

                    <Badge
                        variant="secondary"
                        className={`text-xs ${
                            assignment.status === 'Submitted'
                                ? 'bg-emerald-500/10 text-emerald-600'
                                : 'bg-amber-500/10 text-amber-600'
                        }`}
                    >
                        {assignment.status ?? 'Not Submitted'}
                    </Badge>
                </div>

                {/* Action Plan Info */}
                <div className="space-y-4 rounded-lg border bg-muted/40 p-4">
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Key Result Area
                        </p>
                        <p className="text-sm font-medium">
                            {kra ? `${kra.code ?? ''} ${kra.name}` : 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Key Performance Indicator
                        </p>
                        <p className="text-sm">
                            {kpi ? `${kpi.code ?? ''} ${kpi.name}` : 'N/A'}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Innovative Action Plan
                        </p>
                        <p className="text-sm leading-6">
                            {plan?.description ?? 'N/A'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                                Responsible Unit
                            </p>
                            <p className="text-sm">
                                {unit
                                    ? `${unit.code ?? ''} - ${unit.name}`
                                    : 'N/A'}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                                Period Coverage
                            </p>
                            <p className="text-sm">
                                {formatDate(plan?.start_date)}
                                {' — '}
                                {formatDate(plan?.end_date)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="space-y-3 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">
                            Progress
                        </p>
                        <span className="text-lg font-semibold">
                            {progress}%
                        </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Submission Details */}
                <div className="space-y-4 rounded-lg border p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Submission
                    </p>

                    <div>
                        <p className="text-xs text-muted-foreground">
                            Remarks / Accomplishment Summary
                        </p>
                        <p className="text-sm leading-6 whitespace-pre-wrap">
                            {assignment.submission_remarks ||
                                'No remarks provided.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Submitted At
                            </p>
                            <p className="text-sm">
                                {formatDateTime(assignment.submitted_at)}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground">
                                Supporting Document
                            </p>
                            {assignment.attachment_url ? (
                                <a
                                    href={assignment.attachment_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                >
                                    <FileText className="h-3.5 w-3.5" />
                                    View Attachment
                                </a>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    None
                                </p>
                            )}
                        </div>
                    </div>

                    {assignment.attachment_url && (
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs"
                        >
                            <a href={assignment.attachment_url} download>
                                <Download className="mr-1.5 h-3.5 w-3.5" />
                                Download Attachment
                            </a>
                        </Button>
                    )}
                </div>

                {/* Reporting Period Timeline */}
                {period && (
                    <div className="space-y-3 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-muted-foreground uppercase">
                                Reporting Period
                            </p>
                            <Badge variant="outline" className="text-[10px]">
                                {period.status}
                            </Badge>
                        </div>

                        <p className="text-sm font-medium">
                            {format(
                                new Date(period.year, period.month - 1),
                                'MMMM yyyy',
                            )}
                        </p>

                        <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-3">
                            <div>
                                <p className="text-muted-foreground">
                                    Period Start
                                </p>
                                <p>{formatDate(period.period_start)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">
                                    Period End
                                </p>
                                <p>{formatDate(period.period_end)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">
                                    Submission Opens
                                </p>
                                <p>{formatDate(period.submission_start)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">
                                    Submission Deadline
                                </p>
                                <p>{formatDate(period.submission_deadline)}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">
                                    Review Window
                                </p>
                                <p>
                                    {formatDate(period.review_start)}
                                    {' — '}
                                    {formatDate(period.review_end)}
                                </p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">
                                    Approval Date
                                </p>
                                <p>{formatDate(period.approval_date)}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
