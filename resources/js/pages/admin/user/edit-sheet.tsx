// resources/js/pages/admin/user/edit-sheet.tsx
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

import { User } from './columns';

interface RoleOption {
    value: string;
    label: string;
}

interface UnitOption {
    id: number;
    name: string;
}

interface EditSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    user: User | null;
    roles: RoleOption[];
    units: UnitOption[];
}

export function EditSheet({
    open,
    onOpenChange,
    user,
    roles,
    units,
}: EditSheetProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: '',
        responsible_unit_id: '',
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.name,
                email: user.email,
                role: user.role,
                responsible_unit_id: user.responsible_unit
                    ? String(user.responsible_unit.id)
                    : '',
            });
        }
    }, [user]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!user) return;

        put(`/accounts/${user.id}`, {
            onSuccess: () => {
                toast.success('Account updated.');
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
                        <SheetTitle>Edit Account</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 px-4">
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
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-role">Role</Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) =>
                                    setData('role', value)
                                }
                            >
                                <SelectTrigger id="edit-role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((r) => (
                                        <SelectItem
                                            key={r.value}
                                            value={r.value}
                                        >
                                            {r.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.role && (
                                <p className="text-sm text-red-600">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="edit-responsible_unit_id">
                                Responsible Unit
                            </Label>
                            <Select
                                value={data.responsible_unit_id}
                                onValueChange={(value) =>
                                    setData('responsible_unit_id', value)
                                }
                            >
                                <SelectTrigger id="edit-responsible_unit_id">
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    {units.map((u) => (
                                        <SelectItem
                                            key={u.id}
                                            value={String(u.id)}
                                        >
                                            {u.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.responsible_unit_id && (
                                <p className="text-sm text-red-600">
                                    {errors.responsible_unit_id}
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
