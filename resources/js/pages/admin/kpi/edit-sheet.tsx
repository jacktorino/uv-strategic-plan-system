// resources/js/pages/admin/kpi/edit-sheet.tsx
import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from '@/components/ui/sheet';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';

import { Kpi } from './columns';

interface SubKraOption {
    id: number;
    code?: string;
    name: string;
}

interface EditSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    kpi: Kpi | null;
    subkras: SubKraOption[];
}

export function EditSheet({
    open,
    onOpenChange,
    kpi,
    subkras,
}: EditSheetProps) {
    const { data, setData, put, processing, errors } = useForm({
        subkra_id: '',
        code: '',
        name: '',
        order_no: '',
    });

    useEffect(() => {
        if (kpi) {
            setData({
                subkra_id: kpi.subkra ? String(kpi.subkra.id) : '',
                code: kpi.code,
                name: kpi.name,
                order_no: String(kpi.order_no ?? ''),
            });
        }
    }, [kpi]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!kpi) return;

        put(`/kpis/${kpi.id}`, {
            onSuccess: () => {
                toast.success('KPI updated.');
                onOpenChange(false);
            },
            onError: () => toast.error('Please check the form for errors.'),
        });
    }

    const selectedSubKra = subkras.find(
        (sk) => String(sk.id) === data.subkra_id,
    );
    const getSubKraLabel = (sk: SubKraOption) =>
        sk.code ? `${sk.code} - ${sk.name}` : sk.name;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="overflow-y-auto">
                <form onSubmit={handleSubmit} className="flex h-full flex-col">
                    <SheetHeader>
                        <SheetTitle>Edit KPI</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 px-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-subkra_id">Sub-KRA</Label>
                            <Select
                                value={data.subkra_id}
                                onValueChange={(value) =>
                                    setData('subkra_id', value)
                                }
                            >
                                <SelectTrigger id="edit-subkra_id">
                                    <SelectValue placeholder="Select Sub-KRA">
                                        {selectedSubKra
                                            ? getSubKraLabel(selectedSubKra)
                                            : 'Select Sub-KRA'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent
                                    position="popper"
                                    className="z-[100]"
                                >
                                    {subkras.map((sk) => (
                                        <SelectItem
                                            key={sk.id}
                                            value={String(sk.id)}
                                        >
                                            {getSubKraLabel(sk)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.subkra_id && (
                                <p className="text-xs text-destructive">
                                    {errors.subkra_id}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="edit-code">Code</Label>
                                <Input
                                    id="edit-code"
                                    placeholder="e.g. KPI-01"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData('code', e.target.value)
                                    }
                                />
                                {errors.code && (
                                    <p className="text-xs text-destructive">
                                        {errors.code}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="edit-order_no">Order</Label>
                                <Input
                                    id="edit-order_no"
                                    type="number"
                                    placeholder="1"
                                    value={data.order_no}
                                    onChange={(e) =>
                                        setData('order_no', e.target.value)
                                    }
                                />
                                {errors.order_no && (
                                    <p className="text-xs text-destructive">
                                        {errors.order_no}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Textarea
                                id="edit-name"
                                placeholder="Enter KPI title or description"
                                rows={3}
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </SheetClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
