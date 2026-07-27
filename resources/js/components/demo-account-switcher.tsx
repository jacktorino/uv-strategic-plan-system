// resources/js/components/demo-account-switcher.tsx
import { router, usePage } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UserCheck } from 'lucide-react';

interface DemoUser {
    id: number;
    name: string;
    email: string;
    role?: string;
}

export function DemoAccountSwitcher() {
    const { auth, demoUsers } = usePage<{
        auth: { user: DemoUser | null };
        demoUsers?: DemoUser[];
    }>().props;

    if (!demoUsers || demoUsers.length === 0) return null;

    const handleSwitch = (userId: string) => {
        router.get(`/demo/switch/${userId}`);
    };

    return (
        <div className="fixed right-4 bottom-4 z-50 flex items-center space-x-2 rounded-lg border bg-background/95 p-2 shadow-xl backdrop-blur">
            <div className="flex items-center space-x-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <UserCheck className="h-4 w-4" />
                <span>Demo Switcher:</span>
            </div>

            <Select
                value={auth?.user ? String(auth.user.id) : ''}
                onValueChange={handleSwitch}
            >
                <SelectTrigger className="h-7 w-[200px] text-xs">
                    <SelectValue placeholder="Select account..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                    {demoUsers.map((user) => (
                        <SelectItem
                            key={user.id}
                            value={String(user.id)}
                            className="text-xs"
                        >
                            <span className="font-medium">{user.name}</span>
                            {user.role && (
                                <span className="ml-1.5 text-muted-foreground">
                                    ({user.role})
                                </span>
                            )}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
