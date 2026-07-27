// edit-sheet.tsx
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

import { ResponsibleUnit } from './columns';

interface EditSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    unit: ResponsibleUnit | null;
}

const CATEGORY_OPTIONS = [
    { value: 'academic_college', label: 'Academic College' },
    { value: 'administrative_office', label: 'Administrative Office' },
    { value: 'support_unit', label: 'Support Unit' },
];

export function EditSheet({ open, onOpenChange, unit }: EditSheetProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        code: '',
        name: '',
        category: '',
        order_no: '',
    });

    // Pre-fill the form whenever a different unit is selected for editing
    useEffect(() => {
        if (unit) {
            setData({
                code: unit.code,
                name: unit.name,
                category: unit.category,
                order_no: String(unit.order_no),
            });
        }
    }, [unit]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!unit) return;

        put(`/admin/responsible-units/${unit.id}`, {
            onSuccess: () => {
                toast.success('Responsible unit updated.');
                reset();
                onOpenChange(false);
            },
            onError: () => {
                toast.error('Please check the form for errors.');
            },
        });
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent>
                <form onSubmit={handleSubmit} className="flex h-full flex-col">
                    <SheetHeader>
                        <SheetTitle>Edit Responsible Unit</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 px-4">
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
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                                value={data.category}
                                onValueChange={(value) =>
                                    setData('category', value)
                                }
                            >
                                <SelectTrigger id="edit-category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CATEGORY_OPTIONS.map((opt) => (
                                        <SelectItem
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <p className="text-sm text-red-600">
                                    {errors.category}
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
