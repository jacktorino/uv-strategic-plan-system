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

interface SubKraOption {
    id: number;
    code?: string;
    name: string;
}

interface CreateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    subkras: SubKraOption[];
}

export function CreateDialog({
    open,
    onOpenChange,
    subkras,
}: CreateDialogProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        subkra_id: '',
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

    // Helper to format option text (e.g. "1.1 - Sub-KRA Name")
    const selectedSubKra = subkras.find(
        (sk) => String(sk.id) === data.subkra_id,
    );
    const getSubKraLabel = (sk: SubKraOption) =>
        sk.code ? `${sk.code} - ${sk.name}` : sk.name;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>New KPI</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="subkra_id">Sub-KRA</Label>
                        <Select
                            value={data.subkra_id}
                            onValueChange={(value) =>
                                setData('subkra_id', value)
                            }
                        >
                            <SelectTrigger id="subkra_id">
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
