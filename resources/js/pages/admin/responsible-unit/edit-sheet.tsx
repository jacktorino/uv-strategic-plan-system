// resources/js/pages/admin/responsible-unit/edit-sheet.tsx

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
    {
        value: 'Academic Units',
        label: 'Academic Units',
    },
    {
        value: 'Non-Academic Units',
        label: 'Non-Academic Units',
    },
    {
        value: 'Satellite Campus',
        label: 'Satellite Campus',
    },
];

export function EditSheet({
    open,
    onOpenChange,
    unit,
}: EditSheetProps) {
    const {
        data,
        setData,
        put,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        code: '',
        name: '',
        category: '',
        order_no: '',
    });

    useEffect(() => {
        if (unit) {
            setData({
                code: unit.code ?? '',
                name: unit.name ?? '',
                category: unit.category ?? '',
                order_no: String(unit.order_no ?? ''),
            });

            clearErrors();
        }
    }, [unit]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!unit) return;

       put(`/responsible-units/${unit.id}`, {
            preserveScroll: true,

            onSuccess: () => {
                toast.success('Responsible unit updated successfully.');

                reset();
                clearErrors();
                onOpenChange(false);
            },

            onError: () => {
                toast.error('Please check the form errors.');
            },
        });
    }

    function handleClose(open: boolean) {
        if (!open) {
            reset();
            clearErrors();
        }

        onOpenChange(open);
    }

    return (
        <Sheet open={open} onOpenChange={handleClose}>
            <SheetContent>
                <form
                    onSubmit={handleSubmit}
                    className="flex h-full flex-col"
                >
                    <SheetHeader>
                        <SheetTitle>
                            Edit Responsible Unit
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 px-4 py-4">

                        {/* Code */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-code">
                                Code
                            </Label>

                            <Input
                                id="edit-code"
                                value={data.code}
                                onChange={(e) =>
                                    setData(
                                        'code',
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />

                            {errors.code && (
                                <p className="text-sm text-red-600">
                                    {errors.code}
                                </p>
                            )}
                        </div>


                        {/* Name */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">
                                Name
                            </Label>

                            <Input
                                id="edit-name"
                                value={data.name}
                                onChange={(e) =>
                                    setData(
                                        'name',
                                        e.target.value
                                    )
                                }
                            />

                            {errors.name && (
                                <p className="text-sm text-red-600">
                                    {errors.name}
                                </p>
                            )}
                        </div>


                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-category">
                                Category
                            </Label>

                            <Select
                                value={data.category}
                                onValueChange={(value) =>
                                    setData(
                                        'category',
                                        value
                                    )
                                }
                            >
                                <SelectTrigger id="edit-category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {CATEGORY_OPTIONS.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
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


                        {/* Order */}
                        <div className="space-y-2">
                            <Label htmlFor="edit-order">
                                Order
                            </Label>

                            <Input
                                id="edit-order"
                                type="number"
                                value={data.order_no}
                                onChange={(e) =>
                                    setData(
                                        'order_no',
                                        e.target.value
                                    )
                                }
                            />

                            {errors.order_no && (
                                <p className="text-sm text-red-600">
                                    {errors.order_no}
                                </p>
                            )}
                        </div>

                    </div>


                    <SheetFooter className="gap-2">
                        <SheetClose asChild>
                            <Button
                                type="button"
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        </SheetClose>

                        <Button
                            type="submit"
                            disabled={processing}
                        >
                            {processing
                                ? 'Saving...'
                                : 'Save Changes'}
                        </Button>
                    </SheetFooter>

                </form>
            </SheetContent>
        </Sheet>
    );
}