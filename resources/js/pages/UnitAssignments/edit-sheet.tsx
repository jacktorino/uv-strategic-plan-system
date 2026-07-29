// resources/js/pages/admin/action-plan/edit-sheet.tsx
import { useEffect, useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { CalendarDays } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import {    
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@/components/ui/popover';

import { ActionPlan } from './columns';

interface KraOption {
    id: number;
    code?: string;
    name: string;
}

interface KpiOption {
    id: number;
    kra_id?: number;
    code?: string;
    name: string;
}

export type UnitCategory =
    'Academic Units' | 'Non-Academic Units' | 'Satellite Campus';

export interface UnitOption {
    id: number;
    code: string;
    name: string;
    category: UnitCategory;
    order_no?: number;
}

interface EditSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    plan: ActionPlan | null;
    kras?: KraOption[];
    kpis: KpiOption[];
    units: UnitOption[];
}

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export function EditSheet({
    open,
    onOpenChange,
    plan,
    kras = [],
    kpis,
    units,
}: EditSheetProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        kra_id: '',
        kpi_id: '',
        description: '',
        start_date: '',
        end_date: '',
        order_no: '',
        responsible_unit_ids: [] as number[],
    });

    const [assignToAll, setAssignToAll] = useState(false);

    // ── Date range picker state ─────────────────────────────
    const today = new Date();
    const [datePopoverOpen, setDatePopoverOpen] = useState(false);
    const [pickerMonth, setPickerMonth] = useState(today.getMonth());
    const [pickerYear, setPickerYear] = useState(today.getFullYear());

    const dateRange: DateRange | undefined = useMemo(() => {
        if (!data.start_date) return undefined;
        return {
            from: new Date(data.start_date),
            to: data.end_date ? new Date(data.end_date) : undefined,
        };
    }, [data.start_date, data.end_date]);

    const yearOptions = useMemo(() => {
        const base = today.getFullYear();
        return Array.from({ length: 11 }, (_, i) => base - 5 + i);
    }, [today]);

    function handleDateRangeSelect(range: DateRange | undefined) {
        setData((prev) => ({
            ...prev,
            start_date: range?.from ? format(range.from, 'yyyy-MM-dd') : '',
            end_date: range?.to ? format(range.to, 'yyyy-MM-dd') : '',
        }));
    }

    function applyMonthShortcut() {
        const from = startOfMonth(new Date(pickerYear, pickerMonth, 1));
        const to = endOfMonth(from);
        setData((prev) => ({
            ...prev,
            start_date: format(from, 'yyyy-MM-dd'),
            end_date: format(to, 'yyyy-MM-dd'),
        }));
    }

    useEffect(() => {
        if (plan) {
            const currentKpi = kpis.find((k) => k.id === plan.kpi?.id);
            setData({
                kra_id: currentKpi?.kra_id ? String(currentKpi.kra_id) : '',
                kpi_id: plan.kpi ? String(plan.kpi.id) : '',
                description: plan.description ?? '',
                start_date: plan.start_date ?? '',
                end_date: plan.end_date ?? '',
                order_no:
                    plan.order_no !== undefined && plan.order_no !== null
                        ? String(plan.order_no)
                        : '',
                responsible_unit_ids:
                    plan.responsible_units?.map((unit: any) => unit.id) || [],
            });
            setAssignToAll(
                units.length > 0 &&
                    plan.responsible_unit_ids?.length === units.length,
            );
        }
    }, [plan, units, kpis]);

    // Filter KPIs based on selected KRA
    const filteredKpis = useMemo(() => {
        if (!data.kra_id || data.kra_id === 'all') return kpis;
        return kpis.filter((k) => String(k.kra_id) === data.kra_id);
    }, [data.kra_id, kpis]);

    const categorizedUnits = useMemo(
        () => ({
            colleges: units
                .filter((u) => u.category === 'Academic Units')
                .sort((a, b) => (a.order_no ?? 0) - (b.order_no ?? 0)),
            admin: units
                .filter((u) => u.category === 'Non-Academic Units')
                .sort((a, b) => (a.order_no ?? 0) - (b.order_no ?? 0)),
            campuses: units
                .filter((u) => u.category === 'Satellite Campus')
                .sort((a, b) => (a.order_no ?? 0) - (b.order_no ?? 0)),
        }),
        [units],
    );

    function toggleUnit(unitId: number, checked: boolean) {
        if (assignToAll) setAssignToAll(false);
        setData(
            'responsible_unit_ids',
            checked
                ? [...data.responsible_unit_ids, unitId]
                : data.responsible_unit_ids.filter((id) => id !== unitId),
        );
    }

    function handleToggleCategory(
        categoryUnits: UnitOption[],
        checked: boolean,
    ) {
        if (assignToAll) setAssignToAll(false);
        const categoryIds = categoryUnits.map((u) => u.id);

        if (checked) {
            const combined = Array.from(
                new Set([...data.responsible_unit_ids, ...categoryIds]),
            );
            setData('responsible_unit_ids', combined);
        } else {
            setData(
                'responsible_unit_ids',
                data.responsible_unit_ids.filter(
                    (id) => !categoryIds.includes(id),
                ),
            );
        }
    }

    function handleToggleAll(checked: boolean) {
        setAssignToAll(checked);
        if (checked) {
            setData(
                'responsible_unit_ids',
                units.map((u) => u.id),
            );
        } else {
            setData('responsible_unit_ids', []);
        }
    }

    const isCategoryAllSelected = (categoryUnits: UnitOption[]) => {
        if (categoryUnits.length === 0) return false;
        return categoryUnits.every((u) =>
            data.responsible_unit_ids.includes(u.id),
        );
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!plan) return;

        put(`/action-plans/${plan.id}`, {
            onSuccess: () => {
                toast.success('Action plan updated.');
                reset();
                onOpenChange(false);
            },
            onError: () => toast.error('Please check the form for errors.'),
        });
    }

    const renderUnitGrid = (
        unitList: UnitOption[],
        columns: string = 'grid-cols-2',
        showFullNames: boolean = false,
    ) => (
        <div className={`grid ${columns} gap-1`}>
            {unitList.map((unit) => {
                const isChecked = data.responsible_unit_ids.includes(unit.id);
                return (
                    <label
                        key={unit.id}
                        htmlFor={`edit-unit-${unit.id}`}
                        className="flex cursor-pointer items-center space-x-1.5 rounded border px-1.5 py-1 text-xs hover:bg-accent"
                    >
                        <Checkbox
                            id={`edit-unit-${unit.id}`}
                            className="h-3.5 w-3.5"
                            checked={isChecked}
                            onCheckedChange={(checked) =>
                                toggleUnit(unit.id, checked === true)
                            }
                        />
                        <span
                            className="truncate text-[11px] leading-tight"
                            title={`${unit.code} - ${unit.name}`}
                        >
                            {showFullNames ? unit.name : unit.code}
                        </span>
                    </label>
                );
            })}
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full p-5 sm:max-w-5xl">
                <DialogHeader className="pb-1">
                    <DialogTitle className="text-base font-bold">
                        Edit Action Plan
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* KRA, KPI, and Order No Row */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-12">
                        {/* KRA Select */}
                        <div className="space-y-1 sm:col-span-4">
                            <Label htmlFor="edit-kra_id" className="text-xs">
                                KRA
                            </Label>
                            <Select
                                value={data.kra_id || 'all'}
                                onValueChange={(value) => {
                                    setData((prev) => ({
                                        ...prev,
                                        kra_id: value === 'all' ? '' : value,
                                        kpi_id: '',
                                    }));
                                }}
                            >
                                <SelectTrigger
                                    id="edit-kra_id"
                                    className="h-8 w-full text-xs"
                                >
                                    <SelectValue placeholder="All KRAs" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 max-w-[360px] overflow-y-auto">
                                    <SelectItem value="all" className="text-xs">
                                        All KRAs
                                    </SelectItem>
                                    {kras.map((k) => (
                                        <SelectItem
                                            key={k.id}
                                            value={String(k.id)}
                                            className="text-xs"
                                        >
                                            {k.code ? `${k.code} - ` : ''}
                                            {k.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.kra_id && (
                                <p className="text-[10px] text-destructive">
                                    {errors.kra_id}
                                </p>
                            )}
                        </div>

                        {/* KPI Select */}
                        <div className="space-y-1 sm:col-span-6">
                            <Label htmlFor="edit-kpi_id" className="text-xs">
                                KPI
                            </Label>
                            <Select
                                value={data.kpi_id}
                                onValueChange={(value) =>
                                    setData('kpi_id', value)
                                }
                            >
                                <SelectTrigger
                                    id="edit-kpi_id"
                                    className="h-8 w-full text-xs"
                                >
                                    <SelectValue placeholder="Select KPI" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 max-w-[480px] overflow-y-auto">
                                    {filteredKpis.map((k) => (
                                        <SelectItem
                                            key={k.id}
                                            value={String(k.id)}
                                            className="text-xs"
                                        >
                                            {k.code ? `${k.code} - ` : ''}
                                            {k.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.kpi_id && (
                                <p className="text-[10px] text-destructive">
                                    {errors.kpi_id}
                                </p>
                            )}
                        </div>

                        {/* Order No */}
                        <div className="space-y-1 sm:col-span-2">
                            <Label htmlFor="edit-order_no" className="text-xs">
                                Order No.
                            </Label>
                            <Input
                                id="edit-order_no"
                                type="number"
                                placeholder="1"
                                className="h-8 text-xs"
                                value={data.order_no}
                                onChange={(e) =>
                                    setData('order_no', e.target.value)
                                }
                            />
                            {errors.order_no && (
                                <p className="text-[10px] text-destructive">
                                    {errors.order_no}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="edit-description" className="text-xs">
                            Description
                        </Label>
                        <Textarea
                            id="edit-description"
                            rows={2}
                            className="min-h-[50px] text-xs"
                            placeholder="Enter action plan details..."
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                        {errors.description && (
                            <p className="text-[10px] text-destructive">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* ASSIGN UNITS SECTION */}
                    <div className="space-y-2 rounded-lg border bg-muted/20 p-2.5">
                        <div className="flex items-center justify-between">
                            <Label className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                                Assign Units
                            </Label>
                            <div className="flex items-center space-x-1.5">
                                <Checkbox
                                    id="edit-assign-all"
                                    className="h-3.5 w-3.5"
                                    checked={assignToAll}
                                    onCheckedChange={(checked) =>
                                        handleToggleAll(checked === true)
                                    }
                                />
                                <label
                                    htmlFor="edit-assign-all"
                                    className="cursor-pointer text-xs font-semibold"
                                >
                                    Assign to ALL UNITS
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                            {/* Academic Units */}
                            <div className="space-y-1.5 rounded border bg-background p-2">
                                <div className="flex items-center justify-between border-b pb-1">
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase">
                                        Academic Units
                                    </h4>
                                    <div className="flex items-center space-x-1">
                                        <Checkbox
                                            id="edit-select-academic"
                                            className="h-3 w-3"
                                            checked={isCategoryAllSelected(
                                                categorizedUnits.colleges,
                                            )}
                                            onCheckedChange={(checked) =>
                                                handleToggleCategory(
                                                    categorizedUnits.colleges,
                                                    checked === true,
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="edit-select-academic"
                                            className="cursor-pointer text-[10px] text-muted-foreground"
                                        >
                                            Select All
                                        </label>
                                    </div>
                                </div>
                                {renderUnitGrid(
                                    categorizedUnits.colleges,
                                    'grid-cols-2',
                                )}
                            </div>

                            {/* Non-Academic Units */}
                            <div className="space-y-1.5 rounded border bg-background p-2">
                                <div className="flex items-center justify-between border-b pb-1">
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase">
                                        Non-Academic Units
                                    </h4>
                                    <div className="flex items-center space-x-1">
                                        <Checkbox
                                            id="edit-select-admin"
                                            className="h-3 w-3"
                                            checked={isCategoryAllSelected(
                                                categorizedUnits.admin,
                                            )}
                                            onCheckedChange={(checked) =>
                                                handleToggleCategory(
                                                    categorizedUnits.admin,
                                                    checked === true,
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="edit-select-admin"
                                            className="cursor-pointer text-[10px] text-muted-foreground"
                                        >
                                            Select All
                                        </label>
                                    </div>
                                </div>
                                {renderUnitGrid(
                                    categorizedUnits.admin,
                                    'grid-cols-2',
                                )}
                            </div>

                            {/* Satellite Campuses */}
                            <div className="space-y-1.5 rounded border bg-background p-2">
                                <div className="flex items-center justify-between border-b pb-1">
                                    <h4 className="text-[10px] font-bold text-muted-foreground uppercase">
                                        Satellite Campuses
                                    </h4>
                                    <div className="flex items-center space-x-1">
                                        <Checkbox
                                            id="edit-select-campuses"
                                            className="h-3 w-3"
                                            checked={isCategoryAllSelected(
                                                categorizedUnits.campuses,
                                            )}
                                            onCheckedChange={(checked) =>
                                                handleToggleCategory(
                                                    categorizedUnits.campuses,
                                                    checked === true,
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor="edit-select-campuses"
                                            className="cursor-pointer text-[10px] text-muted-foreground"
                                        >
                                            Select All
                                        </label>
                                    </div>
                                </div>
                                {renderUnitGrid(
                                    categorizedUnits.campuses,
                                    'grid-cols-1',
                                    true,
                                )}
                            </div>
                        </div>

                        <p className="text-[10px] text-muted-foreground italic">
                            Units that already submitted or were reviewed won't
                            be removed even if unchecked.
                        </p>
                    </div>

                    {/* SET DATE & DUE DATE SECTION (range picker with month shortcut) */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs">
                                Set Date / Due Date
                            </Label>
                            <Popover
                                open={datePopoverOpen}
                                onOpenChange={setDatePopoverOpen}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="h-7 text-[11px]"
                                    >
                                        <CalendarDays className="mr-1.5 h-3 w-3" />
                                        Jump to month
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="end"
                                    className="w-64 space-y-3 p-3"
                                >
                                    <div className="grid grid-cols-2 gap-2">
                                        <Select
                                            value={String(pickerMonth)}
                                            onValueChange={(v) =>
                                                setPickerMonth(Number(v))
                                            }
                                        >
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {MONTHS.map((m, i) => (
                                                    <SelectItem
                                                        key={m}
                                                        value={String(i)}
                                                        className="text-xs"
                                                    >
                                                        {m}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Select
                                            value={String(pickerYear)}
                                            onValueChange={(v) =>
                                                setPickerYear(Number(v))
                                            }
                                        >
                                            <SelectTrigger className="h-8 text-xs">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {yearOptions.map((y) => (
                                                    <SelectItem
                                                        key={y}
                                                        value={String(y)}
                                                        className="text-xs"
                                                    >
                                                        {y}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        type="button"
                                        size="sm"
                                        className="h-8 w-full text-xs"
                                        onClick={applyMonthShortcut}
                                    >
                                        Apply {MONTHS[pickerMonth]} {pickerYear}
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-8 w-full justify-start text-xs font-normal"
                                >
                                    {data.start_date
                                        ? `${format(new Date(data.start_date), 'MMM d, yyyy')}${
                                              data.end_date
                                                  ? ` – ${format(new Date(data.end_date), 'MMM d, yyyy')}`
                                                  : ''
                                          }`
                                        : 'Select date range'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                align="start"
                                className="w-auto p-0"
                            >
                                <Calendar
                                    mode="range"
                                    selected={dateRange}
                                    onSelect={handleDateRangeSelect}
                                    month={
                                        dateRange?.from
                                            ? new Date(dateRange.from)
                                            : undefined
                                    }
                                    numberOfMonths={2}
                                    className="rounded-lg border"
                                />
                            </PopoverContent>
                        </Popover>

                        {(errors.start_date || errors.end_date) && (
                            <p className="text-[10px] text-destructive">
                                {errors.start_date || errors.end_date}
                            </p>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <DialogFooter className="pt-2">
                        <DialogClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            size="sm"
                            className="h-8 text-xs"
                            disabled={processing}
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
