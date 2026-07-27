// resources/js/pages/admin/user/create-sheet.tsx
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

interface RoleOption {
    value: string;
    label: string;
}

interface UnitOption {
    id: number;
    name: string;
}

interface CreateSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    roles: RoleOption[];
    units: UnitOption[];
}

export function CreateSheet({
    open,
    onOpenChange,
    roles,
    units,
}: CreateSheetProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: '',
        responsible_unit_id: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        post('/accounts', {
            onSuccess: () => {
                toast.success(
                    'Account created. Login credentials have been emailed.',
                );
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
                        <SheetTitle>New Account</SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 space-y-4 px-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
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
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) =>
                                    setData('role', value)
                                }
                            >
                                <SelectTrigger id="role">
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
                            <Label htmlFor="responsible_unit_id">
                                Responsible Unit
                            </Label>
                            <Select
                                value={data.responsible_unit_id}
                                onValueChange={(value) =>
                                    setData('responsible_unit_id', value)
                                }
                            >
                                <SelectTrigger id="responsible_unit_id">
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

                        <p className="text-sm text-muted-foreground">
                            A temporary password will be generated automatically
                            and emailed to this address.
                        </p>
                    </div>

                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </SheetClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create Account'}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}
