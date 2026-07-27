// resources/js/pages/admin/kpi/edit-sheet.tsx
import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface KraOption {
    id: number;
    name: string;
}

interface EditSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    kpi: Kpi | null;
    kras: KraOption[];
}

export function EditSheet({ open, onOpenChange, kpi, kras }: EditSheetProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        kra_id: '',
        code: '',
        name: '',
        order_no: '',
    });

    useEffect(() => {
        if (kpi) {
            setData({
                kra_id: kpi.kra ? String(kpi.kra.id) : '',
                code: kpi.code,
                name: kpi.name,
                order_no: String(kpi.order_no),
            });
        }
    }, [kpi]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!kpi) return;

        put(`/kpis/${kpi.id}`, {
            onSuccess: () => {
                toast.success('KPI updated.');
                reset();
                onOpenChange(false);
            },
            onError: () => toast.error('Please check the form for errors.'),
        });
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <form onSubmit={handleSubmit} className="flex h-full flex-col">
                    <SheetHeader>
                        <SheetTitle>Edit KPI</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 px-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-kra_id">KRA</Label>
                            <Select
                                value={data.kra_id}
                                onValueChange={(value) =>
                                    setData('kra_id', value)
                                }
                            >
                                <SelectTrigger id="edit-kra_id">
                                    <SelectValue placeholder="Select KRA" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kras.map((k) => (
                                        <SelectItem
                                            key={k.id}
                                            value={String(k.id)}
                                        >
                                            {k.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.kra_id && (
                                <p className="text-sm text-red-600">
                                    {errors.kra_id}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-code">Code</Label>
                            <Input
                                id="edit-code"
                                value={data.code}
                                onChange={(e) =>
                                    setData('code', e.target.value)
                                }
                            />
                            {errors.code && (
                                <p className="text-sm text-red-600">
                                    {errors.code}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-order_no">Order</Label>
                            <Input
                                id="edit-order_no"
                                type="number"
                                value={data.order_no}
                                onChange={(e) =>
                                    setData('order_no', e.target.value)
                                }
                            />
                            {errors.order_no && (
                                <p className="text-sm text-red-600">
                                    {errors.order_no}
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
