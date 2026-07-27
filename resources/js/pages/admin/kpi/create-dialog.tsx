// resources/js/pages/admin/kpi/create-dialog.tsx
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

interface KraOption {
    id: number;
    code?: string;
    name: string;
}

interface CreateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    kras: KraOption[];
}

export function CreateDialog({ open, onOpenChange, kras }: CreateDialogProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        kra_id: '',
        code: '',
        name: '',
        order_no: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/kpis', {
            onSuccess: () => {
                toast.success('KPI created.');
                reset();
                onOpenChange(false);
            },
            onError: () => toast.error('Please check the form for errors.'),
        });
    }

    // Helper to format option text (e.g. "KRA-01 - Key Result Area Name")
    const selectedKra = kras.find((k) => String(k.id) === data.kra_id);
    const getKraLabel = (k: KraOption) =>
        k.code ? `${k.code} - ${k.name}` : k.name;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>New KPI</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="kra_id">KRA</Label>
                        <Select
                            value={data.kra_id}
                            onValueChange={(value) => setData('kra_id', value)}
                        >
                            <SelectTrigger id="kra_id">
                                <SelectValue placeholder="Select KRA">
                                    {selectedKra
                                        ? getKraLabel(selectedKra)
                                        : 'Select KRA'}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {kras.map((k) => (
                                    <SelectItem key={k.id} value={String(k.id)}>
                                        {getKraLabel(k)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.kra_id && (
                            <p className="text-xs text-destructive">
                                {errors.kra_id}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
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
                            <Label htmlFor="order_no">Order</Label>
                            <Input
                                id="order_no"
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
                        <Label htmlFor="name">Name</Label>
                        <Textarea
                            id="name"
                            placeholder="Enter KPI title or description"
                            rows={3}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-xs text-destructive">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <DialogFooter className="gap-2 pt-4 sm:gap-0">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
